import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

export async function POST() {
  try {
    // Create vehicles table
    const { error: vehiclesError } = await supabaseAdmin.rpc("exec", {
      query: `
        CREATE TABLE IF NOT EXISTS vehicles (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          make TEXT NOT NULL,
          model TEXT NOT NULL,
          year INTEGER NOT NULL,
          price NUMERIC NOT NULL,
          mileage INTEGER NOT NULL,
          vin TEXT NOT NULL UNIQUE,
          color TEXT NOT NULL,
          fuel_type TEXT NOT NULL,
          transmission TEXT NOT NULL,
          body_type TEXT NOT NULL,
          description TEXT,
          features JSONB,
          status TEXT NOT NULL DEFAULT 'available',
          image_urls TEXT[],
          created_at TIMESTAMPTZ DEFAULT NOW(),
          updated_at TIMESTAMPTZ DEFAULT NOW()
        );
      `,
    })

    if (vehiclesError) {
      throw new Error(`Failed to create vehicles table: ${vehiclesError.message}`)
    }

    // Create customers table
    const { error: customersError } = await supabaseAdmin.rpc("exec", {
      query: `
        CREATE TABLE IF NOT EXISTS customers (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          first_name TEXT NOT NULL,
          last_name TEXT NOT NULL,
          email TEXT NOT NULL UNIQUE,
          phone TEXT,
          address TEXT,
          city TEXT,
          state TEXT,
          zip TEXT,
          notes TEXT,
          created_at TIMESTAMPTZ DEFAULT NOW(),
          updated_at TIMESTAMPTZ DEFAULT NOW()
        );
      `,
    })

    if (customersError) {
      throw new Error(`Failed to create customers table: ${customersError.message}`)
    }

    // Create sales table
    const { error: salesError } = await supabaseAdmin.rpc("exec", {
      query: `
        CREATE TABLE IF NOT EXISTS sales (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          vehicle_id UUID NOT NULL REFERENCES vehicles(id),
          customer_id UUID NOT NULL REFERENCES customers(id),
          sale_price NUMERIC NOT NULL,
          sale_date TIMESTAMPTZ NOT NULL,
          payment_method TEXT NOT NULL,
          salesperson TEXT NOT NULL,
          notes TEXT,
          created_at TIMESTAMPTZ DEFAULT NOW(),
          updated_at TIMESTAMPTZ DEFAULT NOW()
        );
      `,
    })

    if (salesError) {
      throw new Error(`Failed to create sales table: ${salesError.message}`)
    }

    // Create service_appointments table
    const { error: appointmentsError } = await supabaseAdmin.rpc("exec", {
      query: `
        CREATE TABLE IF NOT EXISTS service_appointments (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          customer_id UUID NOT NULL REFERENCES customers(id),
          vehicle_id UUID REFERENCES vehicles(id),
          vehicle_info TEXT,
          appointment_date TIMESTAMPTZ NOT NULL,
          service_type TEXT NOT NULL,
          status TEXT NOT NULL DEFAULT 'scheduled',
          notes TEXT,
          created_at TIMESTAMPTZ DEFAULT NOW(),
          updated_at TIMESTAMPTZ DEFAULT NOW()
        );
      `,
    })

    if (appointmentsError) {
      throw new Error(`Failed to create service_appointments table: ${appointmentsError.message}`)
    }

    // Create storage buckets
    const buckets = ["vehicle_images", "customer_documents", "sale_documents"]

    for (const bucket of buckets) {
      const { data: existingBuckets } = await supabaseAdmin.storage.listBuckets()
      const bucketExists = existingBuckets?.some((b) => b.name === bucket)

      if (!bucketExists) {
        const { error: bucketError } = await supabaseAdmin.storage.createBucket(bucket, {
          public: bucket === "vehicle_images",
          fileSizeLimit: 10485760, // 10MB
        })

        if (bucketError) {
          throw new Error(`Failed to create ${bucket} bucket: ${bucketError.message}`)
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: "Database setup completed successfully",
    })
  } catch (error) {
    console.error("Error setting up database:", error)
    return NextResponse.json(
      {
        success: false,
        error: `Failed to set up database: ${error.message || "Unknown error"}`,
      },
      { status: 500 },
    )
  }
}
