import { create } from 'zustand';
import {EventAPI} from "@/models/event.ts";

interface EventState {
    event: EventAPI | null;
    setEvent: (eventData: EventAPI) => void;
    clearEvent: () => void;
}

export const useEventStore = create<EventState>((set) => ({
    event: null,
    setEvent: (eventData: EventAPI) => set({ event: eventData }),
    clearEvent: () => set({ event: null }),
}));
