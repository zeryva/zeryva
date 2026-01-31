"use client";
import { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import s from "./ResetPasswordModal.module.css";

type Props = {
  onClose: () => void;
};

const ResetPasswordModal = ({ onClose }: Props) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    setLoading(true);
    const auth = getAuth();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Лист для відновлення пароля надіслано на ваш email.");
      setError("");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Сталася невідома помилка");
      }
      setMessage("");
    }
    setLoading(false);
  };

  return (
    <div className={s.modal} onClick={onClose}>
      <div className={s.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={s.closeButton} onClick={onClose}>
          &times;
        </button>
        <h3 className={s.title}>Відновлення пароля</h3>
        <input
          className={s.input}
          type="email"
          placeholder="Введіть ваш email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleReset} disabled={loading || !email}>
          {loading ? "Відправка..." : "Відновити пароль"}
        </button>
        {message && <p className={s.message}>{message}</p>}
        {error && <p className={s.error}>{error}</p>}
      </div>
    </div>
  );
};

export default ResetPasswordModal;
