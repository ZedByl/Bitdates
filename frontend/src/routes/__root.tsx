import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { userQueryOptions } from "@/api/user/userQueryOptions.ts";
import { QueryClient } from "@tanstack/react-query";
import { UserApi } from "@/models/user.ts";
import { useUserStore } from "@/stores/user/userStore.ts";

export interface RouterContext {
  queryClient: QueryClient;
  user?: UserApi;
}

export const Route = createRootRouteWithContext<RouterContext>()(
  {
    component: RootComponent,
    beforeLoad: async ({ context }) => {
      const user = await context.queryClient.ensureQueryData(userQueryOptions());

      useUserStore.setState({ user });

      return { user };
    },
  }
);

function RootComponent() {
  return <Outlet />;
}
