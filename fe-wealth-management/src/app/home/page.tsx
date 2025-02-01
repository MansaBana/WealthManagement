// "use client"
// import '../../../styles/global.css';
// import { useState, useEffect } from 'react'
// import { motion } from 'framer-motion'
// import { Menu, X, ChevronRight, Clock, MapPin, Star } from 'lucide-react'
// import Link from 'next/link'
// import Image from 'next/image'



// export default function LandingPage() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false)

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 768) {
//         setIsMenuOpen(false)
//       }
//     }

//     window.addEventListener('resize', handleResize)
//     return () => window.removeEventListener('resize', handleResize)
//   }, [])

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
//       <header className="bg-white shadow-sm">
//         <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
//           <Link href="/" className="text-2xl font-bold text-blue-600">
//             GymSlot
//           </Link>
//           <div className="hidden md:flex space-x-6">
//             <NavLink href="#features">Features</NavLink>
//             <NavLink href="#how-it-works">How It Works</NavLink>
//             <NavLink href="#testimonials">Testimonials</NavLink>
//           </div>
//           <div className="hidden md:block">
//             <Link
//               href="/signup"
//               className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
//             >
//               Sign Up
//             </Link>
//           </div>
//           <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
//             {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </nav>
//         {isMenuOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             className="md:hidden bg-white px-4 py-2"
//           >
//             <NavLink href="#features" onClick={() => setIsMenuOpen(false)}>
//               Features
//             </NavLink>
//             <NavLink href="#how-it-works" onClick={() => setIsMenuOpen(false)}>
//               How It Works
//             </NavLink>
//             <NavLink href="#testimonials" onClick={() => setIsMenuOpen(false)}>
//               Testimonials
//             </NavLink>
//             <Link
//               href="/signup"
//               className="block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 mt-2"
//               onClick={() => setIsMenuOpen(false)}
//             >
//               Sign Up
//             </Link>
//           </motion.div>
//         )}
//       </header>

//       <main className="flex-grow">
//         <HeroSection />
//         <FeaturesSection />
//         <HowItWorksSection />
//         <TestimonialsSection />
//       </main>

//       <Footer />
//     </div>
//   )
// }

// function NavLink({ href, children, ...props }) {
//   return (
//     <Link href={href} className="text-gray-600 hover:text-blue-600 transition duration-300" {...props}>
//       {children}
//     </Link>
//   )
// }

// function HeroSection() {
//   return (
//     <section className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-20">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col md:flex-row items-center container">
//           <div className="md:w-1/2 mb-8 md:mb-0">
//             <motion.h1
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//               className="text-4xl md:text-5xl font-bold mb-4"
//             >
//               Book Your Gym Time with Ease
//             </motion.h1>
//             <motion.p
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//               className="text-xl mb-6"
//             >
//               Find and reserve slots at nearby gyms, anytime, anywhere.
//             </motion.p>
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.4 }}
//             >
//               <Link
//                 href="/signin"
//                 className="bg-white text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition duration-300"
//               >
//                 Get Started
//               </Link>
//             </motion.div>
//           </div>
//           <div className="md:w-1/2">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.5 }}
//               className="relative h-64 md:h-96 rounded-lg overflow-hidden shadow-xl"
//             >
//               {/* <Image
//                 src="/placeholder.svg?height=600&width=800"
//                 alt="Gym interior"
//                 layout="fill"
//                 objectFit="cover"
//                 className="rounded-lg"
//               /> */}
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

// function FeaturesSection() {
//   const features = [
//     { icon: <Clock size={24} />, title: 'Flexible Scheduling', description: 'Book slots that fit your schedule' },
//     { icon: <MapPin size={24} />, title: 'Nearby Gyms', description: 'Find gyms in your area with ease' },
//     { icon: <Star size={24} />, title: 'User Reviews', description: 'Read and leave reviews for gyms' },
//   ]

//   return (
//     <section id="features" className="py-20 bg-white container">
//       <div className="container mx-auto px-4">
//         <h2 className="text-3xl font-bold text-center mb-12">Why Choose GymSlot?</h2>
//         <div className="grid md:grid-cols-3 gap-8">
//           {features.map((feature, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//               className="bg-gray-50 p-6 rounded-lg shadow-md"
//             >
//               <div className="text-blue-600 mb-4">{feature.icon}</div>
//               <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
//               <p className="text-gray-600">{feature.description}</p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }

// function HowItWorksSection() {
//   const steps = [
//     { title: 'Find a Gym', description: 'Search for gyms in your area' },
//     { title: 'Choose a Slot', description: 'Select an available time slot' },
//     { title: 'Book & Pay', description: 'Secure your spot with easy payment' },
//     { title: 'Work Out', description: 'Show up and enjoy your gym session' },
//   ]

//   return (
//     <section id="how-it-works" className="py-20 bg-gray-50 container">
//       <div className="container mx-auto px-4">
//         <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
//         <div className="grid md:grid-cols-4 gap-8">
//           {steps.map((step, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//               className="flex flex-col items-center text-center"
//             >
//               <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
//                 {index + 1}
//               </div>
//               <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
//               <p className="text-gray-600">{step.description}</p>
//               {/* {index < steps.length - 1 && (
//                 <ChevronRight className="text-blue-600 mt-4 hidden md:block" size={24} />
//               )} */}
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }

