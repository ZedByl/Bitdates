import {
  createFileRoute,
  useMatch, Link,
} from '@tanstack/react-router';
import { categories } from "@/admin/events/Create/mock.tsx";
import { lazy, useState } from "react";
import { EventList } from "@/components/EventList/EventList.tsx";
import {
  Box,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
  Heading,
  Icon,
} from "@chakra-ui/react";
import { BreadcrumbCurrentLink, BreadcrumbLink, BreadcrumbRoot } from "@/components/ui/breadcrumb.tsx";

const Header = lazy(() =>
  import("@/components/header").then((module) => ({ default: module.Header }))
);

const Footer = lazy(() =>
  import("@/components/footer").then((module) => ({ default: module.Footer }))
);

export const Route = createFileRoute('/events/category/$categoryId')({
  component: Event,
  beforeLoad: async ({ params }) => {
    const { categoryId } = params;
    if (!categoryId) {
      return {
        redirect: {
          to: "/",
          replace: true,
        },
      };
    }

    const category = categories.find(e => e.id === categoryId);

    if (category) {
      return { category };
    }

    return {
      redirect: {
        to: "/",
        replace: true,
      },
    };
  },
});


function Event() {
  const { context } = useMatch({ from: '/events/category/$categoryId' });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const { category } = context;

  if (!category?.label) return null;

  return (
    <>
      <Header />

      <Box
        px={{ base: '20px', md: '30px', lg: '30px' }}
        pt={{ base: '48px', md: '120px' }}
      >
        <Box maxW={1440} m='0 auto' >
          <BreadcrumbRoot mb='16px'>
            <BreadcrumbList gap="2">
              <BreadcrumbItem>
                <Link to="/">
                  <BreadcrumbLink>Home</BreadcrumbLink>
                </Link>
              </BreadcrumbItem>

              <BreadcrumbSeparator>/</BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbCurrentLink>{category?.label}</BreadcrumbCurrentLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </BreadcrumbRoot>

          <Heading
            size="5xl"
            mb={{ base: '16px', md: '32px' }}
          >
            <Icon boxSize="64px">{category?.icon}</Icon> {category?.label}
          </Heading>

          <EventList
            isFilters={false}
            category={category}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </Box>
      </Box>

      <Footer />
    </>
  );
}
