import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import { DomainAvailabilityChecker } from './DomainAvailabilityChecker';
import userEvent from '@testing-library/user-event';

describe('DomainAvailabilityChecker page', () => {
  it('displays a domain when specified by the user', async () => {
    // arrange
    render(<DomainAvailabilityChecker />);

    // act
    const inputField = screen.getByRole('textbox');
    userEvent.type(inputField, 'domain.com');
    const button = screen.getByRole('button');
    userEvent.click(button);

    // assert
    expect(screen.getByText('The searched domain is: domain.com')).toBeInTheDocument();
  });
});
