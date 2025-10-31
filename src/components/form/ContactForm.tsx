import React, { useState } from 'react';
import { toast } from "react-toastify";
import CountryCodeDropdown from './countrycodedropdown';

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countryCode, setCountryCode] = useState('+91');
  const [phone, setPhone] = useState('');

  // Keep only digits and cap at 10
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
    setPhone(digits);
  };

  const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (phone.length !== 10) {
      toast.error("Phone number must be exactly 10 digits");
      return;
    }

    setIsSubmitting(true);

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: `${countryCode}${phone}`,
      comments: formData.get('comments') as string
    };

    try {
      const res = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const result = await res.json();

      if (result.success) {
        toast.success("Thanks For Your Email!");
        form.reset();
        setCountryCode('+91');
        setPhone('');
      } else {
        toast.error(result.message || "Failed to send email.");
      }
    } catch {
      toast.error("Failed to send email. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="contact-form" onSubmit={handleForm}>
      <div className="row">
        <div className="col-lg-12">
          <div className="form-group">
            <input
              className="form-control"
              id="name"
              name="name"
              placeholder="Name"
              type="text"
              required
              autoComplete="off"
              disabled={isSubmitting}
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6">
          <div className="form-group">
            <input
              className="form-control"
              id="email"
              name="email"
              placeholder="Email*"
              type="email"
              required
              autoComplete="off"
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div className="col-lg-6">
          <div className="form-group phone-form-group">
            {/* Single-line field with shared baseline */}
            <div className="phone-field">
              <div className="cc-wrap">
                <CountryCodeDropdown
                  selectedCode={countryCode}
                  setSelectedCode={setCountryCode}
                  disabled={isSubmitting}
                />
              </div>

              <input
                className="form-control phone-input"
                id="phone"
                name="phone"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="Phone Number"
                type="text"
                inputMode="numeric"
                maxLength={10}
                required
                autoComplete="off"
                disabled={isSubmitting}
              />
            </div>


          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <div className="form-group comments">
            <textarea
              className="form-control"
              id="comments"
              name="comments"
              placeholder="Tell Us About Project *"
              required
              autoComplete="off"
              disabled={isSubmitting}
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <button
            type="submit"
            name="submit"
            id="submit"
            disabled={isSubmitting || phone.length !== 10}
          >
            <i className="fa fa-paper-plane" /> {isSubmitting ? 'Sending...' : 'Get in Touch'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
