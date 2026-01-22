import React from 'react';

import { render, screen } from '@testing-library/react';

import MatchesDiffersTradeDescription from '../matches-differs-trade-description';

jest.mock('@lottiefiles/dotlottie-react', () => ({
    DotLottieReact: jest.fn(() => <div>DotLottieReact</div>),
}));

describe('MatchesDiffersTradeDescription', () => {
    it('should render a proper content', () => {
        const mockOnTermClick = jest.fn();
        render(<MatchesDiffersTradeDescription onTermClick={mockOnTermClick} />);

        expect(screen.getByText(/earn a/i)).toBeInTheDocument();
    });
});
