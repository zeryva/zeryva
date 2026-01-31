import React, { SetStateAction } from "react";
import s from "./Modal.module.css";
import { usePathname } from "next/navigation";

type ModalProps = {
	children: React.ReactNode;
	setImage?: React.Dispatch<SetStateAction<string>>;
	closeModal?: () => void;
};

const Modal = ({ children, setImage, closeModal }: ModalProps) => {
	const pathname = usePathname();
	const isAbout = pathname.startsWith("/about");
	const isContacts = pathname.startsWith("/contacts");
	console.log("ISAbout", isAbout);

	const hundlerClose = () => {
		setImage?.("");
		closeModal?.();
	};
	return (
		<div className={s.modal} onClick={hundlerClose}>
			<div
				className={`${s.modalContent} ${isAbout ? s.width60 : ""} ${
					isContacts ? s.width75 : ""
				}`}
				onClick={(e) => e.stopPropagation()}
			>
				{children}
			</div>
		</div>
	);
};

export default Modal;
