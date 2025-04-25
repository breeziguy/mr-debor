import { supabaseAdmin } from "./supabase"

// Define bucket types
export type BucketName = "id_documents" | "vehicle_images" | "customer_documents" | "sale_documents"

/**
 * Upload a file to Supabase storage
 */
export async function uploadFile(bucketName: BucketName, file: File, prefix = "") {
  try {
    if (!file || file.size === 0) {
      return { path: null, error: "No file provided" }
    }

    // Check if bucket exists, if not create it
    try {
      await ensureBucketExists(bucketName)
    } catch (bucketError) {
      console.error(`Bucket error for ${bucketName}:`, bucketError)
      // Continue anyway, the bucket might exist despite the error
    }

    const fileBuffer = await file.arrayBuffer()
    const fileName = `${prefix}${Date.now()}_${file.name.replace(/\s+/g, "_")}`

    const { data, error } = await supabaseAdmin.storage.from(bucketName).upload(fileName, fileBuffer, {
      contentType: file.type,
      cacheControl: "3600",
    })

    if (error) {
      console.error(`Error uploading file to ${bucketName}:`, error)
      return { path: null, error: error.message }
    }

    return { path: data?.path || null, error: null }
  } catch (error) {
    console.error("File upload error:", error)
    return { path: null, error: error.message }
  }
}

/**
 * Upload multiple files to Supabase storage
 */
export async function uploadMultipleFiles(bucketName: BucketName, files: File[], prefix = "") {
  try {
    if (!files || files.length === 0) {
      return { paths: [], error: "No files provided" }
    }

    // Check if bucket exists, if not create it
    try {
      await ensureBucketExists(bucketName)
    } catch (bucketError) {
      console.error(`Bucket error for ${bucketName}:`, bucketError)
      // Continue anyway, the bucket might exist despite the error
    }

    const uploadPromises = files.map(async (file) => {
      const { path, error } = await uploadFile(bucketName, file, prefix)
      return { path, error }
    })

    const results = await Promise.all(uploadPromises)

    // Check if any uploads failed
    const errors = results.filter((result) => result.error).map((result) => result.error)
    if (errors.length > 0) {
      return {
        paths: results.map((result) => result.path).filter(Boolean),
        error: `Some files failed to upload: ${errors.join(", ")}`,
      }
    }

    return { paths: results.map((result) => result.path).filter(Boolean) as string[], error: null }
  } catch (error) {
    console.error("Multiple file upload error:", error)
    return { paths: [], error: error.message }
  }
}

/**
 * Get a signed URL for a file in Supabase storage
 */
export async function getFileUrl(bucketName: BucketName, filePath: string, expiresIn = 3600) {
  try {
    if (!filePath) {
      return { url: null, error: "No file path provided" }
    }

    const { data, error } = await supabaseAdmin.storage.from(bucketName).createSignedUrl(filePath, expiresIn)

    if (error) {
      console.error(`Error getting signed URL for ${filePath}:`, error)
      return { url: null, error: error.message }
    }

    return { url: data?.signedUrl || null, error: null }
  } catch (error) {
    console.error("Error getting file URL:", error)
    return { url: null, error: error.message }
  }
}

/**
 * Get public URL for a file in Supabase storage (for public buckets only)
 */
export function getPublicFileUrl(bucketName: BucketName, filePath: string) {
  try {
    if (!filePath) {
      return { url: null, error: "No file path provided" }
    }

    const { data } = supabaseAdmin.storage.from(bucketName).getPublicUrl(filePath)

    return { url: data?.publicUrl || null, error: null }
  } catch (error) {
    console.error("Error getting public file URL:", error)
    return { url: null, error: error.message }
  }
}

/**
 * Delete a file from Supabase storage
 */
export async function deleteFile(bucketName: BucketName, filePath: string) {
  try {
    if (!filePath) {
      return { success: false, error: "No file path provided" }
    }

    const { error } = await supabaseAdmin.storage.from(bucketName).remove([filePath])

    if (error) {
      console.error(`Error deleting file ${filePath}:`, error)
      return { success: false, error: error.message }
    }

    return { success: true, error: null }
  } catch (error) {
    console.error("Error deleting file:", error)
    return { success: false, error: error.message }
  }
}

