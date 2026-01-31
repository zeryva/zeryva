import type { Metadata } from "next";
import "./globals.css";
import "./variables.css";
import { ClientLayout } from "./ClientLayout";
import localFont from "next/font/local";

const ptSans = localFont({
  src: [
    {
      path: "../../public/fonts/PTSansCaptions/PTSansCaptionRegular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/PTSansCaptions/PTSansCaptionBold.woff",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-family",
  display: "swap",
});

export const metadata: Metadata = {
  title: `ТОВ "Zeryva" - офіційний сайт`,
  description:
    "Інокулянти, фунгіциди, мікродобрива та засоби захисту рослин — агрохімія для високих урожаїв",
  metadataBase: new URL("http://zeryva.com.ua"),
  alternates: {
    canonical: "http://zeryva.com.ua",
  },
  openGraph: {
    title: 'ТОВ "Zeryva" - офіційний сайт',
    description:
      "Інокулянти, фунгіциди, мікродобрива та засоби захисту рослин — агрохімія для високих урожаїв",
    url: "http://zeryva.com.ua",
    siteName: "Zeryva",
    type: "website",
    images: [
      {
        url: "/logo.svg",
        width: 504,
        height: 504,
        alt: "Zeryva",
      },
    ],
  },
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk" className={`${ptSans.variable}`}>
      <body id="app-scroll">
        <ClientLayout>{children}</ClientLayout>
        <div id="modal-root" />
      </body>
    </html>
  );
}
