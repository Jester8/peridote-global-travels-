"use client";

import { useEffect, useState } from "react";
import Header from "@/app/components/header";
import Hero from "@/app/components/hero";
import Why from "@/app/components/why";
import Service from "@/app/components/service";
import Ready from "@/app/components/ready";
import Footer from "@/app/components/footer";
import Chatbot from "@/app/components/chatbot";
import { ChevronUp } from "lucide-react";

export default function Home() {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-white relative">
      <Header />
      <Hero />
      {/* Removed Choose component as requested */}
      <Why /> 
      <Service/>
      <Ready/>
      <Footer/>
      
      {/* Chatbot Component - Position adjusted */}
      <div className="fixed z-50">
        <Chatbot />
      </div>
      
      {/* Scroll to Top Button - Moved to left side */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 left-6 z-40 bg-cyan-500 hover:bg-cyan-600 text-white p-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform ${
          showScrollButton 
            ? 'translate-y-0 opacity-100' 
            : 'translate-y-10 opacity-0 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ChevronUp size={24} />
      </button>
    </div>
  );
}