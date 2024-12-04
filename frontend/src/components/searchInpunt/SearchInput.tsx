import {Box, Input} from "@chakra-ui/react";
import {InputGroup} from "@/components/ui/input-group.tsx";
import {LuSearch} from "react-icons/lu";
import {FC} from "react";
import {SearchInputProps} from "@/components/searchInpunt/typings.ts";

export const SearchInput: FC<SearchInputProps> = ({onSearch}) => {
    return (
        <Box w={'full'}>
            <InputGroup
                width={'full'}
                flex="1"
                startElement={<LuSearch/>}
            >
                <Input onChange={(ev) => onSearch(ev.target.value)} size={'xl'}
                       placeholder="Search event names, dates and locations"/>
            </InputGroup>
        </Box>
    );
};

