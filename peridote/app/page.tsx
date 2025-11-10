import Image from "next/image";
import Header from "@/app/components/header";
import Hero from "@/app/components/hero";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white ">
      <Header />
      <Hero />
    </div>
  );
}