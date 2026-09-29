export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  source?: "gemini" | "knowledge_engine" | "offline";
}

export async function sendChatMessage(
  message: string,
  history: Array<{ role: string; content: string }> = []
): Promise<{ reply: string; source: string }> {
  try {
    const res = await fetch("/api/ai/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, conversationHistory: history }),
    });

    if (!res.ok) {
      throw new Error(`Server returned ${res.status}`);
    }

    const data = await res.json();
    return {
      reply: data.reply || "I am here to help you navigate Jammu & Kashmir safely.",
      source: data.source || "gemini",
    };
  } catch (err) {
    console.warn("AI API request failed, using intelligent offline response:", err);
    return {
      reply: getLocalFallbackReply(message),
      source: "offline_knowledge",
    };
  }
}

export async function generateTripPlan(params: {
  startLocation: string;
  destination: string;
  days: number;
  travelers: number;
  budget: string;
  travelStyle: string;
  activities: string[];
}): Promise<{ itineraryText?: string; plan?: any[]; estimatedCost: string; source: string }> {
  try {
    const res = await fetch("/api/ai/trip-plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });

    if (!res.ok) throw new Error("Plan generator failed");
    return await res.json();
  } catch (err) {
    console.warn("Trip plan API failed, using fallback plan generator:", err);
    return {
      estimatedCost: `₹${(params.days * 4000 * params.travelers).toLocaleString()} - ₹${(params.days * 7500 * params.travelers).toLocaleString()}`,
      source: "offline_fallback",
      plan: [
        {
          day: 1,
          title: "Welcome to Kashmir Valley & Dal Lake Experience",
          location: "Srinagar",
          activities: [
            "Arrival and check-in to traditional lakefront stay",
            "Mughal Gardens visit (Nishat & Shalimar)",
            "Sunset Shikara ride at Dal Lake",
            "Dinner with Kashmiri Wazwan or vegetarian delicacies"
          ],
          safetyTips: "Verify prepaid taxi rates at airport counters. Keep postpaid SIM active.",
          stay: "Nigeen Lake Houseboat or Boulevard Hotel",
          food: "Ahdoos or Mughal Darbar",
          transport: "Prepaid Tourist Taxi"
        },
        {
          day: 2,
          title: "Alpine Adventure in Gulmarg",
          location: "Gulmarg",
          activities: [
            "Drive to Gulmarg via Tangmarg pine forests",
            "Gulmarg Gondola Phase 1 & 2 Ascent to Apharwat Peak",
            "Snow sledging, skiing, or meadow walks",
            "Visit Maharani Temple and historic St. Mary's Church"
          ],
          safetyTips: "Only book Gondola via official portal. Wear insulated waterproof boots.",
          stay: "Pine Palace Resort or Highland Park",
          food: "Highland Park Restaurant",
          transport: "4x4 snow chain cab from Tangmarg"
        },
        {
          day: 3,
          title: "Idyllic Meadows of Pahalgam",
          location: "Pahalgam",
          activities: [
            "Scenic drive along Lidder river with stop at Pampore saffron fields",
            "Explore Betaab Valley and Aru Valley",
            "Riverbank stroll and local handicraft browsing"
          ],
          safetyTips: "Use official Prepaid Pony Counter at Pahalgam Club.",
          stay: "Lidder Riverfront Hotel",
          food: "Trout Beat Pahalgam",
          transport: "Union Registered Tourist Cab"
        }
      ].slice(0, params.days)
    };
  }
}

function getLocalFallbackReply(msg: string): string {
  const q = msg.toLowerCase();
  if (q.includes("sos") || q.includes("police") || q.includes("emergency") || q.includes("hospital")) {
    return "🚨 **Jammu & Kashmir Emergency Helplines:**\n- All-in-one Emergency: **112**\n- Tourist Police Srinagar: **+91-194-2455512**\n- Women Helpline: **181**\n- Medical Emergency / Ambulance: **108**\n- SMHS Hospital Emergency: **0194-2504114**\n\nActivate the red SOS button on top for live assistance protocol.";
  }
  if (q.includes("gondola") || q.includes("gulmarg")) {
    return "🚠 **Gulmarg Gondola Safety Rules:**\n- Official Tickets ONLY: *jammukashmircablecar.com*\n- Phase 1 (8,530 ft) and Phase 2 (12,293 ft Apharwat Peak).\n- Never buy printed passes from touts in parking areas.\n- Layer your clothing with windproof outer shells and thermal gloves.";
  }
  if (q.includes("taxi") || q.includes("rate") || q.includes("cost") || q.includes("shikara")) {
    return "🚕 **Kashmir Fair Pricing Guide:**\n- **Shikara Rides:** Govt rate chart is approx ₹700–₹1,000/hour at Dal Lake.\n- **Pahalgam Ponies:** Only book via official Prepaid Pony Counter at Pahalgam Club.\n- **Taxis:** Refer to TRC Tourist Taxi Union fixed rate booklet.";
  }
  return "Welcome to SmartSafar AI! How can I assist you with your trip to Srinagar, Gulmarg, Pahalgam, Sonamarg, Doodhpathri, or Gurez? Feel free to ask for safety tips, weather advisories, fair price checks, or day-by-day itineraries.";
}
