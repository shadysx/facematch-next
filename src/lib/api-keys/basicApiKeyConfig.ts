export const basicApiKeyConfig = {
  name: `API Key ${Date.now()}`,
  expiresIn: 60 * 60 * 24 * 365,
  rateLimitTimeWindow: 1000 * 60, // 1 minute
  rateLimitMax: 5,
  rateLimitEnabled: true,
};
