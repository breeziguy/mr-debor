"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function CareersApplyPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    ssn: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  })

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  // Handle select changes
  const handleSelectChange = (name, value) => {
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError("")

    try {
      // Get form data
      const formData = new FormData(e.target)

      // Log form data for debugging (excluding file contents)
      const formDataForLogging = Object.fromEntries(
        Array.from(formData.entries()).map(([key, value]) => {
          if (value instanceof File) {
            return [key, `File: ${value.name} (${value.size} bytes)`]
          }
          return [key, value]
        }),
      )
      console.log("Form data being submitted:", formDataForLogging)

      // Send form data to API route
      const response = await fetch("/api/submit-application", {
        method: "POST",
        body: formData,
      })

      // Check if the response is JSON
      const contentType = response.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        const responseText = await response.text()
        console.error("Non-JSON response:", responseText)
        throw new Error(`Server returned non-JSON response: ${responseText.substring(0, 100)}...`)
      }

      const result = await response.json()

      if (response.ok && result.success) {
        setSubmitSuccess(true)
        console.log("Application submitted successfully:", result)
      } else {
        throw new Error(result.error || "Failed to submit application")
      }
    } catch (error) {
      console.error("Error submitting application:", error)
      setSubmitError(`There was a problem submitting your application: ${error.message || "Unknown error"}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitSuccess) {
    return (
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-white py-3 px-4 md:px-8 flex items-center justify-between border-b sticky top-0 z-50">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Dr-logo-default-x2-vqiSFYYtiZ8Hn3bqVQMQ2MDH5LAZSa.webp"
                alt="DropTop Logo"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            <nav className="hidden md:flex ml-8 space-x-6">
              <Link href="/" className="text-sm font-medium hover:text-primary">
                HOME
              </Link>
              <Link href="/cars" className="text-sm font-medium hover:text-primary">
                CARS
              </Link>
              <Link href="/sell" className="text-sm font-medium hover:text-primary">
                SELL
              </Link>
              <Link href="/about" className="text-sm font-medium hover:text-primary">
                ABOUT
              </Link>
              <Link href="/contact" className="text-sm font-medium hover:text-primary">
                CONTACT
              </Link>
              <Link href="/careers/apply" className="text-sm font-medium hover:text-primary">
                CAREERS
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <span className="text-sm font-medium">989-614-8696</span>
            </div>
            <Button className="bg-primary hover:bg-primary/90 hidden sm:inline-flex">SELL YOUR CAR</Button>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col space-y-4 mt-8">
                  <Link href="/" className="text-base font-medium hover:text-primary">
                    HOME
                  </Link>
                  <Link href="/cars" className="text-base font-medium hover:text-primary">
                    CARS
                  </Link>
                  <Link href="/sell" className="text-base font-medium hover:text-primary">
                    SELL
                  </Link>
                  <Link href="/about" className="text-base font-medium hover:text-primary">
                    ABOUT
                  </Link>
                  <Link href="/contact" className="text-base font-medium hover:text-primary">
                    CONTACT
                  </Link>
                  <Link href="/careers/apply" className="text-base font-medium hover:text-primary">
                    CAREERS
                  </Link>
                  <div className="pt-4 border-t">
                    <p className="text-sm font-medium mb-2">Call us:</p>
                    <p className="text-base font-bold">989-614-8696</p>
                  </div>
                  <Button className="bg-primary hover:bg-primary/90 w-full mt-4">SELL YOUR CAR</Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center bg-[#f5f0e5] py-16">
          <div className="container max-w-2xl mx-auto px-4">
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="flex justify-center mb-6">
                <CheckCircle className="h-16 w-16 text-primary" />
              </div>
              <h1 className="text-3xl font-bold mb-4">Application Submitted!</h1>
              <p className="text-gray-600 mb-8">
                Thank you for applying to join the DropTop team. We&apos;ve received your application and will review it
                shortly. Our HR team will contact you within 3-5 business days regarding the next steps.
              </p>
              <Button asChild className="bg-primary hover:bg-primary/90">
                <Link href="/">Return to Homepage</Link>
              </Button>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-black text-white pt-8 md:pt-12 pb-6">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-6 md:mb-8">
              <div>
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Dr-logo-default-x2-vqiSFYYtiZ8Hn3bqVQMQ2MDH5LAZSa.webp"
                  alt="DropTop Logo"
                  width={120}
                  height={40}
                  className="h-10 w-auto mb-4"
                />
                <p className="text-xs sm:text-sm text-gray-400 mb-4">
                  123 Main Street, Suite 456
                  <br />
                  New York, NY 10001
                </p>
                <p className="text-xs sm:text-sm text-gray-400">
                  Mon-Fri: 9:00AM - 9:00PM
                  <br />
                  Sat-Sun: 9:00AM - 5:00PM
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-4 text-sm sm:text-base">OFFICE</h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="/about" className="text-xs sm:text-sm text-gray-400 hover:text-white">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-xs sm:text-sm text-gray-400 hover:text-white">
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link href="/careers/apply" className="text-xs sm:text-sm text-gray-400 hover:text-white">
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link href="/how-it-works" className="text-xs sm:text-sm text-gray-400 hover:text-white">
                      How it Works
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4 text-sm sm:text-base">LINKS</h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="/faq" className="text-xs sm:text-sm text-gray-400 hover:text-white">
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link href="/help" className="text-xs sm:text-sm text-gray-400 hover:text-white">
                      Help
                    </Link>
                  </li>
                  <li>
                    <Link href="/support" className="text-xs sm:text-sm text-gray-400 hover:text-white">
                      Support
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="text-xs sm:text-sm text-gray-400 hover:text-white">
                      Terms
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy" className="text-xs sm:text-sm text-gray-400 hover:text-white">
                      Privacy
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4 text-sm sm:text-base">GET IN TOUCH</h4>
                <p className="text-xs sm:text-sm text-gray-400 mb-4">
                  Need help finding your dream car? Our expert team is here to help you.
                </p>
                <p className="text-xs sm:text-sm text-gray-400 mb-4">
                  <span className="font-bold">Phone:</span> 989-614-8696
                </p>
                <p className="text-xs sm:text-sm text-gray-400">
                  <span className="font-bold">Email:</span> contact@droptop.com
                </p>
              </div>
            </div>
            <div className="border-t border-gray-800 pt-6 text-center">
              <p className="text-xs sm:text-sm text-gray-400">© 2025 DropTop. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-white py-3 px-4 md:px-8 flex items-center justify-between border-b sticky top-0 z-50">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Dr-logo-default-x2-vqiSFYYtiZ8Hn3bqVQMQ2MDH5LAZSa.webp"
              alt="DropTop Logo"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
          </Link>
          <nav className="hidden md:flex ml-8 space-x-6">
            <Link href="/" className="text-sm font-medium hover:text-primary">
              HOME
            </Link>
            <Link href="/cars" className="text-sm font-medium hover:text-primary">
              CARS
            </Link>
            <Link href="/sell" className="text-sm font-medium hover:text-primary">
              SELL
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-primary">
              ABOUT
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-primary">
              CONTACT
            </Link>
            <Link href="/careers/apply" className="text-sm font-medium hover:text-primary">
              CAREERS
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden md:block">
            <span className="text-sm font-medium">989-614-8696</span>
          </div>
          <Button className="bg-primary hover:bg-primary/90 hidden sm:inline-flex">SELL YOUR CAR</Button>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col space-y-4 mt-8">
                <Link href="/" className="text-base font-medium hover:text-primary">
                  HOME
                </Link>
                <Link href="/cars" className="text-base font-medium hover:text-primary">
                  CARS
                </Link>
                <Link href="/sell" className="text-base font-medium hover:text-primary">
                  SELL
                </Link>
                <Link href="/about" className="text-base font-medium hover:text-primary">
                  ABOUT
                </Link>
                <Link href="/contact" className="text-base font-medium hover:text-primary">
                  CONTACT
                </Link>
                <Link href="/careers/apply" className="text-base font-medium hover:text-primary">
                  CAREERS
                </Link>
                <div className="pt-4 border-t">
                  <p className="text-sm font-medium mb-2">Call us:</p>
                  <p className="text-base font-bold">989-614-8696</p>
                </div>
                <Button className="bg-primary hover:bg-primary/90 w-full mt-4">SELL YOUR CAR</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[300px] md:h-[400px]">
          <Image src="/placeholder.svg?height=800&width=1600" alt="Careers at DropTop" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Join Our Team</h1>
              <p className="text-sm md:text-base max-w-2xl mx-auto">
                Build your career with the leading luxury car dealership in the region.
              </p>
            </div>
          </div>
        </section>

        {/* Why Work With Us Section */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Why Work With Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-[#f5f0e5] p-6 rounded-lg text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Growth Opportunities</h3>
                <p className="text-gray-600">
                  We invest in our team members&apos; professional development with training programs, mentorship, and
                  clear paths for advancement.
                </p>
              </div>

              <div className="bg-[#f5f0e5] p-6 rounded-lg text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Collaborative Culture</h3>
                <p className="text-gray-600">
                  Join a team that values collaboration, innovation, and mutual respect. We celebrate diversity and
                  foster an inclusive environment.
                </p>
              </div>

              <div className="bg-[#f5f0e5] p-6 rounded-lg text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Competitive Benefits</h3>
                <p className="text-gray-600">
                  We offer competitive salaries, comprehensive health benefits, retirement plans, employee discounts,
                  and performance bonuses.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
                <Image src="/placeholder.svg?height=800&width=1200" alt="DropTop team" fill className="object-cover" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Life at DropTop</h2>
                <p className="text-gray-600 mb-4">
                  At DropTop, we&apos;re passionate about cars and committed to creating exceptional experiences for our
                  customers. Our team members are the heart of our business, and we strive to create a workplace where
                  everyone can thrive.
                </p>
                <p className="text-gray-600 mb-4">
                  Whether you&apos;re an automotive expert, a sales professional, or a customer service specialist,
                  you&apos;ll find opportunities to grow your skills and advance your career with us.
                </p>
                <p className="text-gray-600">
                  We celebrate achievements, encourage innovation, and support work-life balance. Join our team and be
                  part of a company that values your contributions and invests in your success.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Application Form Section */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Apply Now</h2>
              <div className="bg-[#f5f0e5] p-6 md:p-8 rounded-lg">
                {submitError && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                    {submitError}
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold mb-4">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                          First Name
                        </label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formState.firstName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name
                        </label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={formState.lastName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="ssn" className="block text-sm font-medium text-gray-700 mb-1">
                        SSN/Tax ID
                      </label>
                      <Input id="ssn" name="ssn" value={formState.ssn} onChange={handleChange} required />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <Input id="phone" name="phone" value={formState.phone} onChange={handleChange} required />
                  </div>

                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <Input id="address" name="address" value={formState.address} onChange={handleChange} required />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <Input id="city" name="city" value={formState.city} onChange={handleChange} required />
                    </div>
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                        State
                      </label>
                      <Select
                        name="state"
                        value={formState.state}
                        onValueChange={(value) => handleSelectChange("state", value)}
                        required
                      >
                        <SelectTrigger id="state">
                          <SelectValue placeholder="Select a state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="AL">Alabama</SelectItem>
                          <SelectItem value="AK">Alaska</SelectItem>
                          <SelectItem value="AZ">Arizona</SelectItem>
                          <SelectItem value="AR">Arkansas</SelectItem>
                          <SelectItem value="CA">California</SelectItem>
                          <SelectItem value="CO">Colorado</SelectItem>
                          <SelectItem value="CT">Connecticut</SelectItem>
                          <SelectItem value="DE">Delaware</SelectItem>
                          <SelectItem value="FL">Florida</SelectItem>
                          <SelectItem value="GA">Georgia</SelectItem>
                          <SelectItem value="HI">Hawaii</SelectItem>
                          <SelectItem value="ID">Idaho</SelectItem>
                          <SelectItem value="IL">Illinois</SelectItem>
                          <SelectItem value="IN">Indiana</SelectItem>
                          <SelectItem value="IA">Iowa</SelectItem>
                          <SelectItem value="KS">Kansas</SelectItem>
                          <SelectItem value="KY">Kentucky</SelectItem>
                          <SelectItem value="LA">Louisiana</SelectItem>
                          <SelectItem value="ME">Maine</SelectItem>
                          <SelectItem value="MD">Maryland</SelectItem>
                          <SelectItem value="MA">Massachusetts</SelectItem>
                          <SelectItem value="MI">Michigan</SelectItem>
                          <SelectItem value="MN">Minnesota</SelectItem>
                          <SelectItem value="MS">Mississippi</SelectItem>
                          <SelectItem value="MO">Missouri</SelectItem>
                          <SelectItem value="MT">Montana</SelectItem>
                          <SelectItem value="NE">Nebraska</SelectItem>
                          <SelectItem value="NV">Nevada</SelectItem>
                          <SelectItem value="NH">New Hampshire</SelectItem>
                          <SelectItem value="NJ">New Jersey</SelectItem>
                          <SelectItem value="NM">New Mexico</SelectItem>
                          <SelectItem value="NY">New York</SelectItem>
                          <SelectItem value="NC">North Carolina</SelectItem>
                          <SelectItem value="ND">North Dakota</SelectItem>
                          <SelectItem value="OH">Ohio</SelectItem>
                          <SelectItem value="OK">Oklahoma</SelectItem>
                          <SelectItem value="OR">Oregon</SelectItem>
                          <SelectItem value="PA">Pennsylvania</SelectItem>
                          <SelectItem value="RI">Rhode Island</SelectItem>
                          <SelectItem value="SC">South Carolina</SelectItem>
                          <SelectItem value="SD">South Dakota</SelectItem>
                          <SelectItem value="TN">Tennessee</SelectItem>
                          <SelectItem value="TX">Texas</SelectItem>
                          <SelectItem value="UT">Utah</SelectItem>
                          <SelectItem value="VT">Vermont</SelectItem>
                          <SelectItem value="VA">Virginia</SelectItem>
                          <SelectItem value="WA">Washington</SelectItem>
                          <SelectItem value="WV">West Virginia</SelectItem>
                          <SelectItem value="WI">Wisconsin</SelectItem>
                          <SelectItem value="WY">Wyoming</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">
                        ZIP Code
                      </label>
                      <Input id="zip" name="zip" value={formState.zip} onChange={handleChange} required />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="idFront" className="block text-sm font-medium text-gray-700 mb-1">
                        Upload Identification Document (Front)
                      </label>
                      <Input id="idFront" name="idFront" type="file" className="cursor-pointer" required />
                      <p className="text-xs text-gray-500 mt-1">PDF, JPG, or PNG files only. Max size: 5MB</p>
                    </div>
                    <div>
                      <label htmlFor="idBack" className="block text-sm font-medium text-gray-700 mb-1">
                        Upload Identification Document (Back)
                      </label>
                      <Input id="idBack" name="idBack" type="file" className="cursor-pointer" required />
                      <p className="text-xs text-gray-500 mt-1">PDF, JPG, or PNG files only. Max size: 5MB</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox id="terms" name="terms" required />
                    <div className="grid gap-1.5 leading-none">
                      <Label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        I agree to the terms and conditions
                      </Label>
                      <p className="text-xs text-gray-500">
                        By submitting this application, I certify that all information provided is true and complete.
                      </p>
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* Footer */}
      <footer className="bg-black text-white pt-8 md:pt-12 pb-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-6 md:mb-8">
            <div>
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Dr-logo-default-x2-vqiSFYYtiZ8Hn3bqVQMQ2MDH5LAZSa.webp"
                alt="DropTop Logo"
                width={120}
                height={40}
                className="h-10 w-auto mb-4"
              />
              <p className="text-xs sm:text-sm text-gray-400 mb-4">
                123 Main Street, Suite 456
                <br />
                New York, NY 10001
              </p>
              <p className="text-xs sm:text-sm text-gray-400">
                Mon-Fri: 9:00AM - 9:00PM
                <br />
                Sat-Sun: 9:00AM - 5:00PM
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-sm sm:text-base">OFFICE</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-xs sm:text-sm text-gray-400 hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-xs sm:text-sm text-gray-400 hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/careers/apply" className="text-xs sm:text-sm text-gray-400 hover:text-white">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/how-it-works" className="text-xs sm:text-sm text-gray-400 hover:text-white">
                    How it Works
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-sm sm:text-base">LINKS</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/faq" className="text-xs sm:text-sm text-gray-400 hover:text-white">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="text-xs sm:text-sm text-gray-400 hover:text-white">
                    Help
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="text-xs sm:text-sm text-gray-400 hover:text-white">
                    Support
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-xs sm:text-sm text-gray-400 hover:text-white">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-xs sm:text-sm text-gray-400 hover:text-white">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-sm sm:text-base">GET IN TOUCH</h4>
              <p className="text-xs sm:text-sm text-gray-400 mb-4">
                Need help finding your dream car? Our expert team is here to help you.
              </p>
              <p className="text-xs sm:text-sm text-gray-400 mb-4">
                <span className="font-bold">Phone:</span> 989-614-8696
              </p>
              <p className="text-xs sm:text-sm text-gray-400">
                <span className="font-bold">Email:</span> contact@droptop.com
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 text-center">
            <p className="text-xs sm:text-sm text-gray-400">© 2025 DropTop. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
