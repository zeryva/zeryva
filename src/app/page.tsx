"use client";
// import dynamic from "next/dynamic";

import Hero from "@/components/Sections/Hero/Hero";
import dynamic from "next/dynamic";
// import Call from "@/components/Sections/Call/Call";
// import About from "@/components/Sections/About/About";
// import Bestsellers from "@/components/Sections/Bestsellers/Bestsellers";
// const Hero = dynamic(() => import("@/components/Sections/Hero/Hero"), {
// 	ssr: false,
// });
const About = dynamic(() => import("@/components/Sections/About/About"), {
  ssr: false,
});
const Bestsellers = dynamic(
  () => import("@/components/Sections/Bestsellers/Bestsellers"),
  {
    ssr: false,
  },
);
const Call = dynamic(() => import("@/components/Sections/Call/Call"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Bestsellers />
      <Call />
    </>
  );
}
