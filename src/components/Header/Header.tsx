"use client";
import React, { useEffect, useState } from "react";
import s from "./Header.module.css";
import DescHeader from "./DescHeader/DescHeader";
import MobHeader from "./MobHeader/MobHeader";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

type IsScroledProp = {
	isScrolled?: boolean;
};

export type SearchItem = {
	id: string;
	title: string;
	shortDescription: string;
};

const Header = ({ isScrolled }: IsScroledProp) => {
	const [searchItems, setSearchItems] = useState<SearchItem[]>([]);

	useEffect(() => {
		const fetchProducts = async () => {
			const snap = await getDocs(collection(db, "products"));
			const data = snap.docs.map((doc) => ({
				id: doc.id,
				title: doc.data().title,
				shortDescription: doc.data().shortDescription,
			}));
			setSearchItems(data);
		};

		fetchProducts();
	}, []);

	return (
		<div className={`${s.header} ${isScrolled ? s.scrolled : ""}`}>
			<div className="container">
				<div className={s.headerBlock}>
					<DescHeader searchItems={searchItems} />
					<MobHeader isScrolled={isScrolled} searchItems={searchItems} />
				</div>
			</div>
		</div>
	);
};

export default Header;
