import { EventAPI } from '@/models/event.ts';

export interface EventModalProps {
    open: boolean;
    onClose: () => void;
    event?: EventAPI;
    coinImage: string
}
