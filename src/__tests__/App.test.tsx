import { render, screen } from '@testing-library/react';
import App from '../App';

describe('Search component', () => {
  test('renders components', () => {
    render(<App />);
    const headingElement = screen.getByText(/Dictionary Search/i);
    const searchInput = screen.getByRole('textbox');
    const searchButton = screen.getByRole('button', { name: /Search/i });


    expect(headingElement).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });
});
