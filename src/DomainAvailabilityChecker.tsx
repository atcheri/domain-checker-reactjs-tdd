import './styles.css';

import React, { useState } from 'react';

import TrendyLogo from './assets/trendy-logo.png';
import { processDomainCheckResponse } from './DomainCheckResponseProcessor';

export type DomainCheckResponse = {
  domain: string;
  isPremium: boolean;
  isAvailable: boolean;
  discountCode: string;
};

export const DomainAvailabilityChecker = () => {
  const [domain, setDomain] = useState<string>();
  const [checkResult, setCheckResult] = useState<string[]>();

  const handleDomainNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDomain(event.target.value);
  };

  const handleDomainCheck = async () => {
    const domainResponse = await fetch(`http://localhost:9000/check?domain=${domain}`);

    if (domainResponse.ok) {
      const domainCheckResponse: DomainCheckResponse = await domainResponse.json();
      const checkResults = processDomainCheckResponse(domainCheckResponse);
      setCheckResult(checkResults);
    }
  };

  return (
    <div data-testid='main' className='domain-availability-container'>
      <img src={TrendyLogo} alt='Logo' className='logo' />
      <div className='input-container' data-testid='inner'>
        <label htmlFor='domainNameInput'>Enter a domain name:</label>
        <input
          data-test='domain-field'
          type='text'
          id='domainNameInput'
          className='domain-input'
          value={domain}
          onChange={handleDomainNameChange}
        />
        <button className='check-button' onClick={handleDomainCheck}>
          Check Availability
        </button>
      </div>
      <div data-testid='analyses-result' id='analyses-result' className='results-list'>
        The searched domain is: domain.com
        {checkResult ? (
          <ul>{checkResult?.map((item, index) => <li key={index}>{item}</li>)}</ul>
        ) : (
          <p>No results available</p>
        )}
      </div>
    </div>
  );
};
