/* eslint-disable */
// TODO: Check doc to infer the type
// https://www.better-auth.com/docs/concepts/typescript
export interface ApiKey {
    id: string
    name: string | null
    start: string | null
    key?: string
    prefix: string | null
    userId: string
    enabled: boolean | null
    refillInterval: number | null
    refillAmount: number | null
    lastRefillAt: Date | null
    rateLimitEnabled: boolean | null
    rateLimitTimeWindow: number | null
    rateLimitMax: number | null
    requestCount: number | null
    remaining: number | null
    createdAt: Date
    updatedAt: Date
    expiresAt: Date | null
    lastRequest: Date | null
    permissions: string | null
    metadata: string | null
}