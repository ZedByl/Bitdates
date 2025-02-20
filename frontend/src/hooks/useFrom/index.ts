import { useRouter } from "@tanstack/react-router";

export const useQueryParams = <T extends Record<string, any>>() => {
  const router = useRouter();
  const { location } = router.state;
  const searchParams = new URLSearchParams(location.search);
  const currentPath = location.pathname;

  const params: Partial<T> = {};
  searchParams.forEach((value, key) => {
    params[key as keyof T] = value as any;
  });

  return { params, currentPath };
};
