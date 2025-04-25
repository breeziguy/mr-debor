import { NextResponse } from "next/server"
import { getCustomers, createCustomer } from "@/lib/db-utils"

export async function GET() {
  try {
    // Fetch customers
    const { data, error } = await getCustomers()

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
      customers: data,
    })
  } catch (error) {
    console.error("Error processing request:", error)
    return NextResponse.json(
      {
        success: false,
        error: `Failed to fetch customers: ${error.message || "Unknown error"}`,
      },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json()

    // Create customer
    const { data, error } = await createCustomer(body)

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
      customer: data,
    })
  } catch (error) {
    console.error("Error processing request:", error)
    return NextResponse.json(
      {
        success: false,
        error: `Failed to create customer: ${error.message || "Unknown error"}`,
      },
      { status: 500 },
    )
  }
}
