import type { DropdownType } from "./page.type";

export type ProductInput = {
  title: string;
  description: string;
  category?: DropdownType;
  brand: string;
  sku: string;
};

export type ProductDimensionDTO = {
  width: number;
  height: number;
  depth: number;
};

export type ProductReviewDTO = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
};

export type ProductMetaDTO = {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
};

export type ProductDataDTO = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand?: string;
  sku: string;
  weight: number;
  dimensions: ProductDimensionDTO;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: ProductReviewDTO[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: ProductMetaDTO;
  thumbnail: string;
  images: string[];
};

export type ProductDTO = {
  products: ProductDataDTO[];
  total: number;
  skip: number;
  limit: number;
};
