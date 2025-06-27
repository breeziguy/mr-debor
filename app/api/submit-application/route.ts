import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"
import { uploadFile } from "@/lib/storage-utils"

export async function POST(request: Request) {
  try {
    // Get form data from the request
    const formData = await request.formData()

    // Extract form fields
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const email = formData.get("email") as string
    const ssn = formData.get("ssn") as string
    const phone = formData.get("phone") as string
    const referenceNumber = formData.get("referenceNumber") as string
    const address = formData.get("address") as string
    const city = formData.get("city") as string
    const state = formData.get("state") as string
    const zip = formData.get("zip") as string

    // Handle file uploads
    let idFrontPath = null
    let idBackPath = null

    try {
      // Upload ID front image
      const idFront = formData.get("idFront") as File
      if (idFront && idFront.size > 0) {
        const { path: frontPath, error: frontError } = await uploadFile("id_documents", idFront, "front_")

        if (frontError) {
          console.error("Error uploading ID front:", frontError)
          // Continue with the application submission even if file upload fails
          // Just log the error and proceed without the file
        } else {
          idFrontPath = frontPath
          console.log("ID front uploaded successfully:", idFrontPath)
        }
      }

      // Upload ID back image
      const idBack = formData.get("idBack") as File
      if (idBack && idBack.size > 0) {
        const { path: backPath, error: backError } = await uploadFile("id_documents", idBack, "back_")

        if (backError) {
          console.error("Error uploading ID back:", backError)
          // Continue with the application submission even if file upload fails
          // Just log the error and proceed without the file
        } else {
          idBackPath = backPath
          console.log("ID back uploaded successfully:", idBackPath)
        }
      }
    } catch (fileError) {
      console.error("Error handling file uploads:", fileError)
      // Continue with the application submission even if file upload fails
      // Just log the error and proceed without the files
    }

    // Prepare the application data
    const applicationData = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      ssn: ssn,
      phone: phone,
      reference_number: referenceNumber,
      address: address,
      city: city,
      state: state,
      zip: zip,
      id_front_path: idFrontPath,
      id_back_path: idBackPath,
    }

    // Save application to Supabase
    const { data, error } = await supabaseAdmin.from("applications").insert([applicationData]).select()

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json(
        {
          success: false,
          error: `Database error: ${error.message}`,
        },
        { status: 500 },
      )
    }

    return NextResponse.json({
      success: true,
      id: data?.[0]?.id,
      message: "Application saved successfully",
    })
  } catch (error) {
    console.error("Error processing application:", error)
    return NextResponse.json(
      {
        success: false,
        error: `Failed to process application: ${error.message || "Unknown error"}`,
      },
      { status: 500 },
    )
  }
}
