'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mail, Phone, MapPin } from 'lucide-react'

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required and must be at least 2 characters'),
  email: z.string().email('Enter a valid email'),
  message: z.string().min(5, 'Message must be at least 5 characters'),
})

type ContactFormData = z.infer<typeof contactSchema>

const ContactSection: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = (data: ContactFormData) => {
    console.log('Form submitted:', data)
    reset()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-600 px-6 py-12">
      <div className="max-w-6xl w-full flex flex-col lg:flex-row  bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Left Section */}
        <div className="bg-gradient-to-br from-teal-600 to-cyan-700 text-white p-10 lg:w-1/2 flex flex-col justify-between">
          <div>
            <p className="text-sm uppercase mb-2 tracking-wider">Contact Info</p>
            <h2 className="text-3xl font-bold mb-6 leading-tight">Let's Get in Touch</h2>
            <p className="mb-8 text-gray-100">We're here to help. Fill out the form and we'll get back to you shortly.</p>

            <ul className="space-y-4 text-white text-sm font-medium">
              <li className="flex items-center gap-3">
                <MapPin size={18} /> 65 Street, Network City, NYPD
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} /> +1 222 545 55 44
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} /> support@example.com
              </li>
            </ul>
          </div>
          <p className="mt-10 text-sm text-gray-300">Quick Support: <br /><span className="text-xl font-semibold">(+99 6984 5698 56)</span></p>
        </div>

        {/* Right Section - Form */}
        <div className="p-10 lg:w-1/2 bg-white text-gray-800">
          <h3 className="text-lg font-semibold text-teal-700 mb-1">Contact Us</h3>
          <h2 className="text-2xl font-light mb-6">Request A Quote</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block mb-1 text-sm font-medium">Name</label>
              <input
                {...register('name')}
                type="text"
                placeholder="Your full name"
                className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 text-sm font-medium">Email</label>
              <input
                {...register('email')}
                type="email"
                placeholder="you@example.com"
                className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            {/* Message */}
            <div>
              <label className="block mb-1 text-sm font-medium">Message</label>
              <textarea
                {...register('message')}
                rows={5}
                placeholder="Tell us about your project"
                className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50"
              />
              {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-teal-600 text-white font-semibold py-3 rounded hover:bg-teal-700 transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ContactSection
