// ContactSection.tsx
'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  message: z.string().min(1, 'Message is required'),
})

type ContactFormData = z.infer<typeof contactSchema>

const ContactSection: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = (data: ContactFormData) => {
    console.log('Form submitted:', data)
    reset()
  }

  return (
    
    <div className= "flex items-center justify-center min-h-screen bg-teal-500 text-white p-10 flex flex-col lg:flex-row justify-between  w-screen mx-auto">
      {/* Left Section */}
      <div className="lg:w-1/2">
        <p className="text-sm mb-2">Help Us 24/7</p>
        <h2 className="text-4xl font-bold mb-4">What Can We Offer for Your Business</h2>
        <p className="mb-6">Sample text. Click to select the text box. Click again or double click to start editing the text.</p>
        <ul className="space-y-2 mb-6 font-semibold">
          <li>• 65 Street, Network City, NYPD</li>
          <li>• Which don’t Look Even Slightly Believable</li>
          <li>• +1 222 545 55 44</li>
        </ul>
        <p className="text-2xl font-bold">
          Quick Support Number<br />
          <span className="text-white text-3xl">(+99 6984 5698 56)</span>
        </p>
      </div>

      {/* Right Section - Form */}
      <div className="bg-white text-black p-8 rounded-md lg:w-1/2 shadow-md">
        <h3 className="text-lg font-semibold text-teal-700 mb-2">Contact Us</h3>
        <h2 className="text-2xl font-light mb-4">Request A Quote</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1">Name</label>
            <input
              type="text"
              {...register('name')}
              placeholder="Enter your Name"
              className="w-full p-2 bg-gray-100 border border-gray-300 rounded"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <label className="block mb-1">Message</label>
            <textarea
              {...register('message')}
              placeholder="Enter your message"
              className="w-full p-2 bg-gray-100 border border-gray-300 rounded"
              rows={5}
            />
            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
          </div>
          <button type="submit" className="bg-purple-400 text-white px-6 py-2 rounded hover:bg-purple-500 transition">
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default ContactSection
