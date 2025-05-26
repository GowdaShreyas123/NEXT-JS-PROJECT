'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Sidebar = () => (
  <nav className="flex flex-col bg-gray-800 mt-16 text-white w-64 h-screen fixed left-0 top-2 z-50">
    <ul>
        <li className="p-4 hover:bg-yellow-700">
  <Link href="/profile" className="block w-full h-full">
    profile
  </Link>
</li>
<li className="p-4 hover:bg-yellow-700">
  <Link href="/Signin" className="block w-full h-full">
    Signin
  </Link>
</li>
      
      <li className="p-4 hover:bg-yellow-700">
  <Link href="/dashboard" className="block w-full h-full">
    Dashboard
  </Link>
</li>


    </ul>
  </nav>
);

const testimonials = [
  {
    name: 'Alice Johnson',
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
    quote:
      'Alice has been a fantastic teammate. She always goes above and beyond to deliver high-quality work.',
  },
  {
    name: 'David Smith',
    image: 'https://randomuser.me/api/portraits/men/2.jpg',
    quote:
      'Working with David was a pleasure. His expertise and professionalism are unmatched.',
  },
  {
    name: 'Sophia Lee',
    image: 'https://randomuser.me/api/portraits/women/3.jpg',
    quote:
      'Sophia’s designs are clean and elegant. She has a great eye for detail.',
  },
];

export default function HomePageWithSidebar() {
  const [index, setIndex] = useState(0);
  const [showSidebar, setShowSidebar] = useState(false);

  const next = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  const selectTestimonial = (i: number) => setIndex(i);
  const toggleSidebar = () => setShowSidebar((prev) => !prev);

  const testimonial = testimonials[index];

  // Automatically hide sidebar on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (showSidebar) {
        setShowSidebar(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showSidebar]);

  return (
    <div className="relative min-h-screen bg-gray-100 p-24">
      {showSidebar && <Sidebar />}

      <div className={`flex flex-col items-center transition-all duration-300 ${showSidebar ? 'ml-64' : ''}`}>
        {/* Toggle Sidebar Button */}
        <div className="flex justify-center mb-4 cursor-pointer" onClick={toggleSidebar}>
          <img src="/logo.jpg" alt="Logo" width={50} />
        </div>

        <h2 className="text-6xl font-bold mt-16 text-gray-800">Our Clients Say</h2>

        {/* Testimonial Card */}
        <div className="bg-white p-24 mt-16 w-full md:w-1/2 rounded-lg shadow-lg max-w-lg text-center">
          <div className="flex justify-center mb-8">
            <div className="p-1 border-4 border-green-500 rounded-full">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-40 h-40 rounded-full object-cover"
              />
            </div>
          </div>
          <p className="text-gray-600 mb-4">"{testimonial.quote}"</p>
          <p className="font-bold text-lg text-gray-700">{testimonial.name}</p>

          {/* Dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, i) => (
              <span
                key={i}
                onClick={() => selectTestimonial(i)}
                className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-200 ${
                  i === index ? 'bg-purple-500' : 'bg-gray-300'
                }`}
              ></span>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center mt-6 space-x-4">
          <button
            onClick={prev}
            className="bg-purple-500 text-white w-12 h-12 rounded-md flex items-center justify-center"
          >
            &lt;
          </button>
          <button
            onClick={next}
            className="bg-purple-500 text-white w-12 h-12 rounded-md flex items-center justify-center"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
