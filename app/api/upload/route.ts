import { NextResponse } from "next/server"
import { uploadFile, deleteFile } from "@/lib/storage-utils"
import type { BucketName } from "@/lib/storage-utils"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()

    // Get file and parameters
    const file = formData.get("file") as File
    const bucketName = formData.get("bucketName") as BucketName
    const prefix = (formData.get("prefix") as string) || ""

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          error: "No file provided",
        },
        { status: 400 },
      )
    }

    if (!bucketName) {
      return NextResponse.json(
        {
          success: false,
          error: "No bucket name provided",
        },
        { status: 400 },
      )
    }

    // Upload file
    const { path, error } = await uploadFile(bucketName, file, prefix)

    if (error) {
      return NextResponse.json(
        {
          success: false,
          error,
        },
        { status: 500 },
      )
    }

    return NextResponse.json({
      success: true,
      path,
    })
  } catch (error) {
    console.error("Error uploading file:", error)
    return NextResponse.json(
      {
        success: false,
        error: `Failed to upload file: ${error.message || "Unknown error"}`,
      },
      { status: 500 },
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const path = searchParams.get("path")
    const bucket = searchParams.get("bucket") as BucketName

    if (!path) {
      return NextResponse.json(
        {
          success: false,
          error: "No file path provided",
        },
        { status: 400 },
      )
    }

    if (!bucket) {
      return NextResponse.json(
        {
          success: false,
          error: "No bucket name provided",
        },
        { status: 400 },
      )
    }

    // Delete file
    const { success, error } = await deleteFile(bucket, path)

    if (error) {
      return NextResponse.json(
        {
          success: false,
          error,
        },
        { status: 500 },
      )
    }

    return NextResponse.json({
      success: true,
      message: "File deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting file:", error)
    return NextResponse.json(
      {
        success: false,
        error: `Failed to delete file: ${error.message || "Unknown error"}`,
      },
      { status: 500 },
    )
  }
}
