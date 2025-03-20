import { Category, CategorySchema, CategoryListResponseSchema } from "@/types/api";
import { z } from "zod";

function getBaseUrl() {
    if (process.env.NEXT_PUBLIC_API_URL) return process.env.NEXT_PUBLIC_API_URL;
    else return 'http://localhost:8000';
}

async function apiFetch<T>({path, schema, method = 'GET', body = undefined, headers = {}}: {
    path: string;
    schema: z.ZodType<T>;
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    body?: any;
    headers?: Record<string, string>;
  }): Promise<T> {
    const baseUrl = getBaseUrl();
    const url = `${baseUrl}/api${path}`;
    
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      body: body ? JSON.stringify(body) : undefined,
    });
  
    if (!response.ok) {
      // Handle errors nicely
      const errorData = await response.json().catch(() => null);
      throw new Error(
        errorData?.detail || 
        `API error: ${response.status} ${response.statusText}`
      );
    }
  
    // Parse and validate the response
    const data = await response.json();
    try {
      return schema.parse(data);
    } catch (error) {
      console.error('API response validation error:', error);
      throw new Error('Unexpected API response format');
    }
  }