/**
 * Delete multiple files from Supabase storage
 */
export async function deleteMultipleFiles(bucketName: BucketName, filePaths: string[]) {
  try {
    if (!filePaths || filePaths.length === 0) {
      return { success: false, error: "No file paths provided" }
    }

    const { error } = await supabaseAdmin.storage.from(bucketName).remove(filePaths)

    if (error) {
      console.error(`Error deleting files:`, error)
      return { success: false, error: error.message }
    }

    return { success: true, error: null }
  } catch (error) {
    console.error("Error deleting files:", error)
    return { success: false, error: error.message }
  }
}

/**
 * Download a file from Supabase storage
 */
export async function downloadFile(bucketName: BucketName, filePath: string) {
  try {
    if (!filePath) {
      return { data: null, error: "No file path provided" }
    }

    const { data, error } = await supabaseAdmin.storage.from(bucketName).download(filePath)

    if (error) {
      console.error(`Error downloading file ${filePath}:`, error)
      return { data: null, error: error.message }
    }

    return { data, error: null }
  } catch (error) {
    console.error("Error downloading file:", error)
    return { data: null, error: error.message }
  }
}

/**
 * List all files in a bucket or folder
 */
export async function listFiles(bucketName: BucketName, folderPath?: string) {
  try {
    const { data, error } = await supabaseAdmin.storage.from(bucketName).list(folderPath || "")

    if (error) {
      console.error(`Error listing files in ${bucketName}/${folderPath || ""}:`, error)
      return { files: null, error: error.message }
    }

    return { files: data, error: null }
  } catch (error) {
    console.error("Error listing files:", error)
    return { files: null, error: error.message }
  }
}

/**
 * Check if a bucket exists
 */
async function bucketExists(bucketName: string): Promise<boolean> {
  try {
    const { data: buckets, error } = await supabaseAdmin.storage.listBuckets()

    if (error) {
      console.error("Error checking if bucket exists:", error)
      return false
    }

    return buckets?.some((bucket) => bucket.name === bucketName) || false
  } catch (error) {
    console.error("Error checking if bucket exists:", error)
    return false
  }
}

/**
 * Ensure a bucket exists, create it if it doesn't
 */
async function ensureBucketExists(bucketName: BucketName) {
  try {
    // Check if the bucket exists
    const bucketAlreadyExists = await bucketExists(bucketName)

    if (!bucketAlreadyExists) {
      console.log(`Creating ${bucketName} bucket`)
      const { error: createBucketError } = await supabaseAdmin.storage.createBucket(bucketName, {
        public: bucketName === "vehicle_images", // Only vehicle images are public
        fileSizeLimit: 10485760, // 10MB
      })

      if (createBucketError) {
        // If the error is that the bucket already exists, we can ignore it
        if (createBucketError.message.includes("already exists")) {
          console.log(`Bucket ${bucketName} already exists, continuing...`)
          return true
        }

        console.error("Error creating bucket:", createBucketError)
        throw new Error(`Failed to create storage bucket: ${createBucketError.message}`)
      }
    } else {
      console.log(`Bucket ${bucketName} already exists, continuing...`)
    }

    return true
  } catch (error) {
    // If this is a "resource already exists" error, we can safely ignore it
    if (error instanceof Error && error.message.includes("already exists")) {
      console.log(`Bucket ${bucketName} already exists, continuing...`)
      return true
    }

    console.error("Error ensuring bucket exists:", error)
    throw error
  }
}

/**
 * Set up appropriate policies for a bucket
 */
async function setupBucketPolicies(bucketName: BucketName) {
  // This would typically be done via SQL, but we're simulating it here
  console.log(`Setting up policies for ${bucketName} bucket`)

  // In a real implementation, you would execute SQL to create policies
  // For now, we'll just log what would happen
  if (bucketName === "vehicle_images") {
    console.log("Setting public read access for vehicle_images")
  } else {
    console.log("Setting private access policies")
  }
}
