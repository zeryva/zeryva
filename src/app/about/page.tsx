import React from "react";
import About from "@/components/Pages/About/About";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Про нас",
	description:
		"Інокулянти, фунгіциди, мікродобрива та засоби захисту рослин — агрохімія для високих урожаїв",

	alternates: {
		canonical: "http://zeryva.com.ua/about",
	},

	openGraph: {
		title: "Про нас",
		description:
			"Інокулянти, фунгіциди, мікродобрива та засоби захисту рослин — агрохімія для високих урожаїв",
		url: "http://zeryva.com.ua/about",
		type: "website",
		images: [
			{
				url: "/logo.svg",
				width: 504,
				height: 504,
				alt: "Про нас",
			},
		],
	},

	formatDetection: {
		telephone: false,
	},
};

const Page = () => {
	return (
		<>
			<About />
		</>
	);
};

export default Page;
