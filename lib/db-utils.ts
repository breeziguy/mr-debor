import { supabaseAdmin } from "./supabase"
import type { Application, Vehicle, Customer, Sale, ServiceAppointment } from "./db-schema"

// Generic error handler
const handleError = (error: any, operation: string) => {
  console.error(`Error ${operation}:`, error)
  return { data: null, error: `Failed to ${operation}: ${error.message || "Unknown error"}` }
}

// ==================== Applications ====================

export async function getApplications() {
  try {
    const { data, error } = await supabaseAdmin
      .from("applications")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    return handleError(error, "fetch applications")
  }
}

export async function getApplicationById(id: string) {
  try {
    const { data, error } = await supabaseAdmin.from("applications").select("*").eq("id", id).single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    return handleError(error, "fetch application")
  }
}

export async function createApplication(application: Omit<Application, "id" | "created_at" | "updated_at">) {
  try {
    const { data, error } = await supabaseAdmin.from("applications").insert([application]).select()

    if (error) throw error
    return { data: data[0], error: null }
  } catch (error) {
    return handleError(error, "create application")
  }
}

export async function updateApplication(id: string, updates: Partial<Application>) {
  try {
    const { data, error } = await supabaseAdmin
      .from("applications")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()

    if (error) throw error
    return { data: data[0], error: null }
  } catch (error) {
    return handleError(error, "update application")
  }
}

export async function deleteApplication(id: string) {
  try {
    const { error } = await supabaseAdmin.from("applications").delete().eq("id", id)

    if (error) throw error
    return { success: true, error: null }
  } catch (error) {
    return handleError(error, "delete application")
  }
}

// ==================== Vehicles ====================

export async function getVehicles(filters?: Partial<Vehicle>) {
  try {
    let query = supabaseAdmin.from("vehicles").select("*").order("created_at", { ascending: false })

    // Apply filters if provided
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          query = query.eq(key, value)
        }
      })
    }

    const { data, error } = await query

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    return handleError(error, "fetch vehicles")
  }
}

export async function getVehicleById(id: string) {
  try {
    const { data, error } = await supabaseAdmin.from("vehicles").select("*").eq("id", id).single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    return handleError(error, "fetch vehicle")
  }
}

export async function createVehicle(vehicle: Omit<Vehicle, "id" | "created_at" | "updated_at">) {
  try {
    const { data, error } = await supabaseAdmin.from("vehicles").insert([vehicle]).select()

    if (error) throw error
    return { data: data[0], error: null }
  } catch (error) {
    return handleError(error, "create vehicle")
  }
}

export async function updateVehicle(id: string, updates: Partial<Vehicle>) {
  try {
    const { data, error } = await supabaseAdmin
      .from("vehicles")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()

    if (error) throw error
    return { data: data[0], error: null }
  } catch (error) {
    return handleError(error, "update vehicle")
  }
}

export async function deleteVehicle(id: string) {
  try {
    const { error } = await supabaseAdmin.from("vehicles").delete().eq("id", id)

    if (error) throw error
    return { success: true, error: null }
  } catch (error) {
    return handleError(error, "delete vehicle")
  }
}

// ==================== Customers ====================

export async function getCustomers() {
  try {
    const { data, error } = await supabaseAdmin.from("customers").select("*").order("created_at", { ascending: false })

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    return handleError(error, "fetch customers")
  }
}

export async function getCustomerById(id: string) {
  try {
    const { data, error } = await supabaseAdmin.from("customers").select("*").eq("id", id).single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    return handleError(error, "fetch customer")
  }
}

export async function createCustomer(customer: Omit<Customer, "id" | "created_at" | "updated_at">) {
  try {
    const { data, error } = await supabaseAdmin.from("customers").insert([customer]).select()

    if (error) throw error
    return { data: data[0], error: null }
  } catch (error) {
    return handleError(error, "create customer")
  }
}

export async function updateCustomer(id: string, updates: Partial<Customer>) {
  try {
    const { data, error } = await supabaseAdmin
      .from("customers")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()

    if (error) throw error
    return { data: data[0], error: null }
  } catch (error) {
    return handleError(error, "update customer")
  }
}

