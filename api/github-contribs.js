// Vercel Serverless Function: /api/github-contribs
// Expects env var GITHUB_TOKEN to be set in Vercel project settings.
const GRAPHQL = `query($login:String!,$from:DateTime!,$to:DateTime!){
  user(login: $login) {
    contributionsCollection(from: $from, to: $to) {
      contributionCalendar {
        weeks {
          contributionDays {
            date
            contributionCount
          }
        }
      }
    }
  }
}`;

export default async function handler(req, res) {
  const username = String(req.query.user || 'anubhavbaghel');
  const to = req.query.to || new Date().toISOString();
  const from = req.query.from || new Date(Date.now() - 365 * 24 * 3600 * 1000).toISOString();

  const body = JSON.stringify({ query: GRAPHQL, variables: { login: username, from, to } });

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    res.status(500).json({ error: 'Missing server GITHUB_TOKEN' });
    return;
  }

  try {
    const r = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `bearer ${token}` },
      body,
    });
    const json = await r.json();
    const weeks = json?.data?.user?.contributionsCollection?.contributionCalendar?.weeks || [];
    const days = [];
    weeks.forEach((w) => w.contributionDays.forEach((d) => days.push({ date: d.date, count: d.contributionCount })));
    // sort ascending
    days.sort((a, b) => a.date.localeCompare(b.date));
    // cache headers (client may cache for 10 minutes)
    res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=300');
    res.status(200).json(days);
  } catch (err) {
    console.error('github-contribs error', err);
    res.status(500).json({ error: 'Failed to fetch contributions' });
  }
}
