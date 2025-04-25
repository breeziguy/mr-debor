"use client"

import Image from "next/image"
import Link from "next/link"
import { Search, Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
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

      <main>
        {/* Hero Section */}
        <section className="relative h-[400px] md:h-[500px] lg:h-[600px]">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sldr_2-1-copyright.jpg-WdgM3ypWHRYerVtPXP15aTi3S9iNrp.jpeg"
            alt="Red BMW M4 driving in mountains"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30 flex flex-col justify-center px-4 sm:px-8 md:px-16">
            <div className="max-w-md">
              <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                EXPLORE DETAILED LISTINGS TODAY
              </h1>
              <Button className="bg-primary hover:bg-primary/90">VIEW LISTINGS</Button>
            </div>
            <div className="absolute bottom-0 left-0 bg-primary/80 text-white py-2 px-4">
              <p className="text-xs sm:text-sm">WE ARE EXPERTS</p>
              <p className="text-xs sm:text-sm font-bold">IN CAR SALES</p>
            </div>
          </div>
        </section>

        {/* Search Section */}
        <section className="bg-[#f5f0e5] py-6">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-md p-4 shadow-sm flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input placeholder="Any brand/model or type of car" className="w-full" />
              </div>
              <div className="flex-1 md:flex-none md:w-40">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Price" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10000">Under $10,000</SelectItem>
                    <SelectItem value="20000">Under $20,000</SelectItem>
                    <SelectItem value="30000">Under $30,000</SelectItem>
                    <SelectItem value="50000">Under $50,000</SelectItem>
                    <SelectItem value="100000">Under $100,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1 md:flex-none md:w-40">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2022">2022</SelectItem>
                    <SelectItem value="2021">2021</SelectItem>
                    <SelectItem value="2020">2020</SelectItem>
                    <SelectItem value="2019">2019</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="bg-primary hover:bg-primary/90">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </section>

        {/* Recent Cars Section */}
        <section className="bg-[#f5f0e5] py-8 md:py-12">
          <div className="container mx-auto px-4">
            <div className="text-center mb-6 md:mb-8">
              <h2 className="text-xs sm:text-sm uppercase text-gray-500 mb-2">OUR DEALER OFFERS</h2>
              <h3 className="text-xl sm:text-2xl font-bold">RECENT CARS</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {/* Car Card 1 */}
              <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                <div className="relative h-40 sm:h-48">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/car-image14-copyright-1290x725.jpg-suxJXJ5NMgAHyxyKTAvQhYwR3C7tw7.jpeg"
                    alt="Porsche 911 GT2 RS"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
                    FEATURED
                  </div>
                </div>
                <div className="p-3 sm:p-4">
                  <h4 className="font-bold mb-2 text-sm sm:text-base">PORSCHE 911 GT2 RS</h4>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="flex flex-col items-center">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-100 flex items-center justify-center mb-1">
                        <Image src="/placeholder.svg?height=20&width=20" alt="icon" width={20} height={20} />
                      </div>
                      <span className="text-xs text-gray-500">2022</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-100 flex items-center justify-center mb-1">
                        <Image src="/placeholder.svg?height=20&width=20" alt="icon" width={20} height={20} />
                      </div>
                      <span className="text-xs text-gray-500">Auto</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-100 flex items-center justify-center mb-1">
                        <Image src="/placeholder.svg?height=20&width=20" alt="icon" width={20} height={20} />
                      </div>
                      <span className="text-xs text-gray-500">Petrol</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm">Price from</span>
                    <span className="font-bold text-primary text-sm sm:text-base">$120,000</span>
                  </div>
                </div>
              </div>

              {/* Car Card 2 */}
              <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                <div className="relative h-40 sm:h-48">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/car-image17-copyright-1290x725.jpg-Yw05mcAXcx6iqsRNtHFkoyZxW1kwKX.jpeg"
                    alt="Mercedes-AMG GT"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
                    NEW
                  </div>
                </div>
                <div className="p-3 sm:p-4">
                  <h4 className="font-bold mb-2 text-sm sm:text-base">MERCEDES-AMG GT</h4>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="flex flex-col items-center">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-100 flex items-center justify-center mb-1">
                        <Image src="/placeholder.svg?height=20&width=20" alt="icon" width={20} height={20} />
                      </div>
                      <span className="text-xs text-gray-500">2023</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-100 flex items-center justify-center mb-1">
                        <Image src="/placeholder.svg?height=20&width=20" alt="icon" width={20} height={20} />
                      </div>
                      <span className="text-xs text-gray-500">Auto</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-100 flex items-center justify-center mb-1">
                        <Image src="/placeholder.svg?height=20&width=20" alt="icon" width={20} height={20} />
                      </div>
                      <span className="text-xs text-gray-500">Petrol</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm">Price from</span>
                    <span className="font-bold text-primary text-sm sm:text-base">$95,000</span>
                  </div>
                </div>
              </div>

              {/* Car Card 3 */}
              <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                <div className="relative h-40 sm:h-48">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/car-image15-copyright-1290x725.jpg-N9QWYuLRWjPELpPcnx6pDooqyYiK04.jpeg"
                    alt="Lamborghini Aventador"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
                    FEATURED
                  </div>
                </div>
                <div className="p-3 sm:p-4">
                  <h4 className="font-bold mb-2 text-sm sm:text-base">LAMBORGHINI AVENTADOR</h4>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="flex flex-col items-center">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-100 flex items-center justify-center mb-1">
                        <Image src="/placeholder.svg?height=20&width=20" alt="icon" width={20} height={20} />
                      </div>
                      <span className="text-xs text-gray-500">2022</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-100 flex items-center justify-center mb-1">
                        <Image src="/placeholder.svg?height=20&width=20" alt="icon" width={20} height={20} />
                      </div>
                      <span className="text-xs text-gray-500">Manual</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-100 flex items-center justify-center mb-1">
                        <Image src="/placeholder.svg?height=20&width=20" alt="icon" width={20} height={20} />
                      </div>
                      <span className="text-xs text-gray-500">Petrol</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm">Price from</span>
                    <span className="font-bold text-primary text-sm sm:text-base">$150,000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

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
      </main>
    </div>
  )
}
