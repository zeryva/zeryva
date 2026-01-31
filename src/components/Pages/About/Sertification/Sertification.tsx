"use client";

import React, { SetStateAction, useEffect, useState } from "react";
import s from "./Sertification.module.css";
import Image from "next/image";
import { sertificationList } from "@/components/Sections/UI/data/data";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../../../firebaseConfig";

type SertificationItem = {
	id: number;
	link: string;
	text: string;
};

const getInitialVisibleCount = () => {
	if (typeof window === "undefined") return 8;

	const width = window.innerWidth;

	if (width <= 767) return 4;
	if (width <= 1279) return 8;
	return 12;
};

const Sertification = ({
	setImage,
}: {
	setImage: React.Dispatch<SetStateAction<string>>;
}) => {
	const [sertificationAll, setSertificationAll] = useState<SertificationItem[]>(
		[]
	);

	const [initialVisibleCount, setInitialVisibleCount] = useState(8);
	const [visibleCount, setVisibleCount] = useState(8);

	// 🔹 Firebase
	useEffect(() => {
		const fetchSertifications = async () => {
			const snapshot = await getDocs(collection(db, "products"));
			if (snapshot.empty) return;

			const mapped: SertificationItem[] = [];

			snapshot.docs.forEach((doc) => {
				const data = doc.data();

				if (Array.isArray(data.certificates) && data.certificates.length) {
					data.certificates.forEach((url: string) => {
						mapped.push({
							id: mapped.length,
							link: url,
							text: `Сертифікат «${data.title ?? "Продукт"}»`,
						});
					});
				}
			});

			setSertificationAll(mapped);
		};

		fetchSertifications();
	}, []);

	// 🔹 responsive стартове значення
	useEffect(() => {
		const applyInitialCount = () => {
			const count = getInitialVisibleCount();
			setInitialVisibleCount(count);
			setVisibleCount(count);
		};

		applyInitialCount();
		window.addEventListener("resize", applyInitialCount);

		return () => window.removeEventListener("resize", applyInitialCount);
	}, []);

	const showAll = () => {
		setVisibleCount(sertificationAll.length);
	};

	const reset = () => {
		setVisibleCount(initialVisibleCount);
	};

	const isAllVisible = visibleCount >= sertificationAll.length;

	return (
		<section className={s.SectionSertification}>
			<div className="container">
				<div className={s.SertificationWrapper}>
					{/* 🔹 Загальні сертифікати */}
					<div className={s.sertification}>
						<div className={s.textWrapper}>
							<h2 className={s.title}>
								Документальне підтвердження якості та безпеки біопрепаратів
							</h2>
							<h3 className={s.titleSmall}>
								Загальні сертифікати відповідності
							</h3>
							<p className={s.text}>
								Базові документи якості та безпеки виробництва
							</p>
						</div>

						<ul className={s.SertificationList}>
							{sertificationList.map((item) => (
								<li key={item.id} className={s.sertificationItem}>
									<div className={s.imageWrapper}>
										<Image
											src={item.link}
											fill
											alt={`sertification_${item.id}`}
											className={s.image}
											onClick={() => setImage(item.link)}
										/>
									</div>
									<p className={s.sertText}>{item.text}</p>
								</li>
							))}
						</ul>
					</div>

					{/* 🔹 Сертифікати продуктів */}
					<div className={s.sertificationAll}>
						<div className={s.textWrapperAll}>
							<h3 className={s.titleSmall}>
								Сертифікати відповідності на продукти
							</h3>
							<p className={s.text}>
								Документи для окремих препаратів асортименту
							</p>
						</div>

						<ul className={s.SertificationList}>
							{sertificationAll.slice(0, visibleCount).map((item) => (
								<li key={item.id} className={s.sertificationItem}>
									<div className={s.imageWrapper}>
										<Image
											src={item.link}
											fill
											alt={`sertification_${item.id}`}
											className={s.image}
											onClick={() => setImage(item.link)}
										/>
									</div>
									<p className={s.sertText}>{item.text}</p>
								</li>
							))}
						</ul>

						{sertificationAll.length > initialVisibleCount && (
							<button
								type="button"
								className={s.moreSertification}
								onClick={isAllVisible ? reset : showAll}
							>
								{isAllVisible
									? "Приховати сертифікати"
									: "Дивитись всі сертифікати"}
							</button>
						)}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Sertification;