// function TestimonialsSection() {
//   const testimonials = [
//     { name: 'Sarah L.', quote: 'GymSlot made it so easy to find and book gym time. I love the flexibility!' },
//     { name: 'Mike T.', quote: 'As a frequent traveler, this app is a game-changer for keeping up with my workouts.' },
//     { name: 'Emily R.', quote: 'The user reviews helped me find the perfect gym for my needs. Highly recommended!' },
//   ]

//   return (
//     <section id="testimonials" className="py-20 bg-white container">
//       <div className="container mx-auto px-4">
//         <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
//         <div className="grid md:grid-cols-3 gap-8">
//           {testimonials.map((testimonial, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//               className="bg-gray-50 p-6 rounded-lg shadow-md"
//             >
//               <p className="text-gray-600 mb-4">"{testimonial.quote}"</p>
//               <p className="font-semibold text-blue-600">{testimonial.name}</p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }

// function Footer() {
//   return (
//     <footer className="bg-gray-800 text-white py-8">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col md:flex-row justify-between items-center">
//           <div className="mb-4 md:mb-0">
//             <Link href="/" className="text-2xl font-bold">
//               GymSlot
//             </Link>
//             <p className="text-sm mt-2">Book your gym time with ease</p>
//           </div>
//           <div className="flex space-x-4">
//             <NavLink href="/about">About</NavLink>
//             <NavLink href="/contact">Contact</NavLink>
//             <NavLink href="/privacy">Privacy Policy</NavLink>
//             <NavLink href="/terms">Terms of Service</NavLink>
//           </div>
//         </div>
//         <div className="mt-8 text-center text-sm">
//           &copy; {new Date().getFullYear()} GymSlot. All rights reserved.
//         </div>
//       </div>
//     </footer>
//   )
// }

'use client'
import "../../../styles/global.css"
import { ArrowDown, ArrowUp, Clock, DollarSign, LineChart, PiggyBank, Plus, Wallet } from "lucide-react"

export default function WealthDashboard() {
  return (
    <div className="flex min-h-screen flex-col gap-4 p-4 md:p-8 bg-slate-50">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, Alex</h1>
        <p className="text-zinc-500">Here's your financial overview for October 2023</p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-sm font-medium">Total Balance</h3>
            <DollarSign className="h-4 w-4 text-zinc-500" />
          </div>
          <div className="text-2xl font-bold">$82,451.00</div>
          <div className="flex items-center gap-1 text-sm text-green-600">
            <ArrowUp className="h-4 w-4" />
            4.3% from last month
          </div>
        </div>

        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-sm font-medium">Investments</h3>
            <LineChart className="h-4 w-4 text-zinc-500" />
          </div>
          <div className="text-2xl font-bold">$58,302.75</div>
          <div className="flex items-center gap-1 text-sm text-red-600">
            <ArrowDown className="h-4 w-4" />
            1.2% from last month
          </div>
        </div>

        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-sm font-medium">Savings</h3>
            <PiggyBank className="h-4 w-4 text-zinc-500" />
          </div>
          <div className="text-2xl font-bold">$21,548.25</div>
          <div className="flex items-center gap-1 text-sm text-green-600">
            <ArrowUp className="h-4 w-4" />
            2.5% from last month
          </div>
        </div>

        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-sm font-medium">Cash</h3>
            <Wallet className="h-4 w-4 text-zinc-500" />
          </div>
          <div className="text-2xl font-bold">$2,600.00</div>
          <div className="flex items-center gap-1 text-sm text-zinc-500">No change</div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="rounded-lg border bg-white p-4 shadow-sm lg:col-span-4">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Portfolio Breakdown</h2>
            <p className="text-sm text-zinc-500">Your asset allocation</p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-blue-500" />
                  Stocks (60%)
                </div>
                <span>$34,981.65</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100">
                <div className="h-full w-[60%] rounded-full bg-blue-500" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                  Bonds (25%)
                </div>
                <span>$14,575.69</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100">
                <div className="h-full w-[25%] rounded-full bg-green-500" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  Real Estate (10%)
                </div>
                <span>$5,830.27</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100">
                <div className="h-full w-[10%] rounded-full bg-yellow-500" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-purple-500" />
                  Crypto (5%)
                </div>
                <span>$2,915.14</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100">
                <div className="h-full w-[5%] rounded-full bg-purple-500" />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-white p-4 shadow-sm lg:col-span-3">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Recent Transactions</h2>
            <p className="text-sm text-zinc-500">Your latest financial activities</p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100">
                <ArrowDown className="h-4 w-4 text-green-600" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">Received from John Doe</p>
                <p className="text-xs text-zinc-500">Oct 24, 2023</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-green-600">+$250.00</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-100">
                <ArrowUp className="h-4 w-4 text-red-600" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">Stock Purchase - AAPL</p>
                <p className="text-xs text-zinc-500">Oct 23, 2023</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-red-600">-$1,500.00</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100">
                <ArrowDown className="h-4 w-4 text-green-600" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">Dividend Payment</p>
                <p className="text-xs text-zinc-500">Oct 22, 2023</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-green-600">+$75.50</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <button className="inline-flex items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-black/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black">
          <Plus className="mr-2 h-4 w-4" />
          Add Investment
        </button>
        <button className="inline-flex items-center justify-center rounded-md border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black">
          <Clock className="mr-2 h-4 w-4" />
          Transaction History
        </button>
      </div>
    </div>
  )
}

