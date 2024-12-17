import { Box, Text, Heading, Input, Button, VStack } from "@chakra-ui/react";

export const SubscriptionCard = () => {
    return (
        <Box
            p={{ base: '20px' }}
            boxShadow="0px 4px 33px rgba(0, 0, 0, 0.06)"
            borderRadius="10px"
        >
            <VStack  align="start">
                <Heading size="lg" fontWeight="bold">
                    Be aware of the recent news<br />in crypto every day
                </Heading>
                <Text fontSize={'md'} color="gray.600" mb={{ base: '32px' }}>
                    Please keep me updated by email with the latest crypto news, research
                    findings, reward programs, event updates, coin listings, and more
                    information from Bitdates.
                </Text>
                <Input
                  bg='#F0F2F5'
                  placeholder="Enter your email address"
                  _placeholder={{ color: 'rgba(30, 30, 30, 0.4)' }}
                  _focus={{
                      border: 0,
                      outlineStyle: "none"
                  }}
                  _focusVisible={{
                      border: 0,
                      outlineStyle: "none"
                  }}
                  h={{ base: '58px' }}
                  border={0}
                  size="xl"
                  borderRadius="10px"
                />
                <Button colorPalette="blue" size="lg" borderRadius="14px" h={{ base: '54px' }} w="full">
                    Subscribe
                </Button>
            </VStack>
        </Box>
    );
};

