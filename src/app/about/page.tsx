import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Shield, Bell, BarChart2, Globe, Heart, Lock, ArrowRight, Zap } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — RenewTracker",
  description: "Learn about RenewTracker — the free subscription and bill tracking app that keeps you in control of every recurring payment.",
};

const values = [
  {
    icon: Heart,
    title: "Free forever",
    desc: "Core tracking and reminders will always be free. No paywalls, no trials, no bait-and-switch.",
    color: "bg-red-50 text-red-500",
  },
  {
    icon: Lock,
    title: "Privacy first",
    desc: "Your subscription data lives in your account only. We never sell data or show ads.",
    color: "bg-blue-50 text-blue-500",
  },
  {
    icon: Zap,
    title: "Simple by design",
    desc: "Add a subscription in seconds. No spreadsheets, no complex setup — just add and forget.",
    color: "bg-yellow-50 text-yellow-500",
  },
  {
    icon: Globe,
    title: "Built for everyone",
    desc: "34 currencies supported. Whether you pay in USD, INR, THB, or EUR — we have you covered.",
    color: "bg-green-50 text-green-500",
  },
];

const whatWeTrack = [
  "Netflix, Spotify, Disney+, YouTube Premium",
  "Rent, electricity, internet, utilities",
  "Credit card bills and EMIs",
  "Buy Now Pay Later instalments (Klarna, Afterpay)",
  "Gym memberships and fitness apps",
  "SaaS tools and software licences",
  "Insurance premiums",
  "Any custom subscription or bill",
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-200">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-5 leading-tight">
            Built so you never get surprised by a charge again
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto">
            RenewTracker is a free, privacy-first tool for tracking every subscription,
            bill, and recurring payment — and reminding you before each one hits.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Why we built this</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed text-base">
          <p>
            It started with a surprise charge. A streaming trial nobody remembered signing up for,
            quietly renewing for the third month in a row. Sound familiar? Between streaming services,
            SaaS tools, BNPL instalments, gym memberships, and annual renewals, the average person
            now manages more recurring payments than ever — scattered across emails, bank statements,
            and memory.
          </p>
          <p>
            Spreadsheets work, but they need manual upkeep. Bank apps show charges after the fact.
            Calendar reminders get dismissed and forgotten. We wanted something that just works:
            add a subscription once, get reminded before it charges, see everything in one place.
          </p>
          <p>
            RenewTracker was built to be that tool — simple enough to use in 30 seconds,
            useful enough to actually change how you manage money.
          </p>
        </div>
      </section>

      {/* What we track */}
      <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">What you can track</h2>
          <p className="text-gray-500 mb-8">Anything that charges you on a schedule belongs here.</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {whatWeTrack.map((item) => (
              <div key={item} className="flex items-start gap-3 bg-white rounded-xl border border-gray-100 px-4 py-3 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                <span className="text-sm text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features strip */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">How it works</h2>
        <div className="space-y-6">
          {[
            { icon: Bell, title: "Smart reminders", desc: "Get notified 30, 15, 7, 3, and 1 day before every charge. Never be caught off guard." },
            { icon: BarChart2, title: "Spending overview", desc: "See your total monthly and annual recurring spend at a glance. Spot what's worth keeping." },
            { icon: Globe, title: "Multi-currency", desc: "Track subscriptions in 34 currencies. Great for services billed in a foreign currency." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Our values</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {values.map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <div className={`w-9 h-9 rounded-xl ${color} flex items-center justify-center mb-3`}>
                  <Icon className="w-4.5 h-4.5" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Ready to take control?</h2>
        <p className="text-gray-500 mb-8">
          Join thousands of people who never miss a payment. Free, always.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/register"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-7 py-3 rounded-xl shadow-md shadow-blue-200 transition-colors"
          >
            Get started free <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 border border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold px-7 py-3 rounded-xl transition-colors"
          >
            Get in touch
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
