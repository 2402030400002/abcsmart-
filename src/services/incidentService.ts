import { CommunityIncidentReport } from "../types";

const LOCAL_INCIDENTS_KEY = "smartsafar_local_incidents";

export async function fetchCommunityIncidents(): Promise<CommunityIncidentReport[]> {
  try {
    const res = await fetch("/api/incidents");
    if (res.ok) {
      const data = await res.json();
      if (data.incidents && Array.isArray(data.incidents)) {
        return data.incidents;
      }
    }
  } catch (err) {
    console.warn("Could not fetch incidents from server, checking local storage:", err);
  }

  // Local storage fallback
  try {
    const stored = localStorage.getItem(LOCAL_INCIDENTS_KEY) || localStorage.getItem("safekashmir_local_incidents");
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {}

  // Return base default list
  return [
    {
      id: "inc-1",
      type: "Road blockage",
      location: "Tangmarg - Gulmarg Highway near Drung turn",
      description: "Minor slush cleared by snow plows. Chains advised for non-4x4 vehicles.",
      dateTime: "Today, 2 hours ago",
      status: "verified",
      votes: 14,
      reportedBy: "Adil R. (Local Driver)"
    },
    {
      id: "inc-2",
      type: "Scam",
      location: "Gulmarg Parking Area 1",
      description: "Unauthorized guides claiming Gondola tickets are sold out. Official counter is working normally.",
      dateTime: "Today, 5 hours ago",
      status: "verified",
      votes: 28,
      reportedBy: "Rohit S. (Tourist)"
    },
    {
      id: "inc-3",
      type: "Medical issue",
      location: "Pahalgam Betaab Valley Gate",
      description: "Tourist first-aid kiosk equipped with portable oxygen cylinders is operational.",
      dateTime: "Today, 12 hours ago",
      status: "verified",
      votes: 9,
      reportedBy: "Pahalgam Tourist Helpdesk"
    }
  ];
}

export async function submitCommunityIncident(incident: {
  type: string;
  location: string;
  description: string;
  imageUrl?: string;
  reportedBy?: string;
}): Promise<{ success: boolean; incident: CommunityIncidentReport }> {
  try {
    const res = await fetch("/api/incidents", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(incident),
    });
    if (res.ok) {
      const data = await res.json();
      return { success: true, incident: data.incident };
    }
  } catch (err) {
    console.warn("Could not post incident to backend, storing locally:", err);
  }

  // Fallback to local storage
  const newReport: CommunityIncidentReport = {
    id: `inc-local-${Date.now()}`,
    type: incident.type as any,
    location: incident.location,
    description: incident.description,
    dateTime: "Just now",
    imageUrl: incident.imageUrl,
    status: "investigating",
    votes: 1,
    reportedBy: incident.reportedBy || "You (Verified Traveler)"
  };

  try {
    const current = await fetchCommunityIncidents();
    const updated = [newReport, ...current];
    localStorage.setItem(LOCAL_INCIDENTS_KEY, JSON.stringify(updated));
  } catch {}

  return { success: true, incident: newReport };
}

export async function upvoteIncident(id: string): Promise<number> {
  try {
    const res = await fetch(`/api/incidents/${id}/vote`, { method: "POST" });
    if (res.ok) {
      const data = await res.json();
      return data.votes;
    }
  } catch {}
  return 1;
}
