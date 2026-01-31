import Image from "next/image";
import Link from "next/link";
import s from "./BestsellerItem.module.css";
import { ProductWithId } from "../../../../../utils/types";

interface ProductCardProps {
  product: ProductWithId;
}

export const BestsellerItem: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <li className={s.card}>
      {product.images?.[0] && (
        <Link href={`/products/${product.id}`}>
          <Image
            src={product.images[0]}
            alt={product.title}
            width={180}
            height={165}
          />
        </Link>
      )}
      <div className={s.blockDescr}>
        <Link href={`/products/${product.id}`}>
          <h3 className={s.title}>{product.title}</h3>
        </Link>
        <p className={s.description}>{product.shortDescription}</p>
      </div>
      <p className={s.price}>{product.price}</p>
      <div className={s.linkWrapp}>
        <Link href={`/products/${product.id}`} className={s.link}>
          Дізнатись більше
        </Link>
      </div>
    </li>
  );
};
