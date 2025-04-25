export interface Application {
  id: string
  first_name: string
  last_name: string
  email: string
  ssn?: string
  phone?: string
  address?: string
  city?: string
  state?: string
  zip?: string
  id_front_path?: string
  id_back_path?: string
  created_at: string
  updated_at?: string
}

export interface Vehicle {
  id: string
  make: string
  model: string
  year: number
  price: number
  mileage: number
  vin: string
  color: string
  fuel_type: string
  transmission: string
  body_type: string
  description?: string
  features?: string[]
  status: "available" | "sold" | "pending" | "maintenance"
  image_urls?: string[]
  created_at: string
  updated_at?: string
}

export interface Customer {
  id: string
  first_name: string
  last_name: string
  email: string
  phone?: string
  address?: string
  city?: string
  state?: string
  zip?: string
  notes?: string
  created_at: string
  updated_at?: string
}

export interface Sale {
  id: string
  vehicle_id: string
  customer_id: string
  sale_price: number
  sale_date: string
  payment_method: "cash" | "finance" | "lease"
  salesperson: string
  notes?: string
  created_at: string
  updated_at?: string
}

export interface ServiceAppointment {
  id: string
  customer_id: string
  vehicle_id?: string
  vehicle_info?: string
  appointment_date: string
  service_type: string
  status: "scheduled" | "in_progress" | "completed" | "cancelled"
  notes?: string
  created_at: string
  updated_at?: string
}
