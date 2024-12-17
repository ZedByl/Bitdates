import { Flex, Heading} from "@chakra-ui/react";
import {Button} from "@/components/ui/button.tsx";
import {GoogleIcon} from "@/assets/icons/icons.tsx";

export const LoginPage = () => {

    const onLoginClick = () => {
        window.document.location = "http://localhost:8000/api/auth/google"
    }

    return (
        <Flex
            minH="100vh"
            align="center"
            justify="center"
            bg="blue.100"
        >
            <Flex
                gap={4}
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                bg="white"
                p={8}
                borderRadius="lg"
                boxShadow="lg"
                minW='250px'
                minH={'200px'}
            >
                <Heading size={'2xl'}>Sign in</Heading>
                <Button onClick={onLoginClick} colorPalette={'blue'} p={2}><GoogleIcon fill={'white'} w={'25px'} height={'25px'}/>Sign in via Google</Button>
            </Flex>
        </Flex>
    );
};

