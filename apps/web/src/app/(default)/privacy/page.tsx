import React from 'react';

const PrivacyPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 mt-20">
      <h1 className="text-3xl font-bold mb-8 text-center">Privacy Policy</h1>

      {/* Data Collection Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Information We Collect</h2>
        <p className="text-foreground-accent mb-4">
          We collect only the information necessary to provide our services: your name, surname,
          username, email address, profile image, password, and prayer tracking data.
        </p>
      </section>

      {/* Data Use Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">How We Use Your Information</h2>
        <p className="text-foreground-accent mb-4">
          Your information is used solely to enable core app features, such as tracking prayers and
          managing your profile. We do not use your data for advertising or share it with third
          parties.
        </p>
      </section>

      {/* Data Sharing Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Information Sharing</h2>
        <p className="text-foreground-accent mb-4">
          We do not sell or share your personal data with third parties. All your information stays
          within Pray Tracker and is used only to support your experience in the app.
        </p>
      </section>

      {/* Data Security Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Data Security</h2>
        <p className="text-foreground-accent mb-4">
          We use industry-standard methods to protect your personal data. While no system is
          completely secure, we take reasonable steps to keep your information safe.
        </p>
      </section>

      {/* User Control Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Your Choices</h2>
        <p className="text-foreground-accent mb-4">
          You have full control over your data. You can update or delete your account and personal
          information at any time through the app settings.
        </p>
      </section>

      {/* Changes Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Changes to Privacy Policy</h2>
        <p className="text-foreground-accent mb-4">
          If we make any changes to this policy, we will let you know in the app. Continued use of
          Pray Tracker after updates means you accept the new policy.
        </p>
      </section>

      {/* Contact Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
        <p className="text-foreground-accent mb-4">
          For any questions about this Privacy Policy or how we handle your data, please email us at{' '}
          <a href="mailto:salahbm.dev@gmail.com" className="text-primary hover:underline">
            salahbm.dev@gmail.com
          </a>
        </p>
      </section>
    </div>
  );
};

export default PrivacyPage;
