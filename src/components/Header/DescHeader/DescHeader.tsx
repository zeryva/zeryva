import React, { useEffect, useMemo, useRef, useState } from "react";
import s from "./DescHeader.module.css";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
	atherList,
	navList,
	socialList,
} from "@/components/Sections/UI/data/data";

type SearchItem = {
	id: string;
	title: string;
	shortDescription: string;
};

const DescHeader = ({ searchItems }: { searchItems: SearchItem[] }) => {
	const searchRef = useRef<HTMLDivElement | null>(null);
	const router = useRouter();
	const pathname = usePathname();
	const [isFocused, setIsFocused] = useState(false);
	const [query, setQuery] = useState("");
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
				setIsDropdownOpen(false);
				setQuery(""); // очищаємо поле пошуку
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const isAther =
		pathname.startsWith("/about") ||
		pathname.startsWith("/services") ||
		pathname.startsWith("/products") ||
		pathname.startsWith("/contacts");

	const filtered = useMemo(() => {
		if (!query) return [];

		const q = query.toLowerCase();

		return searchItems.filter(
			(item) =>
				item.title.toLowerCase().includes(q) ||
				item.shortDescription.toLowerCase().includes(q)
		);
	}, [query, searchItems]);

	const handleSearchSubmit = () => {
		if (!query.trim()) return;

		setIsDropdownOpen(false);
		router.push(`/products?search=${encodeURIComponent(query)}`);

		// Очищуємо поле пошуку
		setQuery("");
	};

	return (
		<ul className={s.DescHeaderList}>
			<li className={s.topHead}>
				<div className={s.blockLogo}>
					<Link href="/">
						<Image
							src="/logo.svg"
							width={81}
							height={68}
							alt="logo"
							className={s.logoImage}
						/>
					</Link>

					<h4 className={`${s.logoText} ${isAther ? s.colorGreen : ""}`}>
						Природа, що працює на урожай
					</h4>
				</div>
				<ul className={s.socialList}>
					<li className={s.socialItem}>
						{socialList.map((item) => (
							<Link
								href={item.href}
								key={item.id}
								className={s.iconBlock}
								target="_blank"
							>
								<svg className={s.icon}>
									<use href={item.src}></use>
								</svg>
							</Link>
						))}
					</li>
					<li className={`${s.phone} ${isAther ? s.colorGreen : ""}`}>
						<Link href="tel:+38 099 188 56 37">+38 099 188 56 37</Link>
					</li>
					<li className={s.atherSoc}>
						{atherList.map((item) => (
							<Link
								href={item.href}
								key={item.id}
								className={s.iconBlock}
								target="_blank"
							>
								<svg className={`${s.icon_a} ${isAther ? s.icon_green : ""}`}>
									<use href={item.src}></use>
								</svg>
							</Link>
						))}
					</li>
				</ul>
			</li>
			<li className={s.line}></li>
			<li className={s.botomHead}>
				{/* <nav className={s.navigation}>
					{navList.map((item) => (
						<Link
							key={item.id}
							href={item.src}
							className={`${s.link} ${isAther ? s.colorGreen : ""}`}
						>
							{item.text}
						</Link>
					))}
				</nav> */}

				<nav className={s.navigation}>
					{navList.map((item) =>
						item.src === "/dilers" ? (
							<div
								key={item.id}
								className={`${s.link} ${isAther ? s.colorGreen : ""} ${
									s.disabled
								}`}
							>
								{item.text}
							</div>
						) : (
							<Link
								key={item.id}
								href={item.src}
								className={`${s.link} ${isAther ? s.colorGreen : ""}`}
							>
								{item.text}
							</Link>
						)
					)}
				</nav>

				<div className={s.searchBlock} ref={searchRef}>
					<div className={s.blockSearch}>
						<svg className={s.iconSearch}>
							<use href="/sprite.svg#icon-search"></use>
						</svg>
					</div>
					<input
						type="text"
						name="search"
						placeholder={isFocused ? "" : "Пошук..."}
						className={s.input}
						value={query}
						onFocus={() => setIsFocused(true)}
						onBlur={() => setIsFocused(false)}
						onChange={(e) => {
							setQuery(e.target.value);
							setIsDropdownOpen(true);
						}}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								handleSearchSubmit();
							}
						}}
					/>
					<button
						type="button"
						className={s.searchBtn}
						onClick={handleSearchSubmit}
					>
						Знайти
					</button>

					{filtered.length > 0 && isDropdownOpen && (
						<ul className={s.searchDropdown}>
							{filtered.map((item) => (
								<li key={item.id} className={s.searchItem}>
									<Link
										href={`/products/${item.id}`}
										onClick={() => {
											setIsDropdownOpen(false);
											setQuery("");
										}}
									>
										<strong>{item.title}</strong> – {item.shortDescription}
									</Link>
								</li>
							))}
						</ul>
					)}
				</div>
			</li>
		</ul>
	);
};

export default DescHeader;
