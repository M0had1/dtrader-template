import React from 'react';

import { render, screen } from '@testing-library/react';

import OverUnderTradeDescription from '../over-under-trade-description';

jest.mock('@lottiefiles/dotlottie-react', () => ({
    DotLottieReact: jest.fn(() => <div>DotLottieReact</div>),
}));

describe('OverUnderTradeDescription', () => {
    it('should render a proper content', () => {
        const mockOnTermClick = jest.fn();
        render(<OverUnderTradeDescription onTermClick={mockOnTermClick} />);

        expect(screen.getByText(/earn a/i)).toBeInTheDocument();
    });
});
