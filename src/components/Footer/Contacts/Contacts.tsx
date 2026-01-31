import React from "react";
import s from "./Contacts.module.css";
import Link from "next/link";

const Contacts = () => {
  const contactList = [
    {
      id: 0,
      src: "/sprite.svg#icon-watsapp",
      href: "viber://chat?number=%2B380991885637",
    },
    {
      id: 1,
      src: "/sprite.svg#icon-telegram",
      href: "https://t.me/+380991885637",
    },
  ];
  return (
    <div>
      <div className={s.wrappContacts}>
        <h3 className={s.title}>Контакти</h3>
        <div className={s.wrappLoc}>
          <svg className={s.icon_a}>
            <use href="/sprite.svg#icon-location"></use>
          </svg>
          <p className={s.address}>
            Рівненська обл., Рівненський р-н,
            <span>с. Велика Омеляна, вул. Шевченка, 35</span>
          </p>
        </div>
        <div className={s.wrappTel}>
          <svg className={s.icon_a}>
            <use href="/sprite.svg#icon-phone"></use>
          </svg>
          <div className={s.phone}>
            <Link href="tel:+38 099 188 56 37">+38 099 188 56 37</Link>
          </div>
          <div className={s.otherSoc}>
            {contactList.map((item) => (
              <Link
                href={item.href}
                key={item.id}
                className={s.iconBlock}
                target="_blank"
              >
                <svg className={s.icon_aa}>
                  <use href={item.src}></use>
                </svg>
              </Link>
            ))}
          </div>
        </div>
        <div className={s.wrappMail}>
          <svg className={s.icon_a}>
            <use href="/sprite.svg#icon-email"></use>
          </svg>
          <p className={s.mail}>zadynamik@ukr.net</p>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
