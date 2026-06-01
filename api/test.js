module.exports = async function handler(req, res) {
  const token = process.env.REPLICATE_API_TOKEN;
  if (!token) return res.json({ error: "Kein Token gesetzt", token: false });

  // Test 1: Account prüfen
  const accountRes = await fetch("https://api.replicate.com/v1/account", {
    headers: { Authorization: `Bearer ${token}` }
  });
  const account = await accountRes.json();

  // Test 2: Modell-Liste abrufen
  const modelsRes = await fetch("https://api.replicate.com/v1/models/stability-ai/sdxl", {
    headers: { Authorization: `Bearer ${token}` }
  });
  const model = await modelsRes.json();

  return res.json({
    tokenPrefix: token.substring(0, 8) + "...",
    accountStatus: accountRes.status,
    account,
    modelStatus: modelsRes.status,
    model
  });
};
