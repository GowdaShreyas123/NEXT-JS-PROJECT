"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Sun, Moon, Menu, X, Mail, Phone, MapPin } from 'lucide-react';
import { useToggleStore } from '@/app/stores/useToggleStore';

// Zod validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name is required and must be at least 2 characters'),
  email: z.string().email('Enter a valid email'),
  message: z.string().min(5, 'Message must be at least 5 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

// Sidebar component
const Sidebar = ({ activePath, closeSidebar }: { activePath: string; closeSidebar: () => void }) => (
  <aside className="fixed top-0 left-0 h-full w-full sm:w-64 z-50 bg-gradient-to-br from-white/20 to-white/10 dark:from-black/30 dark:to-black/10 backdrop-blur-xl shadow-xl border-r border-white/20 dark:border-white/30 transition-transform duration-300 ease-in-out">
    <div className="pt-20 px-6 text-black dark:text-white">
      <button 
        onClick={closeSidebar}
        className="absolute top-4 right-4 p-2 rounded-full bg-white/20 dark:bg-black/20"
      >
        <X size={24} />
      </button>
      
      <h2 className="text-xl font-bold mb-8 tracking-wider mt-8">Navigation</h2>
      <ul className="space-y-3">
        {[
          { href: '/profile', label: 'Profile' },
          { href: '/Signin', label: 'Signin' },
          { href: '/dashboard', label: 'Dashboard' },
          { href: '/components/blogs', label: 'Blogs' },
        ].map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`block py-3 px-4 rounded-lg transition-all duration-300 font-medium ${
                activePath === item.href
                  ? 'bg-purple-600/90 text-white shadow-md'
                  : 'hover:bg-purple-500/60 hover:text-white dark:hover:text-white'
              }`}
              onClick={closeSidebar}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </aside>
);

// Main Page Component
export default function ContactPage() {
  const [showSidebar, setShowSidebar] = useState(false);
  const isDarkMode = useToggleStore((state) => state.isDarkMode);
  const toggleDarkMode = useToggleStore((state) => state.toggleDarkMode);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactFormData) => {
    console.log('Form submitted:', data);
    alert("Message sent successfully!");
    reset();
  };

  const toggleSidebar = () => setShowSidebar((prev) => !prev);
  const closeSidebar = () => setShowSidebar(false);

  useEffect(() => {
    if (showSidebar && window.innerWidth < 640) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showSidebar]);

  return (
    <div className={`relative min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-600'} p-4 sm:p-6 md:p-8 lg:p-12 xl:p-24`}>
      {showSidebar && (
        <Sidebar 
          activePath={typeof window !== "undefined" ? window.location.pathname : ""} 
          closeSidebar={closeSidebar}
        />
      )}


      {/* Main content */}
      <div className={`transition-all duration-300 ${showSidebar ? 'md:translate-x-64' : ''}`}>
        <div className="flex items-center justify-center mt-32 mb-6">
          <div className="max-w-6xl w-full flex flex-col lg:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Left Info Panel */}
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

            {/* Right Contact Form */}
            <div className={`p-10 lg:w-1/2 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
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
                    className={`w-full p-3 rounded border focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-gray-50 border-gray-300 text-gray-900'
                    }`}
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
                    className={`w-full p-3 rounded border focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-gray-50 border-gray-300 text-gray-900'
                    }`}
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
                    className={`w-full p-3 rounded border focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-gray-50 border-gray-300 text-gray-900'
                    }`}
                  />
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
