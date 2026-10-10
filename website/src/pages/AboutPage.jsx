import React, { useState, useEffect } from 'react';
import company from '../data/company.json';
import categories from '../data/categories.json';
import products from '../data/products.json';

const certificatesData = [
  {
    id: 'iso-9001',
    title: 'ISO 9001 : 2015 Certification',
    subtitle: 'Quality Management System',
    issuer: 'QRA (Quality Research Association)',
    scope: 'Wholesale and Retail Readymade Garments',
    validity: '03.04.2023 – 02.03.2026',
    image: '/certificate.png',
    badge: 'ISO Certified',
  },
  {
    id: 'iec',
    title: 'Importer-Exporter Code (IEC)',
    subtitle: 'Directorate General of Foreign Trade (DGFT)',
    issuer: 'Ministry of Commerce & Industry, Government of India',
    scope: 'Authorized Importer-Exporter (Code: AAIFI8123L)',
    validity: 'Issued: 04/08/2021',
    image: '/iec-certificate.jpg',
    badge: 'Govt. of India',
  },
  {
    id: 'gst',
    title: 'GST Registration Certificate',
    subtitle: 'Form GST REG-06',
    issuer: 'Government of India / West Bengal Tax Network',
    scope: 'Registered Taxpayer (GSTIN: 19AAIFI8123L1ZY)',
    validity: 'Effective: 23/07/2021',
    image: '/gst-certificate.jpg',
    badge: 'Statutory GST',
  },
  {
    id: 'trustseal-2024',
    title: 'IndiaMART TrustSEAL (2024)',
    subtitle: 'Verified Business Certification',
    issuer: 'IndiaMART InterMESH Limited',
    scope: 'Verified Credibility & Manufacturing Operations',
    validity: 'Certified: November 2024',
    image: '/trustseal-2024.jpg',
    badge: 'TrustSEAL 2024',
  },
  {
    id: 'trustseal-2021',
    title: 'IndiaMART TrustSEAL (2021)',
    subtitle: 'Verified Business Certification',
    issuer: 'IndiaMART InterMESH Limited',
    scope: 'Verified Supplier & Business Standing',
    validity: 'Certified: August 2021',
    image: '/trustseal-2021.jpg',
    badge: 'TrustSEAL 2021',
  },
];

const clientReferences = [
  { name: 'Indian Army', category: 'Defense & Institutional' },
  { name: 'Kendriya Vidyalayas (K.V.)', category: 'Central School Network' },
  { name: 'Bhutan State Corporation', category: 'International Institutional' },
  { name: 'UEM / IEM University', category: 'Higher Education' },
  { name: 'Mount Litera', category: 'School Network' },
  { name: 'Holy Child', category: 'School Network' },
  { name: 'Dreamland', category: 'Educational Institution' },
  { name: 'Pearl Hosiery', category: 'Textile & Apparel' },
  { name: 'Smart Kids', category: 'School Apparel' },
  { name: 'World Home', category: 'Corporate & Hospitality' },
];

const manufacturingOfferings = [
  'School Uniforms',
  'Medical Aprons & Healthcare Wear',
  'T-Shirts (Round Neck, Polo, Customized)',
  'Track Suits & Activewear',
  'Corporate & School Blazers',
  'Sweaters & Winter Uniforms',
  'Institutional Bags & Backpacks',
  'Caps & Branded Headwear',
  'Government & Institutional Uniforms',
  'Customized Contract Garment Manufacturing',
];

