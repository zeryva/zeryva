import React, { useEffect, useRef, useState } from "react";
import { Product } from "../../../../../../../utils/types";
import s from "./BenefitsTab.module.css";

interface BenefitsTabProps {
  product: Product;
  setProduct: React.Dispatch<React.SetStateAction<Product>>;
}
const BenefitsTab: React.FC<BenefitsTabProps> = ({ product, setProduct }) => {
  const [newBenefit, setNewBenefit] = useState("");

  const textareasRef = useRef<Record<number, HTMLTextAreaElement | null>>({});

  const autoResize = (el: HTMLTextAreaElement) => {
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  };

  useEffect(() => {
    product.benefits.forEach((_, index) => {
      const el = textareasRef.current[index];
      if (el) autoResize(el);
    });
  }, [product.benefits]);

  const handleChange = (index: number, value: string) => {
    setProduct({
      ...product,
      benefits: product.benefits.map((b, i) => (i === index ? value : b)),
    });
  };

  const addBenefit = () => {
    if (!newBenefit.trim()) return;
    setProduct({
      ...product,
      benefits: [...product.benefits, newBenefit],
    });
    setNewBenefit("");
  };

  const removeBenefit = (index: number) => {
    setProduct({
      ...product,
      benefits: product.benefits.filter((_, i) => i !== index),
    });
  };

  return (
    <div className={s.benefCont}>
      {product.benefits.map((benefit, index) => (
        <div key={index} className={s.item}>
          <textarea
            className={s.inpBenef}
            ref={(el): void => {
              textareasRef.current[index] = el;
            }}
            value={benefit}
            onChange={(e) => {
              autoResize(e.target);
              handleChange(index, e.target.value);
            }}
          />
          <button
            className={s.btn}
            type="button"
            onClick={() => removeBenefit(index)}
          >
            Видалити
          </button>
        </div>
      ))}

      <textarea
        className={s.textar}
        placeholder="Нова перевага"
        value={newBenefit}
        onChange={(e) => {
          autoResize(e.target);
          setNewBenefit(e.target.value);
        }}
      />

      <button type="button" className={s.add} onClick={addBenefit}>
        Додати перевагу
      </button>
    </div>
  );
};

export default BenefitsTab;
