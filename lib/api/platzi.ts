import axios, { AxiosError } from "axios";

const PLATZI_API_URL =
  process.env.NEXT_PUBLIC_PLATZI_API_URL ?? "https://api.escuelajs.co/api/v1";

export interface PlatziCategory {
  id: number;
  name: string;
  slug: string;
  image: string;
  creationAt: string;
  updatedAt: string;
}

export interface FileUploadResponse {
  originalname: string;
  filename: string;
  location: string;
}

export interface CreateProductPayload {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
}

const platziApi = axios.create({
  baseURL: PLATZI_API_URL,
});

function extractErrorMessage(error: unknown, fallback: string) {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ message?: string }>;
    return axiosError.response?.data?.message ?? axiosError.message ?? fallback;
  }
  return error instanceof Error ? error.message : fallback;
}

export async function fetchCategories(): Promise<PlatziCategory[]> {
  try {
    const response = await platziApi.get<PlatziCategory[]>("/categories", {
      headers: {
        "Cache-Control": "no-store",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error, "Failed to load categories."));
  }
}

export async function uploadFile(file: File): Promise<FileUploadResponse> {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await platziApi.post<FileUploadResponse>("/files/upload", formData);
    return response.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error, "Failed to upload image."));
  }
}

export async function createProduct(payload: CreateProductPayload) {
  try {
    const response = await platziApi.post("/products", payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(extractErrorMessage(error, "Failed to create product."));
  }
}