const AboutPage = () => {
  const [activeCertificate, setActiveCertificate] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveCertificate(null);
    };
    if (activeCertificate) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [activeCertificate]);

  return (
    <div className="pt-20 min-h-screen bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        
        {/* Page Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#8C6B52] bg-[#FAF7F2] border border-[#E8E1D9] px-4 py-1.5 rounded-full inline-block mb-3">
            Established Apparel Manufacturer • Kolkata
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#3B2C24] tracking-tight mb-4">
            About {company.name}
          </h1>
          <div className="w-24 h-1 bg-[#8C6B52] mx-auto rounded-full"></div>
          <p className="max-w-2xl mx-auto text-[#5C4A40] text-base sm:text-lg mt-4 leading-relaxed">
            16+ years of dedicated garment manufacturing, certified production quality, and dependable institutional supply across India and overseas.
          </p>
        </div>

        <div className="space-y-16 max-w-5xl mx-auto">
          
          {/* =========================================================================
              SECTION 1: ABOUT I3 INNOVATION (COMPANY INTRODUCTION & CAPABILITIES)
             ========================================================================= */}
          <section className="bg-white rounded-2xl shadow-sm border border-[#E8E1D9] p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8 mb-8 pb-8 border-b border-[#E8E1D9]">
              <div className="w-28 h-28 sm:w-36 sm:h-36 shrink-0 flex items-center justify-center bg-[#FDFBF7] rounded-2xl border border-[#E8E1D9] p-4 shadow-2xs">
                <img src="/logo.png" alt={`${company.name} Logo`} className="w-full h-auto object-contain" />
              </div>
              <div className="text-center md:text-left flex-1">
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#8C6B52] uppercase tracking-wider mb-2">
                  <span>ISO 9001:2015 Certified</span>
                  <span>•</span>
                  <span>Est. Over 16 Years</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#3B2C24] mb-3">{company.name}</h2>
                <div className="flex items-center justify-center md:justify-start gap-2 text-[#5C4A40] text-sm sm:text-base">
                  <svg className="w-5 h-5 text-[#8C6B52] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>156/82, B.T. Road, Kolkata, West Bengal - 700108, India</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 text-[#5C4A40] leading-relaxed text-base sm:text-lg">
              <p>
                <strong>I3 Innovation</strong> is an ISO 9001:2015 certified uniform and apparel manufacturing enterprise based in Kolkata, West Bengal. With <strong>more than 16 years of dedicated manufacturing experience</strong>, the company has evolved from a specialized school uniform maker into a multi-category manufacturer trusted by schools, universities, healthcare institutions, corporate organizations, and government departments.
              </p>
              <p>
                Our production capabilities span both bulk ready-to-wear garments and customized institutional uniforms. Over the years, our manufacturing footprint has expanded across every major state in India, as well as internationally to institutional clients in <strong>Ireland, Bhutan, and Kenya</strong>.
              </p>
            </div>

            {/* Manufacturing Highlights Grid */}
            <div className="mt-8 pt-8 border-t border-[#E8E1D9]">
              <h3 className="text-lg font-bold text-[#3B2C24] mb-4">Our Manufacturing Scope</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {manufacturingOfferings.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 bg-[#FAF7F2] px-4 py-3 rounded-xl border border-[#E8E1D9] text-[#5C4A40] text-sm font-medium"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#8C6B52] shrink-0"></span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* =========================================================================
              SECTION 2: OUR EXPERIENCE & TRUST (GOVERNMENT & INSTITUTIONAL CLIENTS)
             ========================================================================= */}
          <section className="bg-white rounded-2xl shadow-sm border border-[#E8E1D9] p-8 md:p-12">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#8C6B52] bg-[#FAF7F2] border border-[#E8E1D9] px-3.5 py-1 rounded-full">
                Track Record & Reputation
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#3B2C24] mt-3">Our Experience & Trust</h3>
              <p className="text-[#5C4A40] text-sm sm:text-base mt-2">
                Built through 16+ years of dependable bulk deliveries, rigorous quality control, and repeat institutional relationships.
              </p>
            </div>

            {/* Government Uniform Experience Banner */}
            <div className="bg-[#FAF7F2] border border-[#E8E1D9] rounded-2xl p-6 sm:p-8 mb-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white border border-[#E8E1D9] flex items-center justify-center text-[#8C6B52] shrink-0 shadow-2xs">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-[#3B2C24]">State Government & Institutional Production Experience</h4>
                  <p className="text-[#5C4A40] text-sm mt-1 leading-relaxed">
                    I3 Innovation has extensive experience manufacturing school and departmental uniforms for state-level projects across <strong>Odisha, West Bengal, and Jharkhand</strong>, fulfilling rigorous compliance norms, dimensional standards, and volume requirements.
                  </p>
                </div>
              </div>
            </div>

            {/* Client / Organization References */}
            <div className="mb-8">
              <h4 className="text-base font-bold text-[#3B2C24] mb-4 text-center sm:text-left">
                Notable Clients & Institutional Partnerships
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {clientReferences.map((client, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-3.5 rounded-xl border border-[#E8E1D9] text-center shadow-2xs hover:border-[#8C6B52] transition-colors"
                  >
                    <p className="text-sm font-semibold text-[#3B2C24] leading-tight">{client.name}</p>
                    <p className="text-[11px] text-[#8C6B52] mt-1 font-medium">{client.category}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Verification / Presence Badges */}
            <div className="pt-6 border-t border-[#E8E1D9]">
              <p className="text-xs uppercase font-semibold tracking-wider text-[#8C6B52] text-center mb-4">
                Verified Business Presence & Official Portals
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <div className="inline-flex items-center gap-2 bg-[#FAF7F2] border border-[#E8E1D9] px-4 py-2 rounded-xl text-xs font-semibold text-[#3B2C24]">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  <span>GeM Portal (Government e-Marketplace)</span>
                </div>
                <div className="inline-flex items-center gap-2 bg-[#FAF7F2] border border-[#E8E1D9] px-4 py-2 rounded-xl text-xs font-semibold text-[#3B2C24]">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  <span>MSME Registered Enterprise</span>
                </div>
                <div className="inline-flex items-center gap-2 bg-[#FAF7F2] border border-[#E8E1D9] px-4 py-2 rounded-xl text-xs font-semibold text-[#3B2C24]">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  <span>IndiaMART TrustSEAL Certified</span>
                </div>
                <div className="inline-flex items-center gap-2 bg-[#FAF7F2] border border-[#E8E1D9] px-4 py-2 rounded-xl text-xs font-semibold text-[#3B2C24]">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  <span>Google Business Verified</span>
                </div>
              </div>
            </div>
          </section>

          {/* =========================================================================
              SECTION 3: PEOPLE BEHIND I3 INNOVATION (HUMAN ELEMENT & CRAFTSMANSHIP)
             ========================================================================= */}
          <section className="bg-white rounded-2xl shadow-sm border border-[#E8E1D9] p-8 md:p-12">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#8C6B52] bg-[#FAF7F2] border border-[#E8E1D9] px-3.5 py-1 rounded-full">
                The Workforce & Craftsmanship
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#3B2C24] mt-3">People Behind I3 Innovation</h3>
              <p className="text-[#5C4A40] text-sm sm:text-base mt-2">
                A strong manufacturing enterprise is built on the daily dedication, precision, and responsibility of its workers.
              </p>
            </div>

            <div className="space-y-4 text-[#5C4A40] leading-relaxed text-base sm:text-lg mb-10">
              <p>
                Behind every bulk order, school uniform batch, and specialized institutional consignment is a committed manufacturing team. Our journey over the past 16 years has been powered by skilled pattern makers, experienced tailors, cutting masters, finishing workers, and on-ground floor supervisors who take pride in their craft every single day.
              </p>
              <p>
                We do not view garment manufacturing as a mechanized assembly line alone. Every fabric roll is inspected by human hands; every seam is double-checked for durability; and every consignment is packaged with the knowledge that it represents our client’s reputation. This culture of collective teamwork, attention to detail, and personal responsibility is what allows us to deliver consistent results season after season.
              </p>
            </div>

            {/* Craftsmanship Principles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              <div className="bg-[#FAF7F2] p-5 rounded-xl border border-[#E8E1D9]">
                <div className="w-10 h-10 rounded-lg bg-white border border-[#E8E1D9] flex items-center justify-center text-[#8C6B52] mb-3">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
                  </svg>
                </div>
                <h4 className="font-bold text-[#3B2C24] text-base mb-1">Skilled Craftsmanship</h4>
                <p className="text-xs text-[#5C4A40] leading-relaxed">
                  Decades of collective experience in pattern drafting, precision cutting, and uniform tailoring.
                </p>
              </div>

              <div className="bg-[#FAF7F2] p-5 rounded-xl border border-[#E8E1D9]">
                <div className="w-10 h-10 rounded-lg bg-white border border-[#E8E1D9] flex items-center justify-center text-[#8C6B52] mb-3">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h4 className="font-bold text-[#3B2C24] text-base mb-1">Floor-Level Teamwork</h4>
                <p className="text-xs text-[#5C4A40] leading-relaxed">
                  Harmonized coordination between cutting bays, sewing lines, finishing sections, and dispatch.
                </p>
              </div>

              <div className="bg-[#FAF7F2] p-5 rounded-xl border border-[#E8E1D9]">
                <div className="w-10 h-10 rounded-lg bg-white border border-[#E8E1D9] flex items-center justify-center text-[#8C6B52] mb-3">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h4 className="font-bold text-[#3B2C24] text-base mb-1">Quality Discipline</h4>
                <p className="text-xs text-[#5C4A40] leading-relaxed">
                  Rigorous multi-stage checkpoints for fabric density, seam strength, colorfastness, and sizing.
                </p>
              </div>

              <div className="bg-[#FAF7F2] p-5 rounded-xl border border-[#E8E1D9]">
                <div className="w-10 h-10 rounded-lg bg-white border border-[#E8E1D9] flex items-center justify-center text-[#8C6B52] mb-3">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-bold text-[#3B2C24] text-base mb-1">Client Commitment</h4>
                <p className="text-xs text-[#5C4A40] leading-relaxed">
                  Honoring delivery schedules, seasonal academic timelines, and transparent client communication.
                </p>
              </div>
            </div>

            {/* Leadership Anchor (Integrated Meet Our Director) */}
            <div className="bg-[#FAF7F2] rounded-2xl border border-[#E8E1D9] p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6">
              <div className="w-40 sm:w-48 aspect-[3/4] rounded-xl overflow-hidden shadow-md border-2 border-white bg-white shrink-0">
                <img
                  src="/person2.png"
                  alt="Rajib Sarkar - Director"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="text-center md:text-left flex-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#8C6B52]">Leadership & Management</span>
                <h4 className="text-2xl font-bold text-[#3B2C24] mt-1">Rajib Sarkar</h4>
                <p className="text-sm font-semibold uppercase tracking-wider text-[#8C6B52]">Director, I3 Innovation</p>
                <p className="text-sm text-[#5C4A40] mt-3 leading-relaxed">
                  "Our growth over the last 16 years is a direct reflection of our factory team's hard work and the trust of our clients. We remain committed to honest manufacturing, certified quality, and upholding our responsibility to every school, organization, and institution we serve."
                </p>
              </div>
            </div>
          </section>

          {/* =========================================================================
              SECTION 4: CERTIFICATIONS & CREDENTIALS (THE 5 DOCUMENTED CREDENTIALS)
             ========================================================================= */}
          <section className="bg-white rounded-2xl shadow-sm border border-[#E8E1D9] p-8 md:p-12">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#8C6B52] bg-[#FAF7F2] border border-[#E8E1D9] px-3.5 py-1 rounded-full">
                Verified Credentials
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#3B2C24] mt-3">Certifications & Credentials</h3>
              <p className="text-[#5C4A40] text-sm sm:text-base mt-2">
                Documented compliance, statutory registrations, and recognized trust certifications reflecting our commitment to transparent manufacturing standards.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificatesData.map((cert) => (
                <div
                  key={cert.id}
                  className="bg-[#FAF7F2] rounded-2xl border border-[#E8E1D9] p-5 flex flex-col justify-between shadow-2xs hover:shadow-md hover:border-[#8C6B52] transition-all duration-300 group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-bold uppercase tracking-wider bg-white border border-[#E8E1D9] text-[#8C6B52] px-2.5 py-1 rounded-md">
                        {cert.badge}
                      </span>
                      <button
                        onClick={() => setActiveCertificate(cert)}
                        className="text-xs text-[#8C6B52] font-semibold hover:underline inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span>View</span>
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                    </div>

                    <h4 className="text-base font-bold text-[#3B2C24] leading-snug mb-1">{cert.title}</h4>
                    <p className="text-xs font-semibold text-[#8C6B52] mb-2">{cert.subtitle}</p>

                    {/* Certificate Thumbnail */}
                    <div
                      onClick={() => setActiveCertificate(cert)}
                      className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-[#E8E1D9] bg-white cursor-pointer my-3 shadow-2xs"
                    >
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="bg-[#3B2C24]/80 text-white text-[11px] font-medium px-2.5 py-1 rounded-md backdrop-blur-xs">
                          Click to Expand
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1 text-xs text-[#5C4A40] mt-3 pt-3 border-t border-[#E8E1D9]">
                      <p><strong>Issuing Authority:</strong> {cert.issuer}</p>
                      <p><strong>Details / Scope:</strong> {cert.scope}</p>
                      <p className="text-[11px] text-[#8C6B52] font-medium">{cert.validity}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* =========================================================================
              SECTION 5: OUR FUTURE (REALISTIC, CONFIDENT VISION)
             ========================================================================= */}
          <section className="bg-white rounded-2xl shadow-sm border border-[#E8E1D9] p-8 md:p-12">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#8C6B52] bg-[#FAF7F2] border border-[#E8E1D9] px-3.5 py-1 rounded-full">
                Forward Vision
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#3B2C24] mt-3">Our Future</h3>
              <p className="text-[#5C4A40] text-sm sm:text-base mt-2">
                Taking 16+ years of hands-on experience further — through upgraded manufacturing capacity, modernized processes, and deeper client relationships.
              </p>
            </div>

            <div className="space-y-4 text-[#5C4A40] leading-relaxed text-base sm:text-lg mb-10">
              <p>
                We have spent more than 16 years building our foundation on solid ground: honest production, consistent fabric sourcing, and dependable delivery. Today, our goal is to scale that capability with purposeful investments in modern manufacturing techniques and structured production lines.
              </p>
              <p>
                As institutional uniform requirements evolve across education, healthcare, and enterprise sectors, we are focused on expanding our capacity to serve more schools, government organizations, and international buyers while strictly upholding the craftsmanship and integrity that built I3 Innovation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#FAF7F2] p-6 rounded-xl border border-[#E8E1D9]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-white border border-[#E8E1D9] flex items-center justify-center text-[#8C6B52] font-bold text-sm shrink-0">
                    01
                  </div>
                  <h4 className="font-bold text-[#3B2C24] text-base">Expanding Production Capacity</h4>
                </div>
                <p className="text-xs sm:text-sm text-[#5C4A40] leading-relaxed">
                  Scaling floor capacity and specialized garment lines to comfortably execute larger institutional tenders and high-volume seasonal school requirements on schedule.
                </p>
              </div>

              <div className="bg-[#FAF7F2] p-6 rounded-xl border border-[#E8E1D9]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-white border border-[#E8E1D9] flex items-center justify-center text-[#8C6B52] font-bold text-sm shrink-0">
                    02
                  </div>
                  <h4 className="font-bold text-[#3B2C24] text-base">Modern Production Practices</h4>
                </div>
                <p className="text-xs sm:text-sm text-[#5C4A40] leading-relaxed">
                  Adopting automated fabric handling, upgraded stitching machinery, and computerized pattern systems to continuously enhance dimensional accuracy and finishing quality.
                </p>
              </div>

              <div className="bg-[#FAF7F2] p-6 rounded-xl border border-[#E8E1D9]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-white border border-[#E8E1D9] flex items-center justify-center text-[#8C6B52] font-bold text-sm shrink-0">
                    03
                  </div>
                  <h4 className="font-bold text-[#3B2C24] text-base">Nationwide & Global Reach</h4>
                </div>
                <p className="text-xs sm:text-sm text-[#5C4A40] leading-relaxed">
                  Strengthening distribution channels across every Indian state while expanding export relationships with institutional apparel buyers across Bhutan, East Africa, and Europe.
                </p>
              </div>

              <div className="bg-[#FAF7F2] p-6 rounded-xl border border-[#E8E1D9]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-white border border-[#E8E1D9] flex items-center justify-center text-[#8C6B52] font-bold text-sm shrink-0">
                    04
                  </div>
                  <h4 className="font-bold text-[#3B2C24] text-base">Enduring Client Partnerships</h4>
                </div>
                <p className="text-xs sm:text-sm text-[#5C4A40] leading-relaxed">
                  Growing our business through long-term client loyalty, reliable annual contract renewals, transparent pricing, and consultative support for custom apparel needs.
                </p>
              </div>
            </div>
          </section>

          {/* =========================================================================
              SECTION 6: OUR NUMBERS (PRESERVED FACTUAL METRICS)
             ========================================================================= */}
          <section>
            <h3 className="text-2xl font-bold text-[#3B2C24] mb-8 text-center">Our Numbers</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-[#E8E1D9] p-6 text-center">
                <p className="text-3xl sm:text-4xl font-bold text-[#8C6B52] mb-1">16+</p>
                <p className="text-xs uppercase tracking-wider text-[#5C4A40] font-semibold">Years Experience</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-[#E8E1D9] p-6 text-center">
                <p className="text-3xl sm:text-4xl font-bold text-[#8C6B52] mb-1">{products.length}</p>
                <p className="text-xs uppercase tracking-wider text-[#5C4A40] font-semibold">Catalog Products</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-[#E8E1D9] p-6 text-center">
                <p className="text-3xl sm:text-4xl font-bold text-[#8C6B52] mb-1">{categories.length}</p>
                <p className="text-xs uppercase tracking-wider text-[#5C4A40] font-semibold">Categories</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-[#E8E1D9] p-6 text-center">
                <p className="text-3xl sm:text-4xl font-bold text-[#8C6B52] mb-1">590</p>
                <p className="text-xs uppercase tracking-wider text-[#5C4A40] font-semibold">Product Images</p>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* =========================================================================
          CERTIFICATE LIGHTBOX MODAL
         ========================================================================= */}
      {activeCertificate && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cert-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-fadeIn"
          onClick={() => setActiveCertificate(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-[#E8E1D9]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#E8E1D9] bg-[#FAF7F2]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6B52] bg-white px-2 py-0.5 rounded border border-[#E8E1D9] inline-block mb-1">
                  {activeCertificate.badge}
                </span>
                <h3 id="cert-title" className="text-lg font-bold text-[#3B2C24] leading-tight">
                  {activeCertificate.title}
                </h3>
                <p className="text-xs text-[#5C4A40] mt-0.5">{activeCertificate.issuer}</p>
              </div>
              <button
                onClick={() => setActiveCertificate(null)}
                aria-label="Close certificate modal"
                className="w-9 h-9 rounded-full bg-white border border-[#E8E1D9] text-[#5C4A40] hover:text-[#3B2C24] hover:bg-gray-100 flex items-center justify-center transition-colors cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Image Area */}
            <div className="flex-1 overflow-auto p-4 sm:p-6 bg-[#FDFBF7] flex items-center justify-center">
              <img
                src={activeCertificate.image}
                alt={activeCertificate.title}
                className="max-h-[65vh] w-auto max-w-full object-contain rounded-lg shadow-sm border border-[#E8E1D9] bg-white"
              />
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-[#E8E1D9] bg-[#FAF7F2] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-[#5C4A40]">
              <div>
                <p><strong>Scope / Registration:</strong> {activeCertificate.scope}</p>
                <p className="text-[#8C6B52] font-medium">{activeCertificate.validity}</p>
              </div>
              <a
                href={activeCertificate.image}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-[#8C6B52] hover:underline shrink-0"
              >
                Open in Full Resolution →
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutPage;
