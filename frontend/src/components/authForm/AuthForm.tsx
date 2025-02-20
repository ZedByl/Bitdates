import { useState } from 'react';
import {
  Box,
  Button,
  Heading,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useForm } from "react-hook-form";
import { Field } from "@/components/ui/field.tsx";
import axios from "axios";
import { useUserStore } from "@/stores/user/userStore.ts";
import { UserApi } from "@/models/user.ts";
import { CloseButton } from "@/components/ui/close-button.tsx";
import { useNavigate } from "@tanstack/react-router";
import { fetchAPI } from "@/service/http.service.ts";
import { APIEndpoints } from "@/api/constants.ts";

type AuthForm = {
    email: string,
    password: string
}

export const AuthForm = () => {
  const navigation = useNavigate();
  const { user, setUser } = useUserStore();
  const [isLogin, setIsLogin] = useState(true);

  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      code: '',
    },
  });

  const toHome = () => {
    navigation({ to: '/' });
  };

  console.log(user, 'user');

  const toAdmin = async () => {
    await navigation({ to: '/auth/admin' });
  };

  const handleLogin = async (form: AuthForm) => {
    try {
      const data = await fetchAPI.post<UserApi>(APIEndpoints.LOGIN, form);
      console.log(data);
      setUser(data);

      await toAdmin();
    } catch (e: any) {
      const message = e?.response?.data?.message || '';
      setError('email', { type: "custom", message });
    }
  };

  const handleRegister = async (form: AuthForm) => {
    try {
      const { data } = await axios.post<UserApi>(APIEndpoints.REGISTER, form);
      setUser(data);
      toAdmin();
    } catch (e: any) {
      const message = e?.response?.data?.message || '';
      setError('email', { type: "custom", message });
    }
  };

  const onSubmit = () => {
    if (isLogin) {
      handleSubmit((items) => handleLogin(items))();
    } else {
      handleSubmit((items) => handleRegister(items))();
    }
  };

  const switchMode = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <Box
      w={['90%', '400px']}
      p={6}
      mt={8}
      mx="auto"
      borderWidth="1px"
      borderRadius="md"
      boxShadow="md"
      bg='white'
      position="relative"
    >
      <Heading mb={4} textAlign="center" size="lg">
        {isLogin ? 'Login' : 'Register'}
      </Heading>

      <VStack gap={4}>
        <Field invalid={!!errors?.email} required errorText={errors?.email?.message}>
          <Input
            bg='#F0F2F5'
            placeholder="example@mail.com"
            _placeholder={{ color: 'rgba(30, 30, 30, 0.4)' }}
            _focus={{
              outlineStyle: "none"
            }}
            _focusVisible={{
              outlineStyle: "none"
            }}
            h={{ base: '58px' }}
            size="xl"
            borderRadius="10px"
            {...register("email", {
              required: "This field is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })}
          />
        </Field>

        <Field invalid={!!errors?.password} required errorText={errors?.password?.message}>
          <Input
            bg='#F0F2F5'
            placeholder="******"
            _placeholder={{ color: 'rgba(30, 30, 30, 0.4)' }}
            _focus={{
              outlineStyle: "none"
            }}
            _focusVisible={{
              outlineStyle: "none"
            }}
            h={{ base: '58px' }}
            size="xl"
            borderRadius="10px"
            {...register("password", {
              required: "This field is required",
              pattern: {
                value: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/,
                message: "Password must be at least 6 characters, contain at least one uppercase letter, one digit, and one special character (!@#$%^&*)."
              }
            })}
          />
        </Field>

        {!isLogin && (
          <Field required invalid={!!errors?.code} errorText={errors?.code?.message}>
            <Input
              bg='#F0F2F5'
              placeholder="code"
              _placeholder={{ color: 'rgba(30, 30, 30, 0.4)' }}
              _focus={{
                outlineStyle: "none"
              }}
              _focusVisible={{
                outlineStyle: "none"
              }}
              h={{ base: '58px' }}
              size="xl"
              borderRadius="10px"
              {...register("code", {
                required: "This field is required",
              })}
            />
          </Field>
        )}

        <Button colorPalette={'blue'} onClick={onSubmit} w="full">
          {isLogin ? 'Log In' : 'Sign Up'}
        </Button>
      </VStack>

      <Text textAlign="center" mt={{ base: '12px' }} mb={{ base: '6px' }} >
        {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
      </Text>
      <Button w={{ base: '100%' }} m={{ base: '0 auto' }} colorPalette={'gray'} variant="outline" onClick={switchMode}>
        {isLogin ? 'Register' : 'Login'}
      </Button>

      <CloseButton position='absolute' onClick={toHome} top='8px' right='8px' variant="ghost" size={'sm'} />
    </Box>
  );
};
