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
import { formatDate, getNextDateRange } from '@/views/mainPage/methods.ts';

export const MainPage = () => {
    const [eventsDay, setEventsDay] = useState<EventAPI[]>([]);
    const [eventsWeek, setEventsWeek] = useState<EventAPI[]>([]);
    const [eventsMonth, setEventsMonth] = useState<EventAPI[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [selectedCategory, setSelectedCategory] = useState<number>();
    const [search, setSearch] = useState<string>();

    const nextWeek = getNextDateRange('week');
    const nextMonth = getNextDateRange('month');

    const onSelectDate = (value: Date | null) => {
        setSelectedDate(value)
    }

    const fetchEvents = async (searchParams?: URLSearchParams) => {
      try {
          if (search && searchParams) {
              searchParams.append('q', search)
          }

          if (selectedCategory && searchParams) {
              searchParams.append('categories', selectedCategory.toString())
          }

          return await fetch(`/api/events${searchParams ? '?' + searchParams.toString() : ''}`, {
              method: 'GET',
          })
          .then(res => res.json())
          .then((res) => res.body || [])
      } catch (e) {
          console.error(e)
      }
    }

    const getEventsDay = async () => {
      try {
          const searchParams = new URLSearchParams();

          const events = await fetchEvents(searchParams)
          setEventsDay(events)
      } catch (e) {
          console.error(e)
      }
    }

    const getEventsWeek = async () => {
        try {
            const searchParams = new URLSearchParams();

            searchParams.append('dateRangeStart', nextWeek.start)
            searchParams.append('dateRangeEnd', nextWeek.end)

            const events = await fetchEvents(searchParams)
            setEventsWeek(events)
        } catch (e) {
            console.error(e)
        }
    }

    const getEventsMonth = async () => {
        try {
            const searchParams = new URLSearchParams();

            searchParams.append('dateRangeStart', nextMonth.start)
            searchParams.append('dateRangeEnd', nextMonth.end)

            const events = await fetchEvents(searchParams)
            setEventsMonth(events)
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        fetch('/api/user/me', {
            credentials: 'include',
        }).then(res => res.json()).then(console.log)
    }, [])

    useEffect(() => {
        (async () => {
            await getEventsDay()
            await getEventsWeek()
            await getEventsMonth()
        })()
    }, [search, selectedCategory]);

    const onChangeSelect = (val: any) => {
        setSelectedCategory(val.value)
    }


    const onSearchChange = (value: string) => {
        setSearch(value)
    }

    return (
        <Box>
            <Header />

            <Box
              position={'relative'}
              px={{ base: '20px', md: '30px', lg: 0 }}
              pb={{ base: '60px', md: '120px' }}
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
                                    <EventCard categoryId={selectedCategory} key={key} {...item} />
                                  ))}
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
                                    <EventCard categoryId={selectedCategory} key={key} {...item} />
                                  ))}
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
                                    <EventCard categoryId={selectedCategory} key={key} {...item} />
                                  ))}
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
                        <SubscriptionCard/>
                    </Stack>
                </Stack>
            </Box>

            <Footer />
        </Box>
    );
};

