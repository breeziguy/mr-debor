import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

export default function AboutPage() {
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
            src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop" 
            alt="About DropTop" 
            fill 
            className="object-cover" 
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">About Us</h1>
              <p className="text-sm md:text-base max-w-2xl mx-auto">
                DropTop is a premier car dealership specializing in luxury and performance vehicles.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Story</h2>
                <p className="text-gray-600 mb-4">
                  Founded in 2010, DropTop began with a simple mission: to provide car enthusiasts with access to the
                  world's finest automobiles. What started as a small showroom with just five vehicles has grown into
                  one of the most respected luxury car dealerships in the country.
                </p>
                <p className="text-gray-600 mb-4">
                  Our founder, David Mosloski, a lifelong car enthusiast, believed that buying a high-performance
                  vehicle should be an experience as exceptional as the cars themselves. This philosophy continues to
                  guide everything we do at DropTop.
                </p>
                <p className="text-gray-600">
                  Today, we offer an extensive inventory of premium vehicles from the world's most prestigious
                  manufacturers, along with unparalleled customer service and expert automotive knowledge.
                </p>
              </div>
              <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1547744037-c14237f0f237?q=80&w=2070&auto=format&fit=crop"
                  alt="DropTop showroom"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="py-12 md:py-16 bg-[#f5f0e5]">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Quality & Excellence</h3>
                <p className="text-gray-600">
                  We maintain the highest standards in every vehicle we sell. Each car undergoes a rigorous inspection
                  process to ensure it meets our exacting quality criteria.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Transparency & Trust</h3>
                <p className="text-gray-600">
                  We believe in complete transparency throughout the buying process. Our no-pressure approach and honest
                  communication have earned us the trust of thousands of satisfied customers.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Innovation & Expertise</h3>
                <p className="text-gray-600">
                  Our team stays at the forefront of automotive technology and trends. We're passionate about cars and
                  committed to sharing our expertise to help you find the perfect vehicle.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Team Section */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Meet Our Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Team Member 1 - CEO */}
              <div className="text-center">
                <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/executive-ceo-male-UQnXJXXXXXXXXXXXXXXXXXXXXXXXXX.jpg"
                    alt="David Mosloski - CEO"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold">David Mosloski</h3>
                <p className="text-gray-500 mb-2">CEO</p>
                <p className="text-sm text-gray-600">
                  With over 20 years in the luxury automotive industry, David's vision and leadership have made DropTop
                  a premier destination for car enthusiasts.
                </p>
              </div>

              {/* Team Member 2 - Female Executive */}
              <div className="text-center">
                <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/executive-female-coo-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.jpg"
                    alt="Jennifer Reynolds - COO"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold">Jennifer Reynolds</h3>
                <p className="text-gray-500 mb-2">Chief Operating Officer</p>
                <p className="text-sm text-gray-600">
                  Jennifer's strategic vision and operational expertise have been instrumental in DropTop's growth and
                  expansion across multiple markets.
                </p>
              </div>

              {/* Team Member 3 */}
              <div className="text-center">
                <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/executive-male-service-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.jpg"
                    alt="Marcus Johnson - Head of Service"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold">Marcus Johnson</h3>
                <p className="text-gray-500 mb-2">Head of Service</p>
                <p className="text-sm text-gray-600">
                  A certified master technician, Marcus ensures every vehicle we sell meets the highest standards of
                  performance and reliability.
                </p>
              </div>

              {/* Team Member 4 - Female Executive */}
              <div className="text-center">
                <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/executive-female-marketing-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.jpg"
                    alt="Sophia Martinez - Marketing Director"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold">Sophia Martinez</h3>
                <p className="text-gray-500 mb-2">Marketing Director</p>
                <p className="text-sm text-gray-600">
                  Sophia's innovative marketing strategies have elevated the DropTop brand and created memorable
                  experiences for our customers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-16 bg-primary">
          <div className="container mx-auto px-4 text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Find Your Dream Car?</h2>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              Visit our showroom or browse our inventory online to discover the perfect vehicle for your lifestyle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-primary"
              >
                <Link href="/cars">Browse Inventory</Link>
              </Button>
              <Button
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-primary"
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
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
