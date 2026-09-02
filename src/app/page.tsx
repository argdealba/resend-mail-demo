'use client';

import { useState } from 'react';

export default function Page() {
  const [formData, setFormData] = useState({
    recipientEmail: '',
    customerName: '',
    invoiceNumber: '',
    amountDue: '',
    chargeAttemptDate: '',
    nextRetryDate: '',
    includeAttachment: false,
    includeRepoLink: false,
    repoLinkLabel: '',
    repoLinkUrl: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('Sending email...');

    try {
      const response = await fetch('/api/send-billing-failure', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(`✓ Email sent successfully! ID: ${data.id}`);
      } else {
        setMessage('✗ Error sending email');
      }
    } catch {
      setMessage('✗ Error sending email');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Resend Billing Failure
          </h1>
          <p className="text-gray-600">Test email notification system</p>
          <div className="h-1 w-16 bg-green-500 mt-4 rounded"></div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <input
            type="email"
            name="recipientEmail"
            placeholder="Recipient Email"
            value={formData.recipientEmail}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />

          {/* Customer Name Input */}
          <input
            type="text"
            name="customerName"
            placeholder="Customer Name"
            value={formData.customerName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />

          {/* Invoice Number Input */}
          <input
            type="text"
            name="invoiceNumber"
            placeholder="Invoice Number"
            value={formData.invoiceNumber}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />

          {/* Amount Due Input */}
          <input
            type="text"
            name="amountDue"
            placeholder="Amount Due (USD)"
            value={formData.amountDue}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />

          {/* Charge Attempt Date */}
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Attempted Date
          </label>
          <input
            type="date"
            name="chargeAttemptDate"
            value={formData.chargeAttemptDate}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />

          {/* Next Retry Date */}
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Next Retry Date
          </label>
          <input
            type="date"
            name="nextRetryDate"
            value={formData.nextRetryDate}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />

          {/* Divider */}
          <div className="border-t border-gray-200 pt-4 mt-6"></div>

          {/* Attachment Checkbox */}
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              name="includeAttachment"
              checked={formData.includeAttachment}
              onChange={handleChange}
              className="w-4 h-4 text-green-500 bg-gray-100 border-gray-300 rounded focus:ring-2 focus:ring-green-500"
            />
            <span className="text-gray-700">Include Invoice Attachment</span>
          </label>

          {/* Repository Link Checkbox */}
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              name="includeRepoLink"
              checked={formData.includeRepoLink}
              onChange={handleChange}
              className="w-4 h-4 text-green-500 bg-gray-100 border-gray-300 rounded focus:ring-2 focus:ring-green-500"
            />
            <span className="text-gray-700">Include Link</span>
          </label>

          {/* Conditional Repo Link Fields */}
          {formData.includeRepoLink && (
            <div className="bg-green-50 p-4 rounded-lg space-y-3">
              <input
                type="text"
                name="repoLinkLabel"
                placeholder="Link Label (e.g., View Our Repo)"
                value={formData.repoLinkLabel}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <input
                type="url"
                name="repoLinkUrl"
                placeholder="Link URL (e.g., https://github.com/...)"
                value={formData.repoLinkUrl}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition-colors duration-200"
          >
            Send Email
          </button>
        </form>

        {/* Message */}
        {message && (
          <div
            className={`mt-6 p-4 rounded-lg text-sm font-medium ${
              message.includes('successfully')
                ? 'bg-green-50 text-green-800 border border-green-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}