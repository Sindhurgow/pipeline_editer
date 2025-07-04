import { render, screen } from '@testing-library/react';
import App from './App';

test('renders pipeline editor', () => {
  render(<App />);
  const titleElement = screen.getByText(/pipeline editor/i);
  expect(titleElement).toBeInTheDocument();
});