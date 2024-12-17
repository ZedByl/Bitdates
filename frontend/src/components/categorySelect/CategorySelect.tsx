import {
    Box,
    Button,
    Flex,
    VStack,
    HStack,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import {
    AirdropIcon,
    AllianceIcon,
    EducationalIcon,
    ExchangesEventsIcon,
    HardForksIcon,
    ListingIcon,
    MeetupIcon,
    ProtocolUpdatesIcon,
    ServiceLaunchIcon,
    TestnetIcon,
    TokenBurnIcon,
    TokenSaleIcon,
    VotingIcon
} from '@/assets/icons/icons.tsx';
import { FC, useState } from "react";
import { CategorySelectProps } from "@/components/categorySelect/typings.ts";

export const categories = [
    { value: 1, label: "Listing", icon: <ListingIcon w="100%" h="100%" /> },
    { value: 2, label: "Protocol Updates", icon: <ProtocolUpdatesIcon w="100%" h="100%" /> },
    { value: 3, label: "Hard Forks", icon: <HardForksIcon w="100%" h="100%" /> },
    { value: 4, label: "Airdrop", icon: <AirdropIcon w="100%" h="100%" /> },
    { value: 5, label: "Voting", icon: <VotingIcon w="100%" h="100%" /> },
    { value: 6, label: "Testnet", icon: <TestnetIcon w="100%" h="100%" /> },
    { value: 7, label: "Alliance", icon: <AllianceIcon w="100%" h="100%" /> },
    { value: 8, label: "Meetup", icon: <MeetupIcon w="100%" h="100%" /> },
    { value: 9, label: "Token Sale", icon: <TokenSaleIcon w="100%" h="100%" /> },
    { value: 10, label: "Service Launch", icon: <ServiceLaunchIcon w="100%" h="100%" /> },
    { value: 11, label: "Exchanges Events", icon: <ExchangesEventsIcon w="100%" h="100%" /> },
    { value: 12, label: "Token Burn", icon: <TokenBurnIcon w="100%" h="100%" /> },
    { value: 13, label: "Educational", icon: <EducationalIcon w="100%" h="100%" /> },
];

export const CategorySelect: FC<CategorySelectProps> = ({ onChange, border, size }) => {
    const { open, onToggle, onClose } = useDisclosure();
    const [selectedCategory, setSelectedCategory] = useState<{
        value: number;
        label: string;
        icon: JSX.Element;
    } | null>(null);

    const handleSelect = (category: typeof categories[0]) => {
        setSelectedCategory(category);
        onClose(); // Закрыть выпадающий список
        if (onChange) {
            onChange(category);
        }
    };

    return (
      <Box position="relative" w="full">
          <Button
            onClick={onToggle}
            bg="white"
            size={size}
            border={border}
            borderColor={border && 'gray.200'}
            borderRadius="14px"
            h="58px"
            w="full"
            _hover={{ borderColor: "gray.300", outline: "none" }}
            _focus={{ borderColor: "gray.500", outline: "none" }}
            _active={{ borderColor: "gray.500", outline: "none" }}
          >
              <HStack position="relative" justify="space-between" w="full">
                  <HStack>
                      {selectedCategory && (
                        <Box w="30px" h="30px">
                            {selectedCategory.icon}
                        </Box>
                      )}
                      <Text style={{ color: selectedCategory ? 'black' : 'rgba(30, 30, 30, 0.4)'}} fontSize="md" color="gray.800">
                          {selectedCategory ? selectedCategory.label : 'Event category'}
                      </Text>
                  </HStack>

                  <svg style={{ transform: `${open ? 'rotate(180deg)' : 'rotate(0)'}`, transition: '150ms', width: '12px' }} xmlns="http://www.w3.org/2000/svg" width="10" height="6" viewBox="0 0 10 6" fill="none">
                      <path fillRule="evenodd" clipRule="evenodd"
                            d="M5.53026 5.78023C5.38962 5.92083 5.19889 5.99982 5.00001 5.99982C4.80114 5.99982 4.61041 5.92083 4.46976 5.78023L0.227013 1.53748C0.15538 1.46829 0.0982436 1.38553 0.0589368 1.29403C0.0196301 1.20253 -0.00105966 1.10411 -0.00192503 1.00453C-0.00279039 0.904943 0.0161861 0.806184 0.0538967 0.714012C0.0916074 0.62184 0.147297 0.5381 0.217717 0.467681C0.288136 0.397261 0.371875 0.341571 0.464047 0.303861C0.55622 0.26615 0.654979 0.247174 0.754564 0.248039C0.854148 0.248905 0.952563 0.269594 1.04407 0.308901C1.13557 0.348208 1.21833 0.405344 1.28751 0.476977L5.00001 4.18948L8.71251 0.476976C8.85397 0.340358 9.04342 0.264762 9.24006 0.266471C9.43671 0.26818 9.62482 0.347056 9.76388 0.486112C9.90293 0.625168 9.98181 0.813278 9.98352 1.00993C9.98523 1.20657 9.90963 1.39603 9.77301 1.53748L5.53026 5.78023Z"
                            fill="#1E1E1E" fillOpacity="0.4" />
                  </svg>
              </HStack>
          </Button>

          {/* Выпадающий список */}
          {open && (
            <VStack
              position="absolute"
              bg="white"
              border="1px solid"
              borderColor="gray.200"
              borderRadius="8px"
              boxShadow="md"
              mt="2"
              w="full"
              zIndex="10"
              maxH="300px"
              overflowY="auto"
            >
                {categories.map((category) => (
                  <Flex
                    key={category.value}
                    as="button"
                    onClick={() => handleSelect(category)}
                    w="full"
                    p="3"
                    align="center"
                    _hover={{bg: 'gray.100'}}
                    _focus={{bg: 'gray.200'}}
                  >
                      <Box w="30px" h="30px" mr="3">
                          {category.icon}
                      </Box>
                      <Text>{category.label}</Text>
                  </Flex>
                ))}
            </VStack>
          )}
      </Box>
    );
};
