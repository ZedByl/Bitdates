import {
    DialogBody, DialogCloseTrigger,
    DialogContent,
    DialogHeader,
    DialogRoot,
} from "@/components/ui/dialog.tsx";
import {FC} from "react";
import {EventModalProps} from "@/components/eventModal/typings.ts";
import {Box, Flex, Heading, HStack, Input, VStack, Text, Image} from "@chakra-ui/react";
import {Button} from "@/components/ui/button.tsx";
import TestImage from "/test.png";

export const EventModal: FC<EventModalProps> = ({open, onClose}) => {
    return (
        <DialogRoot  open={open}  size="cover" placement="center" motionPreset="slide-in-bottom">
            <DialogContent h={'80%'}>
                <DialogHeader>
                    <Flex w={'full'} justifyContent={'flex-start'}>
                        <DialogCloseTrigger onClick={onClose}/>
                    </Flex>

                </DialogHeader>
                <DialogBody >
                    <Flex w="100%"  justify="center" align="start">
                        <VStack w="30%" align="start">
                            <Box w="100%" p={2} bg="white" borderRadius="md" boxShadow="lg">
                                <HStack>
                                    <Image
                                        src={TestImage}
                                        boxSize="50px"
                                        alt="Tokenfi"
                                    />
                                    <Text fontWeight="bold">Tokenfi</Text>
                                </HStack>

                                <VStack align="start" mt={4}>
                                    <Box>
                                        <Text color="gray.500">Price</Text>
                                        <HStack justify="space-between" w="100%">
                                            <Text fontWeight="bold">0.004567 USD</Text>
                                        </HStack>
                                        <Box h="2px" bg="blue.500" mt={2}/>
                                    </Box>

                                    <Box>
                                        <Text color="gray.500">Marketcap</Text>
                                        <Text fontWeight="bold">300M USD</Text>
                                    </Box>

                                    <Box>
                                        <Text color="gray.500">Volume</Text>
                                        <Text fontWeight="bold">506K USD</Text>
                                    </Box>
                                </VStack>
                            </Box>

                            <Box w="100%" p={6} bg="white" borderRadius="md" boxShadow="lg">
                                <Heading size="sm" mb={4}>
                                    Be aware of the recent news in crypto every day
                                </Heading>
                                <Text fontSize="sm" color="gray.600" mb={4}>
                                    Please keep me updated by email with the latest crypto news, research findings,
                                    reward programs, event
                                    updates, coin listings, and more information from Bitdates.
                                </Text>
                                <Input placeholder="Enter your email address" mb={4}/>
                                <Button colorPalette="blue" w="100%">
                                    Subscribe
                                </Button>
                            </Box>
                        </VStack>

                        <VStack w="60%" ml={8} align="start">
                            <Heading size="6xl">Ai Alliance Merger Vote</Heading>
                            <HStack>
                                <Button colorPalette={'blue'} borderRadius={10} w={'100%'} colorScheme="blue">
                                    Add event to Calendar
                                </Button>
                                <Button colorPalette={'gray'} borderRadius={10} w={'100%'} variant="outline">
                                    Event source
                                </Button>
                            </HStack>
                            <Box w="100%" h="200px" bg="gray.200" borderRadius="md"/>
                            <VStack align="start" w="100%">
                                <Box>
                                    <Text fontWeight="bold" fontSize="sm" color="gray.600">
                                        Event date
                                    </Text>
                                    <Text>Friday 5 April 2024, UTC</Text>
                                </Box>


                                <Box>
                                    <Text fontWeight="bold" fontSize="sm" color="gray.600">
                                        Event description
                                    </Text>
                                    <Text>
                                        Bitfinex lists Tokenfi with TOKEN/USDT at 01:00 PM
                                    </Text>
                                </Box>
                            </VStack>
                        </VStack>
                    </Flex>
                </DialogBody>
            </DialogContent>
        </DialogRoot>
    );
};

