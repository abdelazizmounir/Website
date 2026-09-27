import React from 'react';
import { Leaf } from 'lucide-react';
import { companyInfo } from '../data/companyData';

export const PageIntro = ({ title, description, image, imageAlt }) => (
  <section className="page-intro">
    <div className="container page-intro-grid">
      <div className="page-intro-copy">
        <span className="eyebrow"><span className="eyebrow-mark" /> AM GREEN ART <span className="eyebrow-divider">/</span> FÈS–MEKNÈS</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <div className="page-intro-visual">
        <img src={image} alt={imageAlt} />
        <div className="page-intro-location"><span><Leaf size={16} /></span>{companyInfo.contact.locationDesc}</div>
      </div>
    </div>
  </section>
);
