import { Box, Text, Heading, Input, Button, VStack } from "@chakra-ui/react";
import {useForm} from "react-hook-form";
import {Field} from "@/components/ui/field.tsx";
import axios from "axios";
import {Toaster, toaster} from "@/components/ui/toaster.tsx";

export const SubscriptionCard = () => {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: ''
        },
    });

    const sendEmailUser = (body: { email: string }) => {
        const promise = new Promise((resolve, reject) => {
            axios.post('/api/subscription', body)
                .then(({data}) => {
                    resolve({response: data, error: null});
                })
                .catch((error) => {
                    reject({response: null, error: error});
                });
        });

        toaster.promise(promise, {
            success: {
                title: "Successfully uploaded!",
            },
            error: {
                title: "Upload failed",
                description: "Something wrong with the upload",
            },
            loading: { title: "Uploading...", description: "Please wait" },
        })
    }

    const handleClick = () => {
        handleSubmit(sendEmailUser)()
    }

    return (
        <Box
            p={{base: '20px'}}
            boxShadow="0px 4px 33px rgba(0, 0, 0, 0.06)"
            borderRadius="10px"
        >
            <VStack align="start">
                <Heading size="lg" fontWeight="bold">
                    Be aware of the recent news<br/>in crypto every day
                </Heading>
                <Text fontSize={'md'} color="gray.600" mb={{base: '32px'}}>
                    Please keep me updated by email with the latest crypto news, research
                    findings, reward programs, event updates, coin listings, and more
                    information from Bitdates.
                </Text>
                <Field invalid={!!errors?.email} required errorText={errors?.email?.message}>
                    <Input
                        bg='#F0F2F5'
                        placeholder="Enter your email address"
                        _placeholder={{color: 'rgba(30, 30, 30, 0.4)'}}
                        _focus={{
                            outlineStyle: "none"
                        }}
                        _focusVisible={{
                            outlineStyle: "none"
                        }}
                        h={{base: '58px'}}
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

                <Button onClick={handleClick} colorPalette="blue" size="lg" borderRadius="14px" h={{base: '54px'}}
                        w="full">
                    Subscribe
                </Button>
            </VStack>

            <Toaster />
        </Box>
    );
};

