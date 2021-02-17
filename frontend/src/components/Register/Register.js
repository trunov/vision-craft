import React from "react";
import validator from "validator";

function Register({ handleRegister }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");

  const [inputsFilled, setInputsFilled] = React.useState(false);

  const [isValidEmail, setIsValidEmail] = React.useState(true);

  function checkInputs() {
    if (email !== "" && password !== "" && name !== "" && isValidEmail) {
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

  let arr = [email, password, name, isValidEmail];

  React.useEffect(() => {
    checkInputs();
    validateEmail();
  }, arr);

  function handleChange(evt) {
    if (evt.target.name === "Email") {
      setEmail(evt.target.value);
    } else if (evt.target.name === "Password") {
      setPassword(evt.target.value);
    } else if (evt.target.name === "Name") {
      setName(evt.target.value);
    }
  }

  function resetForm() {
    setEmail("");
    setPassword("");
    setName("");
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    handleRegister(name, email, password);
    resetForm();
  }
  return (
    <section className="sign">
      <h2 className="sign__title">Register</h2>
      <form
        className="sign__form"
        action="#"
        name="sign-form"
        onSubmit={handleSubmit}
        noValidate
      >
        <input
          required
          type="name"
          className="sign__input"
          placeholder="Name"
          name="Name"
          onChange={handleChange}
          value={name}
          title="name"
          autoComplete="off"
        ></input>
        <input
          required
          type="email"
          className="sign__input"
          placeholder="Email"
          name="Email"
          onChange={handleChange}
          value={email}
          title="email"
          autoComplete="off"
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
          title="registerButton"
          className={`sign__button ${!inputsFilled && "sign__button_disabled"}`}
          disabled={!inputsFilled}
        >
          Register
        </button>
      </form>
    </section>
  );
}

export default Register;
