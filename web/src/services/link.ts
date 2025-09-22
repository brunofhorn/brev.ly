import { handleErrorApi } from "@/helpers/handleErrorApi";
import { api } from "@/lib/api";
import type { LinksFormCreateValues } from "@/schemas/links-create-form";
import type { ILink, PaginatedLinks } from "@/types/links";

export async function getShortLinks(params: { page: number; perPage: number }) {
  try {
    const { data } = await api.get<PaginatedLinks<ILink>>("/links", { params });
    return data;
  } catch (error) {
    throw new Error(handleErrorApi(error));
  }
}

export async function getOriginalUrlByShortUrl(
  shortUrl: string
): Promise<{ originalUrl: string }> {
  try {
    const { data } = await api.get<{ originalUrl: string }>(
      `/links/${shortUrl}`
    );

    return data;
  } catch (error) {
    throw new Error(handleErrorApi(error));
  }
}

export async function createShortLink(link: LinksFormCreateValues) {
  try {
    const { data } = await api.post<ILink>("/links", link);

    return data;
  } catch (error) {
    throw new Error(handleErrorApi(error));
  }
}

export async function deleteShortLink(id: string) {
  try {
    const res = await api.delete(`/links/${id}`);

    return res;
  } catch (error) {
    throw new Error(handleErrorApi(error));
  }
}

export async function exportShortLinksCsv(): Promise<{ exportCsvUrl: string }> {
  try {
    const { data } = await api.post<{ exportCsvUrl: string }>(`/links/export`);

    return data;
  } catch (error) {
    throw new Error(handleErrorApi(error));
  }
}
