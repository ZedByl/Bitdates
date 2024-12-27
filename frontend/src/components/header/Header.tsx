import {Box, Button, Flex} from "@chakra-ui/react";
import {useColorMode} from "@/components/ui/color-mode.tsx";
import {useMemo} from "react";
import {Logo} from "@/components/logo";
import {useNavigate} from "react-router-dom";
import {useUserStore} from "@/stores/user/userStore.ts";

export const Header = () => {
    const navigation = useNavigate();
    const { user } = useUserStore();

    const onLogIn = () => {
        navigation('/login')
    }

    const {colorMode} = useColorMode();

    const isDark = useMemo(() => colorMode === 'dark', [colorMode])

    const goCreateEvent = () => {
        navigation('/create')
    }

    const goHome = () => {
        navigation('/')
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
          py="14px"
          px="30px"
          boxShadow="md"
          w={'100%'}
          bg={isDark ? "black/95" : "white/98"}
        >
            <Flex w={'100%'} maxW={1440} justifyContent='center' alignItems="center">
                <Flex w='full' justify="space-between" align="center">
                    <Box cursor="pointer" onClick={goHome}>
                        <Logo />
                    </Box>

                    <Flex gap={4}>
                        {user?.id ? (
                            <Button
                                onClick={goCreateEvent}
                                size={'sm'}
                                borderRadius={'10px'}
                                colorScheme="gray"
                                variant="outline"
                            >
                                Add event
                            </Button>
                        ) : (
                            <Button
                                onClick={onLogIn}
                                size={'sm'}
                                borderRadius={'10px'}
                                colorPalette="blue"
                            >Sign up / Log in
                            </Button>
                        )}
                        {/*<ColorModeButton/>*/}
                    </Flex>
                </Flex>
            </Flex>

        </Box>
    );
};
