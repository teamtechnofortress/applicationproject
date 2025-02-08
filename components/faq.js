// pages/faq.js

import Link from 'next/link';
import styles from '../styles/faq.module.css';

const FAQ = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>

      <div className="space-y-6">
        <div className="faq-item">
          <h2 className="text-xl font-semibold">How do I sign up?</h2>
          <p>
            To sign up, click on the "Sign Up" button at the top of the page and fill in your details.
          </p>
        </div>

        <div className="faq-item">
          <h2 className="text-xl font-semibold">How do I reset my password?</h2>
          <p>
            If you've forgotten your password, click on the "Forgot Password?" link on the login page and follow the instructions.
          </p>
        </div>

        <div className="faq-item">
          <h2 className="text-xl font-semibold">Can I update my account information?</h2>
          <p>
            Yes, you can update your account information by going to the "Profile" section of your account.
          </p>
        </div>

        <div className="faq-item">
          <h2 className="text-xl font-semibold">How do I contact support?</h2>
          <p>
            You can contact support by visiting the "Contact Us" page or sending us an email at support@example.com.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <Link href="/" legacyBehavior>
          <button className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">
            Back to Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FAQ;
