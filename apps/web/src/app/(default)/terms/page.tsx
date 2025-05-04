import React from 'react';

const TermsPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 mt-20">
      <h1 className="text-3xl font-bold mb-8">Terms & Conditions</h1>

      {/* Agreement Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Agreement to Terms</h2>
        <p className="text-foreground-accent mb-4">
          By using the Pray Tracker app, you agree to these Terms and
          Conditions. If you do not agree, please do not use the app.
        </p>
      </section>

      {/* Acceptable Use Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Acceptable Use</h2>
        <p className="text-foreground-accent mb-4">
          You agree to use Pray Tracker only for its intended purpose — helping
          you track and manage your daily prayers. You may not use the app in a
          way that harms the app, its services, or other users.
        </p>
      </section>

      {/* User Content Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">User Content</h2>
        <p className="text-foreground-accent mb-4">
          Your submitted data, including prayer records and profile information,
          remains your property. We only use this data to operate and improve
          the app experience.
        </p>
      </section>

      {/* Account Termination Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Account Termination</h2>
        <p className="text-foreground-accent mb-4">
          You may delete your account at any time from the app settings. We
          reserve the right to suspend or remove accounts that violate these
          Terms.
        </p>
      </section>

      {/* Changes to Terms Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Changes to Terms</h2>
        <p className="text-foreground-accent mb-4">
          We may update these Terms occasionally. If changes are significant,
          we&apos;ll notify you in the app. Continued use of the app means you
          accept the updated Terms.
        </p>
      </section>

      {/* Contact Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p className="text-foreground-accent mb-4">
          If you have any questions or concerns about these Terms, please email
          us at{' '}
          <a
            href="mailto:salahbm.dev@gmail.com"
            className="text-primary hover:underline"
          >
            salahbm.dev@gmail.com
          </a>
        </p>
      </section>
    </div>
  );
};

export default TermsPage;
