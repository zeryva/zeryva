"use client";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { auth } from "../../../firebaseConfig";
import AdminPage from "@/components/Admin/AdminPage/AdminPage";
import { useFirebaseAuthIframe } from "../../components/hooks/useFirebaseAuthIframe";

const Page = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const authLoaded = useFirebaseAuthIframe(); // динамічно підвантажує iframe.js

  useEffect(() => {
    if (!authLoaded) return; // чекаємо, поки скрипт завантажиться

    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace("/login");
      } else {
        setLoading(false);
      }
    });

    return () => unsub();
  }, [authLoaded, router]);

  if (loading || !authLoaded) return <p>Завантаження авторизації...</p>;

  return <AdminPage />;
};

export default Page;

// const Page = () => {
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     const unsub = onAuthStateChanged(auth, (user) => {
//       if (!user) {
//         router.replace("/login");
//       } else {
//         setLoading(false);
//       }
//     });

//     return () => unsub();
//   }, [router]);

//   if (loading) return null;

//   return <AdminPage />;
// };

// export default Page;
