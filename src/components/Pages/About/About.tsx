"use client";
import React, { useState } from "react";
import s from "./About.module.css";
import BreadCrumbs from "@/components/Sections/UI/BreadCrumbs/BreadCrumbs";
import Efficiency from "./Efficiency/Efficiency";
import Advantages from "./Advantages/Advantages";
import KeyValues from "./KeyValues/KeyValues";
import Sertification from "./Sertification/Sertification";
import Portal from "@/components/Sections/UI/Portal/Portal";
import Modal from "@/components/Sections/UI/Modal/Modal";
import ImageWrapper from "@/components/Sections/UI/ImageWrapper/ImageWrapper";

const About = () => {
	const [image, setImage] = useState("");
	const isModalOpen = Boolean(image);

	return (
		<>
			<div className={s.aboutWrapper}>
				<BreadCrumbs
					crumbs={[{ label: "Головна", href: "/" }, { label: "Про нас" }]}
				/>
				<Efficiency />
				<Advantages />
				<KeyValues />
				<Sertification setImage={setImage} />
			</div>
			{isModalOpen && (
				<Portal>
					<Modal setImage={setImage}>
						<ImageWrapper image={image} />
					</Modal>
				</Portal>
			)}
		</>
	);
};

export default About;
