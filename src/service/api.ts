import axios from "axios";
import type { ImageCard } from "../types";

export const API_URL = "https://picsum.photos";

export const api = axios.create({
  baseURL: API_URL,
});

export async function getImagesService() {
  const response = await api.get<ImageCard[]>("/v2/list?page=1&limit=10");
  return response.data;
}

export async function getImagesByIdService(id?: string) {
  const response = await api.get<ImageCard>(`/id/${id}/info`);
  return response.data;
}
