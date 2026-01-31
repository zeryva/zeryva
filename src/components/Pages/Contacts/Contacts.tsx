import React from "react";
import s from "./Contacts.module.css";
import BreadCrumbs from "@/components/Sections/UI/BreadCrumbs/BreadCrumbs";
import BlockContacts from "./BlockContacts/BlockContacts";
import MapsCallback from "./MapsCallback/MapsCallback";

const Contacts = () => {
	return (
		<div className={s.contactsWrapper}>
			<BreadCrumbs
				crumbs={[{ label: "Головна", href: "/" }, { label: "Контакти" }]}
			/>
			<BlockContacts />
			<MapsCallback />
		</div>
	);
};

export default Contacts;
