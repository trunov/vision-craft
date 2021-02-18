const { db } = require("../configs");
const fixtures = require("../fixtures");

const { name, email, password } = fixtures.user;

beforeAll(() => {
  db.connect();
});

afterAll(() => {
  db.end();
});

describe("Check db connectivity", () => {
  beforeEach(() => {
    db.query("INSERT INTO users SET ?", {
      name: name,
      email: email,
      password: password,
    });
  });

  afterEach(() => {
    db.query("DELETE FROM users WHERE email = ?", [email]),
      function (err, result) {
        if (err) throw err;
      };
  });

  it("check user in database", () => {
    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      (error, results) => {
        expect(results).toBeDefined();
        expect(results[0].email).toBe(fixtures.user.email);
        expect(results[0].name).toBe(fixtures.user.name);
      }
    );
  });
});
