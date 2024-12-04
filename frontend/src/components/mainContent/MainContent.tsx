import {Box, Heading, Text, VStack} from '@chakra-ui/react';
import {SearchInput} from "@/components/searchInpunt";
import {FC} from "react";
import {MainContentProps} from "@/components/mainContent/typings.ts";

export const MainContent:FC<MainContentProps> = ({onSearch}) => {

    return (
        <Box textAlign="left" >
            <VStack  h={600} justifyContent={'space-between'} maxW={'50%'} my={20}>
                <Box>
                    <Heading size={'7xl'} mb={4}>
                        Crypto Events <br/> <Text as="span" color="blue.500">Calendar</Text>
                    </Heading>
                    <Text fontSize="2xl" color="gray.500">
                        Stay up-to-date with the bitdates crypto calendar. We list all the major events in the crypto and
                        blockchain ecosystems so that you can stay informed.
                    </Text>
                </Box>
                <Box w={'full'}>
                    <SearchInput onSearch={onSearch} />
                </Box>
            </VStack>
        </Box>
    );
};

