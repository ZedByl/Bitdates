import {Box, Heading, Text} from "@chakra-ui/react";
import {FC} from "react";
import {SectionHeaderProps} from "./typings.ts";

const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
};
export const SectionHeader: FC<SectionHeaderProps> = ({title, date}) => {
    return (
        <Box>
            <Heading fontWeight={'bold'} as="h2" size="4xl">
                {title}
            </Heading>
            <Text color="gray.500">
                {date.map((dt, index) => dt.toLocaleDateString('en-EN', options) + (date.length > 1 && !index ? ' -> ' : ""))}
            </Text>
        </Box>
    );
};
