import Image from "next/image";
import Header from "@/app/components/header";
import Hero from "@/app/components/hero";
import  Choose from "@/app/components/choose";
import Why from "@/app/components/why";
import Service from "@/app/components/service";
import Ready from "@/app/components/ready";
import Footer from "@/app/components/footer";
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white ">
      <Header />
      <Hero />
      <Choose />
      <Why /> 
      <Service/>
      <Ready/>
      <Footer/>
    </div>
  );
}