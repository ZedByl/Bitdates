import { RefObject } from 'react';

export interface ICalendarProps {
    currentDate: Date | null;
    onChange: (value: Date | null) => void;
    forwardRef?: RefObject<HTMLDivElement>
    minDate?: Date;
}
