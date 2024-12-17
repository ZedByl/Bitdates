import { FC, useState } from 'react';
import {
	Box, Button,
	Heading,
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

const MAX_CHAR = 300;

type IProps = {
	text: string
	eventLink: string
	setText: React.Dispatch<React.SetStateAction<string>>
	setEventLink: React.Dispatch<React.SetStateAction<string>>
	onCreateEvent: () => void
}

export const SecondStep: FC<IProps> = ({
	text,
	eventLink,
	setText,
	setEventLink,
	onCreateEvent
                                       }) => {
	const [remainingChars, setRemainingChars] = useState(MAX_CHAR);

	const handleTextChange = (e: any) => {
		const value = e.target.value;
		if (value.length <= MAX_CHAR) {
			setText(value);
			setRemainingChars(MAX_CHAR - value.length);
		}
	};

	return (
		<>
			<Heading fontWeight={'bold'} as="h1" size="7xl" textAlign="center">
				Event details
			</Heading>
			<Text fontSize="lg" color="gray.500" textAlign="center" mb={{ base: '34px' }}>
				2-step
			</Text>

			<Stack align="flex-start" direction={{ base: "column", md: "row" }}>
				<VStack w={{ base: '100%', md: "50%" }} align="flex-start">
					<Box w="100%" position='relative'>
						<Textarea
							value={text}
							maxLength={MAX_CHAR}
							onChange={handleTextChange}
							placeholder="Event description"
							_placeholder={{ color: 'rgba(30, 30, 30, 0.4)' }}
							_focus={{
								border: 0,
								outlineStyle: "none"
							}}
							_focusVisible={{
								border: 0,
								outlineStyle: "none"
							}}
							minH={{ base: '255px' }}
							border={0}
							p={{ base: '20px 18px'}}
							pr={{ base: '110px'}}
							borderRadius="14px"
							size="xl"
							bg="white"
							boxShadow="0px 4px 33px rgba(0, 0, 0, 0.06)"
							cursor='pointer'
						/>
						<Text position="absolute" top="20px" right="18px" fontSize="sm" color="rgba(30, 30, 30, 0.4)">
							{remainingChars}/{MAX_CHAR}
						</Text>
					</Box>

					<Box w="100%">
						<Input
							bg="white"
							placeholder="Event source link"
							_placeholder={{ color: 'rgba(30, 30, 30, 0.4)' }}
							onChange={(e) => setEventLink(e.target.value)}
							value={eventLink}
							h={{ base: '58px' }}
							_focus={{
								border: 0,
								outlineStyle: "none"
							}}
							_focusVisible={{
								border: 0,
								outlineStyle: "none"
							}}
							border={0}
							borderRadius="14px"
							size="xl"
							boxShadow="0px 4px 33px rgba(0, 0, 0, 0.06)"
							cursor='pointer'
						/>
					</Box>
				</VStack>

				<Box w={{ base: '100%', md: "50%" }}>
					<Text mb={{ base: '8px', md: '20px' }} mt={{ base: '8px', md: '0' }} fontSize="md" color="rgba(30, 30, 30, 0.4)" >
						Event image
					</Text>

					<FileUploadRoot
						position='relative'
						alignItems="stretch"
						maxFiles={1}
						maxFileSize={5000}
						accept={['image/jpeg', 'image/png', 'image/webp']}
					>
						<FileUploadDropzone
							label={<>Drag & drop here, or click <Text as="span" cursor="pointer" color="blue">upload</Text></>}
						/>
						<FileUploadList showSize clearable />
					</FileUploadRoot>
				</Box>
			</Stack>

			<Button onClick={onCreateEvent} colorPalette="blue" size="lg" borderRadius="14px" h={{ base: '58px' }}>
				Continue
			</Button>
		</>
	);
};
