import { useQuery } from "@tanstack/react-query";
import httpService from "@/service/http.service.ts";
import { UserApi } from "@/models/user.ts";
import { APIEndpoints } from "@/api/constants.ts";

export const userQueryOptions = () => ({
  queryKey: ["user"],
  queryFn: async () => {
    const { data } = await httpService.get<UserApi | null>(APIEndpoints.USER).catch(() => ({
      data: null
    }));
    return data;
  },
});

export const useUserQuery = () => useQuery(userQueryOptions());
