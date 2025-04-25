import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, CheckCircle, ArrowRight } from "lucide-react"

export default function SellPage() {
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
            src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=2073&auto=format&fit=crop"
            alt="Sell your car"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Sell Your Car</h1>
              <p className="text-sm md:text-base max-w-2xl mx-auto">
                Get a fair market value for your vehicle with our hassle-free selling process.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-[#f5f0e5] p-6 rounded-lg text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Submit Your Info</h3>
                <p className="text-gray-600">
                  Fill out our simple form with details about your vehicle, including make, model, year, and condition.
                </p>
              </div>

              <div className="bg-[#f5f0e5] p-6 rounded-lg text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Get Your Offer</h3>
                <p className="text-gray-600">
                  Our team will evaluate your vehicle and provide you with a competitive offer within 24 hours.
                </p>
              </div>

              <div className="bg-[#f5f0e5] p-6 rounded-lg text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Get Paid</h3>
                <p className="text-gray-600">
                  Accept our offer, bring your vehicle to our location, and receive payment on the spot after a quick
                  inspection.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-12 md:py-16 bg-[#f5f0e5]">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Why Sell to DropTop</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sell-car-benefits-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.jpg"
                  alt="Selling benefits"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">Fair Market Value</h3>
                    <p className="text-gray-600">
                      We offer competitive prices based on current market conditions and your vehicle's condition.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">No Hassle Process</h3>
                    <p className="text-gray-600">
                      Skip the stress of private sales, negotiations, and dealing with potential buyers.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">Immediate Payment</h3>
                    <p className="text-gray-600">
                      Get paid on the same day you bring your vehicle in, with no waiting for checks to clear.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">We Handle the Paperwork</h3>
                    <p className="text-gray-600">
                      Our team takes care of all the necessary documentation and title transfer process.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sell Form Section */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Get Your Free Offer</h2>
              <div className="bg-[#f5f0e5] p-6 md:p-8 rounded-lg">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="make" className="block text-sm font-medium text-gray-700 mb-1">
                        Make
                      </label>
                      <Input id="make" placeholder="e.g., BMW" required />
                    </div>
                    <div>
                      <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-1">
                        Model
                      </label>
                      <Input id="model" placeholder="e.g., X5" required />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
                        Year
                      </label>
                      <Input id="year" type="number" placeholder="e.g., 2020" required />
                    </div>
                    <div>
                      <label htmlFor="mileage" className="block text-sm font-medium text-gray-700 mb-1">
                        Mileage
                      </label>
                      <Input id="mileage" type="number" placeholder="e.g., 25000" required />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-1">
                      Vehicle Condition
                    </label>
                    <Select>
                      <SelectTrigger id="condition">
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excellent">Excellent</SelectItem>
                        <SelectItem value="good">Good</SelectItem>
                        <SelectItem value="fair">Fair</SelectItem>
                        <SelectItem value="poor">Poor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <Input id="name" placeholder="John Doe" required />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <Input id="phone" placeholder="(989) 614-8696" required />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <Input id="email" type="email" placeholder="john.doe@example.com" required />
                  </div>

                  <div>
                    <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-1">
                      Additional Comments
                    </label>
                    <Textarea
                      id="comments"
                      placeholder="Any additional information about your vehicle..."
                      className="min-h-[120px]"
                    />
                  </div>

                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                    Get My Offer <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 md:py-16 bg-[#f5f0e5]">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-lg font-bold mb-2">What documents do I need to sell my car?</h3>
                <p className="text-gray-600">
                  You'll need your vehicle title, registration, a valid ID, and any service records if available. If you
                  have a loan, bring your loan information as well.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-lg font-bold mb-2">How long does the process take?</h3>
                <p className="text-gray-600">
                  The entire process typically takes 1-2 hours from inspection to payment, assuming all your paperwork
                  is in order.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-lg font-bold mb-2">Do I need to make an appointment?</h3>
                <p className="text-gray-600">
                  While walk-ins are welcome, we recommend scheduling an appointment to ensure our team is ready to
                  assist you promptly.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-lg font-bold mb-2">How is my offer determined?</h3>
                <p className="text-gray-600">
                  We consider factors like make, model, year, mileage, condition, market demand, and current inventory
                  needs to provide a competitive offer.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-16 bg-primary">
          <div className="container mx-auto px-4 text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Sell Your Car?</h2>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              Contact us today to get started or visit our showroom for an immediate appraisal.
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
