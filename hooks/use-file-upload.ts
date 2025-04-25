"use client"

import { useState } from "react"
import type { BucketName } from "@/lib/storage-utils"

interface FileUploadOptions {
  bucketName: BucketName
  prefix?: string
  maxSizeMB?: number
  allowedTypes?: string[]
}

interface FileUploadResult {
  uploading: boolean
  progress: number
  error: string | null
  uploadFile: (file: File) => Promise<{ path: string | null; error: string | null }>
  uploadMultipleFiles: (files: File[]) => Promise<{ paths: string[]; error: string | null }>
  reset: () => void
}

export function useFileUpload(options: FileUploadOptions): FileUploadResult {
  const { bucketName, prefix = "", maxSizeMB = 10, allowedTypes } = options
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const validateFile = (file: File): string | null => {
    // Check file size
    const maxSizeBytes = maxSizeMB * 1024 * 1024
    if (file.size > maxSizeBytes) {
      return `File size exceeds ${maxSizeMB}MB limit`
    }

    // Check file type if specified
    if (allowedTypes && allowedTypes.length > 0) {
      const fileType = file.type
      if (!allowedTypes.includes(fileType)) {
        return `File type ${fileType} is not allowed. Allowed types: ${allowedTypes.join(", ")}`
      }
    }

    return null
  }

  const uploadFile = async (file: File): Promise<{ path: string | null; error: string | null }> => {
    try {
      setUploading(true)
      setProgress(0)
      setError(null)

      // Validate file
      const validationError = validateFile(file)
      if (validationError) {
        setError(validationError)
        return { path: null, error: validationError }
      }

      // Create form data
      const formData = new FormData()
      formData.append("file", file)
      formData.append("bucketName", bucketName)
      formData.append("prefix", prefix)

      // Upload file
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(errorText || "Failed to upload file")
      }

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || "Failed to upload file")
      }

      setProgress(100)
      return { path: result.path, error: null }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred"
      setError(errorMessage)
      return { path: null, error: errorMessage }
    } finally {
      setUploading(false)
    }
  }

  const uploadMultipleFiles = async (files: File[]): Promise<{ paths: string[]; error: string | null }> => {
    try {
      setUploading(true)
      setProgress(0)
      setError(null)

      const paths: string[] = []
      const totalFiles = files.length
      let completedFiles = 0

      for (const file of files) {
        // Validate file
        const validationError = validateFile(file)
        if (validationError) {
          setError(validationError)
          return { paths, error: validationError }
        }

        // Upload file
        const { path, error: uploadError } = await uploadFile(file)

        if (uploadError) {
          return { paths, error: uploadError }
        }

        if (path) {
          paths.push(path)
        }

        completedFiles++
        setProgress(Math.round((completedFiles / totalFiles) * 100))
      }

      return { paths, error: null }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred"
      setError(errorMessage)
      return { paths: [], error: errorMessage }
    } finally {
      setUploading(false)
    }
  }

  const reset = () => {
    setUploading(false)
    setProgress(0)
    setError(null)
  }

  return {
    uploading,
    progress,
    error,
    uploadFile,
    uploadMultipleFiles,
    reset,
  }
}
