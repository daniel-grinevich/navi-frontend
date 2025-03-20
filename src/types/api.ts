// types/api.ts - Improved with generics
import { z } from 'zod';

// Schema definitions
export const CategorySchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable(),
  image_url: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  price: z.number(),
  description: z.string().nullable(),
  category_id: z.number(),
  image_url: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

// Type inference
export type Category = z.infer<typeof CategorySchema>;
export type Product = z.infer<typeof ProductSchema>;

// Generic paginated response schema
export function createPaginatedResponseSchema<T extends z.ZodType>(itemSchema: T) {
  return z.object({
    results: z.array(itemSchema),
    count: z.number(),
    next: z.string().nullable(),
    previous: z.string().nullable(),
  });
}

// Create specific paginated schemas using the generic schema
export const CategoryListResponseSchema = createPaginatedResponseSchema(CategorySchema);
export const ProductListResponseSchema = createPaginatedResponseSchema(ProductSchema);

// Type helpers for paginated responses
export type PaginatedResponse<T> = {
  results: T[];
  count: number;
  next: string | null;
  previous: string | null;
};

export type PaginatedCategories = PaginatedResponse<Category>;
export type PaginatedProducts = PaginatedResponse<Product>;