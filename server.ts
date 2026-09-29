import express, { Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// In-memory store for community incident reports
const communityIncidents: Array<{
  id: string;
  type: string;
  location: string;
  description: string;
  dateTime: string;
  imageUrl?: string;
  status: "verified" | "investigating" | "resolved";
  votes: number;
  reportedBy: string;
}> = [
  {
    id: "inc-1",
    type: "Road blockage",
    location: "Near Drung Waterfall turn, Tangmarg",
    description: "Minor landslide cleared on one lane. Traffic moving slowly. Snow chains recommended.",
    dateTime: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    status: "verified",
    votes: 14,
    reportedBy: "Adil R. (Local Driver)"
  },
  {
    id: "inc-2",
    type: "Scam",
    location: "Gulmarg Parking Area 1",
    description: "Unauthorized guides claiming Gondola tickets are sold out and charging 4x price. Official ticket counter is open.",
    dateTime: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
    status: "verified",
    votes: 28,
    reportedBy: "Rohit S. (Tourist)"
  },
  {
    id: "inc-3",
    type: "Medical issue",
    location: "Pahalgam Betaab Valley Gate",
    description: "First aid center equipped with portable oxygen cylinders is operational near the ticket booth.",
    dateTime: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
    status: "verified",
    votes: 9,
    reportedBy: "Pahalgam Tourist Desk"
  }
];

// Lazy Gemini client helper
let geminiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!geminiClient && process.env.GEMINI_API_KEY) {
    try {
      geminiClient = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    } catch (err) {
      console.warn("Failed to initialize Gemini client:", err);
      geminiClient = null;
    }
  }
  return geminiClient;
}

// API: Health check
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    app: "SmartSafar API",
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY),
    timestamp: new Date().toISOString(),
  });
});

