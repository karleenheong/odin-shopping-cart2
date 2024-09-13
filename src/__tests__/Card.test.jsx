import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Card from '../components/Card';

const mockAddToCart = vi.fn();
const mockProduct = {
  id: 1,
  title: 'bar soap',
  price: 2.99,
  image: '../assets/cart.png',
};

describe('Product card', () => {
  beforeEach(() => {
    mockAddToCart.mockClear();
    render(<Card product={mockProduct} addToCart={mockAddToCart} />);
  });

  describe('Renders all card elements', () => {
    it('renders the product image', () => {
      expect(screen.getByAltText('product image')).toBeInTheDocument();
    });

    it('renders the product title', () => {
      expect(screen.getByTestId('title')).toBeInTheDocument();
    });

    it('renders the price', () => {
      expect(screen.getByTestId('price')).toBeInTheDocument();
    });

    it('renders the quantity input box', () => {
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('renders the decrement button', () => {
      expect(screen.getByTestId('decrement')).toBeInTheDocument();
    });

    it('renders the increment button', () => {
      expect(screen.getByTestId('increment')).toBeInTheDocument();
    });

    it('renders the add the cart button', () => {
      expect(screen.getByTestId('atc')).toBeInTheDocument();
    });
  });

  describe('Add to cart functionality', () => {
    it('calls add to cart function with correct parameters when Add to cart button is clicked and input is the default quantity', () => {
      fireEvent.click(screen.getByTestId('atc'));
      expect(mockAddToCart).toHaveBeenCalledWith(mockProduct, 1);
    });

    it('after add to cart is clicked, In Cart text shows', () => {
      fireEvent.click(screen.getByTestId('atc'));
      expect(screen.getByText(/in cart/i)).toBeInTheDocument();
    });

    it('after add to cart is clicked, the add to cart button is not displayed', () => {
      const atcBtn = screen.getByTestId('atc');
      fireEvent.click(atcBtn);
      expect(atcBtn).not.toBeInTheDocument();
    });
  });

  describe('Input quantity box', () => {
    it('allows user to type in input box', () => {
      const inputElement = screen.getByRole('textbox');
      fireEvent.change(inputElement, { target: { value: 'wassup' } });
      expect(inputElement.value).toBe('wassup');
    });

    it('does not allow add to cart when invalid input provided', () => {
      fireEvent.change(screen.getByRole('textbox'), {
        target: { value: 'wassup' },
      });
      fireEvent.click(screen.getByTestId('atc'));
      expect(mockAddToCart).not.toHaveBeenCalled();
    });
  });
});

/*
  increment decrement input disabled when items added to cart
  does not allow atc when invalid input
  shows error message when invalid input
  increment increases input quantity by 1 but not if number is 999
  decrement decreases input quantity by 1 but not if it's already 1
  input always reflects what user has typed
*/
