import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — RenewTracker",
  description: "The terms and conditions for using RenewTracker.",
};

const EFFECTIVE_DATE = "June 1, 2025";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Terms of Service</h1>
          <p className="text-sm text-gray-400">Effective date: {EFFECTIVE_DATE}</p>
        </div>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-600 leading-relaxed">

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Acceptance of terms</h2>
            <p>
              By creating an account or using RenewTracker (&quot;the Service&quot;), you agree to be
              bound by these Terms of Service. If you do not agree, do not use the Service.
              These terms apply to all users of renewtracker.net.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Description of service</h2>
            <p>
              RenewTracker is a personal finance tool that helps you track subscriptions,
              recurring bills, and financial liabilities, and receive reminders before payment
              dates. The Service is provided free of charge with no feature limits.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Your account</h2>
            <ul className="space-y-2 list-none pl-0">
              {[
                "You must be at least 13 years of age to create an account.",
                "You are responsible for maintaining the security of your account credentials.",
                "You must provide accurate information when registering.",
                "You are responsible for all activity that occurs under your account.",
                "You may not share your account with others or create accounts on behalf of others.",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Acceptable use</h2>
            <p className="mb-3">You agree not to:</p>
            <ul className="space-y-2 list-none pl-0">
              {[
                "Use the Service for any unlawful purpose or in violation of any laws.",
                "Attempt to gain unauthorized access to any part of the Service or its infrastructure.",
                "Interfere with or disrupt the Service or servers connected to the Service.",
                "Reverse engineer, decompile, or attempt to extract the source code of the Service.",
                "Use automated tools (bots, scrapers) to access the Service without permission.",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Your data</h2>
            <p>
              You own all subscription data you enter into RenewTracker. We do not claim any
              ownership over your data. You grant us a limited license to store and process your
              data solely for the purpose of providing the Service to you.
            </p>
            <p className="mt-3">
              You can delete your account and all associated data at any time. See our{" "}
              <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a> for
              details on how we handle your data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Disclaimer of warranties</h2>
            <p>
              The Service is provided <strong>&quot;as is&quot;</strong> and <strong>&quot;as available&quot;</strong> without
              warranties of any kind, either express or implied. We do not warrant that the Service
              will be uninterrupted, error-free, or completely secure.
            </p>
            <p className="mt-3">
              RenewTracker provides reminders as a convenience tool. We are <strong>not responsible</strong>{" "}
              for missed payments, late fees, or financial losses that arise from relying solely on
              reminder notifications. Always maintain your own records and verify payment obligations
              with the relevant service providers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Limitation of liability</h2>
            <p>
              To the maximum extent permitted by law, RenewTracker and its operators shall not be
              liable for any indirect, incidental, special, consequential, or punitive damages,
              including lost profits, data loss, or financial loss, arising from your use of or
              inability to use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">8. Service availability</h2>
            <p>
              We strive to keep the Service available at all times but do not guarantee uptime.
              We reserve the right to modify, suspend, or discontinue any part of the Service at
              any time with reasonable notice where possible. We will not be liable for any
              modification, suspension, or discontinuation of the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">9. Termination</h2>
            <p>
              You may terminate your account at any time from your account settings. We reserve
              the right to suspend or terminate your account if you violate these terms, engage in
              abusive behaviour, or if required by law. Upon termination, your right to use the
              Service ceases immediately and your data will be deleted in accordance with our
              Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">10. Changes to these terms</h2>
            <p>
              We may update these Terms of Service at any time. We will notify you of significant
              changes by email or by posting a prominent notice in the app. Continued use of the
              Service after changes take effect constitutes your acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">11. Contact</h2>
            <p>
              Questions about these terms? Contact us at{" "}
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
