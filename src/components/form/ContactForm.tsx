import React, { useState } from 'react';
import { toast } from "react-toastify";
import CountryCodeDropdown from './countrycodedropdown';

const ContactForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    // Set default country code to India (+91)
    const [countryCode, setCountryCode] = useState('+91');

    const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);

        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);

        const data = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            phone: `${countryCode}${formData.get('phone') as string}`,
            comments: formData.get('comments') as string
        };

        try {
            const response = await fetch('http://localhost:3001/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const result = await response.json();

            if (result.success) {
                toast.success("Thanks For Your Email!");
                form.reset();
                // Reset country code back to India after successful submission
                setCountryCode('+91');
            } else {
                toast.error(result.message || "Failed to send email.");
            }
        } catch (error) {
            console.error('Form submission error:', error);
            if (error instanceof TypeError && error.message.includes('fetch')) {
                toast.error("Network error. Please check your connection.");
            } else {
                toast.error("Failed to send email. Please try again.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <form className="contact-form" onSubmit={handleForm}>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="form-group">
                            <input className="form-control" id="name" name="name" placeholder="Name" type="text" required autoComplete="off" disabled={isSubmitting} />
                            <span className="alert-error" />
                        </div>
                    </div>
                </div>

                {/* Corrected Layout for Email and Phone */}
                <div className="row">
                    <div className="col-lg-6">
                        <div className="form-group">
                            <input className="form-control" id="email" name="email" placeholder="Email*" type="email" required autoComplete="off" disabled={isSubmitting} />
                            <span className="alert-error" />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="form-group phone-container">
                            <CountryCodeDropdown
                                selectedCode={countryCode}
                                setSelectedCode={setCountryCode}
                                disabled={isSubmitting}
                            />
                            <input className="form-control no-arrows" id="phone" name="phone" placeholder="Phone" type="tel" required autoComplete="off" disabled={isSubmitting} />
                            <span className="alert-error" />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-12">
                        <div className="form-group comments">
                            <textarea className="form-control" id="comments" name="comments" placeholder="Tell Us About Project *" required autoComplete="off" disabled={isSubmitting} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <button type="submit" name="submit" id="submit" disabled={isSubmitting}>
                            <i className="fa fa-paper-plane" /> {isSubmitting ? 'Sending...' : 'Get in Touch'}
                        </button>
                    </div>
                </div>
                <div className="col-lg-12 alert-notification">
                    <div id="message" className="alert-msg" />
                </div>
            </form>
        </>
    );
};

export default ContactForm;
