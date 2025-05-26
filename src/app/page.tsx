import Image from "next/image";
import Navbar from "./components/HeroSection";
import TestimonialCard from "./components/first";
import ContactSection from "./components/second";



export default function Home() {
  return (
    <>
      <Navbar/>
      <TestimonialCard/>
      <ContactSection/>
     
    </>
  );
}
