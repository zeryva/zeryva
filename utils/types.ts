export interface ProductProperties {
	consistency: string;
	volume: string;
	shelfLife: string;
	storageTemp: string;
}

export interface InstructionRowNormal {
	type: "normal";
	cells: string[];
}

export interface InstructionRowFull {
	type: "full";
	value: string;
}

export type InstructionRow = InstructionRowNormal | InstructionRowFull;

export interface InstructionTable {
	columns: string[];
	rows: InstructionRow[];
}

export interface Description {
	composition: string;
	purpose: string;
	characteristics: string;
	features: string;
	form: string;
	packaging: string;
	shelfLife: string;
	compatibility: string;
}

export interface Product {
	title: string;
	shortDescription: string;
	descriptionText: string;
	price: string;
	images: string[];
	certificates: string[];
	youtubeUrl: string;
	isBestseller: boolean;
	properties: ProductProperties;
	description: Description;
	benefits: string[];
	instructionTable: InstructionTable;
	formType: "Сухі" | "Рідкі";
	productType: (
		| "Інокулянти"
		| "Контроль патогенів"
		| "Деструктори"
		| "Стимулятори росту"
		| "Мікро-монодобрива"
		| "Прилипачі (ПАР)"
	)[];
}
export type ProductWithId = Product & {
	id: string;
};

export interface ProductMetadata {
	title: string;
	shortDescription: string;
	image?: string;
	formType: "Сухі" | "Рідкі";
	productType: (
		| "Інокулянти"
		| "Контроль патогенів"
		| "Деструктори"
		| "Стимулятори росту"
		| "Мікро-монодобрива"
		| "Прилипачі (ПАР)"
	)[];
}
