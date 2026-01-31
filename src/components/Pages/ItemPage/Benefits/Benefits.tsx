import React from "react";
import { Product } from "../../../../../utils/types";
import Image from "next/image";
import s from "./Benefits.module.css";

interface BenefitsProps {
  product: Product;
}

const Benefits: React.FC<BenefitsProps> = ({ product }) => {
  return (
    <div className={s.benefitCont}>
      <ul className={s.list}>
        {product.benefits.map((benefit, index) => (
          <li className={s.benefit} key={index}>
            <Image
              src="/Page/Item/iconCheck.svg"
              alt=""
              width={24}
              height={24}
            />
            <span className={s.text}>{benefit}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Benefits;
