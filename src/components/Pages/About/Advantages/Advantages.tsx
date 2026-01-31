import React from "react";
import s from "./Advantages.module.css";
import Image from "next/image";
import { advantagesList } from "@/components/Sections/UI/data/data";

const Advantages = () => {
	return (
		<section className={s.Advantages}>
			<div className="container">
				<div className={s.AdvantagesWrapper}>
					<h2 className={s.title}>Чому аграрії обирають «Зерива»</h2>
					<ul className={s.AdvantagesList}>
						{advantagesList.map((item) => (
							<li key={item.id} className={s.advantagesItem}>
								{item.img ? (
									<div className={s.imageWrapper}>
										<Image
											src={item.img}
											fill
											sizes="100vw"
											alt="img_prob"
											className={s.image}
										/>
									</div>
								) : (
									<div className={s.AdvantagesBlock}>
										<div className={s.top}>
											<div className={s.iconBlock}>
												<svg className={s.icon}>
													<use href={item.icon}></use>
												</svg>
											</div>
											<h5 className={s.titleBlock}>{item.title}</h5>
										</div>

										<p className={s.text}>{item.text}</p>
									</div>
								)}
							</li>
						))}
					</ul>
				</div>
			</div>
		</section>
	);
};

export default Advantages;
