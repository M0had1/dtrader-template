import React from 'react';

import { render, screen } from '@testing-library/react';

import EvenOddTradeDescription from '../even-odd-trade-description';

jest.mock('@lottiefiles/dotlottie-react', () => ({
    DotLottieReact: jest.fn(() => <div>DotLottieReact</div>),
}));

describe('EvenOddTradeDescription ', () => {
    it('should render a proper content', () => {
        const mockOnTermClick = jest.fn();
        render(<EvenOddTradeDescription onTermClick={mockOnTermClick} />);

        expect(screen.getByText(/earn a/i)).toBeInTheDocument();
    });
});
