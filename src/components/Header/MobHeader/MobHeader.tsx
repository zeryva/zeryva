import React, { useState } from "react";
import s from "./MobHeader.module.css";
import Image from "next/image";
import Link from "next/link";
import ModalSearch from "./ModalSearch/ModalSearch";
import ModalMobMenu from "./ModalMobMenu/ModalMobMenu";
import { atherList, socialList } from "@/components/Sections/UI/data/data";
import { usePathname } from "next/navigation";
import { SearchItem } from "../Header";

type MobMenuProp = {
	isScrolled?: boolean;
	searchItems: SearchItem[];
};

const MobHeader = ({ isScrolled, searchItems }: MobMenuProp) => {
	const [openSearch, setOpenSearch] = useState(false);
	const [openMobMenu, setOpenMobMenu] = useState(false);
	const isMain = !usePathname().split("/")[1];
	return (
		<>
			<ul className={s.mobHeader}>
				<li className={s.mobHeaderTop}>
					<div className={s.mobLogoBlock}>
						<Link href="/">
							<Image
								src="/logo.svg"
								width={45}
								height={38}
								alt="image"
								className={s.image}
							/>
						</Link>

						<h4
							className={`${s.titleMob} ${
								isMain ? s.mainTitle : s.notMainTitle
							} ${isScrolled ? s.titleScroll : ""}`}
						>
							Природа, що працює на урожай
						</h4>
					</div>
					<div className={s.mobInfoAndBurger}>
						<div className={s.socialInfo}>
							<Link
								href="tel:+380991885637"
								className={`${s.link} ${isMain ? s.mainLink : s.notMainLink} ${
									isScrolled ? s.linkScroll : ""
								}`}
							>
								+38 099 188 56 37
							</Link>
							<ul className={s.messengersList}>
								{atherList.map((item) => (
									<li key={item.id} className={s.messengersItem}>
										<Link
											href={item.href}
											target="_blank"
											className={s.blockIcon}
										>
											<svg
												className={`${s.iconMessengers} ${
													isMain
														? s.mainIconMessengers
														: s.notMainIconMessengers
												} ${isScrolled ? s.iconMessengersScroll : ""}`}
											>
												<use href={item.src}></use>
											</svg>
										</Link>
									</li>
								))}
							</ul>
						</div>
						<button
							type="button"
							className={`${s.burgerBtn} ${isMain ? s.mainBtn : s.notMainBtn} ${
								isScrolled ? s.scrollBtn : ""
							}`}
							onClick={() => setOpenMobMenu(true)}
						>
							<svg
								className={`${s.iconBurger} ${
									isMain ? s.mainIconBurger : s.notMainIconBurger
								} ${isScrolled ? s.iconBurgerScrolled : ""}`}
							>
								<use href="/sprite.svg#icon-button-mob"></use>
							</svg>
						</button>
					</div>
				</li>
				<li className={s.line}></li>
				<li className={s.mobHeaderBotom}>
					<button
						type="button"
						className={`${s.searchBtn} ${
							isMain ? s.mainSearchBtn : s.notMainSearchBtn
						} ${isScrolled ? s.scrollSearchBtn : ""}`}
						onClick={() => setOpenSearch(true)}
					>
						<svg
							className={`${s.iconSearch} ${
								isMain ? s.mainIconColor : s.notMainIconColor
							} ${isScrolled ? s.scrolledIconSearch : ""}`}
						>
							<use href="/sprite.svg#icon-search-mob"></use>
						</svg>
					</button>
					<div className={s.socIconBlock}>
						{socialList.map((item) => (
							<Link
								key={item.id}
								href={item.href}
								className={s.socLink}
								target="_blank"
							>
								<svg className={s.socIconMob}>
									<use href={item.src}></use>
								</svg>
							</Link>
						))}
					</div>
				</li>
			</ul>
			{openSearch && (
				<ModalSearch
					onClose={() => setOpenSearch(false)}
					searchItems={searchItems}
				/>
			)}
			{openMobMenu && <ModalMobMenu onClose={() => setOpenMobMenu(false)} />}
		</>
	);
};

export default MobHeader;
