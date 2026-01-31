import { useEffect, useState } from "react";
import { auth } from "../../../firebaseConfig";

export function useFirebaseAuthIframe() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (document.querySelector('script[src*="/__/auth/iframe.js"]')) {
      // робимо setState асинхронно, щоб уникнути синхронного виклику
      setTimeout(() => setLoaded(true), 0);
      return;
    }

    const authDomain = auth?.app?.options?.authDomain;
    if (!authDomain) {
      console.error("Не знайдено authDomain у firebaseConfig");
      return;
    }

    const script = document.createElement("script");
    script.src = `https://${authDomain}/__/auth/iframe.js`;
    script.async = true;

    script.onload = () => setTimeout(() => setLoaded(true), 0);
    script.onerror = () =>
      console.error("Не вдалося завантажити Firebase Auth iframe.js");

    document.body.appendChild(script);
  }, []);

  return loaded;
}
