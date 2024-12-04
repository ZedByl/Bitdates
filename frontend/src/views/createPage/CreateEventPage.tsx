import {Box} from "@chakra-ui/react";
import {Header} from "@/components/header";
import {EventForm} from "@/components/eventForm";

export const CreateEventPage = () => {
    return (
        <Box w={'100%'} h={'100vh'}>
            <Header/>
            <EventForm/>
        </Box>
    );
};

