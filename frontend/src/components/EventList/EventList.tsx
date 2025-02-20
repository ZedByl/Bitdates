import { Box, Stack, VStack } from "@chakra-ui/react";
import { SectionHeader } from "@/components/sectionHeader";
import { formatDate, formatDateForApi, getNextDateRange } from "@/utils/helpers";
import { Button } from "@/components/ui/button.tsx";
import { FC, lazy, useEffect, useRef, useState } from "react";
import { EventAPI } from "@/models/event.ts";
import { CategorySelectState } from "@/components/categorySelect/typings.ts";
import { useObserver } from "@/hooks/useObserver";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { fetchAPI } from "@/service/http.service.ts";

const SubscriptionCard = lazy(() =>
  import("@/components/subscriptionCard").then((module) => ({ default: module.SubscriptionCard }))
);

const EventCard = lazy(() =>
  import("@/components/eventCard").then((module) => ({ default: module.EventCard }))
);

const Calendar = lazy(() =>
  import("@/components/calendar").then((module) => ({ default: module.Calendar }))
);

const CategorySelect = lazy(() =>
  import("@/components/categorySelect").then((module) => ({ default: module.CategorySelect }))
);

const EventsSkeleton = () => (
  <VStack gap={{ base: '36px', md: '12px' }} w={'100%'}>
    <Skeleton height={{ base: '40px', md: '90px' }} borderRadius='16px' width="100%" />
    <Skeleton height={{ base: '40px', md: '90px' }} borderRadius='16px' width="100%" />
    <Skeleton height={{ base: '40px', md: '90px' }} borderRadius='16px' width="100%" />
  </VStack>
);

type EventListProps = {
  category?: CategorySelectState;
  search?: string
  setSearch?: React.Dispatch<React.SetStateAction<string>>
  selectedDate: Date | null
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>
  isFilters?: boolean
}

