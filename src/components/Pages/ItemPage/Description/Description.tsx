import React from "react";
import { Product } from "../../../../../utils/types";
import s from "./Description.module.css";

interface DescriptionProps {
  product: Product;
}

type FieldProps = {
  label: string;
  value?: string;
};

const Field: React.FC<FieldProps> = ({ label, value }) => {
  if (!value?.trim()) return null;

  return (
    <div className={s.contDescrItem}>
      <p className={s.title}>{label}:</p>
      <div style={{ height: 8 }} />
      <p className={s.text}>{value}</p>
    </div>
  );
};

const Description: React.FC<DescriptionProps> = ({ product }) => {
  const d = product.description;

  return (
    <div className={s.descrCont}>
      <Field label="Склад" value={d.composition} />
      <Field label="Мета застосування" value={d.purpose} />
      <Field label="Характеристика" value={d.characteristics} />
      <Field label="Особливості" value={d.features} />
      <Field label="Форма випуску" value={d.form} />
      <Field label="Пакування" value={d.packaging} />
      <Field label="Термін придатності" value={d.shelfLife} />
      <Field label="Сумісність" value={d.compatibility} />
    </div>
  );
};

export default Description;
