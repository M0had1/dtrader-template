import React from 'react';

import { render, screen } from '@testing-library/react';

import HigherLowerTradeDescription from '../higher-lower-trade-description';

jest.mock('@lottiefiles/dotlottie-react', () => ({
    DotLottieReact: jest.fn(() => <div>DotLottieReact</div>),
}));

describe('HigherLowerTradeDescription', () => {
    it('should render a proper content', () => {
        const mockOnTermClick = jest.fn();
        render(<HigherLowerTradeDescription onTermClick={mockOnTermClick} />);

        expect(screen.getByText(/earn a/i)).toBeInTheDocument();
    });
});
