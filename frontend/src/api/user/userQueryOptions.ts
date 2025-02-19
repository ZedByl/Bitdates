import { useQuery } from "@tanstack/react-query";
import { fetchAPI } from "@/service/http.service.ts";
import { UserApi } from "@/models/user.ts";
import { APIEndpoints } from "@/api/constants.ts";

export const userQueryOptions = () => ({
  queryKey: ["user"],
  queryFn: async () => {
    return await fetchAPI.get<UserApi | null>(APIEndpoints.USER).catch(() => null);
  },
});

export const useUserQuery = () => useQuery(userQueryOptions());
