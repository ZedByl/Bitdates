import { ConditionalValue } from '@chakra-ui/react';
import { categories } from '@/components/categorySelect/CategorySelect.tsx';

export interface CategorySelectProps {
    onChange: (value: typeof categories[0]) => void;
    size?: ConditionalValue<'lg' | 'sm' | 'md' | 'xs' | undefined>;
    border?: string;
}
