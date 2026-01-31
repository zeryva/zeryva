"use client";
import React, { SetStateAction } from "react";
import s from "./Consultation.module.css";
import ContactForm from "../ContactForm/ContactForm";

type ModalProp = {
	setOpenModal: React.Dispatch<SetStateAction<boolean>>;
};

const Consultation: React.FC<ModalProp> = ({ setOpenModal }) => {
	return (
		<div className={s.modal} onClick={() => setOpenModal(false)}>
			<div className={s.modalContent} onClick={(e) => e.stopPropagation()}>
				<button
					className={s.modalCloseBtn}
					type="button"
					onClick={() => setOpenModal(false)}
					aria-label="Close modal"
				>
					<svg className={s.closeIcon}>
						<use href="/sprite.svg#icon-close-modal"></use>
					</svg>
				</button>
				<ContactForm setOpenModal={setOpenModal} />
			</div>
		</div>
	);
};

export default Consultation;
