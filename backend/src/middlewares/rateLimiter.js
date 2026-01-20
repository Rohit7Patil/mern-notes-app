import rateLimit from "../config/upstash.js";

const rateLimiter = async (_, res, next) => {
  try {
    const { success } = await rateLimit.limit("my-rate-limit");

    if (!success) {
      return res
        .status(429)
        .json({ message: "Too Many Requests! Please Try Again Later." });
    }
    next();
  } catch (error) {
    console.error("Rate Limit Error\n", error);
    next(error);
  }
};

export default rateLimiter;
