"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { formatDate } from "@/lib/utils"
import { ArrowLeft, Edit, Trash2, AlertCircle, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { VehicleImageUpload } from "@/components/vehicle-image-upload"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function VehicleDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [vehicle, setVehicle] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: 0,
    price: 0,
    mileage: 0,
    vin: "",
    color: "",
    fuel_type: "",
    transmission: "",
    body_type: "",
    description: "",
    status: "",
    image_urls: [] as string[],
  })

  // Fetch vehicle data
  useEffect(() => {
    async function fetchVehicle() {
      try {
        const response = await fetch(`/api/vehicles/${params.id}`)

        if (!response.ok) {
          throw new Error(`Failed to fetch vehicle: ${response.statusText}`)
        }

        const data = await response.json()

        if (!data.success) {
          throw new Error(data.error || "Failed to fetch vehicle")
        }

        setVehicle(data.vehicle)
        setFormData({
          make: data.vehicle.make,
          model: data.vehicle.model,
          year: data.vehicle.year,
          price: data.vehicle.price,
          mileage: data.vehicle.mileage,
          vin: data.vehicle.vin,
          color: data.vehicle.color,
          fuel_type: data.vehicle.fuel_type,
          transmission: data.vehicle.transmission,
          body_type: data.vehicle.body_type,
          description: data.vehicle.description || "",
          status: data.vehicle.status,
          image_urls: data.vehicle.image_urls || [],
        })
      } catch (err) {
        console.error("Error fetching vehicle:", err)
        setError(err?.message || "Failed to load vehicle details")
      } finally {
        setLoading(false)
      }
    }

    fetchVehicle()
  }, [params.id])

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle select changes
  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle image updates
  const handleImagesUpdated = (imageUrls) => {
    setFormData((prev) => ({ ...prev, image_urls: imageUrls }))
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      // Convert price and mileage to numbers
      const vehicleData = {
        ...formData,
        price: Number.parseFloat(formData.price.toString()),
        mileage: Number.parseInt(formData.mileage.toString()),
        year: Number.parseInt(formData.year.toString()),
      }

      // Submit to API
      const response = await fetch(`/api/vehicles/${params.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vehicleData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to update vehicle")
      }

      const result = await response.json()
      setVehicle(result.vehicle)
      setIsEditing(false)

      toast({
        title: "Vehicle updated",
        description: "The vehicle has been updated successfully.",
      })
    } catch (error) {
      console.error("Error updating vehicle:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to update vehicle",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  // Handle vehicle deletion
  const handleDelete = async () => {
    setDeleteLoading(true)
    try {
      const response = await fetch(`/api/vehicles/${params.id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error(`Failed to delete vehicle: ${response.statusText}`)
      }

      toast({
        title: "Vehicle deleted",
        description: "The vehicle has been removed from inventory.",
      })

      // Redirect to vehicles list
      router.push("/admin/vehicles")
    } catch (err) {
      console.error("Error deleting vehicle:", err)
      toast({
        title: "Error",
        description: "Failed to delete vehicle",
        variant: "destructive",
      })
    } finally {
      setDeleteLoading(false)
      setDeleteDialogOpen(false)
    }
  }

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  if (loading) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center mb-6">
            <Link href="/admin/vehicles" className="text-primary hover:text-primary/80 flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              <span>Back to vehicles</span>
            </Link>
          </div>
          <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6 text-center">
            <p className="text-gray-500">Loading vehicle details...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !vehicle) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center mb-6">
            <Link href="/admin/vehicles" className="text-primary hover:text-primary/80 flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              <span>Back to vehicles</span>
            </Link>
          </div>
          <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6 text-center">
            <div className="flex justify-center mb-4">
              <AlertCircle className="h-12 w-12 text-red-500" />
            </div>
            <h1 className="text-xl font-semibold text-gray-900 mb-4">Vehicle Not Found</h1>
            <p className="text-gray-500">
              {error || "The vehicle you're looking for doesn't exist or has been removed."}
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Link href="/admin/vehicles" className="text-primary hover:text-primary/80 flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span>Back to vehicles</span>
          </Link>
          <div className="flex items-center space-x-2">
            {!isEditing ? (
              <>
                <Button variant="outline" size="sm" className="flex items-center" onClick={() => setIsEditing(true)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Vehicle
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  className="flex items-center"
                  onClick={() => setDeleteDialogOpen(true)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </>
            ) : (
              <Button variant="outline" size="sm" className="flex items-center" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            )}
          </div>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <Label htmlFor="make">Make</Label>
                  <Input id="make" name="make" value={formData.make} onChange={handleChange} required />
                </div>
                <div>
                  <Label htmlFor="model">Model</Label>
                  <Input id="model" name="model" value={formData.model} onChange={handleChange} required />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div>
                  <Label htmlFor="year">Year</Label>
                  <Input
                    id="year"
                    name="year"
                    type="number"
                    min="1900"
                    max={new Date().getFullYear() + 1}
                    value={formData.year}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="mileage">Mileage</Label>
                  <Input
                    id="mileage"
                    name="mileage"
                    type="number"
                    min="0"
                    value={formData.mileage}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="vin">VIN</Label>
                <Input id="vin" name="vin" value={formData.vin} onChange={handleChange} required />
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-4">
                <div>
                  <Label htmlFor="color">Color</Label>
                  <Input id="color" name="color" value={formData.color} onChange={handleChange} required />
                </div>
                <div>
                  <Label htmlFor="fuel_type">Fuel Type</Label>
                  <Select
                    name="fuel_type"
                    value={formData.fuel_type}
                    onValueChange={(value) => handleSelectChange("fuel_type", value)}
                  >
                    <SelectTrigger id="fuel_type">
                      <SelectValue placeholder="Select fuel type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="petrol">Petrol</SelectItem>
                      <SelectItem value="diesel">Diesel</SelectItem>
                      <SelectItem value="electric">Electric</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="transmission">Transmission</Label>
                  <Select
                    name="transmission"
                    value={formData.transmission}
                    onValueChange={(value) => handleSelectChange("transmission", value)}
                  >
                    <SelectTrigger id="transmission">
                      <SelectValue placeholder="Select transmission" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="automatic">Automatic</SelectItem>
                      <SelectItem value="manual">Manual</SelectItem>
                      <SelectItem value="semi-automatic">Semi-Automatic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="body_type">Body Type</Label>
                  <Select
                    name="body_type"
                    value={formData.body_type}
                    onValueChange={(value) => handleSelectChange("body_type", value)}
                  >
                    <SelectTrigger id="body_type">
                      <SelectValue placeholder="Select body type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedan">Sedan</SelectItem>
                      <SelectItem value="suv">SUV</SelectItem>
                      <SelectItem value="coupe">Coupe</SelectItem>
                      <SelectItem value="convertible">Convertible</SelectItem>
                      <SelectItem value="hatchback">Hatchback</SelectItem>
                      <SelectItem value="wagon">Wagon</SelectItem>
                      <SelectItem value="pickup">Pickup</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  name="status"
                  value={formData.status}
                  onValueChange={(value) => handleSelectChange("status", value)}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="sold">Sold</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <VehicleImageUpload
                vehicleId={params.id}
                existingImages={formData.image_urls}
                onImagesUpdated={handleImagesUpdated}
              />

              <div className="flex justify-end">
                <Button type="submit" disabled={isSaving} className="flex items-center">
                  <Save className="mr-2 h-4 w-4" />
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          ) : (
            <div>
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {vehicle.make} {vehicle.model}
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  {vehicle.year} • {formatCurrency(vehicle.price)} • {vehicle.mileage.toLocaleString()} miles
                </p>
              </div>

              <div className="border-t border-gray-200">
                <dl>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">VIN</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 font-mono">{vehicle.vin}</dd>
                  </div>

                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Color</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{vehicle.color}</dd>
                  </div>

                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Fuel Type</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 capitalize">{vehicle.fuel_type}</dd>
                  </div>

                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Transmission</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 capitalize">
                      {vehicle.transmission}
                    </dd>
                  </div>

                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Body Type</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 capitalize">{vehicle.body_type}</dd>
                  </div>

                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Status</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 capitalize">{vehicle.status}</dd>
                  </div>

                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Description</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {vehicle.description || "No description provided."}
                    </dd>
                  </div>

                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Added On</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {formatDate(vehicle.created_at)}
                    </dd>
                  </div>

                  <div className="bg-gray-50 px-4 py-5 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500 mb-4">Images</dt>
                    <dd>
                      {vehicle.image_urls && vehicle.image_urls.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                          {vehicle.image_urls.map((image, index) => (
                            <div key={index} className="relative aspect-square overflow-hidden rounded-md border">
                              <img
                                src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/vehicle_images/${image}`}
                                alt={`${vehicle.make} ${vehicle.model} image ${index + 1}`}
                                className="object-cover w-full h-full"
                              />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500">No images available.</p>
                      )}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the vehicle and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={deleteLoading} className="bg-red-600 hover:bg-red-700">
              {deleteLoading ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
