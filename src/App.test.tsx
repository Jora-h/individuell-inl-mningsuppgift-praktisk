import { render, screen } from '@testing-library/react';
import App from './App';

test('renders hading', () => {
  render(<App />);
  const headingElement = screen.getByText(/Dictionary Search/i);
  expect(headingElement).toBeInTheDocument();
});
