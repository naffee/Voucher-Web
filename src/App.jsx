import { useEffect, useState } from "react";
import brandLogo from "./assets/Logo (1).png";
import downloadIcons from "./assets/Icons.png";
import employeeLogo from "./assets/wakanow.png";
import employerLogo from "./assets/Pizza Hut_Logo_0 1.png";
import facebookIcon from "./assets/facebook.png";
import instagramIcon from "./assets/Instagram.png";
import linkedInIcon from "./assets/LinkedIn.png";
import xIcon from "./assets/X.png";
import tiktokIcon from "./assets/Tiktok.png";
import youtubeIcon from "./assets/YouTube.png";
import bottomLogo from "./assets/Bottom logo.png";
import claimVoucherIcon from "./assets/ticket-discount.png";
import voucherCodeCard from "./assets/voucher code 2 (1).png";
import likeIcon from "./assets/like.png";
import sidebarButtonsIcon from "./assets/Buttons.png";

const FORM_VARIANTS = {
  employee: {
    partnerName: "Wakanow",
    partnerLogo: employeeLogo,
    partnerLogoClass: "partner-logo-image-employee",
    partnerCopy: "MinieMoney Voucher is in partnership with Wakanow",
    fields: [
      {
        label: "Full Name",
        name: "fullName",
        type: "text",
        placeholder: "E.g. Paul Mike",
      },
      {
        label: "Work Email",
        name: "workEmail",
        type: "email",
        placeholder: "E.g. email@company.com",
      },
      {
        label: "Phone number",
        name: "phoneNumber",
        type: "tel",
        placeholder: "E.g. 081 2345 6789",
      },
    ],
  },
  employer: {
    partnerName: "Pizza Hut",
    partnerLogo: employerLogo,
    partnerLogoClass: "partner-logo-image-employer",
    partnerCopy: "MinieMoney Voucher is in partnership with Pizza Hut",
    fields: [
      {
        label: "Full Name",
        name: "fullName",
        type: "text",
        placeholder: "E.g. Paul Mike",
      },
      {
        label: "Work Email",
        name: "workEmail",
        type: "email",
        placeholder: "E.g. email@company.com",
      },
      {
        label: "Phone number",
        name: "phoneNumber",
        type: "tel",
        placeholder: "E.g. 081 2345 6789",
      },
      {
        label: "Order ID",
        name: "orderId",
        type: "text",
        placeholder: "E.g., HD729409",
      },
    ],
  },
};

function buildInitialFormValues(fields) {
  return Object.fromEntries(fields.map((field) => [field.name, ""]));
}

