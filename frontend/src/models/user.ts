export interface UserApi {
    id: string
    email: string
    is_active: boolean
    roles: string[]
    refreshToken: string
    created_at: string
    updated_at: string
}
