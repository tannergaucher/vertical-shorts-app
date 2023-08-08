export const formatDate = (date: string) => {
  return new Date(date).toLocaleString("en-US", {
    dateStyle: "long",
    timeStyle: "short",
    hour12: true,
  });
};
