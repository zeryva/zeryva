"use client";
import React, { useState } from "react";
import s from "./AdminPage.module.css";
import MenuSide from "./MenuSide/MenuSide";
import OptionSide from "./OptionSide/OptionSide";
import { Product, ProductWithId } from "../../../../utils/types";

export type AdminSection = "add" | "products";

const AdminPage = () => {
  const [activeSection, setActiveSection] = useState<AdminSection>("add");
  const [editProduct, setEditProduct] = useState<ProductWithId | null>(null);
  return (
    <div className={s.adminWraper}>
      <MenuSide onSelect={setActiveSection} active={activeSection} />
      <OptionSide
        active={activeSection}
        editProduct={editProduct}
        setEditProduct={setEditProduct}
        setActive={setActiveSection}
      />
    </div>
  );
};

export default AdminPage;
