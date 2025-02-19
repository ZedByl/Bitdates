import { ConditionalValue } from '@chakra-ui/react';

export interface CategorySelectProps {
    onChange: (value: CategorySelectState) => void;
    size?: ConditionalValue<'lg' | 'sm' | 'md' | 'xs' | undefined>;
    border?: string;
    defaultValue?: CategorySelectState;
}

export type CategorySelectState = {
    id: string;
    value: number[] | null;
    label: string;
    icon?: JSX.Element | null;
    inputs?: { name: string, label: string, component: any }[]
}
