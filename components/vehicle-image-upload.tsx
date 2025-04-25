"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Upload, X, ImageIcon } from "lucide-react"
import Image from "next/image"

interface VehicleImageUploadProps {
  vehicleId: string
  existingImages?: string[]
  onImagesUpdated?: (imageUrls: string[]) => void
}

export function VehicleImageUpload({ vehicleId, existingImages = [], onImagesUpdated }: VehicleImageUploadProps) {
  const { toast } = useToast()
  const [uploading, setUploading] = useState(false)
  const [images, setImages] = useState<string[]>(existingImages)
  const [previewUrls, setPreviewUrls] = useState<{ [key: string]: string }>({})

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return

    const files = Array.from(e.target.files)
    setUploading(true)

    try {
      // Create temporary preview URLs
      const newPreviewUrls = { ...previewUrls }
      files.forEach((file) => {
        const tempId = `temp_${Date.now()}_${file.name}`
        newPreviewUrls[tempId] = URL.createObjectURL(file)
      })
      setPreviewUrls(newPreviewUrls)

      // Upload each file
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData()
        formData.append("file", file)
        formData.append("bucketName", "vehicle_images")
        formData.append("prefix", `${vehicleId}/`)

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        })

        if (!response.ok) {
          throw new Error(`Upload failed: ${response.statusText}`)
        }

        const result = await response.json()
        return result.path
      })

      const uploadedPaths = await Promise.all(uploadPromises)
      const newImages = [...images, ...uploadedPaths.filter(Boolean)]
      setImages(newImages)

      // Update parent component if callback provided
      if (onImagesUpdated) {
        onImagesUpdated(newImages)
      }

      toast({
        title: "Images uploaded successfully",
        description: `${uploadedPaths.filter(Boolean).length} images uploaded.`,
      })
    } catch (error) {
      console.error("Upload error:", error)
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "An error occurred during upload",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
      // Clear the input
      e.target.value = ""
    }
  }

  const handleRemoveImage = async (index: number) => {
    try {
      const imageToRemove = images[index]

      // Remove from Supabase storage
      const response = await fetch(`/api/upload?path=${encodeURIComponent(imageToRemove)}&bucket=vehicle_images`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error(`Delete failed: ${response.statusText}`)
      }

      // Update state
      const newImages = [...images]
      newImages.splice(index, 1)
      setImages(newImages)

      // Update parent component if callback provided
      if (onImagesUpdated) {
        onImagesUpdated(newImages)
      }

      toast({
        title: "Image removed",
        description: "The image was successfully removed.",
      })
    } catch (error) {
      console.error("Delete error:", error)
      toast({
        title: "Delete failed",
        description: error instanceof Error ? error.message : "An error occurred while deleting the image",
        variant: "destructive",
      })
    }
  }

  const getImageUrl = (path: string) => {
    // Check if it's a temporary preview
    if (previewUrls[path]) {
      return previewUrls[path]
    }

    // Otherwise, construct the Supabase storage URL
    return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/vehicle_images/${path}`
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Vehicle Images</h3>
        <div>
          <input
            type="file"
            id="vehicle-images"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
            disabled={uploading}
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => document.getElementById("vehicle-images")?.click()}
            disabled={uploading}
          >
            <Upload className="mr-2 h-4 w-4" />
            {uploading ? "Uploading..." : "Upload Images"}
          </Button>
        </div>
      </div>

      {images.length === 0 ? (
        <div className="flex h-40 items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50">
          <div className="text-center">
            <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-500">No images uploaded yet</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {images.map((image, index) => (
            <div key={index} className="group relative aspect-square overflow-hidden rounded-md border">
              <Image
                src={getImageUrl(image) || "/placeholder.svg"}
                alt={`Vehicle image ${index + 1}`}
                fill
                className="object-cover"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute right-2 top-2 rounded-full bg-black/70 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
