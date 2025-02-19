export const baseEndpoint = import.meta.env.WEB_APP_URL || 'http://localhost:8000';

export enum APIEndpoints {
    USER = '/api/auth/info',
    EVENTS = '/api/events',
    SUBSCRIPTION = '/api/subscription/create',
    COINS = '/api/coins',
}
