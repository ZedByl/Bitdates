import { APIEndpoints } from "@/api/constants.ts";
import { EventAPI } from "@/models/event.ts";
import { fetchAPI } from "@/service/http.service.ts";

export const eventQueryOptions = (id: string) => ({
  queryKey: ["event", id],
  queryFn: async () => {
    return await fetchAPI.get<EventAPI>(APIEndpoints.EVENTS + '/' + id);
  },
});

export const eventsQueryOptions = (excludeIds: number[], searchParams?: URLSearchParams) => ({
  queryKey: ["events"],
  queryFn: async () => {
    const params = searchParams ? '?' + searchParams.toString() : '';
    return await fetchAPI.post<EventAPI[] | null>(APIEndpoints.EVENTS + params, {
      excludeIds
    }).catch(() => ({
      data: null
    }));
  },
});

