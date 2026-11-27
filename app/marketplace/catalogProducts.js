import { menswearProducts } from "./menswearProducts";
import { womenswearProducts } from "./womenswearProducts";

function prepareCatalog(products, gender) {
  return products.map((product) => {
    const slug = product.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    return {
      ...product,
      id: `${gender}-${slug}`,
      category: gender,
      subcategory: product.category.toLowerCase(),
      isCatalogPreview: true,
    };
  });
}

export const catalogProducts = [
  ...prepareCatalog(menswearProducts, "menswear"),
  ...prepareCatalog(womenswearProducts, "womenswear"),
];

export function getCatalogProducts(gender, subcategory) {
  return catalogProducts.filter((product) => {
    const matchesGender =
      !gender || product.category === gender.toLowerCase();
    const matchesSubcategory =
      !subcategory || product.subcategory === subcategory.toLowerCase();

    return matchesGender && matchesSubcategory;
  });
}

export function getCatalogProductById(id) {
  return catalogProducts.find((product) => product.id === id) || null;
}
