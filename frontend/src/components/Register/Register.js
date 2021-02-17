import React from "react";

function Register({handleRegister}) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");

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
      <form className="sign__form" action="#" name="sign-form" onSubmit={handleSubmit} noValidate>
      <input
          required
          type="name"
          className="sign__input"
          placeholder="Name"
          name="Name"
          onChange={handleChange}
          value={name}
          title="name"
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
        ></input>
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
        <button type="submit" className="sign__button">
          Register
        </button>
      </form>
    </section>
  );
}

export default Register;
