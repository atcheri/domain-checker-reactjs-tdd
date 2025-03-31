import { DomainAvailabilityChecker, DomainCheckResponse } from './DomainAvailabilityChecker';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

describe('DomainAvailabilityChecker page', () => {
  it.each([
    { domain: 'domain.com', isPremium: true },
    { domain: 'ryouiki.com', isPremium: false },
  ])('displays %s when specified by the user', async ({ domain, isPremium }) => {
    // arrange
    render(<DomainAvailabilityChecker />);
    const mockApiResponse: DomainCheckResponse = {
      domain,
      isPremium,
      isAvailable: true,
      discountCode: 'DISCOUNT_20',
    };
    globalThis.fetch = vi.fn().mockResolvedValueOnce({
      json: () => Promise.resolve(mockApiResponse),
      ok: true,
    });

    // act
    const inputField = screen.getByRole('textbox');
    await userEvent.type(inputField, domain);
    const button = screen.getByRole('button');
    await userEvent.click(button);

    // assert
    expect(screen.getByText(`The searched domain is: ${domain}`)).toBeInTheDocument();
    if (isPremium) {
      expect(screen.getByText('Premium domain')).toBeInTheDocument();
    } else {
      expect(screen.queryByText('Premium domain')).toBeNull();
    }
    expect(global.fetch).toBeCalledWith(expect.stringContaining(`/check?domain=${domain}`));
  });
});
