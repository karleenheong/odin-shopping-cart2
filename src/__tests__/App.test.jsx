import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    Outlet: ({ context }) => {
      // save the outlet functions ('context') to the javascript global window so we can access them
      window.testContext = context;
      return <div data-testid="outlet">Outlet Mock</div>;
    },
  };
});

vi.mock('../components/Navbar', () => ({
  default: ({ totalNumberItems }) => (
    <div data-testid="navbar">Navbar Mock ({totalNumberItems})</div>
  ),
}));

const renderApp = () => {
  return render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
};

const mockProduct = {
  id: 1,
  title: 'bar soap',
  price: 2.99,
};

const mockProduct2 = {
  id: 2,
  title: 'hand spray',
  price: 3.99,
};

describe('App', () => {
  describe('Display', () => {
    it('renders the navbar', () => {
      renderApp();
      expect(screen.getByTestId('navbar')).toBeInTheDocument();
    });

    it('renders the outlet component', () => {
      renderApp();
      expect(screen.getByTestId('outlet')).toBeInTheDocument();
    });
  });

  describe('Initial state', () => {
    it('should initially have an empty cart', () => {
      renderApp();
      expect(screen.getByTestId('navbar')).toHaveTextContent('0');
    });
  });

  describe('Cart operations', () => {
    beforeEach(() => {
      renderApp();
    });

    afterEach(() => {
      delete window.testContext;
    });

    it('adds item to cart correctly', async () => {
      await act(async () => {
        window.testContext.addToCart(mockProduct, 3);
      });
      expect(screen.getByTestId('navbar')).toHaveTextContent('3');
    });

    it('removes items from cart correctly', async () => {
      await act(async () => {
        window.testContext.addToCart(mockProduct, 10);
      });

      await act(async () => {
        window.testContext.removeFromCart(mockProduct);
      });

      expect(screen.getByTestId('navbar')).toHaveTextContent('0');
    });

    it('updates quantity correctly increase', async () => {
      await act(async () => {
        window.testContext.addToCart(mockProduct, 100);
      });

      await act(async () => {
        window.testContext.updateQuantity(mockProduct, 5);
      });

      expect(screen.getByTestId('navbar')).toHaveTextContent('105');
    });

    it('updates quantity correctly decrease', async () => {
      await act(async () => {
        window.testContext.addToCart(mockProduct, 789);
      });

      await act(async () => {
        window.testContext.updateQuantity(mockProduct, -99);
      });

      expect(screen.getByTestId('navbar')).toHaveTextContent('690');
    });

    it('calculates total price correctly', async () => {
      await act(async () => {
        window.testContext.addToCart(mockProduct, 2);
      });

      await act(async () => {
        window.testContext.addToCart(mockProduct2, 4);
      });

      expect(window.testContext.totalPrice).toBe('21.94');
    });

    it('calculates subtotal price correctly for mock product 1', async () => {
      await act(async () => {
        window.testContext.addToCart(mockProduct, 2);
      });

      expect(window.testContext.totalPrice).toBe('5.98');
    });

    it('calculates subtotal price correctly for mock product 2', async () => {
      await act(async () => {
        window.testContext.addToCart(mockProduct2, 4);
      });

      expect(window.testContext.totalPrice).toBe('15.96');
    });
  });
});
