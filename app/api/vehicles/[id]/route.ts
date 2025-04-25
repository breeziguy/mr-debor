import { NextResponse } from "next/server"
import { getVehicleById, updateVehicle, deleteVehicle } from "@/lib/db-utils"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // Fetch vehicle
    const { data, error } = await getVehicleById(id)

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
          error: "Vehicle not found",
        },
        { status: 404 },
      )
    }

    return NextResponse.json({
      success: true,
      vehicle: data,
    })
  } catch (error) {
    console.error("Error processing request:", error)
    return NextResponse.json(
      {
        success: false,
        error: `Failed to fetch vehicle: ${error.message || "Unknown error"}`,
      },
      { status: 500 },
    )
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const body = await request.json()

    // Update vehicle
    const { data, error } = await updateVehicle(id, body)

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
      vehicle: data,
    })
  } catch (error) {
    console.error("Error processing request:", error)
    return NextResponse.json(
      {
        success: false,
        error: `Failed to update vehicle: ${error.message || "Unknown error"}`,
      },
      { status: 500 },
    )
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // Delete vehicle
    const { success, error } = await deleteVehicle(id)

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
      message: "Vehicle deleted successfully",
    })
  } catch (error) {
    console.error("Error processing request:", error)
    return NextResponse.json(
      {
        success: false,
        error: `Failed to delete vehicle: ${error.message || "Unknown error"}`,
      },
      { status: 500 },
    )
  }
}
