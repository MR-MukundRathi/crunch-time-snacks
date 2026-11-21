import { put, head } from "@vercel/blob";

const PATH = "today.json";
const EMPTY = { date: null, items: {}, note: "", closed: false, updatedAt: null };
const istDate = () => new Date(Date.now() + 5.5 * 3600e3).toISOString().slice(0, 10);

async function readState() {
  try {
    const meta = await head(PATH);
    const r = await fetch(`${meta.url}?t=${Date.now()}`, { cache: "no-store" });
    if (!r.ok) return EMPTY;
    return { ...EMPTY, ...(await r.json()) };
  } catch {
    return EMPTY; // nothing saved yet
  }
}

function parseBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  try { return JSON.parse(req.body || "{}"); } catch { return {}; }
}

export default async function handler(req, res) {
  if (req.method === "GET") {
    res.setHeader("Cache-Control", "public, s-maxage=10, stale-while-revalidate=30");
    return res.status(200).json(await readState());
  }
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  res.setHeader("Cache-Control", "no-store");
  const body = parseBody(req);
  const pass = process.env.ADMIN_PASSCODE;
  if (!pass || String(body.passcode || "") !== pass) {
    await new Promise(r => setTimeout(r, 800)); // slow down guessing
    return res.status(401).json({ error: "Wrong passcode" });
  }
  if (body.check) return res.status(200).json({ ok: true, state: await readState() });

  const s = body.state || {};
  const items = {};
  for (const [k, v] of Object.entries(s.items || {})) {
    if (/^[a-z0-9-]{1,40}$/.test(k) && (v === "today" || v === "off")) items[k] = v;
  }
  const state = {
    date: istDate(),
    items,
    note: String(s.note || "").slice(0, 160),
    closed: !!s.closed,
    updatedAt: new Date().toISOString(),
  };
  await put(PATH, JSON.stringify(state), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 60,
  });
  return res.status(200).json({ ok: true, state });
}
