import * as Yup from "yup";

const passwordRules = /^[a-zA-Z0-9]+$/;
export const validationSchemaRegister = () => {
	return Yup.object({
		email: Yup.string()
			.email("Не коректний Email!")
			.required("Введіть коректный email!"),
		password: Yup.string()
			.matches(passwordRules, "Тільки латинські літери і цифри!")
			.min(5, "Мінімум 5 символів!")
			.required("Обовязково!"),
	});
};

export const ValidationSchemaCallback = Yup.object().shape({
	name: Yup.string()
		.required("Введіть правильні дані!")
		.min(2, "Мінімум 2 знаки!"),

	phone: Yup.string()
		.required("Введіть правильний номер!")
		.matches(/^\d+$/, "Номер має тільки цифри!")
		.min(9, "Мінімум 9 знаків!"),
	message: Yup.string().default("Заявка з контактної форми"),
});

export const ValidationSchemaCallbackWithMessage = Yup.object({
	name: Yup.string()
		.required("Введіть правильні дані!")
		.min(2, "Мінімум 2 знаки!"),

	phone: Yup.string()
		.required("Введіть правильний номер!")
		.matches(/^\d+$/, "Номер має тільки цифри!")
		.min(9, "Мінімум 9 знаків!"),

	message: Yup.string()
		.required("Введіть своє повідомлення. Це обов'язково!")
		.min(10, "Мінімум 10 символів!"),
});
