import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

export async function POST() {
  try {
    // Sample vehicles data
    const vehicles = [
      {
        make: "Porsche",
        model: "911 GT2 RS",
        year: 2022,
        price: 120000,
        mileage: 5000,
        vin: "WP0AD2A72JK123456",
        color: "Yellow",
        fuel_type: "Petrol",
        transmission: "Automatic",
        body_type: "Coupe",
        description: "Stunning Porsche 911 GT2 RS with low mileage. This vehicle is in excellent condition.",
        features: ["Leather Seats", "Navigation System", "Bluetooth", "Heated Seats", "Premium Sound"],
        status: "available",
        image_urls: ["porsche_911_gt2_rs_1.jpg", "porsche_911_gt2_rs_2.jpg"],
      },
      {
        make: "Mercedes-Benz",
        model: "AMG GT",
        year: 2023,
        price: 95000,
        mileage: 2000,
        vin: "WDDYJ7JA3KA123457",
        color: "Silver",
        fuel_type: "Petrol",
        transmission: "Automatic",
        body_type: "Coupe",
        description: "Beautiful Mercedes-AMG GT with premium features and excellent performance.",
        features: ["Leather Seats", "Navigation System", "Bluetooth", "Heated Seats", "Premium Sound"],
        status: "available",
        image_urls: ["mercedes_amg_gt_1.jpg", "mercedes_amg_gt_2.jpg"],
      },
      {
        make: "Lamborghini",
        model: "Aventador",
        year: 2022,
        price: 150000,
        mileage: 3000,
        vin: "ZHWES4ZF8LLA12345",
        color: "Orange",
        fuel_type: "Petrol",
        transmission: "Manual",
        body_type: "Coupe",
        description: "Iconic Lamborghini Aventador with striking design and incredible performance.",
        features: ["Leather Seats", "Navigation System", "Bluetooth", "Carbon Fiber Interior", "Premium Sound"],
        status: "available",
        image_urls: ["lamborghini_aventador_1.jpg", "lamborghini_aventador_2.jpg"],
      },
    ]

    // Sample customers data
    const customers = [
      {
        first_name: "John",
        last_name: "Doe",
        email: "john.doe@example.com",
        phone: "555-123-4567",
        address: "123 Main St",
        city: "New York",
        state: "NY",
        zip: "10001",
        notes: "Interested in sports cars",
      },
      {
        first_name: "Jane",
        last_name: "Smith",
        email: "jane.smith@example.com",
        phone: "555-987-6543",
        address: "456 Park Ave",
        city: "Los Angeles",
        state: "CA",
        zip: "90001",
        notes: "Looking for a luxury sedan",
      },
      {
        first_name: "Robert",
        last_name: "Johnson",
        email: "robert.johnson@example.com",
        phone: "555-456-7890",
        address: "789 Oak St",
        city: "Chicago",
        state: "IL",
        zip: "60601",
        notes: "Repeat customer, previously purchased a BMW",
      },
    ]

    // Insert vehicles
    const { data: vehiclesData, error: vehiclesError } = await supabaseAdmin
      .from("vehicles")
      .upsert(
        vehicles.map((vehicle) => ({
          ...vehicle,
          features: JSON.stringify(vehicle.features),
        })),
      )
      .select()

    if (vehiclesError) {
      throw new Error(`Failed to insert vehicles: ${vehiclesError.message}`)
    }

    // Insert customers
    const { data: customersData, error: customersError } = await supabaseAdmin
      .from("customers")
      .upsert(customers)
      .select()

    if (customersError) {
      throw new Error(`Failed to insert customers: ${customersError.message}`)
    }

    // Create a sample sale
    if (vehiclesData && vehiclesData.length > 0 && customersData && customersData.length > 0) {
      const sampleSale = {
        vehicle_id: vehiclesData[0].id,
        customer_id: customersData[0].id,
        sale_price: vehiclesData[0].price * 0.95, // 5% discount
        sale_date: new Date().toISOString(),
        payment_method: "finance",
        salesperson: "David Mosloski",
        notes: "Customer was very satisfied with the purchase",
      }

      const { error: saleError } = await supabaseAdmin.from("sales").upsert([sampleSale])

      if (saleError) {
        throw new Error(`Failed to insert sale: ${saleError.message}`)
      }

      // Update vehicle status to sold
      const { error: updateError } = await supabaseAdmin
        .from("vehicles")
        .update({ status: "sold" })
        .eq("id", vehiclesData[0].id)

      if (updateError) {
        throw new Error(`Failed to update vehicle status: ${updateError.message}`)
      }
    }

    // Create sample service appointments
    if (customersData && customersData.length > 0) {
      const serviceAppointments = [
        {
          customer_id: customersData[1].id,
          vehicle_info: "2021 BMW X5",
          appointment_date: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
          service_type: "Oil Change",
          status: "scheduled",
          notes: "Customer requested synthetic oil",
        },
        {
          customer_id: customersData[2].id,
          vehicle_info: "2020 Audi A4",
          appointment_date: new Date(Date.now() + 172800000).toISOString(), // Day after tomorrow
          service_type: "Brake Inspection",
          status: "scheduled",
          notes: "Customer reported squeaking noise when braking",
        },
      ]

      const { error: appointmentsError } = await supabaseAdmin.from("service_appointments").upsert(serviceAppointments)

      if (appointmentsError) {
        throw new Error(`Failed to insert service appointments: ${appointmentsError.message}`)
      }
    }

    return NextResponse.json({
      success: true,
      message: "Sample data seeded successfully",
      vehiclesCount: vehiclesData?.length || 0,
      customersCount: customersData?.length || 0,
    })
  } catch (error) {
    console.error("Error seeding data:", error)
    return NextResponse.json(
      {
        success: false,
        error: `Failed to seed data: ${error.message || "Unknown error"}`,
      },
      { status: 500 },
    )
  }
}
