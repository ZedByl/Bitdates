import { Box, Text, Heading, Input, Button, VStack } from "@chakra-ui/react";

export const SubscriptionCard = () => {
    return (
        <Box
            maxW={'400px'}
            p={6}
            boxShadow={'sm'}
            borderRadius="lg"
        >
            <VStack  align="start">
                <Heading size="lg" fontWeight="bold">
                    Be aware of the recent news in crypto every day
                </Heading>
                <Text color="gray.600">
                    Please keep me updated by email with the latest crypto news, research
                    findings, reward programs, event updates, coin listings, and more
                    information from Bitdates.
                </Text>
                <Input
                    placeholder="Enter your email address"
                    size="lg"
                    borderRadius="md"
                />
                <Button colorPalette="blue" w="full" size="lg">
                    Subscribe
                </Button>
            </VStack>
        </Box>
    );
};

