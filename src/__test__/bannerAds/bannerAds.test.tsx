import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import BannerAd from '@/components/bannerAds/bannerAds';
import egg from '@/assets/egg.png';

describe('BannerAd Component', () => {
  const defaultProps = {
    key: 1,
    s_title: 'this week',
    title: 'eggs',
    description: 'snacks',
    image: egg,
    productId: 1,
  };

  it('renders all required elements with correct content', () => {
    render(
      <MemoryRouter>
        <BannerAd {...defaultProps} />
      </MemoryRouter>
    );

    // Check subtitle
    const subtitle = screen.getByText('this week');
    expect(subtitle).toBeInTheDocument();

    // Check title
    const title = screen.getByText('eggs');
    expect(title).toBeInTheDocument();

    // Check description
    const description = screen.getByText('snacks');
    expect(description).toBeInTheDocument();

    // Check button
    const button = screen.getByRole('button', { name: /shop now/i });
    expect(button).toBeInTheDocument();

    // Check icon
    const icon = screen.getByTitle('icon');
    expect(icon).toBeInTheDocument();
    expect(button).toContainElement(icon);

    // Check image
    const image = screen.getByAltText(/eggs/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src');
  });

  it('applies correct styling classes', () => {
    render(
      <MemoryRouter>
        <BannerAd {...defaultProps} />
      </MemoryRouter>
    );

    const banner = screen.getByRole('banner');
    expect(banner).toHaveClass('banner-ad');

    const button = screen.getByRole('button');
    expect(button).toHaveClass('shop-now-button');
  });
});
