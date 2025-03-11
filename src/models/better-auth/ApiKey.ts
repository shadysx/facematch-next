export interface ApiKey {
  key: string;
  createdAt: string;
  id: string;
  name: string;
  expiresAt: string;
  rateLimitMax: number;
  rateLimitTimeWindow: number;
}
