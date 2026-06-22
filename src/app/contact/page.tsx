"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, MessageCircle, Clock, CheckCircle2, ArrowRight } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const CONTACT_EMAIL = "hello@renewtracker.net";
const TELEGRAM_URL  = "https://t.me/renewtracker";

const channels = [
  {
    icon: Mail,
    title: "Email",
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
    badge: "Preferred",
    badgeColor: "bg-blue-100 text-blue-700",
    desc: "Best for account issues, bug reports, or anything detailed.",
    response: "Usually within 24–48 hours",
  },
  {
    icon: MessageCircle,
    title: "Telegram",
    value: "@renewtracker",
    href: TELEGRAM_URL,
    badge: "Fast",
    badgeColor: "bg-green-100 text-green-700",
    desc: "Quick questions, feedback, or general chat.",
    response: "Usually within a few hours",
  },
];

const faqs = [
  { q: "Is RenewTracker really free?", a: "Yes — core tracking and reminders are free with no time limit. We may add optional paid features in the future, but the essentials stay free forever." },
  { q: "I forgot my password. What do I do?", a: "Go to the login page and click 'Forgot password'. We'll email you a reset link within a minute." },
  { q: "Can I delete my account?", a: "Yes. Go to Dashboard → Settings → scroll to the bottom → Delete Account. This permanently removes all your data." },
  { q: "Which currencies are supported?", a: "34 currencies including USD, EUR, GBP, INR, JPY, THB, AED, and more. You can switch currency from the dashboard header." },
  { q: "I found a bug. How do I report it?", a: "Email us at hello@renewtracker.net with a short description of what happened. Screenshots are always helpful." },
];

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`RenewTracker — Message from ${name || "a user"}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Get in touch
          </h1>
          <p className="text-lg text-gray-500">
            Questions, feedback, or something broken? We read everything.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

        {/* Contact channels */}
        <div className="grid sm:grid-cols-2 gap-5 mb-14">
          {channels.map(({ icon: Icon, title, value, href, badge, badgeColor, desc, response }) => (
            <a
              key={title}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="group flex flex-col gap-4 bg-white border border-gray-100 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50 rounded-2xl p-6 transition-all duration-200"
            >
              <div className="flex items-start justify-between">
                <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                  <Icon className="w-5 h-5 text-blue-600" />
                </div>
                <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${badgeColor}`}>{badge}</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-lg">{title}</p>
                <p className="text-blue-600 font-medium text-sm mt-0.5">{value}</p>
                <p className="text-sm text-gray-500 mt-2 leading-relaxed">{desc}</p>
              </div>
              <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                <span className="flex items-center gap-1.5 text-xs text-gray-400">
                  <Clock className="w-3.5 h-3.5" /> {response}
                </span>
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
              </div>
            </a>
          ))}
        </div>

        {/* Contact form */}
        <div className="grid lg:grid-cols-5 gap-10 mb-16">
          <div className="lg:col-span-3">
            <h2 className="text-xl font-bold text-gray-900 mb-1">Send us a message</h2>
            <p className="text-sm text-gray-500 mb-6">We'll reply to your email address.</p>

            {sent ? (
              <div className="flex flex-col items-center justify-center py-14 text-center bg-green-50 rounded-2xl border border-green-100">
                <CheckCircle2 className="w-12 h-12 text-green-500 mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">Message opened in your email app</h3>
                <p className="text-sm text-gray-500 max-w-xs">
                  If it didn&apos;t open, email us directly at{" "}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-600 font-medium">{CONTACT_EMAIL}</a>
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-6 text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Alex Johnson"
                      className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email <span className="text-red-400">*</span></label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="alex@example.com"
                      className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Message <span className="text-red-400">*</span></label>
                  <textarea
                    required
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    rows={5}
                    placeholder="Tell us what's on your mind..."
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-7 py-3 rounded-xl shadow-md shadow-blue-200 transition-colors"
                >
                  Send message <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-xs text-gray-400">
                  This opens your email client with the message pre-filled.
                </p>
              </form>
            )}
          </div>

          {/* Side info */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-gray-50 rounded-2xl p-5">
              <h3 className="font-semibold text-gray-900 text-sm mb-3">Before you write</h3>
              <ul className="space-y-2.5">
                {[
                  { href: "/blog", text: "Check our guides for how-to questions" },
                  { href: "/forgot-password", text: "Use forgot password for login issues" },
                  { href: "/dashboard/settings", text: "Manage your account in Settings" },
                ].map(({ href, text }) => (
                  <li key={href}>
                    <Link href={href} className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      <ArrowRight className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                      {text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-blue-50 rounded-2xl p-5">
              <h3 className="font-semibold text-gray-900 text-sm mb-2">Response time</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                We typically reply within <strong>24–48 hours</strong> on weekdays.
                For urgent issues, Telegram is fastest.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-6">Common questions</h2>
          <div className="space-y-3">
            {faqs.map(({ q, a }) => (
              <div key={q} className="bg-gray-50 rounded-2xl px-6 py-5">
                <h3 className="font-semibold text-gray-900 text-sm mb-2">{q}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
