import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ErrorPage from '@/pages/ErrorPage';

describe('App', () => {
  // it('Renders Welcome to DOB E-commerce', () => {
  //   render(<Home />);
  //   expect(screen.getByRole('paragraph')).toHaveTextContent(
  //     'Welcome to DOB E-commerce'
  //   );
  // });

  it('it renders Not Found Page', () => {
    render(<ErrorPage />);
    expect(screen.getByRole('paragraph')).toHaveTextContent('Not Found Page');
  });
});
