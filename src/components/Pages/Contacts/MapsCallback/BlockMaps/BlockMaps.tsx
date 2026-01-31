import React from "react";
import s from "./BlockMaps.module.css";

const BlockMaps = ({ closeModal }: { closeModal: () => void }) => {
	return (
		<div className={s.overlayMaps}>
			<button
				type="button"
				className={s.btnSmallScreen}
				onClick={() => closeModal()}
			>
				<svg className={s.iconSmall}>
					<use href="/sprite.svg#icon-small-screen"></use>
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
	);
};

export default BlockMaps;