export const EventList: FC<EventListProps> = ({ category, search, selectedDate, setSelectedDate, isFilters = true }) => {
  const [eventsDay, setEventsDay] = useState<EventAPI[]>([]);
  const [eventsWeek, setEventsWeek] = useState<EventAPI[]>([]);
  const [eventsMonth, setEventsMonth] = useState<EventAPI[]>([]);
  const eventsDayRef = useRef<HTMLDivElement>(null);
  const eventsWeekRef = useRef<HTMLDivElement>(null);
  const eventsMonthRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategorySelectState | undefined>(category);
  const [pageDay, setPageDay] = useState<number>(1);
  const [pageWeek, setPageWeek] = useState<number>(1);
  const [pageMonth, setPageMonth] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDisableDayButton, setIsDisableDayButton] = useState<boolean>(false);
  const [isDisableWeekButton, setIsDisableWeekButton] = useState<boolean>(false);
  const [isDisableMonthButton, setIsDisableMonthButton] = useState<boolean>(false);

  const nextWeek = getNextDateRange('week');
  const nextMonth = getNextDateRange('month');

  const onSelectDate = (value: Date | null) => {
    setSelectedDate(value);
  };

  const fetchEvents = async (
    searchParams?: URLSearchParams,
    excludeIds: number[] = []
  ) => {
    try {
      if (search && searchParams) {
        searchParams.append('q', search);
      }

      if (selectedCategory?.value && searchParams) {
        const categoryValues = selectedCategory.value.join(',');
        searchParams.append('categories', categoryValues);
      }

      const data = await fetchAPI.post(`/api/events${searchParams ? '?' + searchParams.toString() : ''}`, {
        excludeIds
      });

      return data.body;
    } catch (e) {
      console.error(e);
    }
  };

  const getEventsDay = async ({
    page = 1,
    isChangeCategory = false,
  }) => {
    try {
      setIsLoading(true);
      const searchParams = new URLSearchParams();

      const date = formatDateForApi(selectedDate || new Date());

      searchParams.append('dateRangeStart', date);
      searchParams.append('dateRangeEnd', date);
      searchParams.append('page', JSON.stringify(page));

      const excludeIds: number[] = eventsDay.map((item) => item.id);

      const events = await fetchEvents(searchParams, excludeIds);

      if (!events.length) {
        setIsDisableDayButton(true);
      }

      if (isChangeCategory) {
        setEventsDay(events);
      } else {
        setEventsDay((prevState) => ([
          ...prevState,
          ...events
        ]));
      }


    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  };

  const getEventsWeek = async ({
    page = 1,
    isChangeCategory = false,
  }) => {
    try {
      setIsLoading(true);
      const searchParams = new URLSearchParams();

      searchParams.append('dateRangeStart', nextWeek.start);
      searchParams.append('dateRangeEnd', nextWeek.end);
      searchParams.append('page', JSON.stringify(page));

      const excludeIds: number[] = eventsWeek.map((item) => item.id);

      const events = await fetchEvents(searchParams, excludeIds);

      if (!events.length) {
        setIsDisableWeekButton(true);
      }

      if (isChangeCategory) {
        setEventsWeek(events);
      } else {
        setEventsWeek((prevState) => ([
          ...prevState,
          ...events
        ]));
      }
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  };

  const getEventsMonth = async ({
    page = 1,
    isChangeCategory = false,
  }) => {
    try {
      setIsLoading(true);
      const searchParams = new URLSearchParams();

      searchParams.append('dateRangeStart', nextMonth.start);
      searchParams.append('dateRangeEnd', nextMonth.end);
      searchParams.append('page', JSON.stringify(page));

      const excludeIds: number[] = eventsMonth.map((item) => item.id);

      const events = await fetchEvents(searchParams, excludeIds);

      if (!events.length) {
        setIsDisableMonthButton(true);
      }

      if (isChangeCategory) {
        setEventsMonth(events);
      } else {
        setEventsMonth((prevState) => ([
          ...prevState,
          ...events
        ]));
      }
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (selectedDate) {
      (async () => {
        await getEventsDay({ isChangeCategory: true });
      })();
    }
  }, [selectedDate]);

  useEffect(() => {
    if (selectedCategory?.value || search) {
      (async () => {
        await getEventsDay({ isChangeCategory: true });
        await getEventsWeek({ isChangeCategory: true });
        await getEventsMonth({ isChangeCategory: true });
      })();
    }
  }, [search, selectedCategory]);

  const onChangeSelect = (e: CategorySelectState) => {
    setSelectedCategory(e);
  };

  useObserver({
    elem: eventsDayRef,
    threshold: 1,
    func: () => getEventsDay({ isChangeCategory: false }),
  });

  useObserver({
    elem: eventsWeekRef,
    threshold: 1,
    func: () => getEventsWeek({ isChangeCategory: false }),
  });

  useObserver({
    elem: eventsMonthRef,
    threshold: 1,
    func: () => getEventsMonth({ isChangeCategory: false }),
  });

  return (
    <Stack
      lg={{ flexDirection: 'row', }}
      md={{ flexDirection: 'column-reverse', justifyContent: 'space-between' }}
      alignItems={'flex-start'}
      gap={10}
      maxW={1440}
      m='0 auto'
    >
      <VStack gap={{ base: '80px' }} w={'100%'}>
        <VStack gap={{ base: '36px' }} width="100%" alignItems="flex-start">
          <Stack
            flexDirection={{ base: 'column', md: 'row' }}
            justifyContent={'space-between'}
            w={'full'}
            gap={30}
          >
            <SectionHeader
              date={selectedDate ? [selectedDate] : [new Date()]}
              title={formatDate(selectedDate)}
            />

            {isFilters && (
              <Box minWidth={'320px'}>
                <CategorySelect onChange={onChangeSelect} border='1px solid' />
              </Box>
            )}
          </Stack>

          <VStack md={{ alignItems: 'center' }} alignItems="flex-start" w={'100%'} ref={eventsDayRef} >
            {eventsDay.length ? (
              <>
                {eventsDay?.map((item, key) => (
                  <EventCard selectedCategory={selectedCategory} key={key} {...item} />
                ))}

                {(!isDisableDayButton && eventsDay.length > 14) && (
                  <Button
                    bg={'rgba(29, 72, 230, 0.05)'}
                    color={'blue'}
                    size="lg"
                    borderRadius="14px"
                    width={{ base: '100%' }}
                    h={{ base: '58px' }}
                    loading={isLoading}
                    onClick={async () => {
                      await getEventsDay({ page: pageDay + 1 });
                      setPageDay((prevState) => prevState + 1);
                    }}
                  >
                          More events
                  </Button>
                )}
              </>
            ) : (
              <>
                {isLoading && <EventsSkeleton />}
              </>
            )}
          </VStack>
        </VStack>

        <VStack gap={{ base: '36px' }} width="100%" alignItems="flex-start" ref={eventsWeekRef}>
          <Stack
            flexDirection={{ base: 'column', md: 'row' }}
            justifyContent={'space-between'}
            w={'full'}
            gap={30}
          >
            <SectionHeader
              date={[new Date(nextWeek.start), new Date(nextWeek.end)]}
              title={'Next week'}
            />
          </Stack>

          <VStack md={{ alignItems: 'center' }} alignItems="flex-start" w={'100%'}>
            {eventsWeek.length ? (
              <>
                {eventsWeek?.map((item, key) => (
                  <EventCard selectedCategory={selectedCategory} key={key} {...item} />
                ))}

                {(!isDisableWeekButton && eventsWeek.length > 14) && (
                  <Button
                    bg={'rgba(29, 72, 230, 0.05)'}
                    color={'blue'}
                    size="lg"
                    borderRadius="14px"
                    width={{ base: '100%' }}
                    h={{ base: '58px' }}
                    loading={isLoading}
                    onClick={async () => {
                      await getEventsWeek({ page: pageWeek + 1 });
                      setPageWeek((prevState) => prevState + 1);
                    }}
                  >
                          More events
                  </Button>
                )}
              </>
            ) : (
              <>
                {isLoading && <EventsSkeleton />}
              </>
            )}
          </VStack>
        </VStack>

        <VStack gap={{ base: '36px' }} width="100%" alignItems="flex-start" w={'100%'} ref={eventsMonthRef}>
          <Stack
            flexDirection={{ base: 'column', md: 'row' }}
            justifyContent={'space-between'}
            w={'full'}
            gap={30}
          >
            <SectionHeader
              date={[new Date(nextMonth.start), new Date(nextMonth.end)]}
              title={'Next month'}
            />
          </Stack>

          <VStack md={{ alignItems: 'center' }} alignItems="flex-start" w={'100%'}>
            {eventsMonth.length ? (
              <>
                {eventsMonth?.map((item, key) => (
                  <EventCard selectedCategory={selectedCategory} key={key} {...item} />
                ))}

                {(!isDisableMonthButton && eventsMonth.length > 14) && (
                  <Button
                    bg={'rgba(29, 72, 230, 0.05)'}
                    color={'blue'}
                    size="lg"
                    borderRadius="14px"
                    width={{ base: '100%' }}
                    h={{ base: '58px' }}
                    loading={isLoading}
                    onClick={async () => {
                      await getEventsMonth({ page: pageMonth + 1 });
                      setPageMonth((prevState) => prevState + 1);
                    }}
                  >
                          More events
                  </Button>
                )}
              </>
            ) : (
              <>
                {isLoading && <EventsSkeleton />}
              </>
            )}
          </VStack>
        </VStack>
      </VStack>

      <Stack
        maxW={{ base: '100%', lg: '380px' }}
        w={'100%'}
        display={{ base: 'none', md: 'flex' }}
        md={{ flexDirection: 'row', justifyContent: 'space-between' }}
        lg={{ flexDirection: 'column' }}
        position={'sticky'}
        alignItems="flex-start"
        h={'full'}
      >
        <Calendar currentDate={selectedDate} onChange={onSelectDate} />
        <SubscriptionCard />
      </Stack>
    </Stack>
  );
};
