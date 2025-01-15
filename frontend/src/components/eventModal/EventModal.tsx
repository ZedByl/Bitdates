import {
  DialogBody, DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
} from "@/components/ui/dialog.tsx";
import { FC } from "react";
import { EventModalProps } from "@/components/eventModal/types.ts";
import { Box, Flex, Heading, HStack, VStack, Text, Image, Separator, Stack } from '@chakra-ui/react';
import { Button } from "@/components/ui/button.tsx";
import { CalendarIcon } from '@/components/eventModal/icons/Calendar.tsx';
import { LinkIcon } from '@/components/eventModal/icons/Link.tsx';
import { SubscriptionCard } from '@/components/subscriptionCard';
import LazyImageWithFallback from "@/components/image/Image.tsx";
import defaultImage from "@/assets/default-coin.png";

const options: Intl.DateTimeFormatOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

export const EventModal: FC<EventModalProps> = ({ event, coinImage, open, onClose }) => {
  const { title, coins, date_event: dateEvent, image_url: imageUrl, description, proof } = event || {};
  const coin = coins && (coins[0] || null);

  // console.log(event)

  const handleOpenSourceLink = () => {
    if (!proof) return;
    window.open(proof, "_blank");
  };

  const handleOpenCalendar = () => {
    const searchParams = new URLSearchParams();

    const baseUrl = 'https://calendar.google.com/calendar/u/0/r/eventedit';
    const text = title?.en || '';
    const details = description?.en;
    const date = dateEvent && new Date(dateEvent);

    const formattedDate = date ? date.toISOString().slice(0, 10).replace(/-/g, '') : '';

    if (text) {
      searchParams.append('text', text);
    }
    if (details) {
      searchParams.append('details', details);
    }

    searchParams.append('dates', `${formattedDate}/${formattedDate}`);

    // dates=20201231T160000/20201231T170000
    // recur=RRULE:FREQ%3DWEEKLY;UNTIL%3D20210603
    // ctz=America/Toronto

    const url = baseUrl + (searchParams ? '?' + searchParams.toString() : '');
    console.log(url);
    window.open(url, "_blank");
  };

  return (
    <DialogRoot open={open} size={{ smOnly: 'full' }} placement="center" motionPreset="slide-in-bottom" scrollBehavior="inside">
      <DialogContent maxW={'1280px'} maxH={{ base: '100%' }} m={{ md: '0 30px' }} borderRadius={{ base: 0, md: '20px' }}>
        <DialogHeader>
          <Flex w={'full'} justifyContent={'flex-start'}>
            <DialogCloseTrigger onClick={onClose}/>
          </Flex>
        </DialogHeader>

        <DialogBody>
          <Flex w="100%" direction={{ base: 'column-reverse', lg: 'row' }} justify="space-between" align="start" gap={{ base: '60px' }}>
            <VStack maxW={{ lg: '440px' }} w="100%" align="start">
              {coin && (
                <Box w="100%" p={{ base: '20px' }} bg="white" borderRadius={'16px'} boxShadow="0px 4px 33px rgba(0, 0, 0, 0.06)">
                  <HStack gap={{ base: '16px' }}>
                    <Box width='50px' height='50px'>
                      <LazyImageWithFallback src={coinImage} defaultSrc={defaultImage} alt={coins[0].name} />
                    </Box>

                    <Text fontWeight="bold" fontSize="lg">{coin?.name}</Text>
                  </HStack>

                  {/*<VStack align="start" mt={4}>*/}
                  {/*    <Box>*/}
                  {/*        <Text color="gray.500">Price</Text>*/}
                  {/*        <HStack justify="space-between" w="100%">*/}
                  {/*            <Text fontWeight="bold">0.004567 USD</Text>*/}
                  {/*        </HStack>*/}
                  {/*        <Box h="2px" bg="blue.500" mt={2}/>*/}
                  {/*    </Box>*/}

                  {/*    <Box>*/}
                  {/*        <Text color="gray.500">Marketcap</Text>*/}
                  {/*        <Text fontWeight="bold">300M USD</Text>*/}
                  {/*    </Box>*/}

                  {/*    <Box>*/}
                  {/*        <Text color="gray.500">Volume</Text>*/}
                  {/*        <Text fontWeight="bold">506K USD</Text>*/}
                  {/*    </Box>*/}
                  {/*</VStack>*/}
                </Box>
              )}

              <Box maxW={{ lg: '440px' }}>
                <SubscriptionCard />
              </Box>
            </VStack>

            <VStack gap="24px" align="start" w={{ base: '100%' }}>
              {title && <Heading size="4xl">{title?.en}</Heading>}

              <Separator />

              <Stack
                mt='6px'
                w='100%'
                gap={{ base: '10px' }}
                justifyContent={'space-between'}
                flexDirection={{ base: 'column', md: 'row' }}
              >
                <Button
                  colorPalette={'blue'}
                  size="lg"
                  borderRadius="14px"
                  width={{ md: '50%' }}
                  h={{ base: '58px' }}
                  colorScheme="blue"
                  onClick={handleOpenCalendar}
                >
                                    Add event to Calendar <CalendarIcon />
                </Button>
                <Button
                  onClick={handleOpenSourceLink}
                  colorPalette={'gray'}
                  size="lg"
                  borderRadius="14px"
                  width={{ md: '50%' }}
                  h={{ base: '58px' }}
                  variant="outline"
                >
                                    Event source <LinkIcon />
                </Button>
              </Stack>

              {imageUrl && (
                <Image borderRadius={"16px"} rounded="md" src={imageUrl} alt={title?.en} />
              )}

              <Separator m={{ base: '8px 0' }} />

              <VStack align="start" w="100%" gap={{ base: '32px' }}>
                <Box>
                  <Text fontWeight="bold" fontSize="lg" mb={{ base: '12px' }}>
                                        Event date
                  </Text>

                  {dateEvent && <Text fontSize={'md'} color='gray.400'>{new Date(dateEvent).toLocaleDateString('en-EN', options)}</Text>}
                </Box>


                <Box>
                  <Text fontWeight="bold" fontSize="lg" mb={{ base: '12px' }}>
                                        Event description
                  </Text>
                  {description && (
                    <Text fontSize={'md'} color='gray.400'>
                      {description?.en}
                    </Text>
                  )}
                </Box>
              </VStack>
            </VStack>
          </Flex>
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
};

