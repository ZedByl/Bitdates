import { Flex, Text } from "@chakra-ui/react";
import { useColorMode } from "@/components/ui/color-mode.tsx";
import { useMemo } from "react";

export const Logo = () => {

  const { colorMode } = useColorMode();

  const isDark = useMemo(() => colorMode === 'dark', [colorMode]);


  return (
    <Flex>
      <Text fontSize="2xl" fontWeight="bold" color={isDark ? 'white' : 'black'}>crypto</Text>
      <Text fontSize="2xl" fontWeight="bold" color="blue.600">calendar</Text>
      <Text fontSize="2xl" fontWeight="bold" color={isDark ? 'white' : 'black'}>.ai</Text>
    </Flex>
  );
};

