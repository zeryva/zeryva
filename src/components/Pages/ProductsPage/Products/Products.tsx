"use client";

import React, { useEffect, useState } from "react";
import { Product, ProductWithId } from "../../../../../utils/types";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../../../../firebaseConfig";
import Card from "./Card/Card";
import s from "./Products.module.css";
import { useSearchParams } from "next/navigation";

const Products = () => {
  const [products, setProducts] = useState<ProductWithId[]>([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";

  const productType = [
    "Всі",
    "Інокулянти",
    "Контроль патогенів",
    "Деструктори",
    "Стимулятори росту",
    "Мікро-монодобрива",
    "Прилипачі (ПАР)",
  ] as const;

  type ProductType = Exclude<(typeof productType)[number], "Всі">;

  const [selectedProductType, setSelectedProductType] =
    useState<(typeof productType)[number]>("Всі");

  const [selectedFormTypes, setSelectedFormTypes] = useState<string[]>([]); // масив чекбоксів

  useEffect(() => {
    const fetchProducts = async () => {
      const q = query(collection(db, "products"), orderBy("createdAt", "asc"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Product),
      }));

      setProducts(data);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Завантаження...</p>;

  const filteredProducts = products.filter((p) => {
    const matchType =
      selectedProductType === "Всі" ||
      p.productType.includes(selectedProductType as ProductType);

    const matchForm =
      selectedFormTypes.length === 0 || selectedFormTypes.includes(p.formType);

    const matchSearch =
      !searchQuery ||
      p.title.toLowerCase().includes(searchQuery) ||
      p.shortDescription.toLowerCase().includes(searchQuery);

    return matchType && matchForm && matchSearch;
  });

  return (
    <section className={s.sectionProducts}>
      <div className="container">
        <div className={s.productsWrapper}>
          <div className={s.productType}>
            {productType.map((type) => (
              <button
                key={type}
                className={`${s.protyctTypeBtn} ${
                  selectedProductType === type ? s.yelow : ""
                }`}
                onClick={() => setSelectedProductType(type)}
              >
                {type}
              </button>
            ))}
          </div>
          <div className={s.productPreparats}>
            {["Сухі", "Рідкі"].map((form) => (
              <label key={form} className={s.labelCheck}>
                <input
                  type="checkbox"
                  checked={selectedFormTypes.includes(form)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedFormTypes([...selectedFormTypes, form]);
                    } else {
                      setSelectedFormTypes(
                        selectedFormTypes.filter((f) => f !== form),
                      );
                    }
                  }}
                />
                {form === "Сухі" ? "Сухі препарати" : "Рідкі препарати"}
              </label>
            ))}
          </div>
          <div className={s.prodList}>
            {filteredProducts.map((product) => (
              <Card key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
