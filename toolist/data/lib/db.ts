import { createClient } from "@supabase/supabase-js";
 const supabaseUrl = "https://omvqdpkddcpxooehfdre.supabase.co";
 const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9tdnFkcGtkZGNweG9vZWhmZHJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkwNzU0NDksImV4cCI6MjA1NDY1MTQ0OX0.Iou-J2AyCiQSh2SaVnQVgTvedex7rk0wfx0eBlASaG8";
 export const supabase = createClient(supabaseUrl, supabaseKey);