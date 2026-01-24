import React from 'react';

const TermsPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 mt-20">
      <h1 className="text-3xl font-bold mb-8 text-center">Terms of Service</h1>

      {/* Agreement Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Agreement to Terms</h2>
        <p className="text-foreground-accent mb-4">
          By using this app, you agree to these Terms of Service. If you do not agree, you may
          discontinue using the app at any time.
        </p>
      </section>

      {/* Acceptable Use Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Acceptable Use</h2>
        <p className="text-foreground-accent mb-4">
          You agree to use the app only for lawful and intended purposes. You must not misuse the
          service, interfere with its operation, or attempt unauthorized access.
        </p>
      </section>

      {/* Subscriptions Section – REQUIRED FOR APPLE REVIEW */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Subscriptions</h2>
        <p className="text-foreground-accent whitespace-pre-line mb-4">
          Noor Pray Tracker offers auto-renewable subscriptions. Available options include monthly
          and annual subscriptions.
          {
            '\n\nPayment will be charged to your Apple ID account at confirmation of purchase. Subscriptions automatically renew unless canceled at least 24 hours before the end of the current period. Your account will be charged for renewal within 24 hours prior to the end of the current period.'
          }
          {
            '\n\nYou can manage or cancel your subscription at any time in your device settings: Settings → Apple ID → Subscriptions.'
          }
          {
            '\n\nAll purchases are processed securely by Apple and we do not have access to your payment information. Prices may vary by region and are clearly displayed in the app before purchase.'
          }
        </p>
      </section>

      {/* User Content Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">User Content</h2>
        <p className="text-foreground-accent mb-4">
          You are responsible for any content you submit within the app. You confirm that your
          content does not violate any laws, rights, or the privacy of others.
        </p>
      </section>

      {/* Account Termination Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Account Termination</h2>
        <p className="text-foreground-accent mb-4">
          We may suspend or terminate access to the app if we detect misuse, violations of these
          terms, or activity that threatens the safety or operation of the service.
        </p>
      </section>

      {/* Changes to Terms Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Changes to These Terms</h2>
        <p className="text-foreground-accent mb-4">
          We may update these Terms of Service from time to time. Continued use of the app after
          changes means you accept the updated terms.
        </p>
      </section>

      {/* Contact Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
        <p className="text-foreground-accent mb-4">
          If you have questions about these terms, you can contact us at any time at{' '}
          <a href="mailto:noorpraytracker@gmail.com" className="text-primary hover:underline">
            noorpraytracker@gmail.com
          </a>
        </p>
      </section>
    </div>
  );
};

export default TermsPage;
