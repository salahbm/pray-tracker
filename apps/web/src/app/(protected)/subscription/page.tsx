import { Metadata } from "next";
import { tiers } from "@/data/pricing";
import { FiCheck } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Upgrade Subscription - Pray Tracker",
  description:
    "Upgrade your Pray Tracker subscription to access premium features",
};

export default async function UpgradePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Upgrade Your Experience
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Choose the plan that best fits your needs
          </p>
        </div>

        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto">
          {tiers.slice(1).map((tier) => (
            <div
              key={tier.name}
              className="bg-white border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200"
            >
              <div className="p-6">
                <h2 className="text-lg font-medium leading-6 text-gray-900">
                  {tier.name}
                </h2>
                <p className="mt-8">
                  <span className="text-4xl font-extrabold text-gray-900">
                    ${tier.price}
                  </span>
                  <span className="text-base font-medium text-gray-500">
                    /month
                  </span>
                </p>
                <form action="/api/create-checkout-session" method="POST">
                  <button
                    type="submit"
                    className="mt-8 block w-full bg-primary text-white rounded-md py-2 text-sm font-semibold hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    Subscribe Now
                  </button>
                </form>
              </div>
              <div className="pt-6 pb-8 px-6">
                <h3 className="text-xs font-medium text-gray-900 tracking-wide uppercase">
                  What&apos;s included
                </h3>
                <ul className="mt-6 space-y-4">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex space-x-3">
                      <FiCheck
                        className="flex-shrink-0 h-5 w-5 text-green-500"
                        aria-hidden="true"
                      />
                      <span className="text-sm text-gray-500">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
