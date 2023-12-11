import React from 'react';
import './TermsAndConditions.css';

const TermsAndConditions: React.FC = () => {
  return (
    <div className="terms-container">
      <h1>Terms and Conditions</h1>
      <p className="terms-text">
        Welcome to our website. If you continue to browse and use this website, you are agreeing to comply with and be bound by the following terms and conditions of use, which together with our privacy policy govern [Business Name]'s relationship with you in relation to this website. If you disagree with any part of these terms and conditions, please do not use our website.
      </p>
      <h2>Usage</h2>
      <p className="terms-text">
        The use of this website is subject to the following terms of use:
      </p>
      <ul>
        <li>The content of the pages of this website is for your general information and use only. It is subject to change without notice.</li>
        <li>This website uses cookies to monitor browsing preferences. If you do allow cookies to be used, personal information may be stored by us for use by third parties.</li>
        <li>Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website for any particular purpose.</li>
        {/* Add more list items or paragraphs as needed */}
      </ul>
      {/* More sections like "Usage" can be added here */}
    </div>
  );
};

export default TermsAndConditions;
