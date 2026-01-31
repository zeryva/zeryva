"use client";
import React, { useState } from "react";
import s from "./MapsCallback.module.css";
import CallbackForm from "@/components/Sections/UI/CallbackForm/CallbackForm";
import Link from "next/link";
import Portal from "@/components/Sections/UI/Portal/Portal";
import Modal from "@/components/Sections/UI/Modal/Modal";
import BlockMaps from "./BlockMaps/BlockMaps";

const MapsCallback = () => {
	const [openModal, setOpenModal] = useState(false);
	return (
		<>
			{" "}
			<section className={s.sectionMapCall}>
				<div className="container">
					<div className={s.mapCallWrapper}>
						<div className={s.mapWrapper}>
							<div className={s.overlayMaps}>
								<button
									type="button"
									className={s.btnFullScreen}
									onClick={() => setOpenModal(true)}
								>
									<svg className={s.iconFull}>
										<use href="/sprite.svg#icon-full-screen"></use>
									</svg>
								</button>
								<iframe
									src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2533.5792303519693!2d26.1260138!3d50.57918649999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xaf5c29b5189ba741%3A0xdca8653b9c654222!2sTov%20Zeryva%20-%20Dobryva%20Dlya%20Roslyn!5e0!3m2!1sru!2spl!4v1768945195864!5m2!1sru!2spl"
									allowFullScreen
									loading="lazy"
									referrerPolicy="no-referrer-when-downgrade"
									className={s.maps}
								></iframe>
							</div>
							<Link
								href="https://www.google.com/maps/dir//Tov+Zeryva+-+Dobryva+Dlya+Roslyn,+%D0%A8%D0%B5%D0%B2%D1%87%D0%B5%D0%BD%D0%BA%D0%B0,+35,+%D0%92%D0%B5%D0%BB%D0%B8%D0%BA%D0%B0+%D0%9E%D0%BC%D0%B5%D0%BB%D1%8F%D0%BD%D0%B0,+%D0%A0%D1%96%D0%B2%D0%BD%D0%B5%D0%BD%D1%81%D1%8C%D0%BA%D0%B0+%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C,+%D0%A3%D0%BA%D1%80%D0%B0%D0%B8%D0%BD%D0%B0,+35360/@50.5791865,26.1260138,17z/data=!4m17!1m7!3m6!1s0xaf5c29b5189ba741:0xdca8653b9c654222!2sTov+Zeryva+-+Dobryva+Dlya+Roslyn!8m2!3d50.5791865!4d26.1260138!16s%2Fg%2F11yl0c4dfr!4m8!1m0!1m5!1m1!1s0xaf5c29b5189ba741:0xdca8653b9c654222!2m2!1d26.1260138!2d50.5791865!3e2?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoASAFQAw%3D%3D"
								// href="https://www.google.com/maps/place/%D0%A2%D0%9E%D0%92+%D0%97%D0%95%D0%A0%D0%98%D0%92%D0%90+-+%D0%94%D0%BE%D0%B1%D1%80%D0%B8%D0%B2%D0%B0+%D0%B4%D0%BB%D1%8F+%D1%80%D0%BE%D1%81%D0%BB%D0%B8%D0%BD/@50.5791865,26.1234389,17z/data=!3m1!4b1!4m6!3m5!1s0xaf5c29b5189ba741:0xdca8653b9c654222!8m2!3d50.5791865!4d26.1260138!16s%2Fg%2F11yl0c4dfr?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoKLDEwMDc5MjA2OUgBUAM%3D"
								className={s.roadBtn}
								target="_blank"
							>
								Прокласти маршрут
							</Link>
						</div>
						<div className={s.callBack}>
							<CallbackForm />
						</div>
					</div>
				</div>
			</section>
			{openModal && (
				<Portal>
					<Modal closeModal={() => setOpenModal(false)}>
						<BlockMaps closeModal={() => setOpenModal(false)} />
					</Modal>
				</Portal>
			)}
		</>
	);
};

export default MapsCallback;
