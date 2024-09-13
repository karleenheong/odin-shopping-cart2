import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from '../components/Home';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useOutletContext: vi.fn(() => ({ addToCart: vi.fn() })),
  };
});

vi.mock('../components/Card', () => ({
  default: ({ product }) => (
    <div data-testid={`card-${product.id}`}>{product.title}</div>
  ),
}));

describe('home', () => {
  it('displays the products', async () => {
    global.fetch = vi.fn(async () => ({
      json: async () => [
        { id: 1, title: 'Bar Soap' },
        { id: 2, title: 'Hand Spray' },
      ],
    }));

    render(<Home />);
    await screen.findByTestId('card-1');
    await screen.findByTestId('card-2');

    expect(screen.getByText('Bar Soap')).toBeInTheDocument();
    expect(screen.getByText('Hand Spray')).toBeInTheDocument();
  });
});
