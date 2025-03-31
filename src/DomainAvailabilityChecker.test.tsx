import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import { DomainAvailabilityChecker } from './DomainAvailabilityChecker';
import userEvent from '@testing-library/user-event';

describe('DomainAvailabilityChecker page', () => {
  it.each(['domain.com', 'ryouiki.com'])(
    'displays %s when specified by the user',
    async (domain) => {
      // arrange
      render(<DomainAvailabilityChecker />);
      const mockApiResponse = {
        domain,
        isPremium: true,
      };
      globalThis.fetch = vi.fn().mockResolvedValueOnce({
        json: () => Promise.resolve(mockApiResponse),
      });

      // act
      const inputField = screen.getByRole('textbox');
      await userEvent.type(inputField, domain);
      const button = screen.getByRole('button');
      await userEvent.click(button);

      // assert
      expect(screen.getByText(`The searched domain is: ${domain}`)).toBeInTheDocument();
      expect(screen.getByText('Premium domain')).toBeInTheDocument();
      expect(global.fetch).toBeCalledWith(expect.stringContaining(`/check?domain=${domain}`));
    },
  );
});
