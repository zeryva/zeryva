import React from "react";
import s from "./Services.module.css";
import BreadCrumbs from "@/components/Sections/UI/BreadCrumbs/BreadCrumbs";
import Experts from "./Experts/Experts";
import ServicesList from "./ServicesList/ServicesList";

const Services = () => {
  return (
    <div className={s.servicesWrapper}>
      <BreadCrumbs
        crumbs={[{ label: "Головна", href: "/" }, { label: "Послуги" }]}
      />
      <Experts />
      <ServicesList />
    </div>
  );
};

export default Services;
