import { createFileRoute, useNavigate, useParams, useMatch } from '@tanstack/react-router';
import { Box, Flex, Heading, HStack, IconButton, Image, Separator, Stack, Text, VStack } from "@chakra-ui/react";
import { HiOutlineTrash } from "react-icons/hi2";
import { CloseButton } from "@/components/ui/close-button.tsx";
import LazyImageWithFallback from "@/components/image/Image.tsx";
import defaultImage from "@/assets/default-coin.png";
import { SubscriptionCard } from "@/components/subscriptionCard";
import { Button } from "@/components/ui/button.tsx";
import { CalendarIcon } from "@/components/eventModal/icons/Calendar.tsx";
import { LinkIcon } from "@/components/eventModal/icons/Link.tsx";
import { eventQueryOptions } from "@/api/event/eventQueryOptions.ts";
import { useEventStore } from "@/stores/event/eventStore.ts";
import { APIEndpoints } from "@/api/constants.ts";
import { fetchAPI } from "@/service/http.service.ts";
import { FiEdit } from "react-icons/fi";
import ShareEvent from "@/components/ShareEvent/ShareEvent.tsx";

export const Route = createFileRoute('/events/$eventId')({
  component: Event,
  beforeLoad: async ({ context, params }) => {
    const { eventId } = params;

    try {
      const event = await context.queryClient.ensureQueryData(eventQueryOptions(eventId));

      return { event };
    } catch (_) {
      const formData = new FormData();
      const newEvent = useEventStore.getState().event;

      if (!newEvent) return {};

      Object.entries(newEvent).forEach(([key, value]) => {
        if (key === 'image') {
          formData.append('image', value.rawFile);
        } else if (key === 'title' || key === 'description' || key === 'categories' || key === 'coins') {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value);
        }
      });

      const event = await fetchAPI.post(APIEndpoints.EVENTS + '/create', {}, { body: formData });

      return { event };
    }
  },
});

const options: Intl.DateTimeFormatOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

function Event() {
  const { eventId } = useParams({ from: '/events/$eventId' });
  const { context } = useMatch({ from: '/events/$eventId' });
  const navigation = useNavigate();

  const { event, user } = context;

  const { title, coins, date_event: dateEvent, image_url: imageUrl, description, proof } = event || {};
  const coin = coins && (coins[0] || null);
  const coinImage = `https://cryptologos.cc/logos/thumbs/${coin?.id}.png?v=034`;

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
    window.open(url, "_blank");
  };

  const deleteEvent = async () => {
    try {
      await fetchAPI.delete(`/api/events/${eventId}`);
      await navigation({ to: '/' });
    } catch (e: unknown) {
      console.error(e);
    }
  };

  const editEvent = async () => {
    try {
      window.open(`/auth/admin#/events/${eventId}`, "_blank");
    } catch (e: unknown) {
      console.error(e);
    }
  };

  return (
    <Flex
      w="100%"
      align="start"
      position="relative"
      justify="space-between"
      p={{ base: "42px 30px 60px" }}
      direction={{ base: "column-reverse", lg: "row" }}
      gap={{ base: "60px" }}
      bg="#F9FCFE"
    >
      <HStack position="absolute" top="12px" right="12px">
        {event?.user_id === user?.id && (
          <IconButton
            size="xs"
            aria-label="Delete event"
            variant="subtle"
            rounded="full"
            onClick={deleteEvent}
          >
            <HiOutlineTrash />
          </IconButton>
        )}

        {user?.id && (
          <IconButton
            size="xs"
            aria-label="Edit event"
            variant="subtle"
            rounded="full"
            onClick={editEvent}
          >
            <FiEdit />
          </IconButton>
        )}

        <CloseButton
          size="xs"
          variant="subtle"
          rounded="full"
          onClick={() => navigation({ to: "/" })}
        />
      </HStack>
      <VStack maxW={{ lg: "440px" }} w="100%" align="start">
        {coin && (
          <Box
            w="100%"
            p={{ base: "20px" }}
            bg="white"
            borderRadius={"16px"}
            boxShadow="0px 4px 33px rgba(0, 0, 0, 0.06)"
          >
            <HStack gap={{ base: "16px" }}>
              <Box width="50px" height="50px">
                <LazyImageWithFallback
                  src={coinImage}
                  defaultSrc={defaultImage}
                  alt={coins[0].name}
                />
              </Box>

              <Text fontWeight="bold" fontSize="lg">
                {coin?.name}
              </Text>
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

        <Box maxW={{ lg: "440px" }}>
          <SubscriptionCard />
        </Box>
      </VStack>

      <VStack gap="24px" align="start" w={{ base: "100%" }}>
        {title && <Heading size="4xl">{title?.en}</Heading>}

        <Separator />

        <Stack
          mt="6px"
          w="100%"
          gap={{ base: "10px" }}
          justifyContent={"space-between"}
          flexDirection={{ base: "column", md: "row" }}
        >
          <Box width={{ md: "100%" }}>
            <Button
              colorPalette={"blue"}
              size="lg"
              borderRadius="14px"
              w="100%"
              h={{ base: "54px" }}
              colorScheme="blue"
              onClick={handleOpenCalendar}
            >
              Add event to Calendar <CalendarIcon />
            </Button>
          </Box>

          <HStack width={{ md: "100%" }} gap={{ base: "10px" }}>
            <Button
              onClick={handleOpenSourceLink}
              colorPalette={"gray"}
              size="lg"
              w="calc(100% - 64px)"
              borderRadius="14px"
              h={{ base: "54px" }}
              variant="outline"
            >
              Event source <LinkIcon />
            </Button>

            <ShareEvent />
          </HStack>
        </Stack>

        {imageUrl && (
          <Image
            borderRadius={"16px"}
            rounded="md"
            src={imageUrl}
            alt={title?.en}
          />
        )}

        <Separator m={{ base: "8px 0" }} />

        <VStack align="start" w="100%" gap={{ base: "32px" }}>
          <Box>
            <Text fontWeight="bold" fontSize="lg" mb={{ base: "12px" }}>
              Event date
            </Text>

            {dateEvent && (
              <Text fontSize={"md"} color="gray.400">
                {new Date(dateEvent).toLocaleDateString("en-EN", options)}
              </Text>
            )}
          </Box>

          {description?.en && (
            <Box>
              <Text fontWeight="bold" fontSize="lg" mb={{ base: "12px" }}>
                  Event description
              </Text>
              {description && (
                <Text fontSize={"md"} color="gray.400">
                  {description?.en}
                </Text>
              )}
            </Box>
          )}
        </VStack>
      </VStack>
    </Flex>
  );
}
