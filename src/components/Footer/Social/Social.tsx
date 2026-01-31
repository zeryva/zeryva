import Link from "next/link";
import React from "react";
import s from "./Social.module.css";

const Social = () => {
  const socialList = [
    {
      id: 0,
      src: "/sprite.svg#icon-instagram",
      href: "https://www.instagram.com/zeryva_?igsh=cmNqOTh5MnZ2eDlz",
    },
    {
      id: 1,
      src: "/sprite.svg#icon-tiktokk",
      href: "https://www.tiktok.com/@zeryva_?_t=ZM-90Z94XolicV&_r=1",
    },
    {
      id: 2,
      src: "/sprite.svg#icon-facebook",
      href: "https://www.facebook.com/Zeryvaa/?rdid=gdSoZRg4myc63N5i",
    },
    {
      id: 3,
      src: "/sprite.svg#icon-youtubee",
      href: "https://www.youtube.com/@zeryva",
    },
  ];
  const handleDownload = () => {
    window.open("/doc/katalog.pdf", "_blank", "noopener,noreferrer");
  };
  return (
    <div>
      <h3 className={s.title}>Соціальні мережі</h3>
      <div className={s.socialItem}>
        {socialList.map((item) => (
          <Link
            href={item.href}
            key={item.id}
            className={s.iconBlock}
            target="_blank"
          >
            <svg className={s.icon}>
              <use href={item.src}></use>
            </svg>
          </Link>
        ))}
      </div>

      <button type="button" className={s.btnSoc} onClick={handleDownload}>
        Завантажити каталог
      </button>
    </div>
  );
};

export default Social;
