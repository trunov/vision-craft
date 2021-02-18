const supertest = require("supertest");
const app = require("../app.js");

const fixtures = require('../fixtures');

const request = supertest(app);

const { email, password } = fixtures.user;

describe("endpoint requests", () => {
  it('Returns message and 404th response on request to "/"', () => {
    return request.get('/').then((response) => {
            expect(response.status).toBe(404);
            expect(response.text).toContain("The requested resource is not found");
        });
  });
  it('Returns message and 401st response on request to "/users/me"', () => {
    return request.get('/users/me').then((response) => {
            expect(response.status).toBe(401);
            expect(response.text).toContain("You need to be authorized");
        });
  });
  it("/login post request with invalid data", () => {
    return request
      .post("/login")
      .send({ email: email, password: password })
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .then((response) => {
        expect(response.status).toBe(401);
        expect(response.text).toContain("Email or Password is incorrect");
      });
  });
});



