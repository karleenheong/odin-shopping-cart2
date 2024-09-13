import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import Home from '../components/Home';

vi.mock('react-router-dom', () => ({
  useOutletContext: () => ({ addToCart: vi.fn() }),
}));

vi.mock('../components/Card', () => ({
  default: ({ product }) => (
    <div data-testid={`card-${product.id}`}>{product.title}</div>
  ),
}));

const mockProducts = [
  { id: 1, title: 'Bar Soap' },
  { id: 2, title: 'Hand Spray' },
];

describe('Home', () => {
  it('displays the products', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockProducts),
    });

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByTestId('card-1')).toBeInTheDocument();
      expect(screen.getByTestId('card-2')).toBeInTheDocument();
    });

    expect(screen.getByText('Bar Soap')).toBeInTheDocument();
    expect(screen.getByText('Hand Spray')).toBeInTheDocument();
  });
});
