import Image from "next/image";
import React from "react";
import { Product } from "../../../../../../../utils/types";
import axios from "axios";
import s from "./MainTab.module.css";
import ss from "../Add.module.css";

interface MainTabProps {
  product: Product;
  setProduct: React.Dispatch<React.SetStateAction<Product>>;
}

const PRODUCT_TYPES: Product["productType"] = [
  "Інокулянти",
  "Контроль патогенів",
  "Деструктори",
  "Стимулятори росту",
  "Мікро-монодобрива",
  "Прилипачі (ПАР)",
];

const MainTab: React.FC<MainTabProps> = ({ product, setProduct }) => {
  // --- Автопідгонка textarea ---
  const autoResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  // --- Завантаження зображень ---
  const uploadImage = async (files: File[]) => {
    try {
      const formData = new FormData();
      files.forEach((file) => formData.append("files", file));

      const { data } = await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setProduct((prev) => ({
        ...prev,
        images: [...prev.images, ...data.urls],
      }));
    } catch (err) {
      console.error("Помилка завантаження зображень", err);
      alert("Помилка завантаження зображень");
    }
  };

  const uploadCertificate = async (files: File[]) => {
    try {
      const formData = new FormData();
      files.forEach((file) => formData.append("files", file));

      const { data } = await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setProduct((prev) => ({
        ...prev,
        certificates: [...prev.certificates, ...data.urls],
      }));
    } catch (err) {
      console.error("Помилка завантаження сертифікатів", err);
      alert("Помилка завантаження сертифікатів");
    }
  };

  const removeImage = (index: number) => {
    setProduct((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const removeCertificate = (index: number) => {
    setProduct((prev) => ({
      ...prev,
      certificates: prev.certificates.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className={s.mainCont}>
      <div className={s.field}>
        <label className={s.label}>Назва продукту</label>
        <input
          className={ss.input}
          placeholder="Назва продукту"
          value={product.title}
          onChange={(e) => setProduct({ ...product, title: e.target.value })}
        />
      </div>

      <div className={s.field}>
        <label className={s.label}>Короткий опис продукту</label>
        <textarea
          className={ss.textarea}
          placeholder="Короткий опис продукту"
          value={product.shortDescription}
          onChange={(e) => {
            autoResize(e);
            setProduct({ ...product, shortDescription: e.target.value });
          }}
        />
      </div>

      <div className={s.field}>
        <label className={s.label}>Опис продукту</label>
        <textarea
          className={ss.textarea}
          placeholder="Опис продукту"
          value={product.descriptionText}
          onChange={(e) => {
            autoResize(e);
            setProduct({ ...product, descriptionText: e.target.value });
          }}
        />
      </div>

      <div className={s.field}>
        <label className={s.label}>Ціна</label>
        <input
          className={ss.input}
          placeholder="Ціна"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
        />
      </div>

      <div className={s.field}>
        <label className={s.label}>YouTube відео (URL)</label>
        <input
          className={ss.input}
          placeholder="YouTube відео (URL)"
          value={product.youtubeUrl}
          onChange={(e) =>
            setProduct({ ...product, youtubeUrl: e.target.value })
          }
        />
      </div>

      <h4 className={s.title}>Фото</h4>
      <input
        id="imageUpload"
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => {
          const files = e.target.files;
          if (files) uploadImage(Array.from(files));
        }}
        style={{ display: "none" }}
      />
      <label htmlFor="imageUpload" className={s.uploadBtn}>
        + Додати зображення
      </label>

      {product.images.map((img, i) => (
        <div key={i}>
          <Image src={img} alt="" width={80} height={80} />
          <button
            className={s.btnDelete}
            type="button"
            onClick={() => removeImage(i)}
          >
            Видалити
          </button>
        </div>
      ))}

      <h4 className={s.title}>Сертифікати</h4>
      <input
        id="certUpload"
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => {
          const files = e.target.files;
          if (files) uploadCertificate(Array.from(files));
        }}
        style={{ display: "none" }}
      />
      <label htmlFor="certUpload" className={s.uploadBtn}>
        + Додати сертифікат
      </label>

      {product.certificates.map((cert, i) => (
        <div key={i}>
          <Image src={cert} alt={`Certificate ${i}`} width={80} height={80} />
          <button
            className={s.btnDelete}
            type="button"
            onClick={() => removeCertificate(i)}
          >
            Видалити
          </button>
        </div>
      ))}

      <h4 className={s.title}>Властивості продукту</h4>

      <div className={s.field}>
        <label className={s.label}>Консистенція</label>
        <input
          className={ss.input}
          placeholder="Консистенція"
          value={product.properties.consistency}
          onChange={(e) =>
            setProduct({
              ...product,
              properties: {
                ...product.properties,
                consistency: e.target.value,
              },
            })
          }
        />
      </div>

      <div className={s.field}>
        <label className={s.label}>Обʼєм</label>
        <input
          className={ss.input}
          placeholder="Обʼєм"
          value={product.properties.volume}
          onChange={(e) =>
            setProduct({
              ...product,
              properties: { ...product.properties, volume: e.target.value },
            })
          }
        />
      </div>

      <div className={s.field}>
        <label className={s.label}>Термін придатності</label>
        <input
          className={ss.input}
          placeholder="Термін придатності"
          value={product.properties.shelfLife}
          onChange={(e) =>
            setProduct({
              ...product,
              properties: { ...product.properties, shelfLife: e.target.value },
            })
          }
        />
      </div>

      <div className={s.field}>
        <label className={s.label}>Температура зберігання</label>
        <input
          className={ss.input}
          placeholder="Температура зберігання"
          value={product.properties.storageTemp}
          onChange={(e) =>
            setProduct({
              ...product,
              properties: {
                ...product.properties,
                storageTemp: e.target.value,
              },
            })
          }
        />
      </div>
      <label className={s.checkboxSell}>
        <input
          className={s.inpCheck}
          type="checkbox"
          checked={product.isBestseller}
          onChange={(e) =>
            setProduct({ ...product, isBestseller: e.target.checked })
          }
        />
        Хіт продажу
      </label>
      <h4 className={s.title}>
        Обрати варіанти для фільтрації на сторінці з продуктами
      </h4>
      <select
        value={product.formType}
        onChange={(e) =>
          setProduct({
            ...product,
            formType: e.target.value as "Сухі" | "Рідкі",
          })
        }
      >
        <option value="Сухі">Сухі</option>
        <option value="Рідкі">Рідкі</option>
      </select>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {PRODUCT_TYPES.map((type) => (
          <label
            className={s.values}
            key={type}
            style={{ display: "flex", gap: 6 }}
          >
            <input
              type="checkbox"
              checked={product.productType.includes(type)}
              onChange={(e) => {
                const next = e.target.checked
                  ? [...product.productType, type]
                  : product.productType.filter((t) => t !== type);

                setProduct({
                  ...product,
                  productType: next,
                });
              }}
            />
            {type}
          </label>
        ))}
      </div>
    </div>
  );
};

export default MainTab;
