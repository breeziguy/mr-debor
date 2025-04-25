"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { formatDate } from "@/lib/utils"
import { FileText, User, Mail, Phone, MapPin, Download, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/auth-context"
import { useToast } from "@/components/ui/use-toast"

export default function ApplicationsPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [exportLoading, setExportLoading] = useState(false)

  // Fetch applications
  useEffect(() => {
    async function fetchApplications() {
      try {
        const response = await fetch("/api/applications")

        if (!response.ok) {
          throw new Error(`Failed to fetch applications: ${response.statusText}`)
        }

        const data = await response.json()

        if (!data.success) {
          throw new Error(data.error || "Failed to fetch applications")
        }

        setApplications(data.applications || [])
      } catch (err: any) {
        console.error("Error fetching applications:", err)
        setError(err?.message || "Failed to load applications")

        toast({
          title: "Error",
          description: "Failed to load applications. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchApplications()
  }, [toast])

  // Handle CSV export
  const handleExportCSV = async () => {
    if (applications.length === 0) return

    setExportLoading(true)
    try {
      // Create CSV content
      const headers = [
        "ID",
        "First Name",
        "Last Name",
        "Email",
        "Phone",
        "SSN",
        "Address",
        "City",
        "State",
        "ZIP",
        "Submitted Date",
      ]

      const csvRows = [
        headers.join(","),
        ...applications.map((app: any) =>
          [
            app.id,
            `"${app.first_name}"`,
            `"${app.last_name}"`,
            `"${app.email}"`,
            `"${app.phone}"`,
            `"${app.ssn || ""}"`,
            `"${app.address || ""}"`,
            `"${app.city || ""}"`,
            `"${app.state || ""}"`,
            `"${app.zip || ""}"`,
            `"${new Date(app.created_at).toLocaleString()}"`,
          ].join(","),
        ),
      ]

      const csvContent = csvRows.join("\n")

      // Create and download the CSV file
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.setAttribute("href", url)
      link.setAttribute("download", `job-applications-${new Date().toISOString().split("T")[0]}.csv`)
      link.style.visibility = "hidden"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (err: any) {
      console.error("Error exporting CSV:", err)
      toast({
        title: "Error",
        description: "Failed to export applications",
        variant: "destructive",
      })
    } finally {
      setExportLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold text-gray-900">Job Applications</h1>
            <p className="mt-2 text-sm text-gray-700">Loading applications...</p>
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
            <h1 className="text-2xl font-semibold text-gray-900">Job Applications</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all job applications submitted through the careers page.
            </p>
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
          <h1 className="text-2xl font-semibold text-gray-900">Job Applications</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all job applications submitted through the careers page.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Button
            onClick={handleExportCSV}
            disabled={exportLoading || applications.length === 0}
            className="flex items-center"
          >
            <Download className="mr-2 h-4 w-4" />
            {exportLoading ? "Exporting..." : "Export CSV"}
          </Button>
        </div>
      </div>

      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Email
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Phone
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Location
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Documents
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Date
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">View</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {applications.length > 0 ? (
                    applications.map((application: any) => (
                      <tr key={application.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          <div className="flex items-center">
                            <User className="h-4 w-4 text-gray-400 mr-2" />
                            {application.first_name} {application.last_name}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 text-gray-400 mr-2" />
                            {application.email}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 text-gray-400 mr-2" />
                            {application.phone}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                            {application.city}, {application.state}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 text-gray-400 mr-2" />
                            {application.id_front_path && application.id_back_path ? (
                              <span className="text-green-600 font-medium">Complete</span>
                            ) : application.id_front_path || application.id_back_path ? (
                              <span className="text-yellow-600 font-medium">Partial</span>
                            ) : (
                              <span className="text-red-600 font-medium">Missing</span>
                            )}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {formatDate(application.created_at)}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <Link
                            href={`/admin/applications/${application.id}`}
                            className="text-primary hover:text-primary/80"
                          >
                            View
                            <span className="sr-only">
                              , {application.first_name} {application.last_name}
                            </span>
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="py-4 px-3 text-sm text-gray-500 text-center">
                        No applications found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
