import { FC } from 'react';
import { Box, Button, Heading, Input, Stack, Text } from '@chakra-ui/react';
import { DatePicker } from '@/components/ui/date-picker.tsx';
import { CategorySelect } from '@/components/categorySelect';
import {FieldErrors, UseFormGetValues, UseFormRegister, UseFormSetValue} from "react-hook-form";
import {EventForm} from "@/components/eventForm/types.ts";
import {Field} from "@/components/ui/field.tsx";
import {categories} from "@/components/categorySelect/CategorySelect.tsx";
import {CategorySelectState} from "@/components/categorySelect/typings.ts";
import {AsyncSelect} from "@/components/asyncSelect/AsyncSelect.tsx";
import {CoinApi} from "@/models/coin.ts";

type IProps = {
	selectedDate: Date | null
	onSelectDate: (value: Date | null) => void
	onChangeCategory: (value: CategorySelectState) => void
	onSelectToken: (value: any) => void
	handleNext: () => void
	register: UseFormRegister<EventForm>
	errors: FieldErrors<EventForm>
	setValue: UseFormSetValue<EventForm>
	getValues: UseFormGetValues<EventForm>
	fetchCoins: (input: string) => Promise<CoinApi[]>
}

export const FirstStep: FC<IProps> = ({
										  selectedDate,
										  register,
										  errors,
										  handleNext,
										  onSelectDate,
	onSelectToken,
										  onChangeCategory,
										  fetchCoins
}) => {


	return (
		<>
			<Heading fontWeight={'bold'} as="h1" size="7xl" textAlign="center">
				Add new event
			</Heading>
			<Text fontSize="lg" color="gray.500" textAlign="center" mb={{ base: '34px' }}>
				Start Points
			</Text>

			<Stack direction={{ base: "column", md: "row" }} gap="16px">
				<AsyncSelect
					fetchOptions={fetchCoins}
					onSelect={onSelectToken}
					placeholder="Token"
				/>

				<Field invalid={!!errors?.title} required errorText={errors?.title?.message}>
					<Input
						bg="white"
						size="xl"
						placeholder="Event title"
						_placeholder={{ color: 'rgba(30, 30, 30, 0.4)' }}
						_focus={{
							outlineStyle: "none"
						}}
						_focusVisible={{
							outlineStyle: "none"
						}}
						h={{ base: '58px' }}
						borderRadius="14px"
						boxShadow="0px 4px 33px rgba(0, 0, 0, 0.06)"
						{...register("title", {
							required: "This field is required",
							maxLength: {
								value: 100,
								message: "Text cannot be longer than 100 characters",
							},
						})}
					/>
				</Field>
			</Stack>

			<Stack direction={{ base: "column", md: "row" }} gap="16px">
				<Box w={{ base: '100%', md: '50%' }}>
					<DatePicker
						currentDate={selectedDate}
						onChange={onSelectDate}
						minDate={new Date()}
					/>
				</Box>

				<Box w={{ base: '100%', md: '50%' }} h={{ base: '58px' }}>
					<CategorySelect defaultValue={categories[0]} onChange={onChangeCategory} />
				</Box>
			</Stack>

			<Button onClick={handleNext} colorPalette="blue" size="lg" borderRadius="14px" h={{ base: '58px' }}>
				Continue
			</Button>
		</>
	);
};
