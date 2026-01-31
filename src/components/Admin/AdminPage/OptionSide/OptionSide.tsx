"use client";
import React from "react";
import s from "./OptionSide.module.css";
import Add from "./Add/Add";
import Products from "./Products/Products";
import { AdminSection } from "../MenuSide/MenuSide";
import { ProductWithId } from "../../../../../utils/types";

type OptionSideProps = {
  active: AdminSection;
  editProduct: ProductWithId | null;
  setEditProduct: (p: ProductWithId | null) => void;
  setActive: (v: AdminSection) => void;
};

const OptionSide = ({
  active,
  editProduct,
  setEditProduct,
  setActive,
}: OptionSideProps) => {
  if (active === "add")
    return (
      <div className={s.optionSideWrapper}>
        <Add
          editProduct={editProduct}
          onSaved={() => {
            setEditProduct(null);
            setActive("products");
          }}
        />
      </div>
    );
  if (active === "products")
    return (
      <div className={s.optionSideWrapper}>
        <Products
          onEdit={(product) => {
            setEditProduct(product);
            setActive("add");
          }}
        />
      </div>
    );
  return null;
};

export default OptionSide;
