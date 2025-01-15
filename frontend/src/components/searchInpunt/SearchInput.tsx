import { Box, Input } from "@chakra-ui/react";
import { InputGroup } from "@/components/ui/input-group.tsx";
import { LuSearch } from "react-icons/lu";
import { FC } from "react";
import { SearchInputProps } from "@/components/searchInpunt/typings.ts";

export const SearchInput: FC<SearchInputProps> = ({ onSearch }) => {
  return (
    <Box w={'full'}>
      <InputGroup
        width={'full'}
        flex="1"
        startElement={<LuSearch/>}
      >
        <Input
          height={'auto'}
          _placeholder={{ color: 'rgba(30, 30, 30, 0.4)' }}
          _hover={{ borderColor: "gray.300", outline: "none" }}
          _focus={{ borderColor: "gray.500", outline: "none" }}
          _active={{ borderColor: "gray.500", outline: "none" }}
          boxShadow="0px 4px 33px rgba(0, 0, 0, 0.06)"
          cursor='pointer'
          border='1px solid'
          borderColor='gray.200'
          borderRadius='12px'
          onChange={(e) => onSearch && onSearch(e.target.value)}
          size={'xl'}
          py={'20px'}
          placeholder="Search event names, dates and locations"
        />
      </InputGroup>
    </Box>
  );
};

