import { createFileRoute, redirect } from '@tanstack/react-router';
import { Flex } from '@chakra-ui/react';
import { AuthForm } from '@/components/authForm/AuthForm.tsx';

export const Route = createFileRoute('/auth/')({
  component: Login,
  beforeLoad: async ({ context }) => {
    if (context.user) {
      throw redirect({
        to: '/auth/admin',
      });
    }
  },
});

function Login() {
  return (
    <Flex minH="100vh" align="center" justify="center" bg="blue.100">
      <AuthForm />
    </Flex>
  );
}
