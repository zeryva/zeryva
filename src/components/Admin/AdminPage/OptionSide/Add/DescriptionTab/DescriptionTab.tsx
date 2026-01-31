"use client";
import React, { useEffect, useRef } from "react";
import { Description, Product } from "../../../../../../../utils/types";
import s from "./DescriptionTab.module.css";
import ss from "../Add.module.css";

interface DescriptionTabProps {
  product: Product;
  setProduct: React.Dispatch<React.SetStateAction<Product>>;
}

const FIELDS: (keyof Description)[] = [
  "composition",
  "purpose",
  "characteristics",
  "features",
  "form",
  "packaging",
  "shelfLife",
  "compatibility",
];

const PLACEHOLDERS: Record<keyof Description, string> = {
  composition: "Склад",
  purpose: "Мета застосування",
  characteristics: "Характеристика",
  features: "Особливості",
  form: "Форма випуску",
  packaging: "Пакування",
  shelfLife: "Термін придатності",
  compatibility: "Сумісність",
};

const DescriptionTab: React.FC<DescriptionTabProps> = ({
  product,
  setProduct,
}) => {
  const handleChange = (field: keyof Description, value: string) => {
    setProduct({
      ...product,
      description: { ...product.description, [field]: value },
    });
  };

  const textareasRef = useRef<
    Partial<Record<keyof Description, HTMLTextAreaElement>>
  >({});

  const autoResize = (el: HTMLTextAreaElement) => {
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  };

  useEffect(() => {
    FIELDS.forEach((field) => {
      const el = textareasRef.current[field];
      if (el) autoResize(el);
    });
  }, [product.description]);

  return (
    <div className={s.descrCont}>
      {FIELDS.map((field) => (
        <div key={field} className={s.field}>
          <label className={s.label}>{PLACEHOLDERS[field]}</label>

          <textarea
            ref={(el): void => {
              if (el) textareasRef.current[field] = el;
            }}
            className={ss.textarea}
            placeholder={PLACEHOLDERS[field]}
            value={product.description[field]}
            onChange={(e) => {
              autoResize(e.target);
              handleChange(field, e.target.value);
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default DescriptionTab;