export default function App() {
  const viewerType = "employee";
  const activeVariant = FORM_VARIANTS[viewerType] ?? FORM_VARIANTS.employee;
  const initialFormValues = buildInitialFormValues(activeVariant.fields);

  const [formValues, setFormValues] = useState(initialFormValues);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isFormComplete = activeVariant.fields.every((field) => {
    const value = (formValues[field.name] ?? "").trim();

    if (field.name === "phoneNumber") {
      return /^\d{11}$/.test(value);
    }

    return value.length > 0;
  });

  useEffect(() => {
    setFormValues(buildInitialFormValues(activeVariant.fields));
    setIsSubmitted(false);
  }, [viewerType]);

  function handleChange(event) {
    const { name } = event.target;
    let { value } = event.target;

    if (name === "phoneNumber") {
      value = value.replace(/\D/g, "").slice(0, 11);
    }

    setFormValues((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!isFormComplete) {
      return;
    }

    setIsSubmitted(true);
  }

  function handleCloseResult() {
    setIsSubmitted(false);
    setFormValues(buildInitialFormValues(activeVariant.fields));
  }

  function handleMobileMenuToggle() {
    setIsMobileMenuOpen((current) => !current);
  }

  function handleMobileMenuClose() {
    setIsMobileMenuOpen(false);
  }

  return (
    <div className="page">
      <header className="topbar">
        <div className="topbar-inner">
          <div className="brand">
            <img className="brand-logo" src={brandLogo} alt="MinieMoney" />
          </div>

          <button
            className="mobile-menu-button"
            type="button"
            aria-label="Open menu"
            aria-expanded={isMobileMenuOpen}
            onClick={handleMobileMenuToggle}
          >
            <img src={sidebarButtonsIcon} alt="" aria-hidden="true" />
          </button>

          <div className="header-actions">
            <nav className="nav-links" aria-label="Primary">
              <a href="#company">Company</a>
              <a href="#products">Products</a>
              <a href="#resources">Resources</a>
            </nav>

            <a className="download-button" href="#download">
              <img
                className="download-badge-icons"
                src={downloadIcons}
                alt=""
                aria-hidden="true"
              />
              Download app
            </a>
          </div>
        </div>

        {isMobileMenuOpen ? (
          <div className="mobile-menu-panel">
            <nav className="mobile-nav-links" aria-label="Mobile primary">
              <a href="#company" onClick={handleMobileMenuClose}>
                Company
              </a>
              <a href="#products" onClick={handleMobileMenuClose}>
                Products
              </a>
              <a href="#resources" onClick={handleMobileMenuClose}>
                Resources
              </a>
            </nav>

            <a
              className="download-button mobile-download-button"
              href="#download"
              onClick={handleMobileMenuClose}
            >
              <img
                className="download-badge-icons"
                src={downloadIcons}
                alt=""
                aria-hidden="true"
              />
              Download app
            </a>
          </div>
        ) : null}
      </header>

      <main className="hero-panel">
        <div className="hero-stack">
          <section
            className={`voucher-card voucher-card-${viewerType}`}
            aria-labelledby="voucher-title"
          >
            <div className={`partner-head partner-head-${viewerType}`}>
              <div className="partner-logo">
                <img
                  className={`partner-logo-image ${activeVariant.partnerLogoClass}`}
                  src={activeVariant.partnerLogo}
                  alt={activeVariant.partnerName}
                />
              </div>
              <p className="partner-copy">{activeVariant.partnerCopy}</p>
            </div>

            <form
              className={`voucher-form voucher-form-${viewerType}`}
              onSubmit={handleSubmit}
            >
              {activeVariant.fields.map((field) => (
                <label key={field.name}>
                  <span>{field.label}</span>
                  <input
                    type={field.type}
                    name={field.name}
                    value={formValues[field.name] ?? ""}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    inputMode={field.name === "phoneNumber" ? "numeric" : undefined}
                    maxLength={field.name === "phoneNumber" ? 11 : undefined}
                  />
                </label>
              ))}

              <button type="submit" disabled={!isFormComplete}>
                <img src={claimVoucherIcon} alt="" aria-hidden="true" />
                Claim Voucher
              </button>
            </form>
          </section>

          {isSubmitted ? (
            <section className="result-overlay" aria-live="polite">
              <section className="result-card">
                <div className="result-card-inner">
                  <div className="result-top-card">
                    <img
                      className="result-top-card-image"
                      src={voucherCodeCard}
                      alt="Voucher code"
                    />
                  </div>

                  <div className="result-text-block">
                    <h2 className="result-heading">Your voucher is ready</h2>
                    <p className="result-copy">
                      We&apos;ve emailed your voucher code and simple steps to redeem
                      it in the MinieMoney app.
                      <br />
                      <br />
                      Check your inbox and enjoy your reward.
                    </p>
                    <button
                      className="result-action-button"
                      type="button"
                      onClick={handleCloseResult}
                    >
                      <img src={likeIcon} alt="" aria-hidden="true" />
                      Got it
                    </button>
                  </div>
                </div>
                <button
                  className="result-close-button"
                  type="button"
                  aria-label="Close voucher card"
                  onClick={handleCloseResult}
                >
                  X
                </button>
              </section>
            </section>
          ) : null}
        </div>
      </main>

      <footer className="footer-shell">
        <section className="footer-card">
          <div className="footer-cta">
            <div>
              <div className="brand footer-brand">
                <img className="brand-logo" src={brandLogo} alt="MinieMoney" />
              </div>
              <p>One money app for the whole family</p>
            </div>

            <a className="download-button light" href="#download">
              <img
                className="download-badge-icons"
                src={downloadIcons}
                alt=""
                aria-hidden="true"
              />
              Download app
            </a>
          </div>

          <div className="footer-links">
            <div id="company">
              <h2>Company</h2>
              <a href="#about">About us</a>
              <a href="#career">Career</a>
            </div>

            <div id="products">
              <h2>Products</h2>
              <a href="#minielink">MinieLink</a>
              <a href="#gifting">Gifting</a>
            </div>

            <div id="resources">
              <h2>Resources</h2>
              <a href="#faqs">FAQs</a>
              <a href="#blog">Blog</a>
              <a href="#press">Press Kit</a>
            </div>

            <div>
              <h2>Legal</h2>
              <a href="#terms">Terms of Service</a>
              <a href="#privacy">Privacy Policy</a>
              <a href="#aml">AML Policy</a>
            </div>

            <div>
              <h2>Contact</h2>
              <a href="tel:+2349137093414">+234 913 709 3414</a>
              <a href="mailto:hello@miniemoney.com">hello@miniemoney.com</a>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© 2025 MinieMoney. All rights reserved.</p>

            <div className="socials" aria-label="Social links">
              <a href="#facebook" aria-label="Facebook">
                <img src={facebookIcon} alt="" aria-hidden="true" />
              </a>
              <a href="#instagram" aria-label="Instagram">
                <img src={instagramIcon} alt="" aria-hidden="true" />
              </a>
              <a href="#linkedin" aria-label="LinkedIn">
                <img src={linkedInIcon} alt="" aria-hidden="true" />
              </a>
              <a href="#x" aria-label="X">
                <img src={xIcon} alt="" aria-hidden="true" />
              </a>
              <a href="#tiktok" aria-label="TikTok">
                <img src={tiktokIcon} alt="" aria-hidden="true" />
              </a>
              <a href="#youtube" aria-label="YouTube">
                <img src={youtubeIcon} alt="" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="watermark">
            <img src={bottomLogo} alt="MinieMoney" />
          </div>
        </section>
      </footer>
    </div>
  );
}
