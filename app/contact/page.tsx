import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import Link from "next/link"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

export default function ContactPage() {
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
          <Image 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
            alt="Contact DropTop" 
            fill 
            className="object-cover" 
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Contact Us</h1>
              <p className="text-sm md:text-base max-w-2xl mx-auto">
                We're here to help you find your dream car. Reach out to our team with any questions.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information & Form Section */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contact Information */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Get in Touch</h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-primary mt-1 mr-3" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-gray-600">(555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-primary mt-1 mr-3" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-gray-600">info@droptop.com</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-primary mt-1 mr-3" />
                    <div>
                      <p className="font-medium">Business Hours</p>
                      <p className="text-gray-600">Mon-Fri: 9:00AM - 9:00PM</p>
                      <p className="text-gray-600">Sat-Sun: 9:00AM - 5:00PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Send us a Message</h3>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" placeholder="John" />
                    </div>
                    <div>
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" placeholder="Doe" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john@example.com" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" placeholder="(555) 123-4567" />
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="How can we help you?" className="h-32" />
                  </div>
                  <Button type="submit" className="w-full">Send Message</Button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-12 md:py-16 bg-[#f5f0e5]">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Find Us</h2>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image src="/placeholder.svg?height=800&width=1600" alt="Map location" fill className="object-cover" />
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="bg-[#f5f0e5] p-6 rounded-lg">
                <h3 className="text-lg font-bold mb-2">What financing options do you offer?</h3>
                <p className="text-gray-600">
                  We offer a variety of financing options to suit your needs, including traditional auto loans, lease
                  options, and special financing programs. Our finance team works with multiple lenders to ensure you
                  get the best possible terms.
                </p>
              </div>

              <div className="bg-[#f5f0e5] p-6 rounded-lg">
                <h3 className="text-lg font-bold mb-2">Do you accept trade-ins?</h3>
                <p className="text-gray-600">
                  Yes, we accept trade-ins of all makes and models. Our team will provide a fair market valuation of
                  your current vehicle, which can be applied toward the purchase of your new car.
                </p>
              </div>

              <div className="bg-[#f5f0e5] p-6 rounded-lg">
                <h3 className="text-lg font-bold mb-2">Can I schedule a test drive online?</h3>
                <p className="text-gray-600">
                  You can schedule a test drive through our website, by phone, or by email. We recommend scheduling in
                  advance to ensure the vehicle you're interested in is ready when you arrive.
                </p>
              </div>

              <div className="bg-[#f5f0e5] p-6 rounded-lg">
                <h3 className="text-lg font-bold mb-2">What warranty options are available?</h3>
                <p className="text-gray-600">
                  All our vehicles come with manufacturer warranties where applicable. We also offer extended warranty
                  options that can provide additional coverage and peace of mind for your purchase.
                </p>
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
                  <Link href="/blog" className="text-xs sm:text-sm text-gray-400 hover:text-white">
                    Blog
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

