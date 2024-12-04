import {Flex, Text} from "@chakra-ui/react";
import {useColorMode} from "@/components/ui/color-mode.tsx";
import {useMemo} from "react";

export const Logo = () => {

    const {colorMode} = useColorMode();

    const isDark = useMemo(() => colorMode === 'dark', [colorMode])


    return (
        <Flex>
            <Text fontSize="2xl" fontWeight="bold" color="blue.600">bit</Text>
            <Text fontSize="2xl" fontWeight="bold" color={isDark ? 'white' : 'black'}>dates</Text>
        </Flex>
    );
};

