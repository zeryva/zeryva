"use client";
import React, { useState } from "react";
import s from "./Call.module.css";
import Image from "next/image";
import Portal from "../Hero/Portal/Portal";
import Consultation from "../Hero/Consultation/Consultation";
import useScrollAnimation from "../../../../utils/UseScrollAnimation/useScrollAnimation";

const Call = () => {
  const [callTitleRef, callTitleVisible] = useScrollAnimation() as [
    React.RefObject<HTMLDivElement>,
    boolean,
  ];
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className={s.wrappCall}>
      <div className={s.callCont}>
        <div className={s.wrappTitle}>
          <h2
            ref={callTitleRef}
            className={`${s.title} ${s.animateTitle} ${
              callTitleVisible ? s.visible : ""
            }`}
          >
            Сильніші рослини – стабільний <span>урожай!</span>
          </h2>
          <button
            type="button"
            className={s.btnCall}
            onClick={() => setOpenModal(true)}
          >
            Замовити консультацію
          </button>
          {openModal && (
            <Portal>
              <Consultation setOpenModal={setOpenModal} />
            </Portal>
          )}
        </div>

        <div className={s.img}>
          <Image
            src="/call/img_desc_4.webp"
            alt="Field"
            fill
            style={{ objectFit: "contain" }}
            priority={false}
            loading="lazy"
            sizes="(max-width: 767px) 138px, 238px"
          />
        </div>
      </div>
    </div>
  );
};

export default Call;
