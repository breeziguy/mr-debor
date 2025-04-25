"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewVehiclePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: new Date().getFullYear(),
    price: "",
    mileage: "",
    vin: "",
    color: "",
    fuel_type: "petrol",
    transmission: "automatic",
    body_type: "sedan",
    description: "",
    features: [],
    status: "available",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validate form
      if (!formData.make || !formData.model || !formData.vin) {
        throw new Error("Please fill in all required fields")
      }

      // Convert price and mileage to numbers
      const vehicleData = {
        ...formData,
        price: Number.parseFloat(formData.price),
        mileage: Number.parseInt(formData.mileage),
        year: Number.parseInt(formData.year.toString()),
        features: formData.features.length > 0 ? formData.features : ["Basic Package"],
      }

      // Submit to API
      const response = await fetch("/api/vehicles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vehicleData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to create vehicle")
      }

      const result = await response.json()

      toast({
        title: "Vehicle created",
        description: "The vehicle has been added to inventory successfully.",
      })

      // Redirect to the vehicle detail page
      router.push(`/admin/vehicles/${result.vehicle.id}`)
    } catch (error) {
      console.error("Error creating vehicle:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to create vehicle",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link href="/admin/vehicles" className="flex items-center text-primary hover:text-primary/80">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Vehicles
        </Link>
      </div>

      <div className="sm:flex sm:items-center mb-6">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Add New Vehicle</h1>
          <p className="mt-2 text-sm text-gray-700">Add a new vehicle to the inventory with all relevant details.</p>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <Label htmlFor="make">Make *</Label>
              <Input id="make" name="make" value={formData.make} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="model">Model *</Label>
              <Input id="model" name="model" value={formData.model} onChange={handleChange} required />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div>
              <Label htmlFor="year">Year *</Label>
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
              <Label htmlFor="price">Price ($) *</Label>
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
              <Label htmlFor="mileage">Mileage *</Label>
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
            <Label htmlFor="vin">VIN *</Label>
            <Input id="vin" name="vin" value={formData.vin} onChange={handleChange} required />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-4">
            <div>
              <Label htmlFor="color">Color *</Label>
              <Input id="color" name="color" value={formData.color} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="fuel_type">Fuel Type *</Label>
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
              <Label htmlFor="transmission">Transmission *</Label>
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
              <Label htmlFor="body_type">Body Type *</Label>
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
            <Label htmlFor="status">Status *</Label>
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

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/vehicles")}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Vehicle"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
