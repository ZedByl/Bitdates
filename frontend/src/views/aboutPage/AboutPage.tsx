import {Header} from "@/components/header";
import {Box, Heading, Text} from "@chakra-ui/react";

export const AboutPage = () => {
    return (
        <Box>
            <Header/>
            <Box position={'relative'} mx={'auto'} maxW={768} md={{maxW: 1440}}>
                <Box mt={20}>
                    <Heading mb={5} size={'4xl'}>BitDates - Crypto Events Calendar</Heading>
                    <Text>BitDates is a platform designed to help users stay informed about the most important events in
                        the world of cryptocurrency and blockchain. The service offers a calendar that gathers key
                        events, such as token listings, protocol updates, governance votes, and other significant
                        occasions. Each user can easily browse upcoming events, add them to their personal calendar, and
                        subscribe to updates to receive timely information directly to their email.</Text>
                </Box>
            </Box>
        </Box>
    );
};

