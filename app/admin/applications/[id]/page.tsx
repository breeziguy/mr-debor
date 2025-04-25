"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { formatDate } from "@/lib/utils"
import { ArrowLeft, Download, Trash2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
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

export default function ApplicationDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [application, setApplication] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [idFrontUrl, setIdFrontUrl] = useState<string | null>(null)
  const [idBackUrl, setIdBackUrl] = useState<string | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)

  // Fetch application data
  useState(() => {
    async function fetchApplication() {
      try {
        // Fetch application data
        const response = await fetch(`/api/applications/${params.id}`)

        if (!response.ok) {
          throw new Error(`Failed to fetch application: ${response.statusText}`)
        }

        const data = await response.json()
        setApplication(data.application)

        // Set document URLs if available
        if (data.idFrontUrl) setIdFrontUrl(data.idFrontUrl)
        if (data.idBackUrl) setIdBackUrl(data.idBackUrl)
      } catch (err) {
        console.error("Error fetching application:", err)
        setError("Failed to load application details")
      } finally {
        setLoading(false)
      }
    }

    fetchApplication()
  }, [params.id])

  // Handle application deletion
  const handleDelete = async () => {
    setDeleteLoading(true)
    try {
      const response = await fetch(`/api/applications/${params.id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error(`Failed to delete application: ${response.statusText}`)
      }

      // Redirect to applications list
      router.push("/admin/applications")
      router.refresh()
    } catch (err) {
      console.error("Error deleting application:", err)
      setError("Failed to delete application")
    } finally {
      setDeleteLoading(false)
      setDeleteDialogOpen(false)
    }
  }

  if (loading) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center mb-6">
            <Link href="/admin/applications" className="text-primary hover:text-primary/80 flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              <span>Back to applications</span>
            </Link>
          </div>
          <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6 text-center">
            <p className="text-gray-500">Loading application details...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !application) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center mb-6">
            <Link href="/admin/applications" className="text-primary hover:text-primary/80 flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              <span>Back to applications</span>
            </Link>
          </div>
          <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6 text-center">
            <div className="flex justify-center mb-4">
              <AlertCircle className="h-12 w-12 text-red-500" />
            </div>
            <h1 className="text-xl font-semibold text-gray-900 mb-4">Application Not Found</h1>
            <p className="text-gray-500">
              {error || "The application you're looking for doesn't exist or has been removed."}
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Link href="/admin/applications" className="text-primary hover:text-primary/80 flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span>Back to applications</span>
          </Link>
          <div className="flex items-center space-x-2">
            <Button
              variant="destructive"
              size="sm"
              className="flex items-center"
              onClick={() => setDeleteDialogOpen(true)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Application
            </Button>
          </div>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Application Details</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Personal and contact information for {application.first_name} {application.last_name}.
            </p>
            <p className="mt-1 text-sm text-gray-500">Submitted on {formatDate(application.created_at)}</p>
          </div>

          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Full name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {application.first_name} {application.last_name}
                </dd>
              </div>

              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Email address</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{application.email}</dd>
              </div>

              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Phone number</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{application.phone}</dd>
              </div>

              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">SSN/Tax ID</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{application.ssn}</dd>
              </div>

              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Address</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {application.address}
                  <br />
                  {application.city}, {application.state} {application.zip}
                </dd>
              </div>

              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Identification Documents</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {!idFrontUrl && !idBackUrl ? (
                    <p>No identification documents uploaded</p>
                  ) : (
                    <div className="space-y-4">
                      {idFrontUrl && (
                        <div className="flex flex-col space-y-2">
                          <p className="font-medium">ID Front:</p>
                          <div className="flex flex-col space-y-2">
                            <div className="border rounded-md overflow-hidden max-w-md">
                              <img
                                src={idFrontUrl || "/placeholder.svg"}
                                alt="ID Front"
                                className="w-full h-auto object-contain"
                              />
                            </div>
                            <div>
                              <Button asChild variant="outline" size="sm" className="flex items-center">
                                <a href={idFrontUrl} download target="_blank" rel="noopener noreferrer">
                                  <Download className="mr-2 h-4 w-4" />
                                  Download ID Front
                                </a>
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}

                      {idBackUrl && (
                        <div className="flex flex-col space-y-2">
                          <p className="font-medium">ID Back:</p>
                          <div className="flex flex-col space-y-2">
                            <div className="border rounded-md overflow-hidden max-w-md">
                              <img
                                src={idBackUrl || "/placeholder.svg"}
                                alt="ID Back"
                                className="w-full h-auto object-contain"
                              />
                            </div>
                            <div>
                              <Button asChild variant="outline" size="sm" className="flex items-center">
                                <a href={idBackUrl} download target="_blank" rel="noopener noreferrer">
                                  <Download className="mr-2 h-4 w-4" />
                                  Download ID Back
                                </a>
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the application and all associated documents.
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
