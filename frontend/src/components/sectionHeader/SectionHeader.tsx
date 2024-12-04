import {Box, Heading, Text} from "@chakra-ui/react";
import {FC} from "react";
import {SectionHeaderProps} from "./typings.ts";

const options = {
    weekday: "long",
    year: "numeric",
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
                {date.map(dt => dt.toLocaleDateString('us', options as any) + (date.length > 1 ? '->' : ""))}
            </Text>
        </Box>
    );
};