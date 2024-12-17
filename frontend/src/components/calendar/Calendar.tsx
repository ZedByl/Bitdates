import {FC} from "react";
import {ICalendarProps} from "./typings.ts";
import {Box} from "@chakra-ui/react";
import * as ReactCalendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import './styles.css'

const ExtCalendar = ReactCalendar.Calendar;

export const Calendar: FC<ICalendarProps> = ({forwardRef, currentDate,onChange}) => {
    return (
        <Box ref={forwardRef} p={6} borderRadius={'10px'} backgroundColor={'white'} boxShadow="0px 4px 33px rgba(0, 0, 0, 0.06)">
            <ExtCalendar
              locale={"en-EN"}
              className={'calendar'}
              value={currentDate}
              onChange={(value)=> onChange && onChange(value as Date)}
              minDate={new Date()}
            />
        </Box>
    );
};