// API: AI Chat Assistant
app.post("/api/ai/chat", async (req: Request, res: Response) => {
  const { message, conversationHistory = [] } = req.body;

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "A message string is required." });
  }

  const ai = getGeminiClient();

  const systemInstruction = `You are "SmartSafar AI", an expert, friendly, and safety-first tourist guide for Jammu & Kashmir, India.
Key Responsibilities:
1. Provide accurate travel advice for destinations like Srinagar, Gulmarg, Pahalgam, Sonamarg, Doodhpathri, Yusmarg, Gurez Valley, Jammu, Patnitop, and Ladakh.
2. Emphasize safety: road conditions, altitude acclimatization, winter gear, prepaid taxi rates, official Gondola ticket rules (jammukashmircablecar.com), and emergency hotlines (112, Police Control Room 0194-2455512).
3. Alert users against common tourist scams (e.g., unauthorized guides, fake saffron/pashmina, taxi overcharging, fake snow boots rental).
4. Provide respectful cultural tips (Kashmiri traditions, clothing etiquette, eco-tourism at Dal Lake).
5. Always offer practical, actionable steps. If there's an emergency, immediately provide the 112 hotline.
Format your responses clearly with friendly formatting and concise bullet points.`;

  if (ai) {
    try {
      // Build conversation context
      const formattedHistory = conversationHistory
        .filter((item: { role: string; content: string }) => item.role && item.content)
        .map((item: { role: string; content: string }) => `${item.role === "user" ? "User" : "Assistant"}: ${item.content}`)
        .join("\n\n");

      const prompt = `${formattedHistory ? `Conversation History:\n${formattedHistory}\n\n` : ""}User: ${message}\n\nRespond as SmartSafar AI:`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const responseText = response.text || "I apologize, but I could not generate a response. Please check your network and try again.";
      return res.json({ reply: responseText, source: "gemini" });
    } catch (err: any) {
      console.error("Gemini API error, falling back to smart local response:", err);
    }
  }

  // Fallback smart rule-based AI engine
  const lower = message.toLowerCase();
  let smartReply = "";

  if (lower.includes("gondola") || lower.includes("gulmarg")) {
    smartReply = `**Gulmarg Gondola & Travel Guide:**\n\n- **Official Booking:** Always book tickets online ONLY via the official J&K Cable Car website (*jammukashmircablecar.com*). Never purchase from touts or unofficial agents.\n- **Phases:** Phase 1 (Kongdoori - 8,530 ft) and Phase 2 (Apharwat Peak - 12,293 ft).\n- **Winter Safety:** Phase 2 can have sudden sub-zero blizzards. Wear thermal layers, windproof jackets, and waterproof boots with grip.\n- **Prepaid Taxis:** From Tangmarg to Gulmarg, standard prepaid government taxi rates apply. Avoid paying unauthorized surcharges.\n- **Medical Advisory:** Apharwat is at high altitude. Take deep breaths and avoid overexertion if you have asthma or heart conditions.`;
  } else if (lower.includes("emergency") || lower.includes("help") || lower.includes("police") || lower.includes("hospital")) {
    smartReply = `🚨 **Emergency Assistance in Jammu & Kashmir:**\n\n- **Unified Emergency Hotline:** Dial **112** (Police, Fire, Ambulance)\n- **Tourist Police Srinagar:** Dial **+91-194-2455512**\n- **SMHS Hospital Srinagar:** 0194-2504114\n- **SKIMS Medical Emergency:** 0194-2401013\n- **Women's Safety Helpline:** Dial **181**\n- **Disaster Management J&K:** 0194-2475494\n\n*If you are in immediate danger, use the SmartSafar SOS feature on the navigation bar to activate live assistance protocol.*`;
  } else if (lower.includes("scam") || lower.includes("cheat") || lower.includes("rate") || lower.includes("price") || lower.includes("saffron") || lower.includes("pashmina")) {
    smartReply = `🛡️ **SmartSafar Anti-Scam Advisory:**\n\n1. **Pashmina & Saffron:** Buy only from government-certified outlets (JK Govt Arts Emporium) with GI (Geographical Indication) tags. Avoid roadside hawkers offering 'cheap pure pashmina'.\n2. **Shikara Rides:** Fix the rate beforehand based on the government rate chart displayed at Dal Lake Ghats (approx. ₹700–₹1,000/hour for standard shikara).\n3. **Pony/Horse Rides (Pahalgam & Gulmarg):** Use official Prepaid Pony Counters established by the Tourism Department.\n4. **Prepaid Taxis:** Check the J&K Tourist Taxi Union fixed rate booklet available at TRC Srinagar and airport counters.`;
  } else if (lower.includes("itinerary") || lower.includes("plan") || lower.includes("3 days") || lower.includes("4 days") || lower.includes("5 days") || lower.includes("7 days")) {
    smartReply = `🏔️ **Recommended 5-Day Kashmir Highlights Itinerary:**\n\n- **Day 1: Srinagar Arrival** - Check-in at Dal Lake houseboat/hotel, Shikara sunset ride, Mughal Gardens (Nishat & Shalimar Bagh), dinner with authentic Wazwan.\n- **Day 2: Gulmarg Day Excursion** - Morning drive (1.5 hrs), Gondola ride to Phase 1 & 2, snow activities / golf course, evening return to Srinagar.\n- **Day 3: Pahalgam (Valley of Shepherds)** - Scenic drive along saffron fields of Pampore & Avantipur ruins. Visit Betaab Valley, Aru Valley & Chandanwari.\n- **Day 4: Sonamarg (Meadow of Gold)** - Sindh River drive, Thajiwas Glacier trek or sledge ride, Zero Point (if open).\n- **Day 5: Old City Srinagar & Departure** - Jamia Masjid, Rozabal, Jamia market for authentic walnut wood & copperware, transfer to Sheikh ul-Alam Airport (reach 3 hrs early).`;
  } else if (lower.includes("road") || lower.includes("highway") || lower.includes("traffic") || lower.includes("nh44")) {
    smartReply = `🛣️ **Jammu & Kashmir Highway Status & Travel Rules:**\n\n- **NH-44 (Jammu-Srinagar Highway):** Subject to one-way traffic regulations and landslide clearances in Ramban sector. Always check before starting.\n- **Mughal Road (Shopian-Poonch):** Open for light vehicles during daylight hours; closed during heavy snowfall.\n- **Zojila Pass (Sonamarg-Leh):** Strict one-way convoy timings monitored by Traffic Police.\n- **Safe Driving:** Carry snow chains during November–March for Tangmarg-Gulmarg and Sonamarg climbs. Keep fuel tank above half.`;
  } else {
    smartReply = `Thank you for consulting SmartSafar AI! 

Jammu & Kashmir is known as 'Paradise on Earth' with breathtaking valleys, ancient heritage, and warm hospitality.

**Quick Recommendations for Your Trip:**
- **Top Safe Destinations:** Srinagar, Gulmarg, Pahalgam, Sonamarg, Doodhpathri, Yusmarg, and Gurez.
- **Connectivity:** Only Postpaid/eSIM mobile connections from outside J&K work smoothly (Jio, Airtel, BSNL). Prepaid non-J&K SIMs are restricted by national telecom regulations.
- **Safety Preparedness:** Keep emergency numbers (112, 181) and download offline maps before heading to remote mountain passes.

Feel free to ask about specific itineraries, budget planning, weather, local Kashmiri cuisine, or road conditions!`;
  }

  return res.json({ reply: smartReply, source: "knowledge_engine" });
});

