import React from "react";
import { Product } from "../../../../../utils/types";
import s from "./Instruction.module.css";
interface InstructionProps {
  product: Product;
}

const Instruction: React.FC<InstructionProps> = ({ product }) => {
  const { instructionTable } = product;

  return (
    <div className={s.instrCont}>
      <table className={s.table}>
        <thead>
          <tr>
            {instructionTable.columns.map((col, i) => (
              <th key={i}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {instructionTable.rows.map((row, i) => {
            if (row.type === "normal") {
              return (
                <tr key={i}>
                  {row.cells.map((cell, j) => (
                    <td key={j}>{cell}</td>
                  ))}
                </tr>
              );
            } else if (row.type === "full") {
              return (
                <tr key={i}>
                  <td colSpan={instructionTable.columns.length}>
                    {row.value.split("\n").map((line, index) => {
                      const [label, ...rest] = line.split(":");
                      return rest.length > 0 ? (
                        <div key={index} style={{ marginBottom: 8 }}>
                          <strong>{label}:</strong>
                          <div style={{ marginTop: 8 }}>
                            {rest.join(":").trim()}
                          </div>
                        </div>
                      ) : (
                        <div key={index}>{line}</div>
                      );
                    })}
                  </td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Instruction;
