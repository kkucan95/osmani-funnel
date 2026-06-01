module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  const { id } = req.query;
  if (!id) return res.status(400).json({ error: "Fehlende Prediction-ID" });

  const token = process.env.REPLICATE_API_TOKEN;
  if (!token) return res.status(500).json({ error: "API nicht konfiguriert" });

  try {
    const response = await fetch(`https://api.replicate.com/v1/predictions/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!response.ok) {
      return res.status(500).json({ error: "Status nicht abrufbar" });
    }

    const prediction = await response.json();

    if (prediction.status === "succeeded" && prediction.output) {
      const url = Array.isArray(prediction.output) ? prediction.output[0] : prediction.output;
      return res.json({ imageUrl: url, status: "succeeded" });
    }

    if (prediction.status === "failed") {
      return res.json({ status: "failed", error: prediction.error || "Generierung fehlgeschlagen" });
    }

    return res.json({ status: prediction.status });

  } catch (err) {
    console.error("Poll handler error:", err);
    return res.status(500).json({ error: "Verbindungsfehler" });
  }
};
