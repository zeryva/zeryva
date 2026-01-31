"use client";
import React from "react";
import s from "./ServicesList.module.css";
import { servicesList } from "@/components/Sections/UI/data/data";
import Image from "next/image";
import useScrollAnimation from "../../../../../utils/UseScrollAnimation/useScrollAnimation";

const ServicesList = () => {
  const [servicesTitleRef, servicesTitleVisible] = useScrollAnimation() as [
    React.RefObject<HTMLDivElement>,
    boolean,
  ];
  const [servicesBlockRef, servicesBlockVisible] = useScrollAnimation() as [
    React.RefObject<HTMLDivElement>,
    boolean,
  ];
  return (
    <section className={s.servicesSection}>
      <div className="container">
        <div className={s.servicesWrapper}>
          <h2
            ref={servicesTitleRef}
            className={`${s.title} ${s.animateTitle} ${
              servicesTitleVisible ? s.visible : ""
            }`}
          >
            Що входить до послуг «Зерива:
          </h2>
          <div
            ref={servicesBlockRef}
            className={`${s.servicesBlock} ${s.animateBlock} ${
              servicesBlockVisible ? s.visible : ""
            }`}
          >
            <ul className={s.servicesList}>
              {servicesList.map((item) => (
                <li key={item.id} className={s.servicesItem}>
                  <div className={s.servicesIconBlock}>
                    <svg className={s.iconServices}>
                      <use href={item.src}></use>
                    </svg>
                  </div>
                  <p className={s.text}>{item.text}</p>
                </li>
              ))}
            </ul>
            <div className={s.lastServicesItem}>
              <div className={s.textBlock}>
                <p className={s.text}>
                  Послуги орієнтовані на фермерські господарства та
                  агропідприємства, які прагнуть підвищити ефективність
                  виробництва, оптимізувати витрати та отримувати прогнозований
                  результат у реальних польових умовах.
                </p>
              </div>

              <div className={s.imageWrapper}>
                <Image
                  src="/Page/Services/nikolett.webp"
                  fill
                  sizes="100vw"
                  alt="image_nikollet"
                  className={s.image}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesList;
