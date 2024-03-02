export const MAIN_CARD_SEQUENCE = [
  "Canary Lab is a site where we experiment and apply the latest front technology.",
  1000,
  "Canary Lab is a site that helps you integrate and use multiple projects.",
  1000,
  "We plan to continue to develop our services.",
  1000,
  "I hope you stay for a long time.",
  1000,
];

export const NOT_FOUND_SEQUENCE = [
  "404 Not Found",
  1000,
  "The requested URL was not found on this server.",
  1000,
  "Redirecting to home...",
  1000,
  "Redirecting to home..",
  1000,
  "Redirecting to home.",
  1000,
  "Redirecting to home..",
  1000,
  "Redirecting to home...",
  1000,
  () => {
    window.location.href = "/";
  },
];

export const ERROR_SEQUENCE = [
  "An error occurred.",
  1000,
  "Please try again later.",
  1000,
  "Redirecting to home...",
  1000,
  "Redirecting to home..",
  1000,
  "Redirecting to home.",
  1000,
  "Redirecting to home..",
  1000,
  "Redirecting to home...",
  1000,
  () => {
    window.location.href = "/";
  },
];
