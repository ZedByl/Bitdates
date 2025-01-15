import httpService from "@/service/http.service.ts";
import { APIEndpoints } from "@/api/constants.ts";
import { EventAPI } from "@/models/event.ts";

export const eventQueryOptions = (id: string) => ({
  queryKey: ["event", id],
  queryFn: async () => {
    const { data } = await httpService.get<EventAPI | null>(APIEndpoints.EVENTS + '/' + id).catch(() => ({
      data: null
    }));
    return data;
  },
});

export const eventsQueryOptions = (excludeIds: number[], searchParams?: URLSearchParams) => ({
  queryKey: ["events"],
  queryFn: async () => {
    const params = searchParams ? '?' + searchParams.toString() : '';
    const { data } = await httpService.post<EventAPI[] | null>(APIEndpoints.EVENTS + params, {
      excludeIds
    }).catch(() => ({
      data: null
    }));
    return data;
  },
});

