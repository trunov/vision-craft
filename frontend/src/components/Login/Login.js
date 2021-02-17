import React from "react";
import validator from "validator";

function Login({ handleLogin }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [isValidEmail, setIsValidEmail] = React.useState(true);

  const [inputsFilled, setInputsFilled] = React.useState(false);

  function checkInputs() {
    if (email !== "" && password !== "" && isValidEmail) {
      setInputsFilled(true);
    } else {
      setInputsFilled(false);
    }
  }

  function validateEmail() {
    if (validator.isEmail(email)) {
      setIsValidEmail(true);
    } else if (email === '') {
      setIsValidEmail(true);
    } else {
      setIsValidEmail(false);
    }
  }

  let arr = [email, password, isValidEmail];

  function handleChange(evt) {
    if (evt.target.name === "Email") {
      setEmail(evt.target.value);
    } else if (evt.target.name === "Password") {
      setPassword(evt.target.value);
    }
  }

  function resetForm() {
    setEmail("");
    setPassword("");
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    handleLogin(email, password);
    resetForm();
  }

  React.useEffect(() => {
    checkInputs();
    validateEmail();
  }, arr);

  return (
    <section className="sign">
      <h2 className="sign__title">Login</h2>
      <form
        className="sign__form"
        action="#"
        name="sign-form"
        onSubmit={handleSubmit}
        noValidate
      >
        <input
          required
          type="email"
          className="sign__input"
          placeholder="Email"
          name="Email"
          onChange={handleChange}
          value={email}
          autoComplete="off"
          title="email"
        ></input>
        <span
          className={`sign__email-error ${
            !isValidEmail && "sign__email-error_visible"
          }`}
          id="email-error"
        >
          Incorrect format of an email
        </span>

        <input
          required
          type="password"
          className="sign__input"
          placeholder="Password"
          name="Password"
          onChange={handleChange}
          value={password}
          title="password"
        ></input>
        <button
          type="submit"
          className={`sign__button ${!inputsFilled && "sign__button_disabled"}`}
          disabled={!inputsFilled}
          title="loginButton"
        >
          Login
        </button>
      </form>
    </section>
  );
}

export default Login;
