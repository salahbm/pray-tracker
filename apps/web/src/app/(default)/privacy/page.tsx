import React from 'react';

const PrivacyPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 mt-20">
      <h1 className="text-3xl font-bold mb-8 text-center">Privacy Policy</h1>

      {/* Data Collection Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Information We Collect</h2>
        <p className="text-foreground-accent mb-4">
          We collect only the information you provide to us directly, such as your name, email,
          profile image, and selected preferences. No sensitive or unnecessary information is
          collected.
        </p>
      </section>

      {/* Data Use Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">How We Use Your Information</h2>
        <p className="text-foreground-accent mb-4">
          Your information is used only to operate the app, maintain your account, provide features,
          personalize your experience, and improve the overall service. We do not use your data for
          advertising.
        </p>
      </section>

      {/* Data Sharing Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Data Sharing</h2>
        <p className="text-foreground-accent mb-4">
          We do not sell your data. We do not share your personal information with third parties
          except when required to operate core app services, comply with legal obligations, or
          protect the security of the platform.
        </p>
      </section>

      {/* Data Security Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Data Security</h2>
        <p className="text-foreground-accent mb-4">
          We apply standard security measures to protect your information from unauthorized access,
          disclosure, or misuse. However, no method of transmission or storage is completely secure.
        </p>
      </section>

      {/* Subscriptions Section – REQUIRED FOR APPLE REVIEW */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Subscriptions</h2>
        <p className="text-foreground-accent whitespace-pre-line mb-4">
          Noor Pray Tracker offers auto-renewable subscriptions. Available subscription options
          include:
          {
            '\n\n• Monthly Subscription: Renews every month.\n• Annual Subscription: Renews every year.'
          }
          {
            '\n\nPayment will be charged to your Apple ID account at confirmation of purchase. Subscriptions automatically renew unless canceled at least 24 hours before the end of the current period. Your Apple ID account will be charged for renewal within 24 hours prior to the end of the current period.\n\nYou can manage or cancel your subscription at any time in your device settings: Settings → Apple ID → Subscriptions.\n\nPrices for subscriptions are clearly displayed in the app before purchase and may vary by region. All purchases are processed securely by Apple. We do not have access to your payment information.'
          }
        </p>
      </section>

      {/* Changes Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Changes to This Policy</h2>
        <p className="text-foreground-accent mb-4">
          We may update this policy when necessary. If significant changes occur, we will notify you
          through the app or other appropriate means. Continued use after updates means you accept
          the updated policy.
        </p>
      </section>

      {/* Contact Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
        <p className="text-foreground-accent mb-4">
          If you have questions or requests regarding privacy or subscriptions, you can contact us
          at{' '}
          <a href="mailto:noorpraytracker@gmail.com" className="text-primary hover:underline">
            noorpraytracker@gmail.com
          </a>
        </p>
      </section>
    </div>
  );
};

export default PrivacyPage;
