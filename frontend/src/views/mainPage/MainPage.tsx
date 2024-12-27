import {Header} from "@/components/header";
import {MainContent} from "@/components/mainContent";
import {Calendar} from "@/components/calendar";
import {SubscriptionCard} from "@/components/subscriptionCard";
import {Footer} from "@/components/footer";
import {
    Box,
    Stack,
    VStack
} from '@chakra-ui/react';
import {SectionHeader} from "@/components/sectionHeader";
import {EventCard} from "@/components/eventCard";
import {useEffect, useState} from "react";
import {CategorySelect} from "@/components/categorySelect";
import { EventAPI } from '@/models/event.ts';
import {formatDate, formatDateForApi, getNextDateRange} from '@/views/mainPage/methods.ts';
import {CategorySelectState} from "@/components/categorySelect/typings.ts";
import {Button} from "@/components/ui/button.tsx";
import axios from "axios";

export const MainPage = () => {
    const [eventsDay, setEventsDay] = useState<EventAPI[]>([]);
    const [eventsWeek, setEventsWeek] = useState<EventAPI[]>([]);
    const [eventsMonth, setEventsMonth] = useState<EventAPI[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [selectedCategory, setSelectedCategory] = useState<CategorySelectState>();
    const [search, setSearch] = useState<string>();
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
        setSelectedDate(value)
    }

    const fetchEvents = async (
        searchParams?: URLSearchParams,
        excludeIds: number[] = []
    ) => {
      try {
          if (search && searchParams) {
              searchParams.append('q', search)
          }

          if (selectedCategory?.value && searchParams) {
              const categoryValues = selectedCategory.value.join(',');
              searchParams.append('categories', categoryValues);
          }

          const { data } = await axios.post(`/api/events${searchParams ? '?' + searchParams.toString() : ''}`, {
              excludeIds
          })

          return data.body
      } catch (e) {
          console.error(e)
      }
    }

    const getEventsDay = async (page = 1) => {
      try {
          setIsLoading(true)
          const searchParams = new URLSearchParams();

          const date = formatDateForApi(selectedDate || new Date())

          searchParams.append('dateRangeStart', date)
          searchParams.append('dateRangeEnd', date)
          searchParams.append('page', JSON.stringify(page))

          const excludeIds: number[] = eventsDay.map((item) => item.id)

          const events = await fetchEvents(searchParams, excludeIds)

          if (!events.length) {
              setIsDisableDayButton(true)
          }

          setEventsDay((prevState) => ([
              ...prevState,
              ...events
          ]))
      } catch (e) {
          console.error(e)
      }
        setIsLoading(false)
    }

    const getEventsWeek = async (page = 1) => {
        try {
            setIsLoading(true)
            const searchParams = new URLSearchParams();

            searchParams.append('dateRangeStart', nextWeek.start)
            searchParams.append('dateRangeEnd', nextWeek.end)
            searchParams.append('page', JSON.stringify(page))

            const excludeIds: number[] = eventsWeek.map((item) => item.id)

            const events = await fetchEvents(searchParams, excludeIds)

            if (!events.length) {
                setIsDisableWeekButton(true)
            }

            setEventsWeek((prevState) => ([
                ...prevState,
                ...events
            ]))
        } catch (e) {
            console.error(e)
        }
        setIsLoading(false)
    }

    const getEventsMonth = async (page = 1) => {
        try {
            setIsLoading(true)
            const searchParams = new URLSearchParams();

            searchParams.append('dateRangeStart', nextMonth.start)
            searchParams.append('dateRangeEnd', nextMonth.end)
            searchParams.append('page', JSON.stringify(page))

            const excludeIds: number[] = eventsMonth.map((item) => item.id)

            const events = await fetchEvents(searchParams, excludeIds)

            if (!events.length) {
                setIsDisableMonthButton(true)
            }

            setEventsMonth((prevState) => ([
                ...prevState,
                ...events
            ]))
        } catch (e) {
            console.error(e)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        if (selectedDate) {
            (async () => {
                await getEventsDay()
            })()
        }
    }, [selectedDate]);

    useEffect(() => {
        (async () => {
            await getEventsDay()
            await getEventsWeek()
            await getEventsMonth()
        })()
    }, [search, selectedCategory]);

    const onChangeSelect = (e: CategorySelectState) => {
        setSelectedCategory(e)
    }


    const onSearchChange = (value: string) => {
        setSearch(value)
    }

    return (
        <Box>
            <Header />

            <Box
              position={'relative'}
              px={{ base: '20px', md: '30px', lg: '30px' }}
              pb={{ base: '60px', md: '80px' }}
            >
                <MainContent
                  currentDate={selectedDate}
                  onChange={onSelectDate}
                  onSearch={onSearchChange}
                />

                <Stack
                  lg={{ flexDirection: 'row', }}
                  md={{ flexDirection: 'column-reverse', justifyContent: 'space-between' }}
                  alignItems={'flex-start'}
                  gap={10}
                  mx={'auto'}
                  maxW={1440}
                  pt={{ base: '60px', md: '80px', lg: '100px' }}
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

                                <Box minWidth={'320px'}>
                                    <CategorySelect onChange={onChangeSelect} border='1px solid' />
                                </Box>
                            </Stack>

                            {!!eventsDay.length && (
                              <VStack md={{alignItems: 'center'}} alignItems="flex-start" w={'100%'}>
                                  {eventsDay?.map((item, key) => (
                                    <EventCard key={key} {...item} />
                                  ))}

                                  {!isDisableDayButton && (
                                      <Button
                                          bg={'rgba(29, 72, 230, 0.05)'}
                                          color={'blue'}
                                          size="lg"
                                          borderRadius="14px"
                                          width={{ md: '100%' }}
                                          h={{ base: '58px' }}
                                          loading={isLoading}
                                          onClick={async () => {
                                              await getEventsDay(pageDay + 1)
                                              setPageDay((prevState) => prevState + 1)
                                          }}
                                      >
                                          More events
                                      </Button>
                                  )}
                              </VStack>
                            )}
                        </VStack>

                        <VStack gap={{ base: '36px' }} width="100%" alignItems="flex-start">
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

                            {!!eventsWeek.length && (
                              <VStack md={{alignItems: 'center'}} alignItems="flex-start" w={'100%'}>
                                  {eventsWeek?.map((item, key) => (
                                    <EventCard key={key} {...item} />
                                  ))}

                                  {!isDisableWeekButton && (
                                      <Button
                                          bg={'rgba(29, 72, 230, 0.05)'}
                                          color={'blue'}
                                          size="lg"
                                          borderRadius="14px"
                                          width={{ md: '100%' }}
                                          h={{ base: '58px' }}
                                          loading={isLoading}
                                          onClick={async () => {
                                              await getEventsWeek(pageWeek + 1)
                                              setPageWeek((prevState) => prevState + 1)
                                          }}
                                      >
                                          More events
                                      </Button>
                                  )}
                              </VStack>
                            )}
                        </VStack>

                        <VStack gap={{ base: '36px' }} width="100%" alignItems="flex-start" w={'100%'}>
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

                            {!!eventsMonth.length && (
                              <VStack md={{alignItems: 'center'}} alignItems="flex-start" w={'100%'}>
                                  {eventsMonth?.map((item, key) => (
                                    <EventCard key={key} {...item} />
                                  ))}

                                  {!isDisableMonthButton && (
                                      <Button
                                          bg={'rgba(29, 72, 230, 0.05)'}
                                          color={'blue'}
                                          size="lg"
                                          borderRadius="14px"
                                          width={{ md: '100%' }}
                                          h={{ base: '58px' }}
                                          loading={isLoading}
                                          onClick={async () => {
                                              await getEventsMonth(pageMonth + 1)
                                              setPageMonth((prevState) => prevState + 1)
                                          }}
                                      >
                                          More events
                                      </Button>
                                  )}
                              </VStack>
                            )}
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
            </Box>

            <Footer />
        </Box>
    );
};

