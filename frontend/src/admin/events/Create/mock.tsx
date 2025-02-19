import { DateInput, NumberInput, TextInput } from "react-admin";
import { CategorySelectState } from "@/components/categorySelect/typings.ts";
import {
  AirdropIcon,
  AllianceIcon, EducationalIcon, ExchangesEventsIcon,
  HardForksIcon,
  ListingIcon, MeetupIcon, OtherIcon,
  ProtocolUpdatesIcon, ServiceLaunchIcon, TokenSaleIcon,
  VotingIcon
} from "@/assets/icons/icons.tsx";

export const categories: CategorySelectState[] = [
  { id: 'df5e5e89-866c-42b0-a0ba-f9d62eda350e', value: null, label: "All" },
  { id: '565cc034-baf0-4be5-9073-5c29aded7fc6', value: [17], label: "Staking/Farming", icon: <ListingIcon w="100%" h="100%" />, inputs: [
    { name: "minimum_staking_amount", label: "Minimum Staking Amount", component: NumberInput },
    { name: "apy", label: "APY/Reward Rate", component: NumberInput },
    { name: "lock_up_period", label: "Lock-Up Period", component: TextInput },
    { name: "reward_type", label: "Reward Type", component: TextInput },
    { name: "withdrawal_conditions", label: "Withdrawal Conditions", component: TextInput },
  ] },
  { id: 'fd933c0f-4ced-4fc0-94af-03e9e93f3e7d', value: [1], label: "Release", icon: <ProtocolUpdatesIcon w="100%" h="100%" />, inputs: [
    { name: "connection_guide", label: "Connection Guide", component: TextInput },
    { name: "key_features", label: "Key Features", component: TextInput },
    { name: "participation_rewards", label: "Participation Rewards", component: TextInput },
  ] },
  { id: 'fe73f22f-7b0e-49a3-975d-96cb5eddd418', value: [14], label: "Fork/Swap", icon: <HardForksIcon w="100%" h="100%" />, inputs: [
    { name: "changes_updates", label: "Changes/Updates", component: TextInput },
    { name: "required_user_actions", label: "Required User Actions", component: TextInput },
    { name: "networks_affected", label: "Networks Affected", component: TextInput },
  ] },
  { id: '1040d4b6-0ffb-491e-95c3-616062fefdb3', value: [8], label: "Airdrop/Snapshot", icon: <AirdropIcon w="100%" h="100%" />, inputs: [
    { name: "participation_requirements", label: "Participation Requirements", component: TextInput },
    { name: "token_amount", label: "Token Amount", component: NumberInput },
    { name: "total_airdrop_pool", label: "Total Airdrop Pool", component: NumberInput },
    { name: "distribution_date", label: "Distribution Date", component: DateInput },
    { name: "airdrop_link", label: "Airdrop Link", component: TextInput },
  ] },
  { id: '2a7f0e65-85dd-4657-ac40-e19f14ab5c99', value: [2], label: "Branding", icon: <VotingIcon w="100%" h="100%" /> },
  { id: '9de9bc20-dd4b-47d7-a429-0ea2978d3ded', value: [11,18], label: "Partnership/Integration", icon: <AllianceIcon w="100%" h="100%" />, inputs: [
    { name: "parties_involved", label: "Parties Involved", component: TextInput },
    { name: "goals", label: "Goals", component: TextInput },
    { name: "partnership_duration", label: "Partnership Duration", component: TextInput },
  ] },
  { id: 'cbb35b4c-08ef-47e8-826c-a383a7404361', value: [5,6], label: "Conference/Meetup", icon: <MeetupIcon w="100%" h="100%" /> },
  { id: 'ee7653dc-d0f0-4c14-a475-a3cbfbd0ec8d', value: [3], label: "Tokenomics", icon: <TokenSaleIcon w="100%" h="100%" />, inputs: [
    { name: "total_supply", label: "Total Supply", component: NumberInput },
    { name: "circulating_supply", label: "Circulating Supply", component: NumberInput },
    { name: "token_allocation", label: "Token Allocation", component: TextInput },
    { name: "unlock_schedule", label: "Unlock Schedule", component: TextInput },
    { name: "token_utility", label: "Token Utility", component: TextInput },
  ] },
  { id: '0906c71f-92d6-44fa-8386-f4ce422ad5dc', value: [13,15], label: "Roadmap/Whitepaper update", icon: <ServiceLaunchIcon w="100%" h="100%" /> },
  { id: '33e38a79-8a7b-45fe-bc45-0a3c12bf612c', value: [4], label: "Exchange", icon: <ExchangesEventsIcon w="100%" h="100%" />, inputs: [
    { name: "exchange", label: "Exchange", component: TextInput },
    { name: "trading_pair", label: "Trading Pair", component: TextInput },
    { name: "trading_start_time", label: "Trading Start Time", component: DateInput },
  ] },
  { id: '83e8f5b2-d823-42eb-8a69-02f95c8144d1', value: [9,16], label: "TeamUpdate/AMA", icon: <EducationalIcon w="100%" h="100%" /> },
  { id: '8a41fa1e-d968-405d-9419-c42105888818', value: [7], label: "Other", icon: <OtherIcon w="100%" h="100%" /> },
];

