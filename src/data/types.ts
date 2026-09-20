export type Locale = "en" | "ar";
export type ProductStatus = "released" | "beta" | "in-review" | "coming-soon" | "development" | "archived";
export type ProductVisibility = "public" | "coming-soon" | "hidden";

export interface StoreLink {
  name: string;
  url: string;
  status: "live" | "pending" | "private";
  primary: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  status: ProductStatus;
  visibility: ProductVisibility;
  platforms: string[];
  category: string;
  version: string | null;
  price: number | null;
  currency: string | null;
  pricingModel: string | null;
  heroImage: string | null;
  logo: string | null;
  screenshots: string[];
  features: string[];
  technologies: string[];
  storeLinks: StoreLink[];
  website: string | null;
  privacyUrl: string;
  supportUrl: string;
  releaseDate: string | null;
  lastUpdated: string | null;
  featured: boolean;
  sortOrder: number;
  seoTitle: string;
  seoDescription: string;
}
