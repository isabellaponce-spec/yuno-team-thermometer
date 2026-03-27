-- Thermometer survey responses
CREATE TABLE IF NOT EXISTS thermometer_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  team TEXT NOT NULL,
  custom_team TEXT,
  direction INTEGER CHECK (direction BETWEEN 1 AND 5),
  accountability INTEGER CHECK (accountability BETWEEN 1 AND 5),
  motivation INTEGER CHECK (motivation BETWEEN 1 AND 5),
  external_orientation INTEGER CHECK (external_orientation BETWEEN 1 AND 5),
  innovation_learning INTEGER CHECK (innovation_learning BETWEEN 1 AND 5),
  team_dynamics_trust INTEGER CHECK (team_dynamics_trust BETWEEN 1 AND 5),
  leadership INTEGER CHECK (leadership BETWEEN 1 AND 5),
  mentorship INTEGER CHECK (mentorship BETWEEN 1 AND 5),
  apprenticeship INTEGER CHECK (apprenticeship BETWEEN 1 AND 5),
  open_feedback TEXT,
  concern_name TEXT,
  concern_text TEXT
);

CREATE INDEX IF NOT EXISTS thermo_created_idx ON thermometer_responses (created_at DESC);

ALTER TABLE thermometer_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous insert" ON thermometer_responses
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Service role full access" ON thermometer_responses
  FOR ALL TO service_role USING (true) WITH CHECK (true);
