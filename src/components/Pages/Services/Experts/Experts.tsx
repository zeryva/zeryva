"use client";
import React from "react";
import s from "./Experts.module.css";
import Image from "next/image";
import useScrollAnimation from "../../../../../utils/UseScrollAnimation/useScrollAnimation";

const Experts = () => {
	const [aboutTitleRef, aboutTitleVisible] = useScrollAnimation() as [
		React.RefObject<HTMLDivElement>,
		boolean
	];
	return (
		<section className={s.expertsSection}>
			<div className="container">
				<div className={s.expertWrapper}>
					<div className={s.imageWrapper}>
						<Image
							src="/Page/Services/services.webp"
							fill
							sizes="100vw"
							alt="image_serices"
						/>
					</div>
					<div className={s.description}>
						<h2
							ref={aboutTitleRef}
							className={`${s.title} ${s.animateTitle} ${
								aboutTitleVisible ? s.visible : ""
							}`}
						>
							Експертний супровід агровиробництва
						</h2>
						<p className={s.text}>
							Команда «Зерива» надає комплексні агрономічні та біотехнологічні
							послуги для ефективного застосування біопрепаратів у сільському
							господарстві. Підхід базується на наукових знаннях, практичному
							досвіді та реальних умовах вирощування. <br /> <br />У команді
							працюють фахівці з біотехнологій, агрономії та агрохімії, які
							формують рекомендації з урахуванням специфіки виробництва та
							особливостей кожного господарства.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Experts;
