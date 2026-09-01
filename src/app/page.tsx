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
  });

  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
        setMessage(`Email sent successfully! ID: ${data.id}`);
      } else {
        setMessage('Error sending email');
      }
    } catch (error) {
      setMessage('Error sending email');
    }
  };

  return (
    <div>
      <h1>Send Billing Failure Email</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="recipientEmail"
          placeholder="Recipient Email"
          value={formData.recipientEmail}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="customerName"
          placeholder="Customer Name"
          value={formData.customerName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="invoiceNumber"
          placeholder="Invoice Number"
          value={formData.invoiceNumber}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="amountDue"
          placeholder="Amount Due"
          value={formData.amountDue}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="chargeAttemptDate"
          value={formData.chargeAttemptDate}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="nextRetryDate"
          value={formData.nextRetryDate}
          onChange={handleChange}
          required
        />
        <button type="submit">Send Email</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}