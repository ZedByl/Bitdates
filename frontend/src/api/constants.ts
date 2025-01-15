export const baseEndpoint = import.meta.env.VITE_API_URL || '';

export enum APIEndpoints {
    USER = '/api/auth/info',
    EVENTS = '/api/events',
    SUBSCRIPTION = '/api/subscription/create',
}
