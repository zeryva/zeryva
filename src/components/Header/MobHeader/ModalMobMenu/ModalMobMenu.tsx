import React, { useState } from "react";
import s from "./ModalMobMenu.module.css";
import Image from "next/image";
import Link from "next/link";
import {
	atherList,
	navList,
	socListMob,
} from "@/components/Sections/UI/data/data";

type ModalMobMenuProps = {
	onClose: () => void;
};

const ModalMobMenu: React.FC<ModalMobMenuProps> = ({ onClose }) => {
	const [isClosing, setIsClosing] = useState(false);

	const handleClose = () => {
		setIsClosing(true);
	};

	const handleAnimationEnd = () => {
		if (isClosing) {
			onClose();
		}
	};

	return (
		<div
			className={`${s.mobMenuWrapper} ${isClosing ? s.closing : s.opening}`}
			onAnimationEnd={handleAnimationEnd}
		>
			<div className={s.head}>
				<div className={s.logoBlock}>
					<Link href="/" onClick={handleClose}>
						<Image
							src="/logo.svg"
							width={45}
							height={38}
							alt="logo"
							className={s.image}
						/>
					</Link>

					<h4 className={s.logoText}>Природа, що працює на урожай</h4>
				</div>
				<button type="button" className={s.closeBtn} onClick={handleClose}>
					<svg className={s.iconClose}>
						<use href="/sprite.svg#icon-close-search"></use>
					</svg>
				</button>
			</div>
			<div className={s.line}></div>
			<ul className={s.menuList}>
				{navList.map((item) => (
					<li
						key={item.id}
						className={`${s.menuItem} ${
							item.src === "/dilers" ? s.disabled : ""
						}`}
						onClick={() => {
							if (item.src !== "/dilers") handleClose();
						}}
					>
						{item.src === "/dilers" ? (
							<span>{item.text}</span>
						) : (
							<Link href={item.src}>{item.text}</Link>
						)}
					</li>
				))}
			</ul>

			<div className={s.line}></div>
			<div className={s.contactWrapper}>
				<div className={s.messengers}>
					<h5 className={s.name}>Телефон:</h5>
					<div className={s.listWrapper}>
						<Link
							href="tel:+38 099 188 56 37"
							className={s.link}
							onClick={handleClose}
						>
							+38 099 188 56 37
						</Link>
						<ul className={s.messengersList}>
							{atherList.map((item) => (
								<li
									key={item.id}
									className={s.messengersItem}
									onClick={handleClose}
								>
									<Link href={item.href} target="_blank">
										<svg className={s.iconMessengers}>
											<use href={item.src}></use>
										</svg>
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>
				<div className={s.socialAndUpload}>
					<div className={s.social}>
						<h5 className={s.name}>Соціальні мережі</h5>
						<ul className={s.socList}>
							{socListMob.map((item) => (
								<li key={item.id} className={s.socItem} onClick={handleClose}>
									<Link href={item.link} target="_blank">
										<svg className={s.iconSoc}>
											<use href={item.src}></use>
										</svg>
									</Link>
								</li>
							))}
						</ul>
					</div>
					<Link
						href="/doc/katalog.pdf"
						className={s.btnUpload}
						target="_blank"
						onClick={handleClose}
					>
						Завантажити каталог
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ModalMobMenu;
