// This file is now a placeholder that redirects to Supabase
// It's kept for backward compatibility with any code that might still reference it

import { supabaseAdmin } from "./supabase"

export async function saveApplication(data) {
  console.warn("memory-db.saveApplication is deprecated. Use Supabase directly.")

  const { data: result, error } = await supabaseAdmin
    .from("applications")
    .insert([
      {
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        ssn: data.ssn,
        phone: data.phone,
        address: data.address,
        city: data.city,
        state: data.state,
        zip: data.zip,
        id_front_path: data.idFrontPath,
        id_back_path: data.idBackPath,
      },
    ])
    .select()

  if (error) {
    console.error("Error saving application to Supabase:", error)
    throw error
  }

  return result[0].id
}

export async function getAllApplications() {
  console.warn("memory-db.getAllApplications is deprecated. Use Supabase directly.")

  const { data, error } = await supabaseAdmin
    .from("applications")
    .select("id, first_name, last_name, email, phone, city, state, created_at")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching applications from Supabase:", error)
    throw error
  }

  return data.map((app) => ({
    id: app.id,
    firstName: app.first_name,
    lastName: app.last_name,
    email: app.email,
    phone: app.phone,
    city: app.city,
    state: app.state,
    createdAt: app.created_at,
  }))
}

export async function getApplicationById(id) {
  console.warn("memory-db.getApplicationById is deprecated. Use Supabase directly.")

  const { data, error } = await supabaseAdmin.from("applications").select("*").eq("id", id).single()

  if (error) {
    console.error("Error fetching application from Supabase:", error)
    return null
  }

  return {
    id: data.id,
    firstName: data.first_name,
    lastName: data.last_name,
    email: data.email,
    ssn: data.ssn,
    phone: data.phone,
    address: data.address,
    city: data.city,
    state: data.state,
    zip: data.zip,
    idFrontPath: data.id_front_path,
    idBackPath: data.id_back_path,
    createdAt: data.created_at,
  }
}
