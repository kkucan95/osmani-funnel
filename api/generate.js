const PROMPTS = {
  garden: "Keep the house, garage, walls, sky, and all existing structures exactly unchanged. Only transform the bare or neglected garden ground into a professionally landscaped front garden with a neat trimmed green lawn and a straight stone paving path leading to the entrance. Do NOT change the driveway surface. Real photo, photorealistic.",
  driveway: "Keep the house, garage, brick walls, trees, bushes, sky, and all surroundings exactly unchanged. Replace ONLY the damaged broken ground and rubble in the foreground with professional rectangular grey concrete paving stones (Pflastersteine) laid in a clean straight pattern, exactly like a real paved German driveway. Do NOT add grass or lawn to the driveway area. The result must look like a real photograph after professional paving work.",
  outdoor: "Keep the house, walls, trees, sky, and all structures exactly unchanged. Replace ONLY the bare ground area with a professionally paved terrace using large natural stone slabs in a clean pattern with dark border stones. Do NOT add grass to the paved area. Real photo, photorealistic."
};

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { image, style } = req.body || {};
  if (!image || !style) return res.status(400).json({ error: "Fehlende Parameter" });

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "API nicht konfiguriert" });

  try {
    const prompt = PROMPTS[style] || PROMPTS.driveway;

    // Convert base64 data URI to Buffer
    const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
    const mimeType = image.match(/^data:([^;]+);base64,/)?.[1] || "image/jpeg";
    const imageBuffer = Buffer.from(base64Data, "base64");

    const formData = new FormData();
    const blob = new Blob([imageBuffer], { type: mimeType });
    formData.append("image[]", blob, "photo.jpg");
    formData.append("prompt", prompt);
    formData.append("model", "gpt-image-1");
    formData.append("n", "1");
    formData.append("size", "auto");
    formData.append("quality", "medium");

    const response = await fetch("https://api.openai.com/v1/images/edits", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}` },
      body: formData
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("OpenAI API error:", response.status, errText);
      return res.status(500).json({ error: `OpenAI ${response.status}: ${errText}` });
    }

    const data = await response.json();

    if (data.data && data.data[0]) {
      const item = data.data[0];
      const imageUrl = item.url || `data:image/png;base64,${item.b64_json}`;
      return res.json({ imageUrl, status: "succeeded" });
    }

    throw new Error("Keine Bilddaten erhalten");

  } catch (err) {
    console.error("Generate handler error:", err);
    return res.status(500).json({ error: err.message || "Verbindungsfehler" });
  }
};
