import { FC, useRef, useState } from 'react';
import {
	Input,
	Box,
	DialogBody,
	DialogContent,
	DialogTrigger,
	DialogRoot
} from '@chakra-ui/react';
import "react-calendar/dist/Calendar.css";
import { ICalendarProps } from '@/components/calendar/typings.ts';
import { Calendar } from '@/components/calendar';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import { InputGroup } from '@/components/ui/input-group.tsx';
import { CalendarIcon } from '@/assets/icons/icons.tsx';

export const DatePicker: FC<ICalendarProps> = ({ currentDate, onChange }) => {
	const [isOpen, setIsOpen] = useState(false);
	const dateInput = useRef<HTMLInputElement>(null)
	const dateCalendar = useRef<HTMLDivElement>(null)

	const onDateChange = (value: Date | null) => {
		onChange(value);
		setIsOpen(false);
	};

	useOnClickOutside([dateInput, dateCalendar], () => setIsOpen(false))

	return (
		<Box position="relative">
			<DialogRoot
				lazyMount
				open={isOpen}
				motionPreset="slide-in-bottom"
			>
				<DialogTrigger asChild>
					<InputGroup
						width={'full'}
						flex="1"
						endElement={<CalendarIcon w={'36px'} h={'36px'}/>}
					>
						<Input
							{...(currentDate && { value: currentDate.toLocaleDateString("en-EN") })}
							ref={dateInput}
							bg="white"
							placeholder="Event date"
							value={currentDate ? currentDate.toLocaleDateString("en-EN") : undefined}
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
							onClick={() => setIsOpen(true)}
							cursor='pointer'
						/>
					</InputGroup>
				</DialogTrigger>

				<DialogContent
					position="absolute"
					top="60px"
					left="0"
					zIndex="popover"
					boxShadow="lg"
					borderRadius="14px"
					mt="4px"
				>
					<DialogBody padding={0}>
						<Calendar
							forwardRef={dateCalendar}
							currentDate={currentDate}
							onChange={onDateChange}
						/>
					</DialogBody>
				</DialogContent>
			</DialogRoot>
		</Box>
	);
};
