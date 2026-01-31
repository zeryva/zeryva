"use client";
import React, { useEffect, useRef, useState } from "react";
import s from "./Bestsellers.module.css";
import { BestsellerItem } from "./BestsellerItem/BestsellerItem";
import { useSmoothScroll } from "../../../../utils/useSmoothScroll";
import Image from "next/image";
import { useCustomScrollbar } from "../../../../utils/useCustomScrollbar";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../../../../firebaseConfig";
import { ProductWithId } from "../../../../utils/types";
import useScrollAnimation from "../../../../utils/UseScrollAnimation/useScrollAnimation";

const Bestsellers = () => {
  const [aboutTitleRef, aboutTitleVisible] = useScrollAnimation() as [
    React.RefObject<HTMLDivElement>,
    boolean,
  ];

  const listRef = useRef<HTMLUListElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  const [products, setProducts] = useState<ProductWithId[]>([]);

  useEffect(() => {
    const fetchBestsellers = async () => {
      const q = query(
        collection(db, "products"),
        orderBy("createdAt", "asc"),
        where("isBestseller", "==", true),
      );

      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<ProductWithId, "id">),
      }));

      setProducts(data);
    };

    fetchBestsellers();
  }, []);

  useCustomScrollbar(listRef, thumbRef);

  const { scrollSmooth } = useSmoothScroll(listRef, {
    slidesToScroll: 1,
    gap: 20,
    duration: 500,
  });
  return (
    <div className={`container ${s.bestsCont}`}>
      <div>
        <h2
          ref={aboutTitleRef}
          className={`${s.title} ${s.animateTitle} ${
            aboutTitleVisible ? s.visible : ""
          }`}
        >
          Хіти продажу
        </h2>
        <p className={s.text}>
          Препарати, що стабільно підвищують врожайність і економлять час та
          ресурси
        </p>

        <ul className={s.list} ref={listRef}>
          {products.map((product) => (
            <BestsellerItem key={product.id} product={product} />
          ))}
        </ul>

        <div className={s.sliderControls}>
          <button onClick={() => scrollSmooth("left")} className={s.navButton}>
            <svg className={s.arrLeft}>
              <use href="/sprite.svg#icon-hero-arrow-left"></use>
            </svg>
          </button>
          <button onClick={() => scrollSmooth("right")} className={s.navButton}>
            <svg className={s.arrRight}>
              <use href="/sprite.svg#icon-hero-arrow-left"></use>
            </svg>
          </button>
        </div>
        <div className={s.scrollbar}>
          <div ref={thumbRef} className={s.thumb} />
        </div>
      </div>
    </div>
  );
};

export default Bestsellers;
