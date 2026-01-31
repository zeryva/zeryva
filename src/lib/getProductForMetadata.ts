import { productsMetadata } from "@/data/products-metadata";

export function getProductForMetadata(id: string) {
	return productsMetadata.find((p) => p.id === id) ?? null;
}