export async function deleteCustomer(id: string) {
  try {
    const { error } = await supabaseAdmin.from("customers").delete().eq("id", id)

    if (error) throw error
    return { success: true, error: null }
  } catch (error) {
    return handleError(error, "delete customer")
  }
}

// ==================== Sales ====================

export async function getSales() {
  try {
    const { data, error } = await supabaseAdmin
      .from("sales")
      .select(`
        *,
        vehicles:vehicle_id(*),
        customers:customer_id(*)
      `)
      .order("created_at", { ascending: false })

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    return handleError(error, "fetch sales")
  }
}

export async function getSaleById(id: string) {
  try {
    const { data, error } = await supabaseAdmin
      .from("sales")
      .select(`
        *,
        vehicles:vehicle_id(*),
        customers:customer_id(*)
      `)
      .eq("id", id)
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    return handleError(error, "fetch sale")
  }
}

export async function createSale(sale: Omit<Sale, "id" | "created_at" | "updated_at">) {
  try {
    // Start a transaction
    const { data, error } = await supabaseAdmin.from("sales").insert([sale]).select()

    if (error) throw error

    // Update vehicle status to 'sold'
    await supabaseAdmin
      .from("vehicles")
      .update({ status: "sold", updated_at: new Date().toISOString() })
      .eq("id", sale.vehicle_id)

    return { data: data[0], error: null }
  } catch (error) {
    return handleError(error, "create sale")
  }
}

export async function updateSale(id: string, updates: Partial<Sale>) {
  try {
    const { data, error } = await supabaseAdmin
      .from("sales")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()

    if (error) throw error
    return { data: data[0], error: null }
  } catch (error) {
    return handleError(error, "update sale")
  }
}

export async function deleteSale(id: string) {
  try {
    // Get the sale to find the vehicle_id
    const { data: sale } = await supabaseAdmin.from("sales").select("vehicle_id").eq("id", id).single()

    if (!sale) throw new Error("Sale not found")

    // Delete the sale
    const { error } = await supabaseAdmin.from("sales").delete().eq("id", id)

    if (error) throw error

    // Update vehicle status back to 'available'
    await supabaseAdmin
      .from("vehicles")
      .update({ status: "available", updated_at: new Date().toISOString() })
      .eq("id", sale.vehicle_id)

    return { success: true, error: null }
  } catch (error) {
    return handleError(error, "delete sale")
  }
}

// ==================== Service Appointments ====================

export async function getServiceAppointments(filters?: { status?: string }) {
  try {
    let query = supabaseAdmin
      .from("service_appointments")
      .select(`
        *,
        customers:customer_id(*),
        vehicles:vehicle_id(*)
      `)
      .order("appointment_date", { ascending: true })

    if (filters?.status) {
      query = query.eq("status", filters.status)
    }

    const { data, error } = await query

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    return handleError(error, "fetch service appointments")
  }
}

export async function getServiceAppointmentById(id: string) {
  try {
    const { data, error } = await supabaseAdmin
      .from("service_appointments")
      .select(`
        *,
        customers:customer_id(*),
        vehicles:vehicle_id(*)
      `)
      .eq("id", id)
      .single()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    return handleError(error, "fetch service appointment")
  }
}

export async function createServiceAppointment(
  appointment: Omit<ServiceAppointment, "id" | "created_at" | "updated_at">,
) {
  try {
    const { data, error } = await supabaseAdmin.from("service_appointments").insert([appointment]).select()

    if (error) throw error
    return { data: data[0], error: null }
  } catch (error) {
    return handleError(error, "create service appointment")
  }
}

export async function updateServiceAppointment(id: string, updates: Partial<ServiceAppointment>) {
  try {
    const { data, error } = await supabaseAdmin
      .from("service_appointments")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()

    if (error) throw error
    return { data: data[0], error: null }
  } catch (error) {
    return handleError(error, "update service appointment")
  }
}

export async function deleteServiceAppointment(id: string) {
  try {
    const { error } = await supabaseAdmin.from("service_appointments").delete().eq("id", id)

    if (error) throw error
    return { success: true, error: null }
  } catch (error) {
    return handleError(error, "delete service appointment")
  }
}
