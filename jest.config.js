module.exports = async () => {
  return {
    verbose: true,
    testEnvironment: "jsdom",
    transform: {
      "^.+\\.(ts|tsx)$": "ts-jest",
    },
  };
};
