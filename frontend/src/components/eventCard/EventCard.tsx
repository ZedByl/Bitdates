import { FC, useState } from 'react';
import { Box, HStack, VStack, Text, Stack, Separator, Button } from '@chakra-ui/react';
import { EventCardProps } from "./types.ts";
import { CalendarIcon } from "@/assets/icons/icons.tsx";
import { categories as categoriesMock } from "@/components/categorySelect/CategorySelect.tsx";
import { EventModal } from '@/components/eventModal';
import { useEventStore } from "@/stores/event/eventStore.ts";
import { Link } from '@tanstack/react-router';

import LazyImageWithFallback from "@/components/image/Image.tsx";
import defaultImage from '../../assets/default-coin.png';

export const EventCard: FC<EventCardProps> = (props) => {
  const { title, description, coins, categories, id } = props || {};
  const [open, setOpen] = useState<boolean>(false);
  const { setEvent } = useEventStore();

  const coinImage = `https://cryptologos.cc/logos/thumbs/${coins[0]?.id}.png?v=034`;

  const selectedCategory = categoriesMock.find((item) =>
    item.value?.find((mockId) =>
      categories.find(({ id }) => mockId === id))
  );
  const defaultIcon = categoriesMock[0].icon;
  const url = `/events/${id.toString()}`;

  return (
    <Link style={{ width: '100%' }} to={url} onClick={() => setEvent(props)} >
      <Box
        borderRadius="lg"
        boxShadow="sm"
        p={4}
        display="flex"
        alignItems="center"
        mb={4}
        w={'100%'}
        cursor="pointer"
      >
        <Stack direction={{ base: 'column', md: 'row' }} align={{ base: 'flex-start', md: 'center' }} justifyContent={'space-between'} w="full" gap="18px">
          <HStack gap={{ base: '12px' }} w={{ base: '100%' }} maxW={{ base: '480px' }}>
            <Box w={{ base: '36px', md: '48px' }} h={{ base: '36px', md: '48px' }}>
              {selectedCategory?.icon ? selectedCategory.icon : defaultIcon}
            </Box>
            <VStack align="start" flex={'1'}>
              <Text fontWeight="bold">{title.en}</Text>
              <Text truncate={{ base: false, md: true }} maxW={{ base: '100%', md: '400px' }} fontSize="sm" color="gray.600" >
                {description.en}
              </Text>
            </VStack>
          </HStack>

          <Separator display={{ base: 'block', md: 'none' }} />
          <Box display={{ base: 'none', md: 'block' }} borderRadius={'5px'} mx={5} h={'20px'} w={1} backgroundColor={'#EFF2F4'}/>

          {!!coins.length && (
            <HStack flex={'1'}>
              <Box minWidth="36px" width='36px' height='36px'>
                <LazyImageWithFallback src={coinImage} defaultSrc={defaultImage} alt={coins[0].name} />
              </Box>
              <Text>{coins[0].name}</Text>
            </HStack>
          )}

          <Box w={{ base: '100%', md: 'auto' }}>
            <Button display={{ base: 'block', md: 'none' }} size={'xl'} w={'100%'} color={'black'} borderRadius={'10px'} backgroundColor={'#EFF2F4'}>
                            Add to calendar
              <CalendarIcon w={'48px'} h={'48px'} />
            </Button>

            <Box w={'48px'} h={'48px'} display={{ base: 'none', md: 'block' }}>
              <CalendarIcon w={'48px'} h={'48px'} />
            </Box>
          </Box>
        </Stack>
      </Box>

      <EventModal event={props} coinImage={coinImage} onClose={() => setOpen(false)} open={open} />
    </Link>
  );
};
