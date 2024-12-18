import { rateLimit } from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 3 * 60 * 1000, // 3 minutes
  limit: 10, // Limit each IP to 10 requests per `window` (here, per 3 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

export { limiter };
