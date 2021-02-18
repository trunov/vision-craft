const { extractBearerToken } = require("../middlewares/auth");

const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";

it("Check if bearer token function works", () => {
  expect(extractBearerToken(token)).toBe("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9");
});