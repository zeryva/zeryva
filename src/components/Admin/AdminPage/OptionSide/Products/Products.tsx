"use client";
import React, { useEffect, useState } from "react";
import s from "./Products.module.css";
import { Product, ProductWithId } from "../../../../../../utils/types";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../../../../../firebaseConfig";

type ProductsProps = {
  onEdit: (product: ProductWithId) => void;
};

const Products: React.FC<ProductsProps> = ({ onEdit }) => {
  const [products, setProducts] = useState<ProductWithId[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const q = query(collection(db, "products"), orderBy("createdAt", "asc"));
      const snapshot = await getDocs(q);
      const data: ProductWithId[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Product),
      }));
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "products", id));
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className={s.cont}>
      <h2>Всі продукти</h2>
      <div className={s.wrappCont}>
        {products.map((product) => (
          <div className={s.item} key={product.id}>
            <p className={s.name}>{product.title}</p>
            <div className={s.btnsWrapp}>
              <button className={s.btn} onClick={() => onEdit(product)}>
                Редагувати
              </button>
              <button
                className={s.btnDel}
                onClick={() => handleDelete(product.id)}
              >
                Видалити
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
