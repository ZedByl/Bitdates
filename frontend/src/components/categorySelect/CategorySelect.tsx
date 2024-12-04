import {SelectContent, SelectItem, SelectRoot, SelectTrigger, SelectValueText} from "@/components/ui/select.tsx";
import {Box, createListCollection, Flex, HStack, Text} from "@chakra-ui/react";
import {
    AirdropIcon, AllianceIcon, EducationalIcon, ExchangesEventsIcon,
    HardForksIcon,
    ListingIcon, MeetupIcon,
    ProtocolUpdatesIcon, ServiceLaunchIcon,
    TestnetIcon, TokenBurnIcon, TokenSaleIcon,
    VotingIcon
} from "@/assets/icons/icons.tsx";
import {CategorySelectProps} from "@/components/categorySelect/typings.ts";
import {FC} from "react";

const SelectViewItem = () => {

    return (
        <SelectValueText placeholder="Event category" fontSize="lg" color="gray.900">
            {(items: Array<{ icon: string; label: string }>) => (
                <HStack>
                    <Box w={'30px'} h={'30px'}>
                        {items[0]?.icon}
                    </Box>
                    <Text>{items[0]?.label}</Text>
                </HStack>
            )}
        </SelectValueText>
    )

}

export const categories = createListCollection({
    items: [
        {value: 1, label: 'Listing', icon: <ListingIcon w={'100%'} h={'100%'}/>},
        {value: 2, label: 'Protocol Updates', icon: <ProtocolUpdatesIcon w={'100%'} h={'100%'}/>},
        {value: 3, label: 'Hard Forks', icon: <HardForksIcon w={'100%'} h={'100%'}/>},
        {value: 4, label: 'Airdrop', icon: <AirdropIcon w={'100%'} h={'100%'}/>},
        {value: 5, label: 'Voting', icon: <VotingIcon w={'100%'} h={'100%'}/>},
        {value: 6, label: 'Testnet', icon: <TestnetIcon w={'100%'} h={'100%'}/>},
        {value: 7, label: 'Alliance', icon: <AllianceIcon w={'100%'} h={'100%'}/>},
        {value: 8, label: 'Meetup', icon: <MeetupIcon w={'100%'} h={'100%'}/>},
        {value: 9, label: 'Token Sale', icon: <TokenSaleIcon w={'100%'} h={'100%'}/>},
        {value: 10, label: 'Service Launch', icon: <ServiceLaunchIcon w={'100%'} h={'100%'}/>},
        {value: 11, label: 'Exchanges Events', icon: <ExchangesEventsIcon w={'100%'} h={'100%'}/>},
        {value: 12, label: 'Token Burn', icon: <TokenBurnIcon w={'100%'} h={'100%'}/>},
        {value: 13, label: 'Educational', icon: <EducationalIcon w={'100%'} h={'100%'}/>}
    ]
});

export const CategorySelect: FC<CategorySelectProps> = ({onChange}) => {

    const onChangeValue = (value: any) => {
        const {items} = value;

        if (onChange) {
            onChange(items[0]);
        }
    }

    return (
        <SelectRoot onValueChange={onChangeValue} collection={categories}
                    size="lg">
            <SelectTrigger>
                <SelectViewItem/>
            </SelectTrigger>
            <SelectContent>
                {categories.items.map((category) => (
                    <SelectItem item={category} key={category.value}>
                        <Flex gap={2} alignItems={'center'}>
                            <Box w={'30px'} h={'30px'}>
                                {category.icon}
                            </Box>
                            {category.label}
                        </Flex>
                    </SelectItem>
                ))}
            </SelectContent>
        </SelectRoot>
    );
};

