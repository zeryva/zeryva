import type { Metadata } from "next";
import ProductsPage from "@/components/Pages/ProductsPage/ProductsPage";

export const metadata: Metadata = {
	title: "Продукти",
	description:
		"Інокулянти, фунгіциди, мікродобрива та засоби захисту рослин — агрохімія для високих урожаїв",

	alternates: {
		canonical: "http://zeryva.com.ua/products",
	},

	openGraph: {
		title: "Продукти",
		description:
			"Інокулянти, фунгіциди, мікродобрива та засоби захисту рослин — агрохімія для високих урожаїв",
		url: "http://zeryva.com.ua/products",
		type: "website",
		images: [
			{
				url: "/logo.svg",
				width: 504,
				height: 504,
				alt: "Продукти Zeryva",
			},
		],
	},

	formatDetection: {
		telephone: false,
	},
};

export default function Page() {
	return <ProductsPage />;
}
