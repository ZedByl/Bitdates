import { FC } from 'react';
import { Box, Button, Heading, Input, Stack, Text } from '@chakra-ui/react';
import { DatePicker } from '@/components/ui/date-picker.tsx';
import { CategorySelect } from '@/components/categorySelect';
import { categories } from '@/components/categorySelect/CategorySelect.tsx';

type IProps = {
	selectedDate: Date | null;
	setTitle: React.Dispatch<React.SetStateAction<string | undefined>>;
	onSelectDate: (value: Date | null) => void;
	onChangeCategory: (value: typeof categories[0]) => void;
	handleNext: () => void;
}

export const FirstStep: FC<IProps> = ({ selectedDate, setTitle, handleNext, onSelectDate, onChangeCategory }) => {
	return (
		<>
			<Heading fontWeight={'bold'} as="h1" size="7xl" textAlign="center">
				Add new event
			</Heading>
			<Text fontSize="lg" color="gray.500" textAlign="center" mb={{ base: '34px' }}>
				Start Points
			</Text>

			<Input
				bg="white"
				size="xl"
				placeholder="Event title"
				_placeholder={{ color: 'rgba(30, 30, 30, 0.4)' }}
				_focus={{
					border: 0,
					outlineStyle: "none"
				}}
				_focusVisible={{
					border: 0,
					outlineStyle: "none"
				}}
				h={{ base: '58px' }}
				border={0}
				borderRadius="14px"
				boxShadow="0px 4px 33px rgba(0, 0, 0, 0.06)"
				onChange={(ev) => setTitle(ev.target.value)}
			/>

			<Stack direction={{ base: "column", md: "row" }} gap="16px">
				<Box w={{ base: '100%', md: '50%' }}>
					<DatePicker currentDate={selectedDate} onChange={onSelectDate} />
				</Box>

				<Box w={{ base: '100%', md: '50%' }} h={{ base: '58px' }}>
					<CategorySelect onChange={onChangeCategory} border="none" />
				</Box>
			</Stack>

			<Button onClick={handleNext} colorPalette="blue" size="lg" borderRadius="14px" h={{ base: '58px' }}>
				Continue
			</Button>
		</>
	);
};
