"use client";
import React, { SetStateAction, useState } from "react";
import s from "./CallbackForm.module.css";
import {
	ErrorMessage,
	Field,
	FieldProps,
	Form,
	Formik,
	FormikHelpers,
} from "formik";
import SuccessModdal from "./SuccessModdal/SuccessModdal";
import { ValidationSchemaCallbackWithMessage } from "../../../../../utils/validationSchema";
import formatPhoneUA from "./formatPhoneUA/formatPhoneUA";

type Props = {
	setOpenModal?: React.Dispatch<SetStateAction<boolean>>;
};

type InitialValuesType = {
	name: string;
	phone: string;
	message: string;
};

const CallbackForm = ({ setOpenModal }: Props) => {
	const [successMessage, setSuccessMessage] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [phoneFocused, setPhoneFocused] = useState(false);

	const initialValues = {
		name: "",
		phone: "",
		message: "",
	};

	const hundlerSubmit = async (
		values: InitialValuesType,
		{ resetForm }: FormikHelpers<InitialValuesType>
	) => {
		const data = {
			name: values.name,
			phone: `+38${values.phone}`,
			message: values.message,
		};

		try {
			setIsLoading(true);
			const response = await fetch("/api/send-email", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});

			if (response.ok) {
				setSuccessMessage(true);
				resetForm();
			}
		} catch (error) {
			console.error("Error sending email:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className={s.formWrapper}>
			<div className={s.infoBlock}>
				<h3 className={s.title}>Зворотній зв’язок</h3>
				<p className={s.text}>
					Заповніть форму, і наші спеціалісти зв’яжуться з вами найближчим часом
				</p>
			</div>

			<Formik
				initialValues={initialValues}
				validationSchema={ValidationSchemaCallbackWithMessage}
				onSubmit={hundlerSubmit}
			>
				{({ isValid, dirty }) => (
					<Form className={s.form}>
						<div className={s.blockInputs}>
							<label className={s.label}>
								<span className={s.labelSpan}>ПІБ</span>
								{/* <Field
									type="text"
									name="name"
									className={s.input}
									placeholder="Введіть своє ПІБ"
								/> */}
								<Field name="name">
									{({ field, meta }: FieldProps) => (
										<input
											{...field}
											type="text"
											placeholder="Введіть своє ПІБ"
											className={`${s.input} ${
												meta.touched && meta.error ? s.inputError : ""
											}`}
										/>
									)}
								</Field>
								<ErrorMessage name="name" component="p" className={s.error} />
							</label>
							<label className={s.label}>
								<span className={s.labelSpan}>Телефон</span>
								{/* <Field
									type="text"
									name="phone"
									className={s.input}
									placeholder="+380 (00) 000 00 00 "
								/> */}
								<Field name="phone">
									{({ field, meta, form }: FieldProps) => {
										const formattedValue =
											!field.value && !phoneFocused
												? "" // ← тоді показується placeholder
												: formatPhoneUA(field.value);

										return (
											<input
												type="text"
												value={formattedValue}
												placeholder="+380 (00) 000 00 00"
												className={`${s.input} ${
													meta.touched && meta.error ? s.inputError : ""
												}`}
												onFocus={() => setPhoneFocused(true)}
												onBlur={(e) => {
													setPhoneFocused(false);
													field.onBlur(e);
												}}
												onChange={(e) => {
													const digits = e.target.value
														.replace(/\D/g, "")
														.slice(3);
													form.setFieldValue(field.name, digits);
												}}
											/>
										);
									}}
								</Field>
								<ErrorMessage name="phone" component="p" className={s.error} />
							</label>

							<label className={s.labelTexarea}>
								<span className={s.labelSpan}>Коментар</span>
								{/* <Field
									type="text"
									name="phone"
									className={s.input}
									placeholder="+380 (00) 000 00 00 "
								/> */}
								<Field name="message">
									{({ field, meta }: FieldProps) => (
										<textarea
											{...field}
											placeholder="Введіть свій коментар"
											className={`${s.textarea} ${
												meta.touched && meta.error ? s.inputError : ""
											}`}
											rows={4}
										/>
									)}
								</Field>
								<ErrorMessage
									name="message"
									component="p"
									className={s.error}
								/>
							</label>
						</div>

						<button
							type="submit"
							className={s.btnSend}
							disabled={!(isValid && dirty)}
						>
							{isLoading ? "Відсилання..." : "Надіслати запит"}
						</button>
					</Form>
				)}
			</Formik>

			{successMessage && (
				<SuccessModdal
					setSuccessMessage={setSuccessMessage}
					setOpenModal={setOpenModal}
				/>
			)}
		</div>
	);
};

export default CallbackForm;
