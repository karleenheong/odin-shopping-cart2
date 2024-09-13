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
    it('input box shows what user has typed', () => {
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

    it('shows invalid input message after clicking add to cart button with invalid input', () => {
      fireEvent.change(screen.getByRole('textbox'), {
        target: { value: 'wassup' },
      });
      fireEvent.click(screen.getByTestId('atc'));
      expect(screen.getByText(/invalid quantity/i)).toBeInTheDocument();
    });

    it('input box is not in focus when clicked after add to cart is successful', async () => {
      fireEvent.click(screen.getByTestId('atc'));
      const inputElement = screen.getByRole('textbox');
      fireEvent.click(inputElement);
      expect(inputElement).not.toHaveFocus();
    });

    it('input box value cannot be changed after add to cart is successful', async () => {
      fireEvent.click(screen.getByTestId('atc'));
      const inputElement = screen.getByRole('textbox');
      fireEvent.change(inputElement, { target: { value: 'wassup' } });
      expect(inputElement.value).not.toBe('wassup');
    });
  });

  describe('Increment decrement buttons', () => {
    it('increment button increases input quantity box value by 1 if value is valid', () => {
      fireEvent.click(screen.getByTestId('increment'));
      expect(screen.getByRole('textbox').value).toBe('2');
    });

    it('decrement button decreases input quantity box value by 1 if value is valid', () => {
      const inputElement = screen.getByRole('textbox');
      fireEvent.change(inputElement, { target: { value: '10' } });
      fireEvent.click(screen.getByTestId('decrement'));
      expect(inputElement.value).toBe('9');
    });

    it('clickable increment button disappears after add to cart successful', () => {
      fireEvent.click(screen.getByTestId('atc'));
      expect(screen.queryByTestId('increment')).not.toBeInTheDocument();
    });

    it('clickable decrement button disappears after add to cart successful', () => {
      fireEvent.click(screen.getByTestId('atc'));
      expect(screen.queryByTestId('decrement')).not.toBeInTheDocument();
    });

    it('disabled increment button appears after add to cart successful', () => {
      fireEvent.click(screen.getByTestId('atc'));
      expect(screen.getByTestId('increment-cart')).toBeInTheDocument();
    });

    it('disabled decrement button appears after add to cart successful', () => {
      fireEvent.click(screen.getByTestId('atc'));
      expect(screen.queryByTestId('decrement-cart')).toBeInTheDocument();
    });

    it('decrement button does not change quantity if quantity is already 1', () => {
      const inputElement = screen.getByRole('textbox');
      fireEvent.change(inputElement, { target: { value: '1' } });
      const quantity = inputElement.value;
      fireEvent.click(screen.getByTestId('decrement'));
      expect(inputElement.value).toBe(quantity);
    });

    it('increment button does not change quantity if quantity is 999', () => {
      const inputElement = screen.getByRole('textbox');
      fireEvent.change(inputElement, { target: { value: '999' } });
      const quantity = inputElement.value;
      fireEvent.click(screen.getByTestId('increment'));
      expect(inputElement.value).toBe(quantity);
    });
  });
});
