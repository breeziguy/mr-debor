import { redirect } from "next/navigation"

export default function AdminPage() {
  // Simple redirect to the applications page
  redirect("/admin/applications")
}
