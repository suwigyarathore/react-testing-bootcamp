import { render, screen } from '@testing-library/react';
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