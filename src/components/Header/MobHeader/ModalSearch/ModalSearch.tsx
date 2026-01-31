"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import s from "./ModalSearch.module.css";

export type SearchItem = {
	id: string;
	title: string;
	shortDescription: string;
};

type ModalSearchProps = {
	onClose: () => void;
	searchItems: SearchItem[];
};

const ModalSearch: React.FC<ModalSearchProps> = ({ onClose, searchItems }) => {
	const router = useRouter();

	const [query, setQuery] = useState("");
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [isFocused, setIsFocused] = useState(false);

	// ref НА WRAPPER
	const wrapperRef = useRef<HTMLDivElement | null>(null);

	// 🔍 Фільтрація
	const filtered = useMemo(() => {
		if (!query.trim()) return [];
		const q = query.toLowerCase();

		return searchItems.filter(
			(item) =>
				item.title.toLowerCase().includes(q) ||
				item.shortDescription.toLowerCase().includes(q)
		);
	}, [query, searchItems]);

	// 🔍 SUBMIT (КНОПКА + ENTER)
	const handleSubmit = () => {
		if (!query.trim()) return;

		setIsDropdownOpen(false);
		router.push(`/products?search=${encodeURIComponent(query)}`);
		setQuery("");
		onClose();
	};

	// ❌ КЛІК ПОЗА МОДАЛКОЮ
	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (
				wrapperRef.current &&
				!wrapperRef.current.contains(e.target as Node)
			) {
				setIsDropdownOpen(false);
				setQuery("");
				onClose();
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [onClose]);

	return (
		<div ref={wrapperRef} className={s.modalSearchWrapper}>
			{/* БЛОКУЄМО bubbling всередині */}
			<div className={s.modalContent} onMouseDown={(e) => e.stopPropagation()}>
				<div className={s.searchBlock}>
					{/* 🔍 КНОПКА ПОШУКУ */}
					<button
						type="button"
						className={s.blockIconSearch}
						onClick={handleSubmit}
					>
						<svg className={s.iconSearch}>
							<use href="/sprite.svg#icon-search" />
						</svg>
					</button>

					<input
						type="text"
						className={s.input}
						placeholder={isFocused ? "" : "Пошук..."}
						value={query}
						onFocus={() => setIsFocused(true)}
						onBlur={() => setIsFocused(false)}
						onChange={(e) => {
							setQuery(e.target.value);
							setIsDropdownOpen(true);
						}}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								handleSubmit();
							}
						}}
					/>

					{/* ❌ Закрити */}
					<button
						type="button"
						className={s.closeSearch}
						onClick={() => {
							setQuery("");
							setIsDropdownOpen(false);
							onClose();
						}}
					>
						✕
					</button>
				</div>

				{/* 🔽 Dropdown */}
				{isDropdownOpen && filtered.length > 0 && (
					<ul className={s.dropdown}>
						{filtered.map((item) => (
							<li
								key={item.id}
								className={s.dropdownItem}
								onMouseDown={(e) => e.stopPropagation()}
							>
								<Link
									href={`/products/${item.id}`}
									onClick={() => {
										setIsDropdownOpen(false);
										setQuery("");
										onClose();
									}}
								>
									<strong>{item.title}</strong> – {item.shortDescription}
								</Link>
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
};

export default ModalSearch;
