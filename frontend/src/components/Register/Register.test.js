import {render, fireEvent} from '@testing-library/react';

import Register from './Register';
const { queryByTitle } = render(<Register/>)
const emailInput = queryByTitle("email");
const passwordInput = queryByTitle("password");
const nameInput = queryByTitle("name");

describe("Check input existence", () => {
  it('email input existence', () => {
    expect(emailInput).toBeTruthy();
  });
  it('password input existence', () => {
    expect(passwordInput).toBeTruthy();
  });
  it('name input existence', () => {
    expect(nameInput).toBeTruthy();
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
  it("change name value", () => {
    fireEvent.change(nameInput, {target: {value: "testValue" }});
    expect(nameInput.value).toBe("testValue");
  });
})