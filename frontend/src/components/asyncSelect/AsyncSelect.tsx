import React, {useState, useEffect, useCallback, memo} from 'react';
import {
    Box,
    Flex,
    Input,
    Spinner,
    Text,
    VStack,
} from '@chakra-ui/react';
import Downshift from 'downshift';
import { useDebounce } from "@/hooks/useDebounce";
import {CoinApi} from "@/models/coin.ts";
import defaultImage from "@/assets/default-coin.png";
import LazyImageWithFallback from "@/components/image/Image.tsx";

interface AsyncSelectProps {
    onSelect: (item: any) => void;
    fetchOptions: (input: string) => Promise<CoinApi[]>;
    placeholder?: string;
}

export const AsyncSelect: React.FC<AsyncSelectProps> = memo(({
                                                            onSelect,
                                                            fetchOptions,
                                                            placeholder = 'Select an option',
                                                        }) => {
    const [options, setOptions] = useState<CoinApi[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const debounceValue = useDebounce(inputValue, 500);

    const fetchNewOptions = useCallback(async (value: string) => {
        try {
            const results = await fetchOptions(value);
            setOptions(results);
            setError(null);
        } catch (error) {
            console.error('Error fetching options:', error);
            setOptions([]);
            setError('Failed to load options');
        } finally {
            setIsLoading(false);
        }
    }, [fetchOptions]);

    useEffect(() => {
        if (!debounceValue) {
            setOptions([]);
            setIsLoading(false);
            setError(null);
            return;
        }

        setIsLoading(true);
        fetchNewOptions(debounceValue);
    }, [debounceValue, fetchNewOptions]);

    return (
        <Downshift
            onChange={onSelect}
            itemToString={(item) => (item ? item.name : '')}
            inputValue={inputValue}
            onInputValueChange={(value) => setInputValue(value)}
        >
            {({
                  getInputProps,
                  getItemProps,
                  getMenuProps,
                  isOpen,
                  openMenu,
                  getRootProps,
              }) => {
                return (
                    <Box
                        position="relative"
                        width="100%"
                        {...getRootProps({}, { suppressRefError: true })}
                    >
                        <Input
                            {...getInputProps({
                                placeholder,
                                onFocus: () => {
                                    if (options.length > 0) {
                                        openMenu();
                                    }
                                },
                            })}
                            bg="white"
                            size="xl"
                            placeholder="Token"
                            _placeholder={{ color: 'rgba(30, 30, 30, 0.4)' }}
                            _focus={{
                                outlineStyle: "none"
                            }}
                            _focusVisible={{
                                outlineStyle: "none"
                            }}
                            h={{ base: '58px' }}
                            borderRadius="14px"
                            boxShadow="0px 4px 33px rgba(0, 0, 0, 0.06)"
                        />
                        {isOpen && (
                            <Box
                                {...getMenuProps()}
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
                                {isLoading ? (
                                    <Box p={4} textAlign="center">
                                        <Spinner size="sm" />
                                    </Box>
                                ) : error ? (
                                    <Box p={4}>
                                        <Text color="red.500">{error}</Text>
                                    </Box>
                                ) : options?.length === 0 ? (
                                    <Box p={4}>
                                        <Text color="gray.500">No results found</Text>
                                    </Box>
                                ) : (
                                    <VStack
                                        align="stretch"
                                        maxH="300px"
                                        overflowY="auto"
                                    >
                                        {options?.map((item, index) => {
                                            const { ...restProps } = getItemProps({
                                                index,
                                                item,
                                            });
                                            const coinImage = item && `https://cryptologos.cc/logos/thumbs/${item.id}.png?v=034`

                                            return (
                                                <Flex
                                                    key={item.id || index}
                                                    {...restProps}
                                                    as="button"
                                                    w="full"
                                                    p="3"
                                                    align="center"
                                                    _hover={{bg: 'gray.100'}}
                                                    _focus={{bg: 'gray.200'}}
                                                    cursor="pointer"
                                                >
                                                    <Box w="30px" h="30px" mr="3">
                                                        <LazyImageWithFallback src={coinImage} defaultSrc={defaultImage} alt={item.name} />
                                                    </Box>
                                                    <Text>{item.name}</Text>
                                                </Flex>
                                            );
                                        })}
                                    </VStack>
                                )}
                            </Box>
                        )}
                    </Box>
                );
            }}
        </Downshift>
    );
});