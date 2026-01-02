-- Add like_count column to projects table
-- Run this in Supabase SQL Editor

ALTER TABLE projects ADD COLUMN IF NOT EXISTS like_count INTEGER DEFAULT 0;

-- Allow public to update like_count
DROP POLICY IF EXISTS "Allow public like update" ON projects;
CREATE POLICY "Allow public like update" ON projects 
FOR UPDATE USING (true) WITH CHECK (true);
