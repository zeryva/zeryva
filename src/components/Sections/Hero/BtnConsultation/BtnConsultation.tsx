import React, { useState } from "react";
import s from "./BtnConsultation.module.css";
import Portal from "../Portal/Portal";
import dynamic from "next/dynamic";
// import Consultation from "../Consultation/Consultation";
const Consultation = dynamic(() => import("../Consultation/Consultation"), {
  ssr: false,
});
import Link from "next/link";
import { socialList } from "../../UI/data/data";

type IsScroledProp = {
  isScrolled?: boolean;
};

const BtnConsultation = ({ isScrolled }: IsScroledProp) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <ul
        className={`${s.socialList} ${isScrolled ? s.socialListVisible : ""}`}
      >
        {socialList.map((item) => (
          <li key={item.id} className={s.socialItem}>
            <Link href={item.href} target="_blank">
              <svg className={s.icon}>
                <use href={item.src}></use>
              </svg>
            </Link>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className={s.elipse}
        onClick={() => setOpenModal(true)}
      >
        Замовити консультацію
      </button>
      {openModal && (
        <Portal>
          <Consultation setOpenModal={setOpenModal} />
        </Portal>
      )}
    </>
  );
};

export default BtnConsultation;
