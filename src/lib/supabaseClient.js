import { createClient } from '@supabase/auth-helpers-sveltekit'
import { env } from '$env/dynamic/public'

export const supabase = createClient("https://ipaqrvhfctbnkpnzvbcd.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlwYXFydmhmY3Ribmtwbnp2YmNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzA2MzY2NjIsImV4cCI6MTk4NjIxMjY2Mn0.MpRw20CU4pr6dmDrP8GEM7Dgm4HRs8P6l0zIorHXroc")