import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Cart from '../components/Cart';
import { BrowserRouter, useOutletContext } from 'react-router-dom';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useOutletContext: vi.fn(),
  };
});

const mockProducts = [
  {
    id: 1,
    title: 'bar soap',
    price: 2.99,
    image: '../assets/cart.png',
    quantity: 2,
  },
  {
    id: 2,
    title: 'hand spray',
    price: 3.99,
    image: '../assets/cart.png',
    quantity: 4,
  },
  {
    id: 3,
    title: 'water bottle',
    price: 0.99,
    image: '../assets/cart.png',
    quantity: 1,
  },
  {
    id: 4,
    title: 'toilet paper',
    price: 7.99,
    image: '../assets/cart.png',
    quantity: 1,
  },
];

const renderCart = (customProps = {}) => {
  const defaultProps = {
    cartItems: [],
    removeFromCart: vi.fn(),
    totalPrice: 0,
    updateQuantity: vi.fn(),
    calcSubtotal: vi.fn(),
    addToCart: vi.fn(),
  };

  const props = { ...defaultProps, ...customProps };

  // Set up the mock for useOutletContext
  useOutletContext.mockReturnValue(props);

  return render(
    <BrowserRouter>
      <Cart />
    </BrowserRouter>,
  );
};

describe('Cart', () => {
  describe('Displays all cart item info correctly', () => {
    it('displays all products in cart', () => {
      renderCart({ cartItems: mockProducts });
      expect(screen.getAllByTestId('product').length).toBe(4);
    });

    it('shows 4 product titles', () => {
      renderCart({ cartItems: mockProducts });
      expect(screen.getAllByTestId('title').length).toBe(4);
    });

    it('shows 4 product images', () => {
      renderCart({ cartItems: mockProducts });
      expect(screen.getAllByAltText('product image').length).toBe(4);
    });

    it('shows 4 product prices', () => {
      renderCart({ cartItems: mockProducts });
      expect(screen.getAllByTestId('price').length).toBe(4);
    });

    it('shows 4 product prices', () => {
      renderCart({ cartItems: mockProducts });
      expect(screen.getAllByTestId('price').length).toBe(4);
    });

    it('shows 4 quantity boxes', () => {
      renderCart({ cartItems: mockProducts });
      expect(screen.getAllByTestId('quantity').length).toBe(4);
    });

    it('shows 4 decrement buttons', () => {
      renderCart({ cartItems: mockProducts });
      expect(screen.getAllByTestId('decrement').length).toBe(4);
    });

    it('shows 4 increment buttons', () => {
      renderCart({ cartItems: mockProducts });
      expect(screen.getAllByTestId('increment').length).toBe(4);
    });

    it('shows 4 trash buttons', () => {
      renderCart({ cartItems: mockProducts });
      expect(screen.getAllByAltText('trash').length).toBe(4);
    });

    it('shows 4 subtotals', () => {
      renderCart({ cartItems: mockProducts });
      expect(screen.getAllByTestId('subtotal').length).toBe(4);
    });

    it('shows total price', () => {
      renderCart({ cartItems: mockProducts });
      expect(screen.getByText(/total:/i)).toBeInTheDocument();
    });

    it('shows checkout button when total is not 0', () => {
      renderCart({ cartItems: mockProducts, totalPrice: 10.99 });
      expect(screen.getByTestId('checkout')).toBeInTheDocument();
    });
  });

  describe('Empty cart', () => {
    it('does not render checkout button when no items', () => {
      renderCart();
      expect(screen.queryByTestId('checkout')).not.toBeInTheDocument();
    });

    it('shows total text when cart is empty', () => {
      renderCart();
      expect(screen.getByText(/total:/i)).toBeInTheDocument();
    });

    it('does not render any product titles when cart is empty', () => {
      renderCart();
      expect(screen.queryByTestId('title')).not.toBeInTheDocument();
    });

    it('displays your cart is empty when no items', () => {
      renderCart();
      expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
    });
  });

  describe('Specific item', () => {
    it('displays the correct quantity for specific item', () => {
      renderCart({ cartItems: [mockProducts[0]] });
      expect(screen.getByTestId('quantity').textContent).toContain('2');
    });

    it('displays the correct product title', () => {
      renderCart({ cartItems: [mockProducts[0]] });
      expect(screen.getByTestId('title').textContent).toBe('bar soap');
    });

    it('displays the correct product price', () => {
      renderCart({ cartItems: [mockProducts[0]] });
      expect(screen.getByTestId('price').textContent).toContain('2.99');
    });
  });

  describe('Increment, decrement, remove from cart', () => {
    it('calls updateQuantity when increment button is clicked', () => {
      const mockUpdateQuantity = vi.fn();
      renderCart({
        cartItems: [mockProducts[0]],
        updateQuantity: mockUpdateQuantity,
      });
      fireEvent.click(screen.getByTestId('increment'));
      expect(mockUpdateQuantity).toHaveBeenCalledWith(mockProducts[0], 1);
    });

    it('calls updateQuantity when decrement button is clicked', () => {
      const mockUpdateQuantity = vi.fn();
      renderCart({
        cartItems: [mockProducts[0]],
        updateQuantity: mockUpdateQuantity,
      });
      fireEvent.click(screen.getByTestId('decrement'));
      expect(mockUpdateQuantity).toHaveBeenCalledWith(mockProducts[0], -1);
    });

    it('calls removeFromCart when trash button is clicked', () => {
      const mockRemoveFromCart = vi.fn();
      renderCart({
        cartItems: [mockProducts[0]],
        removeFromCart: mockRemoveFromCart,
      });
      fireEvent.click(screen.getByAltText('trash'));
      expect(mockRemoveFromCart).toHaveBeenCalledWith(mockProducts[0]);
    });

    it('does not allow decrementing below 1', () => {
      const mockUpdateQuantity = vi.fn();
      const mockRemoveFromCart = vi.fn();
      renderCart({
        cartItems: [{ ...mockProducts[0], quantity: 1 }],
        updateQuantity: mockUpdateQuantity,
        removeFromCart: mockRemoveFromCart,
      });
      fireEvent.click(screen.getByTestId('decrement'));
      expect(mockUpdateQuantity).not.toHaveBeenCalled();
      expect(mockRemoveFromCart).toHaveBeenCalledWith({
        ...mockProducts[0],
        quantity: 1,
      });
    });

    it('does not allow incrementing above 999', () => {
      const mockUpdateQuantity = vi.fn();
      renderCart({
        cartItems: [{ ...mockProducts[0], quantity: 999 }],
        updateQuantity: mockUpdateQuantity,
      });
      fireEvent.click(screen.getByTestId('increment'));
      expect(mockUpdateQuantity).not.toHaveBeenCalled();
    });
  });
});
