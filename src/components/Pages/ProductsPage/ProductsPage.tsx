"use client";

import React, { Suspense } from "react";
import s from "./ProductsPage.module.css";
import Products from "./Products/Products";
import BreadCrumbs from "@/components/Sections/UI/BreadCrumbs/BreadCrumbs";
import dynamic from "next/dynamic";
// import TitleVideo from "./TitleVideo/TitleVideo";
const TitleVideo = dynamic(() => import("./TitleVideo/TitleVideo"), {
  ssr: false,
});

const ProductsPage = () => {
  return (
    <div className={s.cont}>
      <BreadCrumbs
        crumbs={[{ label: "Головна", href: "/" }, { label: "Продукти" }]}
      />
      <TitleVideo />
      <Suspense fallback={<p>Завантаження продуктів...</p>}>
        <Products />
      </Suspense>
    </div>
  );
};

export default ProductsPage;
