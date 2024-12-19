import { ConditionalValue } from '@chakra-ui/react';
import {categories} from "@/components/categorySelect/CategorySelect.tsx";

export interface CategorySelectProps {
    onChange: (value: CategorySelectState) => void;
    size?: ConditionalValue<'lg' | 'sm' | 'md' | 'xs' | undefined>;
    border?: string;
    defaultValue?: CategorySelectState;
}

export type CategorySelectState = typeof categories[0]