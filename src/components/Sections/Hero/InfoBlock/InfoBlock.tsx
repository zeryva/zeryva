import React from "react";
import s from "./InfoBlock.module.css";

type HeroItem = {
	id: number;
	imgMob: string;
	img: string;
	title: string;
	description: string;
};

type InfoBlockProps = {
	item: HeroItem;
};

const InfoBlock: React.FC<InfoBlockProps> = ({ item }) => {
	const handleDownload = () => {
		window.open("/doc/katalog.pdf", "_blank", "noopener,noreferrer");
	};
	return (
		<div className={`container ${s.infoWrapper}`}>
			<div className={s.infoContainer}>
				<h1 className={s.title}>{item.title}</h1>
				<h2 className={s.description}>{item.description}</h2>
				<button
					type="button"
					className={s.downloadBtn}
					onClick={handleDownload}
				>
					Завантажити каталог
				</button>
			</div>
		</div>
	);
};

export default InfoBlock;
