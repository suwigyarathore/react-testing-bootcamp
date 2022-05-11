import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test("inputs should be initially empty", () => {
  render(<App />);
  const emailInput = screen.getByRole('textbox');
  const passwordInput = screen.getByLabelText("Password");
  const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
  expect(emailInput.value).toBe('');
  expect(passwordInput.value).toBe('');
  expect(confirmPasswordInput.value).toBe('');
})

test("should be able to type email", () => {
  render(<App />);
  const emailInput = screen.getByRole('textbox', { name: /email/i });
  userEvent.type(emailInput, 'suwi@gmail.com');
  expect(emailInput.value).toBe('suwi@gmail.com');
});

test("should be able to type password and confirm password", () => {
  render(<App />);
  const passwordInput = screen.getByLabelText("Password");
  const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
  userEvent.type(passwordInput, '123456');
  userEvent.type(confirmPasswordInput, '123456');
  expect(passwordInput.value).toBe(confirmPasswordInput.value);  
});

test("should render email error message on invalid email", () => {
  render(<App />);
  let emailErrorElement = screen.queryByText(/Email you input is invalid/i);
  const emailInput = screen.getByRole('textbox', { name: /email/i });
  const submitButton = screen.getByRole('button', { name: /submit/i });
  expect(emailErrorElement).not.toBeInTheDocument();
  userEvent.type(emailInput, 'suwigmail.com');
  userEvent.click(submitButton);
  emailErrorElement = screen.queryByText(/Email you input is invalid/i);
  expect(emailErrorElement).toBeInTheDocument();
});

test("should render password error message on invalid password", () => {
  render(<App />);
  const emailInput = screen.getByRole('textbox', { name: /email/i });
  let passwordErrorElement = screen.queryByText(/Password you enter should have 5 or more characters/i);
  const passwordInput = screen.getByLabelText("Password");
  const submitButton = screen.getByRole('button', { name: /submit/i });
  expect(passwordErrorElement).not.toBeInTheDocument();
  userEvent.type(emailInput, 'suwi@gmail.com');
  userEvent.type(passwordInput, '123');
  userEvent.click(submitButton);
  passwordErrorElement = screen.queryByText(/Password you enter should have 5 or more characters/i);
  expect(passwordErrorElement).toBeInTheDocument();
});

test("should render password and confirm password error", ()=>{
  render(<App />);
  const emailInput = screen.getByRole('textbox', { name: /email/i });
  const passwordInput = screen.getByLabelText("Password");
  const submitButton = screen.getByRole('button', { name: /submit/i });
  const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
  userEvent.type(emailInput, 'suwi@gmail.com');
  userEvent.type(passwordInput, '12345');
  userEvent.type(confirmPasswordInput, '123456')
  userEvent.click(submitButton);
  let passwordErrorElement = screen.queryByText(/Password you enter is not the same/i);
  expect(passwordErrorElement).toBeInTheDocument();;
})