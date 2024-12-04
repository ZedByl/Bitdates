import {Header} from "@/components/header";
import {MainContent} from "@/components/mainContent";
import {Calendar} from "@/components/calendar";
import {SubscriptionCard} from "@/components/subscriptionCard";
import {Footer} from "@/components/footer";
import {
    Box,
    HStack, Stack,
    VStack
} from "@chakra-ui/react";
import {SectionHeader} from "@/components/sectionHeader";
import {EventCard} from "@/components/eventCard";
import {EventModal} from "@/components/eventModal";
import {useEffect, useState} from "react";
import {CategorySelect} from "@/components/categorySelect";

export const MainPage = () => {

    const [events, setEvents] = useState<any[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date>()
    const [selectedEvent, setSelectedEvent] = useState<number>()
    const [selectedCategory, setSelectedCategory] = useState<number>();
    const [search, setSearch] = useState<string>();

    const onSelectDate = (value: Date | undefined) => {
        setSelectedDate(value)
    }

    useEffect(() => {
        fetch("/api/coins/get-coins", {
            headers: {
                Accept: 'application/json',
                'Accept-Encoding': 'deflate, gzip',
                'x-api-key': 'ikb0u7ihz65kAtGmJF3FD62vQniaUORo8xNos5cd'
            },
        }).then((res) => res.json()).then((res) => res.body)
    }, []);

    useEffect(() => {
        fetch('/api/user/me', {
            credentials: 'include',
        }).then(res => res.json()).then(console.log)
    }, [])

    useEffect(() => {
        const searchParams = new URLSearchParams();
        if (search) {
            searchParams.append('q', search)
        }
        if (selectedCategory) {
            searchParams.append('category', selectedCategory.toString())
        }
        fetch(`/api/events?${searchParams.toString()}`, {
            method: 'GET',
        }).then(res => res.json()).then((res) => setEvents(res.body || []))
    }, [search, selectedCategory]);


    const onEventClick = (id: number) => {
        setSelectedEvent(id);
    }

    const handleCloseModal = () => {
        setSelectedEvent(undefined);
    }

    const onChangeSelect = (val: any) => {
        setSelectedCategory(val.value)
    }


    const onSearchChange = (value: any) => {
        setSearch(value)
    }

    return (
        <Box>
            <Header/>
            <Box position={'relative'} mx={'auto'} maxW={768} md={{maxW: 1440}}>
                <Box>
                    <MainContent onSearch={onSearchChange}/>
                </Box>
                <EventModal onClose={handleCloseModal} open={!!selectedEvent}/>
                <Stack flexDirection={'column-reverse'} md={{flexDirection: 'row'}} alignItems={'flex-start'} gap={10}>
                    <VStack md={{w: '60%'}} width="100%" alignItems="flex-start">
                        <HStack md={{alignItems: "center"}} w={'full'} justifyContent={'space-between'}>
                            <SectionHeader date={selectedDate ? [selectedDate] : [new Date()]} title={'Tomorrow'}/>
                            <Box minWidth={'320px'}>
                                <CategorySelect onChange={onChangeSelect}/>
                            </Box>
                        </HStack>

                        {!!events.length && (
                          <VStack md={{alignItems: 'center'}} alignItems="flex-start" w={'100%'}>
                              {events?.map((item, key) => (
                                <EventCard categoryId={selectedCategory} onClick={onEventClick} key={key} {...item} />
                              ))}
                          </VStack>
                        )}
                    </VStack>
                    <Stack flexDirection={'row'} md={{flexDirection: 'column'}} mt={20} position={'sticky'}
                           alignItems="flex-start" h={'full'}>
                        <Calendar currentDate={selectedDate} onChange={onSelectDate}/>
                        <SubscriptionCard/>
                    </Stack>
                </Stack>
            </Box>
            <Footer/>
        </Box>
    );
};