// API: AI Trip Planner Generator
app.post("/api/ai/trip-plan", async (req: Request, res: Response) => {
  const { startLocation, destination, days, travelers, budget, travelStyle, activities = [] } = req.body;

  const ai = getGeminiClient();

  if (ai) {
    try {
      const prompt = `Generate a comprehensive, structured travel itinerary for Jammu & Kashmir with the following parameters:
- Starting Location: ${startLocation || "Srinagar Airport"}
- Primary Destination: ${destination || "Kashmir Valley Circuit"}
- Number of Days: ${days || 5}
- Number of Travelers: ${travelers || 2}
- Estimated Total Budget: ${budget || "Moderate"}
- Travel Style: ${travelStyle || "Nature & Relaxation"}
- Preferred Activities: ${activities.join(", ") || "Sightseeing, Local Cuisine, Shikara, Gondola"}

Return a rich, realistic, day-by-day itinerary with exact timings, scenic spots, safety tips, recommended local restaurants/food, transportation advice, and budget breakdown.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
        config: {
          temperature: 0.7,
        },
      });

      if (response.text) {
        return res.json({ itineraryText: response.text, source: "gemini" });
      }
    } catch (err: any) {
      console.error("Gemini trip plan error, using structured planner engine:", err);
    }
  }

  // Structured trip planner fallback
  const planDays = Math.max(1, Math.min(14, Number(days) || 5));
  const travelerCount = Number(travelers) || 2;
  const sampleItinerary = [
    {
      day: 1,
      title: "Arrival in Srinagar & Dal Lake Charms",
      location: "Srinagar",
      activities: [
        "Arrival at Sheikh ul-Alam International Airport (SXR)",
        "Scenic transfer to Boulevard Road / Traditional Houseboat on Nigeen Lake",
        "Afternoon exploration of Mughal Gardens (Nishat Bagh & Shalimar Bagh)",
        "Sunset Shikara ride through Dal Lake floating vegetable markets and Char Chinar",
        "Authentic Kashmiri dinner: Rogan Josh, Dum Aloo, Kashmiri Pulao & Kahwa"
      ],
      safetyTips: "Reach airport with government photo ID. Keep postpaid SIM active.",
      stay: "Houseboat on Nigeen Lake or Heritage Hotel on Boulevard",
      food: "Mughal Darbar or Ahdoos Restaurant, Residency Road",
      transport: "Prepaid Tourist Taxi / Shikara"
    },
    {
      day: 2,
      title: "The Alpine Wonderland of Gulmarg",
      location: "Gulmarg",
      activities: [
        "Morning scenic drive (52 km, ~1.5 hrs) via Magam and Tangmarg pine forests",
        "Board Gulmarg Gondola Phase 1 (Kongdoori Valley at 8,530 ft)",
        "Ascend to Phase 2 (Apharwat Peak at 12,293 ft) for panoramic Himalayan vistas",
        "Visit the historic St. Mary's Church and Maharani Temple in the meadow",
        "Warm up with fresh Kashmiri Kahwa and spicy roasted corn at meadow viewpoint"
      ],
      safetyTips: "Book Gondola tickets in advance. Dress in thermal layers. Use official pony counters if riding.",
      stay: "Pine Palace Resort or Grand Mumtaz Gulmarg",
      food: "Highland Park Restaurant or Bakshi Green Restaurant",
      transport: "4x4 Snow Chain Cab from Tangmarg in winter"
    },
    {
      day: 3,
      title: "Valley of Shepherds - Pahalgam",
      location: "Pahalgam",
      activities: [
        "Drive from Srinagar to Pahalgam (95 km, ~2.5 hrs) along the Lidder River",
        "Short stop at Pampore saffron fields and Awantipora 1,100-year-old temple ruins",
        "Visit picturesque Betaab Valley (named after the Bollywood film) and Aru Valley",
        "Riverwalk along Lidder River with trout fishing views",
        "Browse local Pahalgam market for genuine Kashmiri crewel embroidery"
      ],
      safetyTips: "Carry light rain jacket and comfortable walking shoes for rocky riverbanks.",
      stay: "Hotel Heevan or Pahalgam Hotel on Lidder Banks",
      food: "Dana Pani (Pure Veg) or Trout Beat at Lidder",
      transport: "Local Pahalgam Taxi Union union-approved cab"
    },
    {
      day: 4,
      title: "Meadow of Gold - Sonamarg & Sindh Valley",
      location: "Sonamarg",
      activities: [
        "Drive to Sonamarg (80 km, ~2 hrs) through dramatic Himalayan gorges and Sindh River",
        "Trek or horse ride to the foot of the magnificent Thajiwas Glacier",
        "Snow sledge ride / ice stream photography at glacier base",
        "Visit Zero Point (subject to border pass and road clearance)",
        "Picnic by the roaring alpine Sindh riverbed"
      ],
      safetyTips: "Check road clearance for Zojila axis. Negotiate sledges with registered operators.",
      stay: "Hotel Rah Villas or return to Srinagar central stay",
      food: "Tourist Cafeteria Sonamarg or Glacier View Dhaba",
      transport: "Private tourist cab"
    },
    {
      day: 5,
      title: "Hidden Gem: Doodhpathri / Old Srinagar & Departure",
      location: "Doodhpathri & Srinagar",
      activities: [
        "Morning trip to pristine 'Valley of Milk' - Doodhpathri and Shaliganga river",
        "Visit historic Jamia Masjid Srinagar (378 wooden deodar pillars)",
        "Walk across Zaina Kadal bridge and Old Heritage Spice Bazaars",
        "Shop for authentic dry fruits (Mamra almonds, walnuts) and saffron with GI tag",
        "Airport departure transfer (arrive 3 hours prior due to security checks)"
      ],
      safetyTips: "Allow 3-4 hours buffer time for Srinagar airport security clearances.",
      stay: "Departure flight",
      food: "Chai Jaai Tea Room on the Bund, Srinagar",
      transport: "Direct Airport Cab"
    }
  ].slice(0, planDays);

  return res.json({
    plan: sampleItinerary,
    estimatedCost: `₹${(planDays * 3500 * travelerCount).toLocaleString()} - ₹${(planDays * 6500 * travelerCount).toLocaleString()}`,
    source: "local_structured_engine"
  });
});

// API: Incident Reports
app.get("/api/incidents", (_req: Request, res: Response) => {
  res.json({ incidents: communityIncidents });
});

app.post("/api/incidents", (req: Request, res: Response) => {
  const { type, location, description, imageUrl, reportedBy } = req.body;
  if (!type || !location || !description) {
    return res.status(400).json({ error: "Type, location, and description are required." });
  }

  const newIncident = {
    id: `inc-${Date.now()}`,
    type,
    location,
    description,
    dateTime: new Date().toISOString(),
    imageUrl,
    status: "investigating" as const,
    votes: 1,
    reportedBy: reportedBy || "Verified Traveler"
  };

  communityIncidents.unshift(newIncident);
  res.status(201).json({ success: true, incident: newIncident, total: communityIncidents.length });
});

// API: Incident Upvote
app.post("/api/incidents/:id/vote", (req: Request, res: Response) => {
  const { id } = req.params;
  const incident = communityIncidents.find((i) => i.id === id);
  if (incident) {
    incident.votes += 1;
    return res.json({ success: true, votes: incident.votes });
  }
  res.status(404).json({ error: "Incident not found" });
});

async function startServer() {
  try {
    if (process.env.NODE_ENV !== "production") {
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: "spa",
      });
      app.use(vite.middlewares);
    } else {
      const distPath = path.join(process.cwd(), "dist");
      app.use(express.static(distPath));
      app.get("*", (_req: Request, res: Response) => {
        res.sendFile(path.join(distPath, "index.html"));
      });
    }

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`SmartSafar Server running on http://0.0.0.0:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
