import Services from "@/components/Pages/Services/Services";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
	title: "Послуги",
	description:
		"Інокулянти, фунгіциди, мікродобрива та засоби захисту рослин — агрохімія для високих урожаїв",

	alternates: {
		canonical: "http://zeryva.com.ua/services",
	},

	openGraph: {
		title: "Послуги",
		description:
			"Інокулянти, фунгіциди, мікродобрива та засоби захисту рослин — агрохімія для високих урожаїв",
		url: "http://zeryva.com.ua/services",
		type: "website",
		images: [
			{
				url: "/logo.svg",
				width: 504,
				height: 504,
				alt: "Послуги",
			},
		],
	},

	formatDetection: {
		telephone: false,
	},
};

const page = () => {
	return <Services />;
};

export default page;
