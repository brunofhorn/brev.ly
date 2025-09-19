import type { ApiErrorResponse } from "@/types/error";
import axios from "axios";

export function handleErrorApi(err: unknown): string {
  if (axios.isAxiosError<ApiErrorResponse>(err)) {
    return (
      err.response?.data?.message ??
      err.message ??
      "Erro ao comunicar com o servidor."
    );
  }

  if (err instanceof Error) return err.message;
  return "Erro inesperado.";
}
