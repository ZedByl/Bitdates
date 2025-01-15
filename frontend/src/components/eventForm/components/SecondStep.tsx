import { FC, useEffect, useState } from 'react';
import {
  Box, Button,
  Heading, HStack,
  Input, Stack,
  Text,
  Textarea,
  VStack
} from '@chakra-ui/react';
import {
  FileUploadDropzone,
  FileUploadList,
  FileUploadRoot,
} from '@/components/ui/file-button.tsx';
import { FieldErrors, UseFormGetValues, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { EventForm } from "@/components/eventForm/types.ts";
import { Field } from "@/components/ui/field.tsx";

const MAX_CHAR = 300;

type IProps = {
	onCreateEvent: () => void
	register: UseFormRegister<EventForm>
	errors: FieldErrors<EventForm>
	setValue: UseFormSetValue<EventForm>
	getValues: UseFormGetValues<EventForm>
	setImage: React.Dispatch<React.SetStateAction<File | undefined>>
	handlePrev: () => void
}

export const SecondStep: FC<IProps> = ({
  errors,
  register,
  onCreateEvent,
  setImage,
  handlePrev
}) => {
  const [remainingChars, setRemainingChars] = useState(MAX_CHAR);
  const [text, setText] = useState('');

  const handleTextChange = () => {
    setRemainingChars(MAX_CHAR - text.length);
  };

  useEffect(() => {
    if (text.length <= MAX_CHAR) {
      handleTextChange();
    }
  }, [text]);

  return (
    <>
      <Heading fontWeight={'bold'} as="h1" size="7xl" textAlign="center">
				Event details
      </Heading>
      <HStack alignItems={{ base: 'center' }} justifyContent={{ base: 'center' }}>
        <Text onClick={handlePrev} _hover={{ color: 'gray.700' }} cursor="pointer" fontSize="lg" color="gray.500" textAlign="center" mb={{ base: '34px' }}>
					1-step /
        </Text>

        <Text fontSize="lg" color="#1E1E1E" textAlign="center" mb={{ base: '34px' }}>
					2-step
        </Text>
      </HStack>

      <Stack align="flex-start" direction={{ base: "column", md: "row" }}>
        <VStack w={{ base: '100%', md: "50%" }} align="flex-start">
          <Box w="100%" position='relative'>
            <Field invalid={!!errors?.text} required errorText={errors?.text?.message}>
              <Textarea
                maxLength={MAX_CHAR}
                placeholder="Event description"
                _placeholder={{ color: 'rgba(30, 30, 30, 0.4)' }}
                _focus={{
                  outlineStyle: "none"
                }}
                _focusVisible={{
                  outlineStyle: "none"
                }}
                minH={{ base: '255px' }}
                p={{ base: '20px 18px' }}
                pr={{ base: '110px' }}
                borderRadius="14px"
                size="xl"
                bg="white"
                boxShadow="0px 4px 33px rgba(0, 0, 0, 0.06)"
                cursor='pointer'
                {...register("text", {
                  required: "This field is required",
                  maxLength: {
                    value: 300,
                    message: "Text cannot be longer than 300 characters",
                  },
                  onChange: ({ target }) => setText(target.value)
                })}
              />
              <Text position="absolute" top="20px" right="18px" fontSize="sm" color="rgba(30, 30, 30, 0.4)">
                {remainingChars}/{MAX_CHAR}
              </Text>
            </Field>
          </Box>

          <Box w="100%">
            <Field invalid={!!errors?.eventLink} required errorText={errors?.eventLink?.message}>
              <Input
                bg="white"
                placeholder="Event source link"
                _placeholder={{ color: 'rgba(30, 30, 30, 0.4)' }}
                h={{ base: '58px' }}
                _focus={{
                  outlineStyle: "none"
                }}
                _focusVisible={{
                  outlineStyle: "none"
                }}
                borderRadius="14px"
                size="xl"
                boxShadow="0px 4px 33px rgba(0, 0, 0, 0.06)"
                cursor='pointer'
                {...register("eventLink", {
                  required: "A link to the event is required",
                  pattern: {
                    value: /https?:\/\/[\w.-]+/,
                    message: "Enter the correct link",
                  },
                })}
              />
            </Field>
          </Box>
        </VStack>

        <Box w={{ base: '100%', md: "50%" }}>
          <Text mb={{ base: '8px', md: '20px' }} mt={{ base: '8px', md: '0' }} fontSize="md"
						  color="rgba(30, 30, 30, 0.4)">
						Event image
          </Text>

          <FileUploadRoot
            position='relative'
            alignItems="stretch"
            maxFiles={1}
            maxFileSize={6000000}
            accept={['image/jpeg', 'image/png', 'image/webp']}
            onFileAccept={(info) => {
              const file = info?.files[0] || null;

              if (file) {
                setImage(file);
              }
            }}
            onFileReject={(details) => {
              console.error(details, 'details');
            }}
          >
            <FileUploadDropzone
              label={(
                <>
									Drag & drop here, or click
                  <Text as="span" cursor="pointer" color="blue"> upload</Text>
                </>
              )}
            />

            <FileUploadList
              // showSize
              clearable
              position='absolute'
              bottom={{ base: '24px' }}
              maxW={{ base: '260px' }}
              transform='translate(-50%, 0%);'
              left="50%"
            />
          </FileUploadRoot>
        </Box>
      </Stack>

      <Button mb={{ base: '30px', md: '0' }} onClick={onCreateEvent} colorPalette="blue" size="lg" borderRadius="14px" h={{ base: '58px' }}>
				Continue
      </Button>
    </>
  );
};
