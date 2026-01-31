"use client";

import React from "react";
import s from "./ItemPage.module.css";

import { doc, getDoc } from "firebase/firestore";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Product } from "../../../../utils/types";
import { db } from "../../../../firebaseConfig";
import Image from "next/image";
import Description from "./Description/Description";
import Benefits from "./Benefits/Benefits";
import Instruction from "./Instruction/Instruction";
import BreadCrumbs from "@/components/Sections/UI/BreadCrumbs/BreadCrumbs";

type Tab = "description" | "benefits" | "instruction";

const ItemPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("description");
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [activeCertificate, setActiveCertificate] = useState<string | null>(
    null,
  );

  const propertiesConfig = [
    {
      key: "consistency",
      icon: "/sprite.svg#icon-fluent",
    },
    {
      key: "volume",
      icon: "/sprite.svg#icon-weight",
    },
    {
      key: "shelfLife",
      icon: "/sprite.svg#icon-duration",
    },
    {
      key: "storageTemp",
      icon: "/sprite.svg#icon-temperature",
    },
  ] as const;

  const tabClass = (tab: Tab) =>
    `${s.tabBtn} ${activeTab === tab ? s.active : ""}`;

  useEffect(() => {
    const fetchProduct = async () => {
      const ref = doc(db, "products", id);
      const snap = await getDoc(ref);
      if (snap.exists()) setProduct(snap.data() as Product);
      setMainImageIndex(0);
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p>Завантаження...</p>;

  const thumbnailImages =
    product.images?.filter((_, i) => i !== mainImageIndex) || [];

  const getYoutubeEmbedUrl = (url: string) => {
    const id = url.includes("youtu.be")
      ? url.split("youtu.be/")[1]?.split("?")[0]
      : url.split("v=")[1]?.split("&")[0];

    return id ? `https://www.youtube.com/embed/${id}` : "";
  };
  const youtubeSrc = getYoutubeEmbedUrl(product.youtubeUrl);

  return (
    <div className={s.contItem}>
      <BreadCrumbs
        crumbs={[
          { label: "Головна", href: "/" },
          { label: "Продукти", href: "/products" },
          { label: product.title },
        ]}
      />
      <div className={`container ${s.cont}`}>
        <div className={s.wrapper}>
          <div className={s.title}>
            <h2 className={s.titleProd}>{product.title}</h2>
            <p>{product.descriptionText}</p>
            <p className={s.price}>{product.price}</p>
            <ul className={s.propertiesList}>
              {propertiesConfig.map(({ key, icon }) => (
                <li className={s.propertiesItem} key={key}>
                  <div className={s.iconWrap}>
                    <svg width={16} height={16} className={s.icon}>
                      <use href={icon} />
                    </svg>
                  </div>
                  <span>{product.properties[key]}</span>
                </li>
              ))}
            </ul>
            <button
              className={s.btnCertf}
              disabled={!product.certificates?.length}
              onClick={() => setActiveCertificate(product.certificates[0])}
            >
              Проглянути сертифікат відповідності
            </button>
          </div>
          <div className={s.image}>
            <div className={s.wrapperImg}>
              <div className={s.mainImage}>
                {product.images[mainImageIndex] && (
                  <Image
                    src={product.images[mainImageIndex]}
                    alt={product.title}
                    width={588}
                    height={588}
                  />
                )}
              </div>
            </div>

            <div className={s.thumbnails}>
              {thumbnailImages.map((img, i) => {
                const originalIndex = product.images.findIndex(
                  (pImg) => pImg === img,
                );
                return (
                  <div
                    key={originalIndex}
                    className={s.thumb}
                    onClick={() => setMainImageIndex(originalIndex)}
                  >
                    <Image
                      // className={s.img}
                      src={img}
                      alt={product.title}
                      width={160}
                      height={160}
                    />
                  </div>
                );
              })}
            </div>
            <div className={s.youtubePlayer}>
              {youtubeSrc ? (
                <iframe
                  src={youtubeSrc}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <Image
                  src="/Page/Item/відеопрезентація.webp"
                  alt="Video preview"
                  width={587}
                  height={326}
                />
              )}
            </div>
          </div>

          <div className={s.description}>
            <div className={s.tabs}>
              <button
                className={tabClass("description")}
                onClick={() => setActiveTab("description")}
              >
                Опис
              </button>

              <button
                className={tabClass("benefits")}
                onClick={() => setActiveTab("benefits")}
              >
                Переваги
              </button>

              <button
                className={tabClass("instruction")}
                onClick={() => setActiveTab("instruction")}
              >
                Інструкція
              </button>
            </div>

            <div className={s.line}>
              <span className={s.activeLine} data-tab={activeTab} />
            </div>

            <div className={s.content}>
              {activeTab === "description" && <Description product={product} />}

              {activeTab === "benefits" && <Benefits product={product} />}

              {activeTab === "instruction" && <Instruction product={product} />}
            </div>
          </div>
        </div>
        {activeCertificate && (
          <div className={s.overlay} onClick={() => setActiveCertificate(null)}>
            <div className={s.modal} onClick={(e) => e.stopPropagation()}>
              <Image
                src={activeCertificate}
                alt="certificate"
                width={600}
                height={800}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemPage;
