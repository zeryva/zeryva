import React from "react";
import s from "./KeyValues.module.css";
import { keyValues } from "@/components/Sections/UI/data/data";

const KeyValues = () => {
	return (
		<section className={s.SectionKeyValues}>
			<div className="container">
				<div className={s.KeyValuesWrapper}>
					<h2 className={s.title}>Наші ключові цінності</h2>
					<ul className={s.KeyValuesList}>
						{keyValues.map((item) => (
							<li key={item.id} className={s.KeyValuesItem}>
								<div className={s.iconBlock}>
									<svg className={`${s.icon} ${item.id === 0 ? s.icon_1 : ""}`}>
										<use href={item.icon}></use>
									</svg>
								</div>
								<p className={s.text}>{item.text}</p>
							</li>
						))}
					</ul>
				</div>
			</div>
		</section>
	);
};

export default KeyValues;
