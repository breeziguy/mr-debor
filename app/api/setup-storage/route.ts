import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

export async function POST() {
  try {
    // Define the storage buckets we need
    const buckets = [
      { name: "id_documents", isPublic: false },
      { name: "vehicle_images", isPublic: true },
      { name: "customer_documents", isPublic: false },
      { name: "sale_documents", isPublic: false },
    ]

    const results = []

    // Create each bucket if it doesn't exist
    for (const bucket of buckets) {
      // Check if bucket exists
      const { data: existingBuckets } = await supabaseAdmin.storage.listBuckets()
      const bucketExists = existingBuckets?.some((b) => b.name === bucket.name)

      if (!bucketExists) {
        // Create the bucket
        const { data, error } = await supabaseAdmin.storage.createBucket(bucket.name, {
          public: bucket.isPublic,
          fileSizeLimit: 10485760, // 10MB
        })

        if (error) {
          results.push({
            bucket: bucket.name,
            success: false,
            error: error.message,
          })
        } else {
          results.push({
            bucket: bucket.name,
            success: true,
          })

          // Set up public policy for vehicle_images bucket
          if (bucket.name === "vehicle_images" && bucket.isPublic) {
            const { error: policyError } = await supabaseAdmin.storage.from(bucket.name).createSignedUrl("dummy.txt", 1)

            if (policyError && !policyError.message.includes("not found")) {
              results.push({
                bucket: `${bucket.name} policy`,
                success: false,
                error: policyError.message,
              })
            }
          }
        }
      } else {
        results.push({
          bucket: bucket.name,
          success: true,
          message: "Bucket already exists",
        })
      }
    }

    return NextResponse.json({
      success: true,
      message: "Storage buckets setup completed",
      results,
    })
  } catch (error) {
    console.error("Error setting up storage:", error)
    return NextResponse.json(
      {
        success: false,
        error: `Failed to set up storage: ${error.message || "Unknown error"}`,
      },
      { status: 500 },
    )
  }
}
