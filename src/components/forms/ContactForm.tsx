"use client";

import { useState } from "react";
import Link from "next/link";
import { Send, CheckCircle2 } from "lucide-react";
import { SERVICE_CATEGORIES } from "@/lib/constants";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic will be added later
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <CheckCircle2 className="w-16 h-16 text-teal-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-navy-500 mb-2">
          Message Sent!
        </h3>
        <p className="text-gray-600 max-w-md mx-auto">
          Thank you for reaching out. We&apos;ll review your message and
          respond within one business day.
        </p>
        <Link href="/" className="btn-primary mt-6 inline-flex">
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="contact-name" className="label-text">
            Full Name *
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            className="input-field"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="label-text">
            Email Address *
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            className="input-field"
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="contact-phone" className="label-text">
            Phone Number
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            className="input-field"
            placeholder="(555) 000-0000"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="contact-service" className="label-text">
            Service Needed
          </label>
          <select
            id="contact-service"
            name="service"
            className="input-field"
            value={formData.service}
            onChange={handleChange}
          >
            <option value="">Select a service...</option>
            {SERVICE_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className="label-text">
          Message *
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          className="input-field resize-none"
          placeholder="Tell us about your tax situation or question..."
          value={formData.message}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="btn-primary w-full sm:w-auto text-lg">
        <Send className="w-5 h-5 mr-2" />
        Send Message
      </button>
    </form>
  );
}
