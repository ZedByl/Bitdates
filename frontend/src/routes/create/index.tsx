import { createFileRoute, redirect } from '@tanstack/react-router';
import { Box } from "@chakra-ui/react";
import { Header } from "@/components/header";
import { EventForm } from "@/components/eventForm";

export const Route = createFileRoute('/create/')({
  component: CreateEvent,
  beforeLoad: ({ context, location }) => {
    if (!context?.user?.email) {
      throw redirect({
        to: '/auth/admin/login',
        search: {
          redirect: location.href,
        },
      });
    }
  },
});

function CreateEvent() {
  return (
    <Box w={'100%'}>
      <Header/>
      <EventForm/>
    </Box>
  );
}
