"use client";
import React from "react";
import s from "./BlockContacts.module.css";
import Link from "next/link";
import useScrollAnimation from "../../../../../utils/UseScrollAnimation/useScrollAnimation";

const BlockContacts = () => {
	const [aboutTitleRef, aboutTitleVisible] = useScrollAnimation() as [
		React.RefObject<HTMLDivElement>,
		boolean
	];
	return (
		<section className={s.contactSection}>
			<div className="container">
				<div className={s.contactsWrapper}>
					<div className={s.topBlock}>
						<h2
							ref={aboutTitleRef}
							className={`${s.title} ${s.animateTitle} ${
								aboutTitleVisible ? s.visible : ""
							}`}
						>
							Контакти
						</h2>
						<p className={s.description}>
							Ми завжди на зв’язку для консультацій та співпраці
						</p>
					</div>
					<ul className={s.contactsList}>
						<li className={s.contactsItem}>
							<h4 className={s.titleItem}>Телефон:</h4>
							<ul className={s.messegeList}>
								<li className={s.messegeItem}>
									<Link
										href="tel:+380991885637"
										className={s.link}
										target="_blank"
									>
										+38 099 188 56 37
									</Link>
								</li>
								<li className={s.messegeItem}>
									<Link
										href="viber://chat?number=%2B380991885637"
										className={s.messageLink}
										target="_blank"
									>
										<svg className={s.iconMessage}>
											<use href="/sprite.svg#icon-watsapp"></use>
										</svg>
									</Link>
								</li>
								<li className={s.messegeItem}>
									<Link
										href="https://t.me/+380991885637"
										className={s.messageLink}
										target="_blank"
									>
										<svg className={s.iconMessage}>
											<use href="/sprite.svg#icon-telegram"></use>
										</svg>
									</Link>
								</li>
							</ul>
						</li>
						<li className={s.contactsItem}>
							<h4 className={s.titleItem}>Електронна пошта:</h4>
							<Link href="mailto:zadynamik@ukr.net" className={s.link}>
								zadynamik@ukr.net
							</Link>
						</li>
						<li className={s.contactsItem}>
							<h4 className={s.titleItem}>Адреса:</h4>
							<p className={s.addressText}>
								Рівненська обл., Рівненський р-н, <br />
								с. Велика Омеляна, вул. Шевченка, 35
							</p>
						</li>
					</ul>
				</div>
			</div>
		</section>
	);
};

export default BlockContacts;
