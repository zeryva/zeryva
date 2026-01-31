"use client";

import { useRouter } from "next/navigation";
import React from "react";
import s from "./MenuSide.module.css";

export type AdminSection = "add" | "products";
type MenuSideProps = {
  onSelect: (section: AdminSection) => void;
  active: AdminSection;
};
const MenuSide = ({ onSelect, active }: MenuSideProps) => {
  const menuList = [
    {
      id: 0,
      name: "Додати продукт",
      section: "add" as const,
    },
    {
      id: 1,
      name: "Всі продукти",
      section: "products" as const,
    },
  ];
  const router = useRouter();
  const menuExit = [
    {
      id: 0,
      icon: "/sprite.svg#icon-hero-arrow-left",
      name: "На сайт",
      path: "/",
    },
    {
      id: 1,
      icon: "/sprite.svg#icon-hero-arrow-left",
      name: "Вийти з аккаунту",
      path: "/login",
    },
  ];
  return (
    <div className={s.menuSideWrapper}>
      <div className={s.menuTop}>
        <div className={s.menuList}>
          {menuList.map((item) => (
            <button
              key={item.id}
              className={`${s.menuItem} ${
                active === item.section ? s.active : ""
              }`}
              onClick={() => onSelect(item.section)}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
      <ul className={s.menuList}>
        {menuExit.map((item) => (
          <li
            key={item.id}
            className={s.menuItem}
            onClick={() => router.push(item.path)}
            style={{ cursor: "pointer" }}
          >
            <div className={s.menuIconBlock}>
              <svg className={`${s.iconMenu} ${item.id === 1 && s.icon}`}>
                <use href={item.icon}></use>
              </svg>
            </div>
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuSide;
