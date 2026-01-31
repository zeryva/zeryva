"use client";
import React from "react";
import { Product } from "../../../../../../../utils/types";
import s from "./InstructionTab.module.css";
import ss from "../Add.module.css";

interface InstructionTabProps {
  product: Product;
  setProduct: React.Dispatch<React.SetStateAction<Product>>;
}

const InstructionTab: React.FC<InstructionTabProps> = ({
  product,
  setProduct,
}) => {
  const { instructionTable } = product;

  const addColumn = () => {
    setProduct({
      ...product,
      instructionTable: {
        columns: [
          ...instructionTable.columns,
          `Колонка ${instructionTable.columns.length + 1}`,
        ],
        rows: instructionTable.rows.map((row) =>
          row.type === "normal" ? { ...row, cells: [...row.cells, ""] } : row,
        ),
      },
    });
  };

  const addRow = () => {
    setProduct({
      ...product,
      instructionTable: {
        ...instructionTable,
        rows: [
          ...instructionTable.rows,
          {
            type: "normal",
            cells: instructionTable.columns.map(() => ""),
          },
        ],
      },
    });
  };

  const addFullRow = () => {
    setProduct({
      ...product,
      instructionTable: {
        ...instructionTable,
        rows: [...instructionTable.rows, { type: "full", value: "" }],
      },
    });
  };

  const autoResize = (el: HTMLTextAreaElement) => {
    el.style.height = "auto";
    const computed = window.getComputedStyle(el);
    const padding =
      parseFloat(computed.paddingTop) + parseFloat(computed.paddingBottom);
    const border =
      parseFloat(computed.borderTopWidth) +
      parseFloat(computed.borderBottomWidth);

    el.style.height = `${el.scrollHeight + padding + border}px`;
  };

  const updateCell = (rowIndex: number, colIndex: number, value: string) => {
    const newRows = instructionTable.rows.map((row, r) =>
      r === rowIndex && row.type === "normal"
        ? {
            ...row,
            cells: row.cells.map((cell, c) => (c === colIndex ? value : cell)),
          }
        : row,
    );

    setProduct({
      ...product,
      instructionTable: { ...instructionTable, rows: newRows },
    });
  };

  const updateFullRow = (rowIndex: number, value: string) => {
    const newRows = instructionTable.rows.map((row, r) =>
      r === rowIndex && row.type === "full" ? { ...row, value } : row,
    );

    setProduct({
      ...product,
      instructionTable: { ...instructionTable, rows: newRows },
    });
  };
  const removeColumn = (colIndex: number) => {
    setProduct({
      ...product,
      instructionTable: {
        columns: instructionTable.columns.filter((_, i) => i !== colIndex),
        rows: instructionTable.rows.map((row) =>
          row.type === "normal"
            ? {
                ...row,
                cells: row.cells.filter((_, i) => i !== colIndex),
              }
            : row,
        ),
      },
    });
  };

  const removeRow = (rowIndex: number) => {
    setProduct({
      ...product,
      instructionTable: {
        ...instructionTable,
        rows: instructionTable.rows.filter((_, i) => i !== rowIndex),
      },
    });
  };
  return (
    <div className={s.instrCont}>
      <button className={s.btn} type="button" onClick={addColumn}>
        Додати колонку
      </button>
      <button className={s.btn} type="button" onClick={addRow}>
        Додати рядок
      </button>
      <button className={s.btn} type="button" onClick={addFullRow}>
        Додати рядок на всю ширину
      </button>

      <table className={s.table}>
        <thead>
          <tr>
            {instructionTable.columns.map((col, i) => (
              <th className={s.th} key={i}>
                <button
                  className={s.delBtn}
                  type="button"
                  onClick={() => removeColumn(i)}
                >
                  Видал.стовпець
                </button>
                <textarea
                  className={ss.textarea}
                  value={col}
                  onChange={(e) => {
                    autoResize(e.currentTarget);
                    const newColumns = [...instructionTable.columns];
                    newColumns[i] = e.target.value;
                    setProduct({
                      ...product,
                      instructionTable: {
                        ...instructionTable,
                        columns: newColumns,
                      },
                    });
                  }}
                  onInput={(e) => autoResize(e.currentTarget)}
                />
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {instructionTable.rows.map((row, rIndex) =>
            row.type === "normal" ? (
              <tr key={rIndex}>
                {row.cells.map((cell, cIndex) => (
                  <td key={cIndex}>
                    <textarea
                      className={ss.textarea}
                      value={cell}
                      onChange={(e) => {
                        autoResize(e.currentTarget);
                        updateCell(rIndex, cIndex, e.target.value);
                      }}
                      onInput={(e) => autoResize(e.currentTarget)}
                    />
                  </td>
                ))}

                <td>
                  <button type="button" onClick={() => removeRow(rIndex)}>
                    ✕
                  </button>
                </td>
              </tr>
            ) : (
              <tr key={rIndex}>
                <td colSpan={instructionTable.columns.length}>
                  <textarea
                    className={ss.textarea}
                    value={row.value}
                    placeholder="Текст на всю ширину"
                    onChange={(e) => {
                      autoResize(e.currentTarget);
                      updateFullRow(rIndex, e.target.value);
                    }}
                    onInput={(e) => autoResize(e.currentTarget)}
                  />

                  <button type="button" onClick={() => removeRow(rIndex)}>
                    ✕
                  </button>
                </td>
              </tr>
            ),
          )}
        </tbody>
      </table>
    </div>
  );
};

export default InstructionTab;
