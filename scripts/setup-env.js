const fs = require('fs');
const path = require('path');

const envPath = path.resolve(__dirname, '../.env.local');

// 🔒 Credenciais do Supabase
const envContent = `
NEXT_PUBLIC_SUPABASE_URL=https://ccqtppftmfdxrtjaript.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjcXRwcGZ0bWZkeHJ0amFyaXB0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyMDUxNTksImV4cCI6MjA2ODc4MTE1OX0.IyKIr0pKMcNs2f26FYOhde5dbUovAqRmxC511BnTnBY
`.trim();

fs.writeFileSync(envPath, envContent);
console.log('.env.local criado com sucesso!');
