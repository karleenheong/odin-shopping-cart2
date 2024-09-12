import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../components/Navbar';

describe('navbar', () => {
  const renderNavbar = (totalNumberItems) => {
    render (
      <BrowserRouter>
        <Navbar totalNumberItems={totalNumberItems} />
      </BrowserRouter>
    );
  };

  describe('logo', () => {
    it('renders the correct heading', () => {
      renderNavbar(0);
      expect(screen.getByRole('heading').textContent).toMatch(/k's shop/i);
    });
  });

  describe('menu links', () => {
    it('continue shopping link exists', () => {
      renderNavbar(0);
      expect(screen.getByText(/continue shopping/i)).toBeInTheDocument();
    });

    it('cart icon exists', () => {
      renderNavbar(0);
      expect(screen.getByAltText(/cart icon/i)).toBeInTheDocument();
    });
  });

  describe('cart quantity', () => {
    it('does not show cart badge when cart is empty', () => {
      renderNavbar(0);
      expect(screen.queryByTestId('cartBadge')).not.toBeInTheDocument();
    });

    it('cart badge is visible when item count above 0', () => {
      renderNavbar(8);
      expect(screen.getByTestId('cartBadge')).toBeInTheDocument();
    });

    it('cart badge shows the correct number of items', () => {
      renderNavbar(99);
      expect(screen.getByTestId('cartBadge')).toHaveTextContent('99');
    })
  });  
});

/*
  back to shop is not visible when on homepage
*/
