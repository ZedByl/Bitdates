import { QueryClient } from "@tanstack/react-query";
import { baseEndpoint } from "@/api/constants.ts";
import { fetchAPI } from "@/service/http.service.ts";
import { DataProvider } from "react-admin";

const API_URL = baseEndpoint + '/api';

const queryClient = new QueryClient();

const dataProvider: DataProvider = {
  getList: async (resource, params) => {
    const { page, perPage } = params.pagination as any;
    const { field, order } = params.sort as any;

    const query = new URLSearchParams({
      _page: String(page),
      _limit: String(perPage),
      _sort: field,
      _order: order,
    });

    const url = `${API_URL}/${resource}?${query.toString()}`;

    const data = await queryClient.fetchQuery({
      queryKey: [resource, params],
      queryFn: () => fetchAPI.get(url),
    });

    return {
      data: data.items || data,
      total: data.total || undefined,
    };
  },

  getOne: async (resource, params) => {
    const url = `${API_URL}/${resource}/${params.id}`;

    const data = await queryClient.fetchQuery({
      queryKey: [resource, params.id],
      queryFn: () => fetchAPI.get(url),
    });

    return { data };
  },

  getMany: async (resource, params) => {
    const query = new URLSearchParams();
    params.ids.forEach((id) => {
      return query.append("id", id.toString());
    });

    const url = `${API_URL}/${resource}?${query.toString()}`;

    const data = await queryClient.fetchQuery({
      queryKey: [resource, params.ids],
      queryFn: () => fetchAPI.get(url),
    });

    return { data };
  },

  getManyReference: async (resource, params) => {
    const { target, id } = params;
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;

    const query = new URLSearchParams({
      _page: String(page),
      _limit: String(perPage),
      _sort: field,
      _order: order,
      [target]: String(id),
    });

    const url = `${API_URL}/${resource}?${query.toString()}`;

    const data = await queryClient.fetchQuery({
      queryKey: [resource, target, id, params],
      queryFn: () => fetchAPI.get(url),
    });

    return { data, total: data.length };
  },

  create: async (resource, params) => {
    const url = `${API_URL}/${resource}`;

    const data = await queryClient.fetchQuery({
      queryKey: [resource, "create"],
      queryFn: () =>
        fetchAPI.post(url, params.data),
    });

    return { data };
  },

  update: async (resource, params) => {
    const url = `${API_URL}/${resource}/${params.id}`;

    const data = await queryClient.fetchQuery({
      queryKey: [resource, "update", params.id],
      queryFn: () =>
        fetchAPI.patch(url, params.data),
    });

    return { data };
  },

  updateMany: async (resource, params) => {
    await Promise.all(
      params.ids.map((id) =>
        fetchAPI.patch(`${API_URL}/${resource}/${id}`, params.data),
      ),
    );

    return { data: params.ids as any };
  },

  delete: async (resource, params) => {
    const url = `${API_URL}/${resource}/${params.id}`;

    await fetchAPI.delete(url);

    return { data: { id: params.id } as any };
  },

  deleteMany: async (resource, params) => {
    await Promise.all(
      params.ids.map((id) =>
        fetchAPI.delete(`${API_URL}/${resource}/${id}`),
      ),
    );

    return { data: params.ids as any };
  },
};

export default dataProvider;
