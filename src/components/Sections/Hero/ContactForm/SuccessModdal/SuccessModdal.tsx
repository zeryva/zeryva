import React, { SetStateAction } from "react";
import s from "./SuccessModdal.module.css";

type SuccessProps = {
	setSuccessMessage: React.Dispatch<SetStateAction<boolean>>;
	setOpenModal?: React.Dispatch<SetStateAction<boolean>>;
};

const SuccessModdal: React.FC<SuccessProps> = ({
	setSuccessMessage,
	setOpenModal,
}) => {
	return (
		<div
			className={s.modal}
			onClick={() => {
				setSuccessMessage(false);
				setOpenModal?.(false);
			}}
		>
			<div className={s.modalContent} onClick={(e) => e.stopPropagation()}>
				<button
					className={s.modalCloseBtn}
					type="button"
					onClick={() => {
						setSuccessMessage(false);
						setOpenModal?.(false);
					}}
					aria-label="Close modal"
				>
					<svg className={s.iconClose}>
						<use href="/sprite.svg#icon-close-modal"></use>
					</svg>
				</button>
				<div className={s.blockSuccess}>
					<h3 className={s.title}>Дякуємо за звернення!</h3>
					<p className={s.text}>Ми зв’яжемося з вами найближчим часом</p>
					<div className={s.blockIcon}>
						<svg className={s.succesfullIcon}>
							<use href="/sprite.svg#icon-successfull-send"></use>
						</svg>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SuccessModdal;
