import { Flex } from "@chakra-ui/react";
import { AuthForm } from "@/components/authForm/AuthForm.tsx";

export const LoginPage = () => {
    return (
        <Flex
            minH="100vh"
            align="center"
            justify="center"
            bg="blue.100"
        >
            <AuthForm />
        </Flex>
    );
};

