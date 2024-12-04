import {Box, Button, Flex} from "@chakra-ui/react";
import {ColorModeButton, useColorMode} from "@/components/ui/color-mode.tsx";
import {useCallback, useMemo} from "react";
import {Logo} from "@/components/logo";
import {useNavigate} from "react-router-dom";

export const Header = () => {

    const navigation = useNavigate();


    const onLogIn = useCallback(() => {
        navigation('/login')
    }, [navigation]);

    const {colorMode} = useColorMode();

    const isDark = useMemo(() => colorMode === 'dark', [colorMode])


    const goCreateEvent = () => {
        navigation('/create')
    }

    return (
        <Box
          id={'header'}
          as="header"
          position="fixed"
          top={0}
          left={0}
          right={0}
          zIndex={1000}
          display="flex"
          justifyContent="center"
          py={5}
          px="30px"
          boxShadow="md"
          w={'100%'}
          bg={isDark ? "black/95" : "white/98"}
        >
            <Flex w={'100%'} maxW={1440} justifyContent='center' alignItems="center">
                <Flex w='full' justify="space-between" align="center">
                    <Logo/>
                    <Flex mr={10} gap={4}>
                        <Button onClick={goCreateEvent} borderRadius={10} colorScheme="gray" variant="outline">
                            Add event
                        </Button>
                        <Button onClick={onLogIn} borderRadius={10} colorPalette="blue">Sign up / Log in</Button>
                        <ColorModeButton/>
                    </Flex>
                </Flex>
            </Flex>

        </Box>
    );
};
