import {Box, HStack, VStack, Text, Image} from "@chakra-ui/react";
import {EventCardProps} from "./typings.ts";
import {FC} from "react";
import {CalendarIcon} from "@/assets/icons/icons.tsx";
import {categories as categoriesMock} from "@/components/categorySelect/CategorySelect.tsx";

export const EventCard: FC<EventCardProps> = ({ id, title, description, coins, onClick, categoryId }) => {
    const selectedCategory = categoriesMock.items.find((item) => item.value === categoryId)

    const handleClick = () => {
        if (onClick) {
            onClick(id);
        }
    }

    console.log(coins)

    return (
        <Box
            onClick={() => handleClick()}
            borderRadius="lg"
            boxShadow="sm"
            p={4}
            display="flex"
            alignItems="center"
            mb={4}
            w={'100%'}
        >
            <HStack justifyContent={'space-between'} w="full">
                <Box w={'50px'} h={'50px'}>
                    {!!selectedCategory && selectedCategory.icon}
                </Box>
                <VStack align="start" flex={'1'}>
                    <Text fontWeight="bold">{title.en}</Text>
                    <Text fontSize="sm" color="gray.600">
                        {description.en}
                    </Text>
                </VStack>
                <Box borderRadius={'5px'} mx={5} h={'20px'} w={1} backgroundColor={'#EFF2F4'}/>
                {!!coins.length && <HStack flex={'1'}>
                    <Image src={ `https://cryptologos.cc/logos/thumbs/${coins[0].id}.png?v=034`} alt={coins[0].name} boxSize={12}/>
                    <Text>{coins[0].name}</Text>
                </HStack>}

                <Box w={'50px'} h={'50px'}>
                    <CalendarIcon w={'50px'} h={'50px'}/>
                </Box>
            </HStack>
        </Box>
    );
};
