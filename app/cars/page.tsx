import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Search, Filter } from "lucide-react"

export default function CarsPage() {
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
          <Image
            src="https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?q=80&w=2069&auto=format&fit=crop"
            alt="Our Inventory"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Our Inventory</h1>
              <p className="text-sm md:text-base max-w-2xl mx-auto">Explore our selection of premium vehicles</p>
            </div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="bg-[#f5f0e5] py-6">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-md p-4 shadow-sm">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input placeholder="Search by make, model, or keyword" className="pl-10" />
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-full md:w-40">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Make" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Makes</SelectItem>
                        <SelectItem value="bmw">BMW</SelectItem>
                        <SelectItem value="mercedes">Mercedes-Benz</SelectItem>
                        <SelectItem value="audi">Audi</SelectItem>
                        <SelectItem value="porsche">Porsche</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-full md:w-40">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Price" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Any Price</SelectItem>
                        <SelectItem value="50000">Under $50,000</SelectItem>
                        <SelectItem value="100000">Under $100,000</SelectItem>
                        <SelectItem value="150000">Under $150,000</SelectItem>
                        <SelectItem value="200000">Under $200,000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-full md:w-40">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Any Year</SelectItem>
                        <SelectItem value="2023">2023</SelectItem>
                        <SelectItem value="2022">2022</SelectItem>
                        <SelectItem value="2021">2021</SelectItem>
                        <SelectItem value="2020">2020</SelectItem>
                        <SelectItem value="older">2019 & Older</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="bg-primary hover:bg-primary/90">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cars Grid Section */}
        <section className="py-12 md:py-16 bg-[#f5f0e5]">
          <div className="container mx-auto px-4">
            <div className="mb-8 flex justify-between items-center">
              <h2 className="text-xl md:text-2xl font-bold">Available Vehicles</h2>
              <div className="flex items-center">
                <span className="text-sm text-gray-600 mr-2">Sort by:</span>
                <Select defaultValue="newest">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="mileage">Mileage: Low to High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Car Card 1 */}
              <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                <div className="relative h-48 sm:h-56">
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
                <div className="p-4">
                  <h3 className="font-bold text-lg">Porsche 911 GT2 RS</h3>
                  <p className="text-gray-500 text-sm mb-2">2022 • 5,000 miles</p>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mb-1">
                        <Image src="/placeholder.svg?height=20&width=20" alt="icon" width={20} height={20} />
                      </div>
                      <span className="text-xs text-gray-500">Petrol</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mb-1">
                        <Image src="/placeholder.svg?height=20&width=20" alt="icon" width={20} height={20} />
                      </div>
                      <span className="text-xs text-gray-500">Auto</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mb-1">
                        <Image src="/placeholder.svg?height=20&width=20" alt="icon" width={20} height={20} />
                      </div>
                      <span className="text-xs text-gray-500">Coupe</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-primary text-xl">$120,000</span>
                    <Button size="sm" className="bg-primary hover:bg-primary/90">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>

              {/* Car Card 2 */}
              <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                <div className="relative h-48 sm:h-56">
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
                <div className="p-4">
                  <h3 className="font-bold text-lg">Mercedes-AMG GT</h3>
                  <p className="text-gray-500 text-sm mb-2">2023 • 2,000 miles</p>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mb-1">
                        <Image src="/placeholder.svg?height=20&width=20" alt="icon" width={20} height={20} />
                      </div>
                      <span className="text-xs text-gray-500">Petrol</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mb-1">
                        <Image src="/placeholder.svg?height=20&width=20" alt="icon" width={20} height={20} />
                      </div>
                      <span className="text-xs text-gray-500">Auto</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mb-1">
                        <Image src="/placeholder.svg?height=20&width=20" alt="icon" width={20} height={20} />
                      </div>
                      <span className="text-xs text-gray-500">Coupe</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-primary text-xl">$95,000</span>
                    <Button size="sm" className="bg-primary hover:bg-primary/90">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>

              {/* Car Card 3 */}
              <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                <div className="relative h-48 sm:h-56">
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
                <div className="p-4">
                  <h3 className="font-bold text-lg">Lamborghini Aventador</h3>
                  <p className="text-gray-500 text-sm mb-2">2022 • 3,000 miles</p>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mb-1">
                        <Image src="/placeholder.svg?height=20&width=20" alt="icon" width={20} height={20} />
                      </div>
                      <span className="text-xs text-gray-500">Petrol</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mb-1">
                        <Image src="/placeholder.svg?height=20&width=20" alt="icon" width={20} height={20} />
                      </div>
                      <span className="text-xs text-gray-500">Manual</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mb-1">
                        <Image src="/placeholder.svg?height=20&width=20" alt="icon" width={20} height={20} />
                      </div>
                      <span className="text-xs text-gray-500">Coupe</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-primary text-xl">$150,000</span>
                    <Button size="sm" className="bg-primary hover:bg-primary/90">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>

              {/* Car Card 4 */}
              <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                <div className="relative h-48 sm:h-56">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/audi-r8-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.jpg"
                    alt="Audi R8"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg">Audi R8</h3>
                  <p className="text-gray-500 text-sm mb-2">2021 • 8,500 miles</p>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mb-1">
                        <Image src="/placeholder.svg?height=20&width=20" alt="icon" width={20} height={20} />
                      </div>
                      <span className="text-xs text-gray-500">Petrol</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mb-1">
                        <Image src="/placeholder.svg?height=20&width=20" alt="icon" width={20} height={20} />
                      </div>
                      <span className="text-xs text-gray-500">Auto</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mb-1">
                        <Image src="/placeholder.svg?height=20&width=20" alt="icon" width={20} height={20} />
                      </div>
                      <span className="text-xs text-gray-500">Coupe</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-primary text-xl">$110,000</span>
                    <Button size="sm" className="bg-primary hover:bg-primary/90">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>

              {/* Car Card 5 */}
              <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                <div className="relative h-48 sm:h-56">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bmw-m5-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.jpg"
                    alt="BMW M5"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg">BMW M5 Competition</h3>
                  <p className="text-gray-500 text-sm mb-2">2022 • 4,200 miles</p>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mb-1">
                        <Image src="/placeholder.svg?height=20&width=20" alt="icon" width={20} height={20} />
                      </div>
                      <span className="text-xs text-gray-500">Petrol</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mb-1">
                        <Image src="/placeholder.svg?height=20&width=20" alt="icon" width={20} height={20} />
                      </div>
                      <span className="text-xs text-gray-500">Auto</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mb-1">
                        <Image src="/placeholder.svg?height=20&width=20" alt="icon" width={20} height={20} />
                      </div>
                      <span className="text-xs text-gray-500">Sedan</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-primary text-xl">$85,000</span>
                    <Button size="sm" className="bg-primary hover:bg-primary/90">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>

              {/* Car Card 6 */}
              <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                <div className="relative h-48 sm:h-56">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ferrari-488-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.jpg"
                    alt="Ferrari 488"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg">Ferrari 488 GTB</h3>
                  <p className="text-gray-500 text-sm mb-2">2021 • 3,800 miles</p>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mb-1">
                        <Image src="/placeholder.svg?height=20&width=20" alt="icon" width={20} height={20} />
                      </div>
                      <span className="text-xs text-gray-500">Petrol</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mb-1">
                        <Image src="/placeholder.svg?height=20&width=20" alt="icon" width={20} height={20} />
                      </div>
                      <span className="text-xs text-gray-500">Auto</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mb-1">
                        <Image src="/placeholder.svg?height=20&width=20" alt="icon" width={20} height={20} />
                      </div>
                      <span className="text-xs text-gray-500">Coupe</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-primary text-xl">$175,000</span>
                    <Button size="sm" className="bg-primary hover:bg-primary/90">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <Button variant="outline" className="mr-2">
                Previous
              </Button>
              <Button variant="outline" className="bg-primary text-white">
                1
              </Button>
              <Button variant="outline" className="mx-2">
                2
              </Button>
              <Button variant="outline" className="mr-2">
                3
              </Button>
              <Button variant="outline">Next</Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-16 bg-primary">
          <div className="container mx-auto px-4 text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Can't Find What You're Looking For?</h2>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              Contact our team and let us help you find your dream car. We have access to a wide network of premium
              vehicles.
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
