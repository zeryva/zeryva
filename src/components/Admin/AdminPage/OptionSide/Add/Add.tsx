"use client";
import React, { useEffect, useState } from "react";
import s from "./Add.module.css";
import MainTab from "./MainTab/MainTab";
import DescriptionTab from "./DescriptionTab/DescriptionTab";
import BenefitsTab from "./BenefitsTab/BenefitsTab";
import InstructionTab from "./InstructionTab/InstructionTab";
import { Product, ProductWithId } from "../../../../../../utils/types";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../../../../firebaseConfig";

type Tab = "main" | "description" | "benefits" | "instruction";
type AddProps = {
  editProduct: ProductWithId | null;
  onSaved: () => void;
};

const Add: React.FC<AddProps> = ({ editProduct, onSaved }) => {
  const [activeTab, setActiveTab] = useState<Tab>("main");
  const [loading, setLoading] = useState(false);

  const [product, setProduct] = useState<Product>({
    title: "",
    shortDescription: "",
    descriptionText: "",
    price: "",
    images: [],
    certificates: [],
    youtubeUrl: "",
    isBestseller: false,
    properties: { consistency: "", volume: "", shelfLife: "", storageTemp: "" },
    description: {
      composition: "",
      purpose: "",
      characteristics: "",
      features: "",
      form: "",
      packaging: "",
      shelfLife: "",
      compatibility: "",
    },
    benefits: [],
    instructionTable: { columns: [], rows: [] },
    formType: "Сухі",
    productType: [],
  });

  useEffect(() => {
    if (editProduct) {
      setProduct(editProduct);
    }
  }, [editProduct]);

  const saveProduct = async () => {
    if (!product.title || !product.price) {
      alert("Заповни назву і ціну");
      return;
    }

    try {
      setLoading(true);

      if (editProduct?.id) {
        // 🔹 редагування
        await updateDoc(doc(db, "products", editProduct.id), { ...product });
        alert("Продукт оновлено ✅");
      } else {
        // 🔹 додавання
        await addDoc(collection(db, "products"), {
          ...product,
          createdAt: serverTimestamp(),
        });

        alert("Продукт додано ✅");

        // reset ТІЛЬКИ при створенні
        setProduct({
          title: "",
          shortDescription: "",
          descriptionText: "",
          price: "",
          images: [],
          certificates: [],
          youtubeUrl: "",
          isBestseller: false,
          properties: {
            consistency: "",
            volume: "",
            shelfLife: "",
            storageTemp: "",
          },
          description: {
            composition: "",
            purpose: "",
            characteristics: "",
            features: "",
            form: "",
            packaging: "",
            shelfLife: "",
            compatibility: "",
          },
          benefits: [],
          instructionTable: { columns: [], rows: [] },
          formType: "Сухі",
          productType: [],
        });
      }

      onSaved();
    } catch (e) {
      console.error(e);
      alert("Помилка збереження");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={s.wrapper}>
      <div className={s.tabs}>
        <button
          className={`${s.tabBtn} ${activeTab === "main" ? s.active : ""}`}
          onClick={() => setActiveTab("main")}
        >
          Основне
        </button>
        <button
          className={`${s.tabBtn} ${
            activeTab === "description" ? s.active : ""
          }`}
          onClick={() => setActiveTab("description")}
        >
          Опис
        </button>
        <button
          className={`${s.tabBtn} ${activeTab === "benefits" ? s.active : ""}`}
          onClick={() => setActiveTab("benefits")}
        >
          Переваги
        </button>
        <button
          className={`${s.tabBtn} ${
            activeTab === "instruction" ? s.active : ""
          }`}
          onClick={() => setActiveTab("instruction")}
        >
          Інструкція
        </button>
      </div>

      {/* Content */}
      <div className={s.content}>
        {activeTab === "main" && (
          <MainTab product={product} setProduct={setProduct} />
        )}

        {activeTab === "description" && (
          <DescriptionTab product={product} setProduct={setProduct} />
        )}

        {activeTab === "benefits" && (
          <BenefitsTab product={product} setProduct={setProduct} />
        )}

        {activeTab === "instruction" && (
          <InstructionTab product={product} setProduct={setProduct} />
        )}
      </div>

      <button className={s.saveBtn} onClick={saveProduct} disabled={loading}>
        {loading ? "Збереження..." : "Зберегти продукт"}
      </button>
    </div>
  );
};

export default Add;
