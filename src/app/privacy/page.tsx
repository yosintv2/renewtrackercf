import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — RenewTracker",
  description: "How RenewTracker collects, uses, and protects your personal data.",
};

const EFFECTIVE_DATE = "June 1, 2025";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Privacy Policy</h1>
          <p className="text-sm text-gray-400">Effective date: {EFFECTIVE_DATE}</p>
        </div>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-600 leading-relaxed">

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Who we are</h2>
            <p>
              RenewTracker (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is a subscription and bill tracking service
              available at <strong>renewtracker.net</strong>. We help individuals track recurring
              payments and receive reminders before charges occur.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Information we collect</h2>
            <p className="mb-3">We collect only what is necessary to provide the service:</p>
            <ul className="space-y-2 list-none pl-0">
              {[
                { label: "Account information", desc: "Your name, email address, and password (stored as a secure hash) when you create an account." },
                { label: "Subscription data", desc: "The subscription names, amounts, billing cycles, categories, and due dates that you voluntarily enter into the app." },
                { label: "Usage data", desc: "Basic technical information such as your IP address, browser type, and pages visited, collected automatically for security and service improvement." },
                { label: "Authentication tokens", desc: "Session tokens stored in your browser to keep you signed in." },
              ].map(({ label, desc }) => (
                <li key={label} className="flex gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                  <span><strong className="text-gray-800">{label}:</strong> {desc}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. How we use your information</h2>
            <p className="mb-3">We use your information solely to:</p>
            <ul className="space-y-2 list-none pl-0">
              {[
                "Provide, operate, and maintain the RenewTracker service",
                "Send you payment reminder emails based on your subscription due dates",
                "Allow you to manage and view your subscription data across sessions",
                "Improve the reliability and performance of the service",
                "Respond to support requests you send us",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Data storage and processors</h2>
            <p>
              Your data is stored securely using <strong>Supabase</strong> (database and authentication),
              which is hosted on AWS infrastructure. Supabase acts as our data processor under a data
              processing agreement. We do not use any other third-party service that has access to your
              personal subscription data.
            </p>
            <p className="mt-3">
              Data is stored in the <strong>EU West (Ireland)</strong> region. All data is encrypted
              at rest and in transit using industry-standard TLS encryption.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Data sharing</h2>
            <p>
              We do <strong>not</strong> sell, rent, or share your personal data with third parties
              for marketing, advertising, or any commercial purpose. We do not share your subscription
              data with anyone.
            </p>
            <p className="mt-3">
              We may disclose information only if required by law (such as a valid court order) or
              to protect the safety, rights, or property of RenewTracker or its users.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Cookies</h2>
            <p>
              We use only functional cookies necessary to keep you signed in to your account.
              We do not use advertising cookies, tracking pixels, or third-party analytics cookies.
              You can clear cookies at any time from your browser settings; doing so will sign you out.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Your rights</h2>
            <p className="mb-3">You have the right to:</p>
            <ul className="space-y-2 list-none pl-0">
              {[
                "Access all data we hold about you by contacting us",
                "Correct inaccurate profile information directly in your account settings",
                "Delete your account and all associated data at any time from Settings → Danger Zone",
                "Export your subscription data (contact us to request a CSV export)",
                "Withdraw consent at any time by deleting your account",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">8. Data retention</h2>
            <p>
              We retain your account and subscription data for as long as your account is active.
              If you delete your account, all personal data and subscription records are permanently
              deleted within 30 days. Aggregated, non-identifiable usage statistics may be retained
              indefinitely.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">9. Children</h2>
            <p>
              RenewTracker is not directed at children under the age of 13. We do not knowingly
              collect personal information from children. If you believe a child has provided us
              with personal data, please contact us and we will delete it promptly.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">10. Changes to this policy</h2>
            <p>
              We may update this Privacy Policy from time to time. When we do, we will update the
              effective date at the top of this page. For significant changes, we will notify you
              by email. Continued use of the service after changes take effect constitutes acceptance
              of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">11. Contact</h2>
            <p>
              If you have questions about this Privacy Policy or want to exercise your data rights,
              contact us at{" "}
              <a href="mailto:hello@renewtracker.net" className="text-blue-600 hover:underline font-medium">
                hello@renewtracker.net
              </a>
              .
            </p>
          </section>

        </div>
      </div>

      <Footer />
    </div>
  );
}
