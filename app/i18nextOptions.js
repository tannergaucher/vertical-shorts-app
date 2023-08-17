export default {
  debug: process.env.NODE_ENV !== "production",
  fallbackLng: "en",
  supportedLngs: ["en", "de"],
  defaultNS: "common",
  react: { useSuspense: false },
};
