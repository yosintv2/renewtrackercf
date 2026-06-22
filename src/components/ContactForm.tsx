import { useState } from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";

const CONTACT_EMAIL = "hello@renewtracker.net";

export default function ContactForm() {
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

  if (sent) {
    return (
      <div class="flex flex-col items-center justify-center py-14 text-center bg-green-50 rounded-2xl border border-green-100">
        <CheckCircle2 class="w-12 h-12 text-green-500 mb-4" />
        <h3 class="font-bold text-gray-900 mb-2">Message opened in your email app</h3>
        <p class="text-sm text-gray-500 max-w-xs">
          If it didn&apos;t open, email us directly at{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} class="text-blue-600 font-medium">{CONTACT_EMAIL}</a>
        </p>
        <button onClick={() => setSent(false)} class="mt-6 text-sm font-semibold text-blue-600 hover:text-blue-700">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} class="space-y-4">
      <div class="grid sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1.5">Name</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Alex Johnson"
            class="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-colors"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1.5">Email <span class="text-red-400">*</span></label>
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="alex@example.com"
            class="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-colors"
          />
        </div>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1.5">Message <span class="text-red-400">*</span></label>
        <textarea
          required
          value={message}
          onChange={e => setMessage(e.target.value)}
          rows={5}
          placeholder="Tell us what's on your mind..."
          class="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-colors resize-none"
        />
      </div>
      <button
        type="submit"
        class="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-7 py-3 rounded-xl shadow-md shadow-blue-200 transition-colors"
      >
        Send message <ArrowRight class="w-4 h-4" />
      </button>
      <p class="text-xs text-gray-400">
        This opens your email client with the message pre-filled.
      </p>
    </form>
  );
}
