import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

export default function FAQPage() {
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
        <section className="relative h-[250px] md:h-[300px]">
          <Image src="/placeholder.svg?height=800&width=1600" alt="FAQ" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
              <p className="text-sm md:text-base max-w-2xl mx-auto">
                Find answers to common questions about our services and vehicles
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">General Questions</h2>
                <div className="space-y-6">
                  <div className="bg-[#f5f0e5] p-6 rounded-lg">
                    <h3 className="text-lg font-bold mb-2">What types of vehicles do you sell?</h3>
                    <p className="text-gray-700">
                      We specialize in luxury and performance vehicles from premium brands such as BMW, Mercedes-Benz,
                      Audi, Porsche, Lamborghini, Ferrari, and more. Our inventory includes sports cars, luxury sedans,
                      SUVs, and convertibles.
                    </p>
                  </div>

                  <div className="bg-[#f5f0e5] p-6 rounded-lg">
                    <h3 className="text-lg font-bold mb-2">Do you offer test drives?</h3>
                    <p className="text-gray-700">
                      Yes, we encourage test drives to ensure you find the perfect vehicle. You can schedule a test
                      drive through our website, by phone at 989-614-8696, or by visiting our showroom. Please bring
                      your valid driver's license.
                    </p>
                  </div>

                  <div className="bg-[#f5f0e5] p-6 rounded-lg">
                    <h3 className="text-lg font-bold mb-2">What are your business hours?</h3>
                    <p className="text-gray-700">
                      Our showroom is open Monday through Friday from 9:00 AM to 9:00 PM, Saturday from 9:00 AM to 7:00
                      PM, and Sunday from 10:00 AM to 5:00 PM. Our service department operates Monday through Friday
                      from 8:00 AM to 6:00 PM.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Buying a Vehicle</h2>
                <div className="space-y-6">
                  <div className="bg-[#f5f0e5] p-6 rounded-lg">
                    <h3 className="text-lg font-bold mb-2">What financing options do you offer?</h3>
                    <p className="text-gray-700">
                      We offer a variety of financing options to suit your needs, including traditional auto loans,
                      lease options, and special financing programs. Our finance team works with multiple lenders to
                      ensure you get the best possible terms.
                    </p>
                  </div>

                  <div className="bg-[#f5f0e5] p-6 rounded-lg">
                    <h3 className="text-lg font-bold mb-2">Do you accept trade-ins?</h3>
                    <p className="text-gray-700">
                      Yes, we accept trade-ins of all makes and models. Our team will provide a fair market valuation of
                      your current vehicle, which can be applied toward the purchase of your new car.
                    </p>
                  </div>

                  <div className="bg-[#f5f0e5] p-6 rounded-lg">
                    <h3 className="text-lg font-bold mb-2">What warranty options are available?</h3>
                    <p className="text-gray-700">
                      All our vehicles come with manufacturer warranties where applicable. We also offer extended
                      warranty options that can provide additional coverage and peace of mind for your purchase.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Selling Your Vehicle</h2>
                <div className="space-y-6">
                  <div className="bg-[#f5f0e5] p-6 rounded-lg">
                    <h3 className="text-lg font-bold mb-2">How does the selling process work?</h3>
                    <p className="text-gray-700">
                      Our selling process is simple: submit your vehicle information through our website or in person,
                      receive a competitive offer within 24 hours, and if you accept, bring your vehicle to our location
                      for a quick inspection and same-day payment.
                    </p>
                  </div>

                  <div className="bg-[#f5f0e5] p-6 rounded-lg">
                    <h3 className="text-lg font-bold mb-2">What documents do I need to sell my car?</h3>
                    <p className="text-gray-700">
                      You'll need your vehicle title, registration, a valid ID, and any service records if available. If
                      you have a loan, bring your loan information as well.
                    </p>
                  </div>

                  <div className="bg-[#f5f0e5] p-6 rounded-lg">
                    <h3 className="text-lg font-bold mb-2">How is my offer determined?</h3>
                    <p className="text-gray-700">
                      We consider factors like make, model, year, mileage, condition, market demand, and current
                      inventory needs to provide a competitive offer.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-6">Service & Support</h2>
                <div className="space-y-6">
                  <div className="bg-[#f5f0e5] p-6 rounded-lg">
                    <h3 className="text-lg font-bold mb-2">Do you offer vehicle service and maintenance?</h3>
                    <p className="text-gray-700">
                      Yes, our state-of-the-art service center is equipped to handle all maintenance and repair needs
                      for luxury vehicles. Our certified technicians use the latest diagnostic tools and genuine parts
                      to keep your vehicle in optimal condition.
                    </p>
                  </div>

                  <div className="bg-[#f5f0e5] p-6 rounded-lg">
                    <h3 className="text-lg font-bold mb-2">How do I schedule a service appointment?</h3>
                    <p className="text-gray-700">
                      You can schedule a service appointment through our website, by calling our service department at
                      989-614-8696, or by visiting our service center in person.
                    </p>
                  </div>

                  <div className="bg-[#f5f0e5] p-6 rounded-lg">
                    <h3 className="text-lg font-bold mb-2">Do you offer loaner vehicles during service?</h3>
                    <p className="text-gray-700">
                      Yes, we offer complimentary loaner vehicles for customers whose vehicles require extended service.
                      Loaners are subject to availability, so we recommend scheduling your service appointment in
                      advance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-16 bg-primary">
          <div className="container mx-auto px-4 text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              Our team is ready to assist you with any additional questions or concerns you may have.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-primary hover:bg-gray-100">Call Us: 989-614-8696</Button>
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
