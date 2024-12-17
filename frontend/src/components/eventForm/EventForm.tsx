import {useState} from "react";
import {
    Box,
    Flex,
    VStack
} from '@chakra-ui/react';
import { FirstStep } from '@/components/eventForm/components/FirstStep.tsx';
import { SecondStep } from '@/components/eventForm/components/SecondStep.tsx';

export const EventForm = () => {
    const [title, setTitle] = useState<string>();
    const [category, setCategory] = useState<number>();
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [text, setText] = useState("");
    const [eventLink, setEventLink] = useState("");
    const [step, setStep] = useState(1);

    const handleNext = () => setStep((prev) => prev + 1);
    // const handlePrev = () => setStep((prev) => prev - 1);

    const onCreateEvent = () => {
        fetch('/api/events/create', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "title": title,
                "category": category,
                "eventDate": "2024-11-30T12:00:00Z",
                "description": "Air Drop Test",
                "eventLink": "https://example.com/event",
                "imageUrl": "https://example.com/image.jpg"
            })
        })
            .then(res => res.json())
    }

    const onChangeCategory = (value:any) => {
        setCategory(value.value)
    }

    const onSelectDate = (value: Date | null) => {
        setSelectedDate(value)
    }

    return (
        <Flex
          display="flex"
          justifyContent="center"
          w="100%"
          pt={{ base: '120px' }}
        >
            <Box w="100%" maxW="710px">
                <VStack align="stretch" gap="16px" px={{ base: '20px', md: 0 }}>
                    {step === 1 && (
                      <FirstStep
                        selectedDate={selectedDate}
                        setTitle={setTitle}
                        onSelectDate={onSelectDate}
                        onChangeCategory={onChangeCategory}
                        handleNext={handleNext}
                      />
                    )}

                    {step === 2 && (
                      <SecondStep
                        text={text}
                        eventLink={eventLink}
                        setText={setText}
                        setEventLink={setEventLink}
                        onCreateEvent={onCreateEvent}
                      />
                    )}
                </VStack>
            </Box>
        </Flex>
    );
};

