import { createFileRoute } from '@tanstack/react-router';
import { lazy, useState } from "react";
import { Box } from "@chakra-ui/react";
import { MainContent } from "@/components/mainContent";
import { EventList } from "@/components/EventList/EventList.tsx";

const Header = lazy(() =>
  import("@/components/header").then((module) => ({ default: module.Header }))
);

const Footer = lazy(() =>
  import("@/components/footer").then((module) => ({ default: module.Footer }))
);

export const Route = createFileRoute('/')({
  component: Main,
});

function Main() {
  const [search, setSearch] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const onSearchChange = (value: string) => {
    setSearch(value);
  };

  const onSelectDate = (value: Date | null) => {
    setSelectedDate(value);
  };

  return (
    <Box>
      <Header />

      <Box
        position={'relative'}
        pb={{ base: '60px', md: '80px' }}
      >
        <MainContent
          currentDate={selectedDate}
          onChange={onSelectDate}
          onSearch={onSearchChange}
        />

        <Box px={{ base: '20px', md: '30px', lg: '30px' }} pt={{ base: '60px', md: '80px', lg: '100px' }}>
          <EventList
            search={search}
            selectedDate={selectedDate}
            setSearch={setSearch}
            setSelectedDate={setSelectedDate}
          />
        </Box>
      </Box>

      <Footer />
    </Box>
  );
}
