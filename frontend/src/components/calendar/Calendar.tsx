import {FC} from "react";
import {ICalendarProps} from "./typings.ts";
import {Box} from "@chakra-ui/react";
import * as ReactCalendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import './styles.css'

const ExtCalendar = ReactCalendar.Calendar;

export const Calendar: FC<ICalendarProps> = ({currentDate,onChange}) => {
    return (
        <Box p={6} borderRadius={'10px'} boxShadow={'sm'} maxW={'400px'}>
            <ExtCalendar activeStartDate={new Date(new Date().getTime() + (24 * 60 * 60 * 1000))} className={'calendar'} value={currentDate} onChange={(value)=>onChange&&onChange(value as Date)}/>
        </Box>
    );
};

