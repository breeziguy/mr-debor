"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { formatDate } from "@/lib/utils"
import { Car, Plus, RefreshCw, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function VehiclesPage() {
  const { toast } = useToast()
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")

  // Fetch vehicles
  useEffect(() => {
    async function fetchVehicles() {
      try {
        setLoading(true)
        const response = await fetch("/api/vehicles")

        if (!response.ok) {
          throw new Error(`Failed to fetch vehicles: ${response.statusText}`)
        }

        const data = await response.json()

        if (!data.success) {
          throw new Error(data.error || "Failed to fetch vehicles")
        }

        setVehicles(data.vehicles || [])
      } catch (err) {
        console.error("Error fetching vehicles:", err)
        setError(err?.message || "Failed to load vehicles")

        toast({
          title: "Error",
          description: "Failed to load vehicles. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchVehicles()
  }, [toast])

  // Filter vehicles based on search query
  const filteredVehicles = vehicles.filter((vehicle) => {
    if (!searchQuery) return true

    const query = searchQuery.toLowerCase()
    return (
      vehicle.make.toLowerCase().includes(query) ||
      vehicle.model.toLowerCase().includes(query) ||
      vehicle.vin.toLowerCase().includes(query) ||
      vehicle.status.toLowerCase().includes(query)
    )
  })

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800"
      case "sold":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "maintenance":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold text-gray-900">Vehicle Inventory</h1>
            <p className="mt-2 text-sm text-gray-700">Loading vehicles...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold text-gray-900">Vehicle Inventory</h1>
            <p className="mt-2 text-sm text-gray-700">A list of all vehicles in inventory.</p>
          </div>
        </div>
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <p className="text-red-500">{error}</p>
          <Button onClick={() => window.location.reload()} className="mt-4 flex items-center">
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Vehicle Inventory</h1>
          <p className="mt-2 text-sm text-gray-700">A list of all vehicles in inventory with their details.</p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Button asChild className="flex items-center">
            <Link href="/admin/vehicles/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Vehicle
            </Link>
          </Button>
        </div>
      </div>

      <div className="mt-8 flex flex-col">
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search vehicles by make, model, VIN, or status..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Make & Model</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>VIN</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Added</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVehicles.length > 0 ? (
                filteredVehicles.map((vehicle) => (
                  <TableRow key={vehicle.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <Car className="h-4 w-4 text-gray-400 mr-2" />
                        {vehicle.make} {vehicle.model}
                      </div>
                    </TableCell>
                    <TableCell>{vehicle.year}</TableCell>
                    <TableCell>{formatCurrency(vehicle.price)}</TableCell>
                    <TableCell className="font-mono text-xs">{vehicle.vin}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(vehicle.status)} variant="outline">
                        {vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(vehicle.created_at)}</TableCell>
                    <TableCell className="text-right">
                      <Link href={`/admin/vehicles/${vehicle.id}`} className="text-primary hover:text-primary/80">
                        View
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No vehicles found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
