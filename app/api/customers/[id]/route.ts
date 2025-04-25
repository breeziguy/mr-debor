import { NextResponse } from "next/server"
import { getCustomerById, updateCustomer, deleteCustomer } from "@/lib/db-utils"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // Fetch customer
    const { data, error } = await getCustomerById(id)

    if (error) {
      return NextResponse.json(
        {
          success: false,
          error,
        },
        { status: 500 },
      )
    }

    if (!data) {
      return NextResponse.json(
        {
          success: false,
          error: "Customer not found",
        },
        { status: 404 },
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
        error: `Failed to fetch customer: ${error.message || "Unknown error"}`,
      },
      { status: 500 },
    )
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const body = await request.json()

    // Update customer
    const { data, error } = await updateCustomer(id, body)

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
        error: `Failed to update customer: ${error.message || "Unknown error"}`,
      },
      { status: 500 },
    )
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // Delete customer
    const { success, error } = await deleteCustomer(id)

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
      message: "Customer deleted successfully",
    })
  } catch (error) {
    console.error("Error processing request:", error)
    return NextResponse.json(
      {
        success: false,
        error: `Failed to delete customer: ${error.message || "Unknown error"}`,
      },
      { status: 500 },
    )
  }
}
