import {render, fireEvent} from '@testing-library/react';

import Login from './Login';
const { queryByTitle } = render(<Login/>)
const emailInput = queryByTitle("email");
const passwordInput = queryByTitle("password");

describe("Check input existence", () => {
  it('email input existence', () => {
    expect(emailInput).toBeTruthy();
  });
  it('password input existence', () => {
    expect(passwordInput).toBeTruthy();
  });
})

describe("Check if handleChange function works", () => {
  it("change email value", () => {
    fireEvent.change(emailInput, {target: {value: "testValue" }});
    expect(emailInput.value).toBe("testValue");
  });
  it("change password value", () => {
    fireEvent.change(passwordInput, {target: {value: "testValue" }});
    expect(passwordInput.value).toBe("testValue");
  });
})