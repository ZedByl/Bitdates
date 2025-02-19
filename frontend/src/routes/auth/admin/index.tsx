import { createFileRoute } from '@tanstack/react-router';
import { Admin, Resource } from "react-admin";
import dataProvider from "@/api/dataProvider/dataProvider.ts";
import { EventList, EventDetail, EventCreate } from "@/admin/events";
import usePageMeta from "@/hooks/usePageMeta";

export const Route = createFileRoute('/auth/admin/')({
  component: AdminRoute,
});

function AdminRoute() {
  usePageMeta({
    title: 'Admin Calendar',
    favicon: '/crypto-calendar-dark.svg'
  });

  return (
    <>
      <Admin dataProvider={dataProvider}>
        <Resource name="events" list={EventList} edit={EventDetail} create={EventCreate} />
      </Admin>
    </>
  );
}
