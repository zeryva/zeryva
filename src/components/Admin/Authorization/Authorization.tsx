"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import s from "./Authorization.module.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { validationSchemaRegister } from "../../../../utils/validationSchema";
import { ErrorMessage, Field, Form, Formik } from "formik";
import ResetPasswordModal from "./ResetPasswordModal/ResetPasswordModal";
import { auth } from "../../../../firebaseConfig";

type AuthProps = {
  email: string;
  password: string;
};

const Authorization = () => {
  const [isVisual, setIsVisual] = useState(false);
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisual(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const initialValues: AuthProps = {
    email: "",
    password: "",
  };

  const hundlerAuth = async (value: AuthProps) => {
    try {
      await signInWithEmailAndPassword(auth, value.email, value.password);

      router.push("/admin");
    } catch (error: unknown) {
      alert("Невірний логін або пароль");
      console.error(error);
    }
  };

  return (
    <>
      {isVisual && (
        <div className={s.authWrapper}>
          <div className={s.authBlock}>
            <h3 className={s.title}>Авторизація</h3>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchemaRegister}
              onSubmit={hundlerAuth}
            >
              {({ values }) => (
                <Form className={s.form}>
                  <div className={s.inputWrapper}>
                    <label className={s.label}>
                      <Field
                        type="email"
                        name="email"
                        placeholder="Логін"
                        className={s.input}
                      />
                      <ErrorMessage
                        name="email"
                        component="p"
                        className={s.error}
                      />
                    </label>

                    <label className={s.label}>
                      <Field
                        type="password"
                        name="password"
                        autoComplete="current-password"
                        placeholder="Пароль"
                        className={s.input}
                      />
                      <ErrorMessage
                        name="password"
                        component="p"
                        className={s.error}
                      />
                    </label>

                    <button
                      type="button"
                      className={s.btnRestore}
                      onClick={() => setOpenModal(true)}
                    >
                      Відновити пароль
                    </button>
                    {openModal && (
                      <ResetPasswordModal onClose={() => setOpenModal(false)} />
                    )}
                  </div>

                  <button type="submit" className={s.btnEnter}>
                    Увійти
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </>
  );
};

export default Authorization;
