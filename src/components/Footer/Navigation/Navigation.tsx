import Link from "next/link";
import React from "react";
import s from "./Navigation.module.css";

const Navigation = () => {
  const navList = [
    { id: 0, src: "/about", text: "Про нас" },
    { id: 1, src: "/products", text: "Продукти" },
    { id: 2, src: "/services", text: "Послуги" },
    { id: 3, src: "/contacts", text: "Контакти" },
  ];
  return (
    <div className={s.navigationCont}>
      <h3 className={s.title}>Навігація</h3>
      <nav className={s.navigation}>
        {navList.map((item) => (
          <Link key={item.id} href={item.src} className={s.link}>
            {item.text}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Navigation;
