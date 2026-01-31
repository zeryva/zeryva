import React from "react";
import Navigation from "./Navigation/Navigation";
import Contacts from "./Contacts/Contacts";
import Social from "./Social/Social";
import Link from "next/link";
import Image from "next/image";
import s from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={s.footer}>
      <div className={s.contFooter}>
        <div className={s.logo}>
          <Link href="/">
            <Image
              src="/logo.svg"
              width={81}
              height={68}
              alt="logo"
              className={s.logoImage}
            />
          </Link>
        </div>
        <div className={s.nav}>
          <Navigation />
        </div>
        <div className={s.contacts}>
          <Contacts />
        </div>
        <div className={s.socials}>
          <Social />
        </div>
      </div>
    </div>
  );
};

export default Footer;
