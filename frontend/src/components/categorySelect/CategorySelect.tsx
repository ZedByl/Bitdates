import {
  Box,
  Button,
  Flex,
  VStack,
  HStack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FC, useEffect, useRef, useState } from "react";
import { CategorySelectProps, CategorySelectState } from "@/components/categorySelect/typings.ts";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { categories as categoriesMock } from "@/admin/events/Create/mock.tsx";

export const categories: CategorySelectState[] = categoriesMock;

export const CategorySelect: FC<CategorySelectProps> = ({ onChange, border, size, defaultValue }) => {
  const { open, onToggle, onClose } = useDisclosure();
  const [selectedCategory, setSelectedCategory] = useState<CategorySelectState | null>(null);
  const refButton = useRef<HTMLButtonElement>(null);
  const refList = useRef(null);

  const handleSelect = (category: CategorySelectState) => {
    setSelectedCategory(category);
    onClose();
    if (onChange) {
      onChange(category);
    }
  };

  useEffect(() => {
    if (defaultValue) {
      handleSelect(defaultValue);
    }
  }, [defaultValue]);

  useOnClickOutside([refButton, refList], onClose);

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
        ref={refButton}
      >
        <HStack position="relative" justify="space-between" w="full">
          <HStack>
            {selectedCategory?.icon && (
              <Box w="30px" h="30px">
                {selectedCategory.icon}
              </Box>
            )}
            <Text style={{ color: selectedCategory ? 'black' : 'rgba(30, 30, 30, 0.4)' }} fontSize="md" color="gray.800">
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
          ref={refList}
        >
          {categories.map((category) => (
            <Flex
              key={Math.round(Math.random() * 1e9)}
              as="button"
              onClick={() => handleSelect(category)}
              w="full"
              p="3"
              align="center"
              _hover={{ bg: 'gray.100' }}
              _focus={{ bg: 'gray.200' }}
            >
              {category.icon && (
                <Box w="30px" h="30px" mr="3">
                  {category.icon}
                </Box>
              )}
              <Text>{category.label}</Text>
            </Flex>
          ))}
        </VStack>
      )}
    </Box>
  );
};
