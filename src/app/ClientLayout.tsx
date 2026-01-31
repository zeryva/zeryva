"use client";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
// import Header from "@/components/Header/Header";
const Header = dynamic(() => import("@/components/Header/Header"), {
  ssr: false,
});
// import Footer from "@/components/Footer/Footer";
const Footer = dynamic(() => import("@/components/Footer/Footer"), {
  ssr: false,
});
// import BtnConsultation from "@/components/Sections/Hero/BtnConsultation/BtnConsultation";
const BtnConsultation = dynamic(
  () => import("@/components/Sections/Hero/BtnConsultation/BtnConsultation"),
  {
    ssr: false,
  },
);
import { useEffect, useState } from "react";

export const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isAdminOrLogin =
    pathname.startsWith("/admin") || pathname.startsWith("/login");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const scrollContainer = document.getElementById("app-scroll");
    if (!scrollContainer) return;

    const handleScroll = () => {
      setIsScrolled(scrollContainer.scrollTop > 80);
    };

    scrollContainer.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const scrollContainer = document.getElementById("app-scroll");
    if (scrollContainer) {
      scrollContainer.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [pathname]);

  return (
    <>
      {!isAdminOrLogin && <Header isScrolled={isScrolled} />}
      {!isAdminOrLogin && <BtnConsultation isScrolled={isScrolled} />}
      <main style={{ flex: 1 }}>{children}</main>
      {!isAdminOrLogin && <Footer />}
    </>
  );
};
