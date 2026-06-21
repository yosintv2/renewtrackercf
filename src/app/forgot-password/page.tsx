"use client";

import Link from "next/link";
import { useState } from "react";
import { Shield, ArrowLeft, Mail, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
    });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSent(true);
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-10 max-w-md w-full text-center">
          <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-7 h-7 text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Check your inbox</h2>
          <p className="text-gray-500 text-sm mb-6">
            We sent a password reset link to <strong>{email}</strong>. Click the link in the email to set a new password.
          </p>
          <p className="text-xs text-gray-400 mb-6">
            Didn&apos;t get it? Check your spam folder, or{" "}
            <button
              onClick={() => setSent(false)}
              className="text-blue-600 hover:underline font-medium"
            >
              try again
            </button>
            .
          </p>
          <Link href="/login" className="text-blue-600 text-sm font-medium hover:underline">
            Back to sign in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 font-bold text-xl mb-2">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-gray-900">
              Renew<span className="text-blue-600">Tracker</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-4">Forgot your password?</h1>
          <p className="text-gray-500 text-sm mt-1">
            Enter your email and we&apos;ll send you a reset link.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
          {error && (
            <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-5 text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="mt-1.5 h-11 border-gray-200"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl"
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin mr-2" />Sending...</>
              ) : (
                <><Mail className="w-4 h-4 mr-2" />Send reset link</>
              )}
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-blue-600 font-medium hover:text-blue-700"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
