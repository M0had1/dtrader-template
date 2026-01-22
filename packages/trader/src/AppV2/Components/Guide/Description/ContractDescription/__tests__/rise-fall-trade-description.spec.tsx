import React from 'react';

import { render, screen } from '@testing-library/react';

import RiseFallTradeDescription from '../rise-fall-trade-description';

jest.mock('@lottiefiles/dotlottie-react', () => ({
    DotLottieReact: jest.fn(() => <div>DotLottieReact</div>),
}));

describe('RiseFallTradeDescription', () => {
    it('should render a proper content', () => {
        const mockOnTermClick = jest.fn();
        render(<RiseFallTradeDescription onTermClick={mockOnTermClick} />);

        expect(screen.getByText(/earn a/i)).toBeInTheDocument();
    });
});
