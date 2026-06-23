CREATE TABLE IF NOT EXISTS payment_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  subscription_id UUID REFERENCES subscriptions(id) ON DELETE SET NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'other',
  amount_paid DECIMAL(10,2) NOT NULL,
  paid_date DATE NOT NULL DEFAULT CURRENT_DATE,
  billing_cycle TEXT NOT NULL,
  next_billing_date_after DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE payment_history ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own payment history" ON payment_history;
DROP POLICY IF EXISTS "Users can insert own payment history" ON payment_history;

CREATE POLICY "Users can view own payment history"
  ON payment_history FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own payment history"
  ON payment_history FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX idx_payment_history_subscription ON payment_history(subscription_id);
CREATE INDEX idx_payment_history_user ON payment_history(user_id);

-- Allow "once" as a billing cycle value
ALTER TABLE subscriptions DROP CONSTRAINT IF EXISTS subscriptions_billing_cycle_check;
ALTER TABLE subscriptions ADD CONSTRAINT subscriptions_billing_cycle_check
  CHECK (billing_cycle IN ('once', 'monthly', 'yearly', 'weekly', 'quarterly'));
