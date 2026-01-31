import React from "react";
import s from "./ImageWrapper.module.css";
import Image from "next/image";

const ImageWrapper = ({ image }: { image: string }) => {
	return (
		<div className={s.scrollContainer}>
			<div className={s.imageWrapper}>
				<Image src={image} fill sizes="100vw" alt="image" className={s.image} />
			</div>
		</div>
	);
};

export default ImageWrapper;
