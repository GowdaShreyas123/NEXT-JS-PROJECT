"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useToggleStore } from '@/app/stores/useToggleStore';

const Sidebar = ({ activePath, closeSidebar }: { activePath: string; closeSidebar: () => void }) => (
  <aside className="fixed top-16 left-0 h-full w-64 z-50 bg-gradient-to-br from-white/20 to-white/10 dark:from-black/30 dark:to-black/10 backdrop-blur-xl shadow-xl border-r border-white/20 dark:border-white/30 transition-transform duration-300 ease-in-out">
    <div className="pt-20 px-6 text-black dark:text-white">
      <button 
        onClick={closeSidebar}
        className="absolute top-4 right-4 p-2 rounded-full bg-white/20 dark:bg-black/20 "
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

const testimonials = [
  {
    name: 'Alice Johnson',
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
    quote: 'John has been a fantastic client. He always goes above and beyond to deliver high-quality work.',
  },
  {
    name: 'David Smith',
    image: 'https://randomuser.me/api/portraits/men/2.jpg',
    quote: 'Working with David was a pleasure. His expertise and patience are unmatched.',
  },
  {
    name: 'Sophia Lee',
    image: 'https://randomuser.me/api/portraits/women/3.jpg',
    quote: 'Sophia’s designs are clean and elegant. She has a great eye for detail.',
  },
];

export default function HomePageWithSidebar() {
  const [index, setIndex] = useState(0);
  const [showSidebar, setShowSidebar] = useState(false);

  const isDarkMode = useToggleStore((state) => state.isDarkMode);
  const toggleDarkMode = useToggleStore((state) => state.toggleDarkMode);

  const next = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  const selectTestimonial = (i: number) => setIndex(i);
  const toggleSidebar = () => setShowSidebar((prev) => !prev);
  const closeSidebar = () => setShowSidebar(false);

  const testimonial = testimonials[index];

  return (
    <div className={`relative min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} p-4 sm:p-6 md:p-8 lg:p-12 xl:p-24`}>
      {showSidebar && (
        <Sidebar 
          activePath={typeof window !== "undefined" ? window.location.pathname : ""} 
          closeSidebar={closeSidebar}
        />
      )}

      <div className="flex justify-center items-center mt-8 mb-6 py-4">
       
        <button 
          onClick={toggleDarkMode}
          className="p-2 rounded-lg bg-white/20 dark:bg-black/20 "
        >
          {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </div>

      <div className="flex flex-col items-center">
        <div className="cursor-pointer mb-8" onClick={toggleSidebar}>
          <img src="/logo.jpg" alt="logo" width={50} />
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-4 text-center">
          Our Clients Say
        </h2>

        <div
          className={`p-6 sm:p-8 mt-8 w-full max-w-md rounded-lg shadow-lg transition-colors duration-300 ${
            isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
          }`}
          style={{ minHeight: "350px" }}
        >
          <div className="flex justify-center mb-6">
            <div className="p-1 border-4 border-green-500 rounded-full">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover"
              />
            </div>
          </div>
          <p className={`mb-4 min-h-[80px] text-sm sm:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            "{testimonial.quote}"
          </p>
          <p className={`font-bold text-base sm:text-lg min-h-[24px] ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
            {testimonial.name}
          </p>

          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, i) => (
              <span
                key={i}
                onClick={() => selectTestimonial(i)}
                className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-200 ${
                  i === index ? 'bg-purple-500' : isDarkMode ? 'bg-gray-600' : 'bg-gray-300'
                }`}
              ></span>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-6 space-x-4">
          <button
            onClick={prev}
            className="bg-purple-500 text-white w-10 h-10 sm:w-12 sm:h-12 rounded-md flex items-center justify-center"
          >
            &lt;
          </button>
          <button
            onClick={next}
            className="bg-purple-500 text-white w-10 h-10 sm:w-12 sm:h-12 rounded-md flex items-center justify-center"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}