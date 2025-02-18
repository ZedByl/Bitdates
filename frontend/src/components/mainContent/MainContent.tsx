import { Box, Button, Heading, Stack, Text } from '@chakra-ui/react';
// import {SearchInput} from "@/components/searchInpunt";
import { FC, useRef, useState } from 'react';
import { MainContentProps } from "@/components/mainContent/typings.ts";
import { Calendar } from '@/components/calendar';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';

export const MainContent:FC<MainContentProps> = ({
  currentDate,
  onChange
  // onSearch
}) => {
  const [openCalendar, setOpenCalendar] = useState<boolean>(false);
  const refButton = useRef<HTMLButtonElement>(null);
  const refCalendar = useRef(null);

  const handleOpenCalendar = () => {
    setOpenCalendar((prevState) => !prevState);
  };

  useOnClickOutside([refCalendar, refButton], () => setOpenCalendar(false));

  return (
    <Box textAlign={{ base: 'left', md: 'center' }} backgroundColor='#fff' >
      <Stack
        justifyContent={'space-between'}
        maxW="900px"
        mx="auto"
        pb="100px"
        pt={{ base: '100px', md: '120px' }}
        gap={{ base: '100px', md: 0 }}
      >
        <Box
          // mb="80px"
        >
          <Heading size={{ base: '4xl', md: '6xl', lg: '7xl' }} mb={{ base: '20px', md: '30px' }}>
                        Crypto Events <Text as="span" color="blue.500">Calendar</Text>
          </Heading>

          <Text fontSize={{ base: 'md', md: 'xl' }} m={'0 auto'} textAlign="center" color="gray.600" maxW="770px" >
                        Stay up-to-date with the CryptoCalendar. We list all the major events in the crypto and
                        blockchain ecosystems so that you can stay informed.
          </Text>
        </Box>

        <Stack position={'relative'} w={'full'} maxW="645px" mx="auto" >
          {/*<SearchInput onSearch={onSearch} />*/}
          <Box ref={refCalendar} display={openCalendar ? 'block' : 'none' } position={'absolute'} zIndex={100} top={'68px'}>
            <Calendar currentDate={currentDate} onChange={onChange} />
          </Box>

          <Button
            ref={refButton}
            display={{ base: 'block', md: 'none' }}
            borderRadius={{ base: '10px' }}
            colorPalette="blue"
            size="xl"
            onClick={handleOpenCalendar}
          >
                      Open Calendar
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

