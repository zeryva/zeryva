import Contacts from "@/components/Pages/Contacts/Contacts";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
	title: "Контакти",
	description:
		"Інокулянти, фунгіциди, мікродобрива та засоби захисту рослин — агрохімія для високих урожаїв",

	alternates: {
		canonical: "http://zeryva.com.ua/contacts",
	},

	openGraph: {
		title: "Контакти",
		description:
			"Інокулянти, фунгіциди, мікродобрива та засоби захисту рослин — агрохімія для високих урожаїв",
		url: "http://zeryva.com.ua/contacts",
		type: "website",
		images: [
			{
				url: "/logo.svg",
				width: 504,
				height: 504,
				alt: "Контакти",
			},
		],
	},

	formatDetection: {
		telephone: false,
	},
};

const page = () => {
	return <Contacts />;
};

export default page;
