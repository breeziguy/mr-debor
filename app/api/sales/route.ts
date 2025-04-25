import { NextResponse } from "next/server"
import { getSales, createSale } from "@/lib/db-utils"

export async function GET() {
  try {
    // Fetch sales
    const { data, error } = await getSales()

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
      sales: data,
    })
  } catch (error) {
    console.error("Error processing request:", error)
    return NextResponse.json(
      {
        success: false,
        error: `Failed to fetch sales: ${error.message || "Unknown error"}`,
      },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json()

    // Create sale
    const { data, error } = await createSale(body)

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
      sale: data,
    })
  } catch (error) {
    console.error("Error processing request:", error)
    return NextResponse.json(
      {
        success: false,
        error: `Failed to create sale: ${error.message || "Unknown error"}`,
      },
      { status: 500 },
    )
  }
}
