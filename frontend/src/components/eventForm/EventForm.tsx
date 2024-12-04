import {
    Box,
    Button,
    Flex,
    Heading,
    Input,
    Text,
    VStack
} from "@chakra-ui/react";
import {CategorySelect} from "@/components/categorySelect";
import {useState} from "react";


export const EventForm = () => {

    const [title, setTitle] = useState<string>();
    const [category, setCategory] = useState<number>();

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

    return (
        <Flex w={'100%'} bg="gray.50" h="100%" display="flex" alignItems="center" justifyContent="center" p={6}>
            <Box bg="white" rounded="lg">
                <VStack align="stretch">
                    <Heading fontWeight={'bold'} as="h1" size="7xl" textAlign="center">
                        Add new event
                    </Heading>
                    <Text fontSize="lg" color="gray.500" textAlign="center">
                        Start Points
                    </Text>
                    <Input onChange={(ev) => setTitle(ev.target.value)} placeholder="Event title" size="lg"/>

                    <Input placeholder="Event date" size="lg" type="date"/>
                    <Box maxH={'40px'}>
                        <CategorySelect onChange={onChangeCategory}/>
                    </Box>

                    <Button mt={10} onClick={onCreateEvent} colorPalette="blue" size="lg">
                        Continue
                    </Button>
                </VStack>
            </Box>
        </Flex>
    );
};

