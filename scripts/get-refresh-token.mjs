/**
 * Run with: node scripts/get-refresh-token.mjs
 */
import http from "http";
import { readFileSync } from "fs";
import { resolve } from "path";

// Load .env.local
let CLIENT_ID = "";
let CLIENT_SECRET = "";
try {
  const env = readFileSync(resolve(process.cwd(), ".env.local"), "utf-8");
  for (const line of env.split("\n")) {
    const [key, ...rest] = line.split("=");
    const val = rest.join("=").trim();
    if (key?.trim() === "SPOTIFY_CLIENT_ID") CLIENT_ID = val;
    if (key?.trim() === "SPOTIFY_CLIENT_SECRET") CLIENT_SECRET = val;
  }
} catch {}

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error("❌  Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET in .env.local first");
  process.exit(1);
}

const PORT = 8888;
const REDIRECT_URI = `http://localhost:${PORT}/callback`;
const SCOPE = "user-read-currently-playing user-top-read";

const params = new URLSearchParams({
  client_id: CLIENT_ID,
  response_type: "code",
  redirect_uri: REDIRECT_URI,
  scope: SCOPE,
});

const authURL = `https://accounts.spotify.com/authorize?${params.toString()}`;

console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("  Step 1: Add this Redirect URI to your Spotify app:");
console.log(`\n    http://localhost:${PORT}/callback\n`);
console.log("  (Dashboard → your app → Edit → Redirect URIs → Save)");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
console.log("  Step 2: Copy and paste this URL into your browser:\n");
console.log(`  ${authURL}\n`);
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
console.log(`  Waiting for callback on port ${PORT}...`);

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  if (url.pathname !== "/callback") { res.end(); return; }

  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");

  if (error || !code) {
    res.end(`<h2>Error: ${error ?? "no code returned"}</h2>`);
    server.close();
    return;
  }

  const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64"),
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: REDIRECT_URI,
    }).toString(),
  });

  const data = await tokenRes.json();

  if (data.refresh_token) {
    console.log("\n✅  Add this to your .env.local:\n");
    console.log(`SPOTIFY_REFRESH_TOKEN=${data.refresh_token}\n`);
    res.end("<h2 style='font-family:sans-serif;color:green'>✅ Done! Check your terminal for the REFRESH_TOKEN.</h2>");
  } else {
    console.error("❌  Failed:", JSON.stringify(data, null, 2));
    res.end(`<pre>${JSON.stringify(data, null, 2)}</pre>`);
  }

  server.close();
});

server.listen(PORT);
