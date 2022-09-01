const dev = process.env.NODE_ENV !== "production";
export const baseUrl = dev
  ? "http://localhost:3002"
  : "https://fuel-trip-calculator.vercel.app";
