import {
  Destination,
  RoadStatusItem,
  EmergencyContactItem,
  ServiceFacility,
  ScamAlertItem,
  TranslationPhrase,
  TrekkingRouteItem,
  HotelStayItem,
  WeatherAlertItem,
  CommunityIncidentReport,
  WeatherItem
} from "../types";

export const DESTINATIONS_DATA: Destination[] = [
  {
    id: "srinagar",
    name: "Srinagar",
    kashmiriName: "سرینگر",
    tagline: "The Venice of the East & Summer Capital",
    description: "Nestled in the heart of the Kashmir Valley, Srinagar is famous for its serene Dal Lake, charming houseboats, vibrant floating flower markets, and historic Mughal terraced gardens dating back to Emperor Jahangir.",
    region: "Kashmir Valley",
    district: "Srinagar",
    altitude: "1,585 m (5,200 ft)",
    bestTime: "April to October (Gardens & Lakes), Dec to Feb (Snow)",
    safetyLevel: "Safe & Open",
    safetyScore: 98,
    imageUrl: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=80",
    tags: ["Nature", "Culture", "Family", "Religious", "Budget"],
    attractions: [
      "Dal Lake & Shikara Sunset Cruising",
      "Nishat Bagh, Shalimar Bagh & Chashme Shahi",
      "Pari Mahal (Palace of Fairies)",
      "Shankaracharya Temple atop Gopadari Hill",
      "Hazratbal Shrine on Nigeen Lake",
      "Old City Heritage Walk (Jamia Masjid & Khanqah-e-Moula)"
    ],
    thingsToAvoid: [
      "Avoid purchasing 'pashmina' from unregistered lakeside hawkers without GI certification.",
      "Do not step into shikaras without pre-negotiating or confirming standard government rates.",
      "Avoid traveling to remote outskirts late at night without an authorized tourist cab."
    ],
    localTips: [
      "Experience dawn at the Dal Lake Floating Vegetable Market around 5:30 AM.",
      "Sip authentic Kahwa with crushed saffron and almonds at Chai Jaai on the Bund.",
      "Keep your postpaid SIM active (Jio, Airtel, BSNL postpaid work seamlessly across J&K)."
    ],
    estimatedDailyBudget: {
      budget: 2500,
      moderate: 5000,
      luxury: 12000
    },
    nearbyHospitals: ["SMHS Hospital, Karan Nagar", "SKIMS, Soura", "Khyber Medical Institute, Khayam"],
    nearestPoliceStation: "Tourist Police Station, TRC Complex (0194-2455512)",
    distanceFromSrinagarKm: 0,
    coordinates: { lat: 34.0837, lng: 74.7973 }
  },
  {
    id: "gulmarg",
    name: "Gulmarg",
    kashmiriName: "گلمرگ",
    tagline: "Meadow of Flowers & Asia's Premier Ski Haven",
    description: "A world-renowned winter sports hub and summer alpine meadow, Gulmarg features the second-highest operational cable car in the world (Gulmarg Gondola reaching 12,293 ft at Apharwat Peak) and lush meadows framed by the Pir Panjal mountain range.",
    region: "Kashmir Valley",
    district: "Baramulla",
    altitude: "2,650 m (8,694 ft)",
    bestTime: "Dec to March (Skiing & Powder Snow), May to Sep (Lush Green Meadows)",
    safetyLevel: "Safe & Open",
    safetyScore: 96,
    imageUrl: "https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=1200&q=80",
    tags: ["Adventure", "Nature", "Family", "Winter Snow"],
    attractions: [
      "Gulmarg Gondola (Phase 1 Kongdoori & Phase 2 Apharwat Peak)",
      "Alpather High Altitude Frozen Lake",
      "St. Mary's Stone Church (Built 1902)",
      "Maharani Temple (Mohineshwar Shivalaya)",
      "Gulmarg Historic Golf Course",
      "Drung Frozen Waterfall (Near Tangmarg)"
    ],
    thingsToAvoid: [
      "Never purchase Gondola tickets from touts in the parking lot; book ONLY on official portal.",
      "Do not hike beyond Phase 2 Apharwat ridge without an avalanche check and registered guide.",
      "Avoid renting snow boots or gear at inflated rates; verify MRP at Tangmarg government kiosks."
    ],
    localTips: [
      "Gondola Phase 2 requires acclimatization; drink plenty of water and ascend slowly.",
      "During peak snow season (Dec-Feb), 4x4 vehicles with tire chains are mandatory from Tangmarg.",
      "Rent certified ski instructors through the Indian Institute of Skiing and Mountaineering (IISM)."
    ],
    estimatedDailyBudget: {
      budget: 3500,
      moderate: 7500,
      luxury: 18000
    },
    nearbyHospitals: ["Primary Health Centre Gulmarg (Near Police Station)", "Sub-District Hospital Tangmarg"],
    nearestPoliceStation: "Police Station Gulmarg (01954-254425)",
    distanceFromSrinagarKm: 52,
    coordinates: { lat: 34.0484, lng: 74.3805 }
  },
  {
    id: "pahalgam",
    name: "Pahalgam",
    kashmiriName: "پہلگام",
    tagline: "Valley of Shepherds & Lidder River Paradise",
    description: "Located on the banks of the rushing Lidder River, Pahalgam is famous for its evergreen pine forests, dramatic river valleys, trout angling, horse trails to Baisaran Meadow (Mini Switzerland), and as the base camp for the holy Amarnath Yatra.",
    region: "Kashmir Valley",
    district: "Anantnag",
    altitude: "2,130 m (6,988 ft)",
    bestTime: "April to November (River walks & Trekking), Dec to Feb (Peaceful Snow)",
    safetyLevel: "Safe & Open",
    safetyScore: 97,
    imageUrl: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=1200&q=80",
    tags: ["Nature", "Family", "Adventure", "Religious"],
    attractions: [
      "Betaab Valley (Picturesque Bollywood setting)",
      "Aru Valley & Overa-Aru Biosphere Reserve",
      "Chandanwari (Snow point & Yatra gateway)",
      "Baisaran Meadow ('Mini Switzerland of India')",
      "Lidder Amusement Park & Riverwalk",
      "Mamal Temple (8th-century stone Shiva temple)"
    ],
    thingsToAvoid: [
      "Avoid private pony operators demanding ₹3,000+; use the Prepaid Pony Stand at Pahalgam Club.",
      "Do not step into swift currents of the Lidder River during snowmelt in May-June.",
      "Avoid off-roading without local taxi union authorization."
    ],
    localTips: [
      "Taste freshly caught Himalayan Brown Trout prepared with local mountain herbs.",
      "Take the peaceful morning walk from Club Park along the Lidder riverbank.",
      "Betaab Valley, Aru Valley, and Chandanwari require local Pahalgam union cabs."
    ],
    estimatedDailyBudget: {
      budget: 3000,
      moderate: 6000,
      luxury: 15000
    },
    nearbyHospitals: ["Sub-District Hospital Pahalgam", "District Hospital Anantnag (40 km)"],
    nearestPoliceStation: "Police Station Pahalgam (01936-243224)",
    distanceFromSrinagarKm: 95,
    coordinates: { lat: 34.0163, lng: 75.3150 }
  },
  {
    id: "sonamarg",
    name: "Sonamarg",
    kashmiriName: "سونمرگ",
    tagline: "Meadow of Gold & Gateway to Ladakh",
    description: "Towered by the colossal peaks of Kolahoi and Machoi glaciers, Sonamarg is a scenic alpine wonderland along the roaring Sindh River. It serves as the gateway to the legendary Zojila Pass and the start point for the Kashmir Great Lakes trek.",
    region: "Kashmir Valley",
    district: "Ganderbal",
    altitude: "2,730 m (8,957 ft)",
    bestTime: "May to October (Alpine wildflowers & Trekking), Dec to Feb (Z-Morh Tunnel access for snow)",
    safetyLevel: "Safe & Open",
    safetyScore: 94,
    imageUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
    tags: ["Nature", "Adventure", "Winter Snow"],
    attractions: [
      "Thajiwas Glacier (Year-round snow & sledge runs)",
      "Sindh River White Water Rafting",
      "Zero Point near Zojila Pass",
      "Baltal Valley (Gateway to Amarnath Cave)",
      "Vishansar and Krishansar High Alpine Lakes",
      "Nilagrad River (Red water stream believed to heal skin)"
    ],
    thingsToAvoid: [
      "Do not attempt to cross Zojila Pass without checking daily one-way traffic timings.",
      "Avoid unguided glacier walking where hidden crevasses exist on Thajiwas.",
      "Do not litter along the fragile alpine Sindh river ecosystem."
    ],
    localTips: [
      "Rent sledges from registered tourist cooperative members with fixed price badges.",
      "The newly opened Z-Morh Tunnel now ensures all-weather connectivity to Sonamarg.",
      "Always carry wind-proof warm layers even in mid-summer."
    ],
    estimatedDailyBudget: {
      budget: 3000,
      moderate: 6500,
      luxury: 14000
    },
    nearbyHospitals: ["Primary Health Centre Sonamarg", "Sub-District Hospital Kangan"],
    nearestPoliceStation: "Police Station Sonamarg (0194-2416225)",
    distanceFromSrinagarKm: 80,
    coordinates: { lat: 34.3056, lng: 75.2942 }
  },
  {
    id: "doodhpathri",
    name: "Doodhpathri",
    kashmiriName: "دودهہ پتھری",
    tagline: "The Valley of Milk & Untouched Meadows",
    description: "An idyllic, less-crowded meadow nestled in Budgam district where the roaring Shaliganga river turns frothy white as it crashes over rocks, giving the valley its poetic name 'Valley of Milk'.",
    region: "Kashmir Valley",
    district: "Budgam",
    altitude: "2,730 m (8,957 ft)",
    bestTime: "May to October (Lush Carpet of Green), Dec to Feb (Pristine Deep Snow)",
    safetyLevel: "Safe & Open",
    safetyScore: 98,
    imageUrl: "https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=1200&q=80",
    tags: ["Nature", "Family", "Budget"],
    attractions: [
      "Shaliganga Riverbed & Pebble Beaches",
      "Parhas Maidan (Expansive grassy plateau)",
      "Diskhal Ridge Viewpoint",
      "Local Shepherd Gujjar settlements & fresh dairy tasting",
      "Pine forest natural walking trails"
    ],
    thingsToAvoid: [
      "Avoid staying in the valley after dusk as public transport is limited.",
      "Do not cross the Shaliganga stream during heavy mountain rainfall.",
      "Carry sufficient cash as ATM networks are scarce in the upper meadow."
    ],
    localTips: [
      "Try fresh Kashmiri Makki ki Roti (corn bread) and Noon Chai from local Gujjar huts.",
      "Ideal day-trip destination from Srinagar (only 42 km, ~1.5 hours drive).",
      "Excellent spot for quiet family picnics without tourist crowds."
    ],
    estimatedDailyBudget: {
      budget: 2000,
      moderate: 4000,
      luxury: 9000
    },
    nearbyHospitals: ["Sub-District Hospital Khansahib", "District Hospital Budgam"],
    nearestPoliceStation: "Police Station Khansahib (01951-277222)",
    distanceFromSrinagarKm: 42,
    coordinates: { lat: 33.8647, lng: 74.5714 }
  },
  {
    id: "yusmarg",
    name: "Yusmarg",
    kashmiriName: "یوسمرگ",
    tagline: "Meadow of Jesus & Whispering Pines",
    description: "A tranquil paradise surrounded by dense pine forests and the snow-capped Sunset Peak (Tatagooti). Legend holds that Jesus Christ once walked this serene meadow during his travels.",
    region: "Kashmir Valley",
    district: "Budgam",
    altitude: "2,396 m (7,861 ft)",
    bestTime: "April to October",
    safetyLevel: "Safe & Open",
    safetyScore: 97,
    imageUrl: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80",
    tags: ["Nature", "Family", "Adventure", "Budget"],
    attractions: [
      "Doodh Ganga River Canyon",
      "Nilnag Blue Water Lake",
      "Sang-e-Safed (White Stone Valley)",
      "Charar-e-Sharief Shrine (En route shrine of Sheikh Noor-ud-din Noorani)",
      "Lush rolling green horse tracks"
    ],
    thingsToAvoid: [
      "Avoid steep descent to Nilnag lake without proper hiking boots.",
      "Do not plan overnight camping without registered guides and prior permission."
    ],
    localTips: [
      "Stop at Charar-e-Sharief town to taste Kashmiri Halwa Paratha.",
      "Hire local horses for the 4 km trail to Doodh Ganga canyon.",
      "A peaceful alternative to crowded tourist spots with zero commercial pollution."
    ],
    estimatedDailyBudget: {
      budget: 2000,
      moderate: 4500,
      luxury: 8500
    },
    nearbyHospitals: ["Community Health Centre Charar-e-Sharief", "District Hospital Budgam"],
    nearestPoliceStation: "Police Post Yusmarg / PS Chadoora",
    distanceFromSrinagarKm: 47,
    coordinates: { lat: 33.8319, lng: 74.6644 }
  },
  {
    id: "gurez",
    name: "Gurez Valley",
    kashmiriName: "گریز وادی",
    tagline: "The Hidden Silk Route Kingdom & Habba Khatoon Peak",
    description: "An untouched emerald valley carved by the turquoise Kishanganga River near the Line of Control. Dominated by the majestic pyramid-shaped Habba Khatoon peak, Gurez is home to the ancient Dard-Shin culture and wooden log houses.",
    region: "North Kashmir",
    district: "Bandipora",
    altitude: "2,400 m (7,874 ft)",
    bestTime: "May to October (Razdan Pass remains snowbound in winter)",
    safetyLevel: "Permit Needed",
    safetyScore: 92,
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    tags: ["Adventure", "Culture", "Nature"],
    attractions: [
      "Habba Khatoon Peak & Natural Spring",
      "Dawar Main Town & Wooden Log Houses",
      "Kishanganga River Fishing & Riverside Camping",
      "Razdan Pass (11,672 ft viewpoint)",
      "Tulail Valley & Border Villages (Chakwali & Sheikhpura)",
      "Dardic Shin Heritage & Handicrafts"
    ],
    thingsToAvoid: [
      "Do not photograph sensitive military installations or border checkpoints.",
      "Do not stray beyond civilian demarcated zones in Tulail sector.",
      "Never attempt Razdan Pass during rain or early winter snow without 4x4."
    ],
    localTips: [
      "Indian citizens require photo ID card for registration at army checkpoints; foreign tourists require special permits.",
      "Stay in authentic wooden homestays in Dawar or Markoot for heartfelt hospitality.",
      "Fill fuel at Bandipora as fuel stations in Gurez have limited reserves."
    ],
    estimatedDailyBudget: {
      budget: 2500,
      moderate: 5000,
      luxury: 9000
    },
    nearbyHospitals: ["Sub-District Hospital Dawar, Gurez", "District Hospital Bandipora"],
    nearestPoliceStation: "Police Station Dawar Gurez (01957-255222)",
    distanceFromSrinagarKm: 125,
    coordinates: { lat: 34.6369, lng: 74.9038 }
  },
  {
    id: "jammu",
    name: "Jammu City of Temples",
    kashmiriName: "جموں",
    tagline: "The Winter Capital & Spiritual Gateway",
    description: "Situated on the banks of the Tawi River, Jammu is the historical winter capital known for grand temples, historic Bahu Fort, Mubarak Mandi Palace, and as the gateway to the sacred shrine of Shri Mata Vaishno Devi at Katra.",
    region: "Jammu Region",
    district: "Jammu",
    altitude: "327 m (1,073 ft)",
    bestTime: "September to April (Pleasant Winter climate)",
    safetyLevel: "Safe & Open",
    safetyScore: 99,
    imageUrl: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80",
    tags: ["Religious", "Culture", "Family", "Budget"],
    attractions: [
      "Bahu Fort & Mahakali Temple (Bawe Wali Mata)",
      "Raghunath Temple Complex",
      "Mubarak Mandi Royal Heritage Palace & Dogra Art Museum",
      "Jammu Ropeway / Cable Car across Tawi River",
      "Shri Mata Vaishno Devi Shrine at Katra (45 km north)",
      "Peer Kho Cave Temple"
    ],
    thingsToAvoid: [
      "Avoid unauthorized ticket agents at Jammu Tawi Railway Station.",
      "In summer months (May-June), carry sun protection as temperatures exceed 40°C."
    ],
    localTips: [
      "Sample authentic Dogra delicacies: Rajma Chawal with Anardana Chutney, Kalari Kulcha, and Sund Panjeeri.",
      "Pre-register for Vaishno Devi RFID Yatra Card online on official Shrine Board portal."
    ],
    estimatedDailyBudget: {
      budget: 2000,
      moderate: 4500,
      luxury: 10000
    },
    nearbyHospitals: ["Government Medical College (GMC) Bakshi Nagar, Jammu", "ASCOMS Sidhra", "Narayana Superspeciality Hospital Kakryal (Near Katra)"],
    nearestPoliceStation: "District Police Control Room Jammu (0191-2544581)",
    distanceFromSrinagarKm: 260,
    coordinates: { lat: 32.7266, lng: 74.8570 }
  }
];

export const ROAD_STATUS_DATA: RoadStatusItem[] = [
  {
    id: "nh44",
    route: "NH-44 Jammu ↔ Srinagar Highway",
    from: "Jammu / Udhampur",
    to: "Srinagar (via Banihal Qazigund Tunnel)",
    distanceKm: 260,
    status: "OPEN",
    lastUpdated: "Today, 08:30 AM IST",
    reason: "Clear two-way traffic for light passenger vehicles. Heavy trucks moving as per schedule in Ramban sector.",
    advisories: [
      "Maintain safe distance between Banihal and Ramban due to shooting stone prone stretches.",
      "Drive within speed limits inside Navayug and Chenani-Nashri tunnels.",
      "Keep vehicle fuel tank above 50%."
    ],
    alternateRoute: "Mughal Road (Shopian-Bafliaz-Poonch) for Light Motor Vehicles",
    vehicleRestrictions: "LMVs (Cars/SUVs) open both sides; HMVs one-way regulated.",
    emergencyContact: "Traffic Police Control Room Ramban: +91-1998-266686 / 112"
  },
  {
    id: "srinagar-gulmarg",
    route: "Srinagar ↔ Tangmarg ↔ Gulmarg",
    from: "Srinagar (Narbal/Magam)",
    to: "Gulmarg Alpine Bowl",
    distanceKm: 52,
    status: "OPEN",
    lastUpdated: "Today, 07:15 AM IST",
    reason: "Smooth asphalt till Tangmarg. Tangmarg to Gulmarg road cleared and gritted.",
    advisories: [
      "Snow chains mandatory for 2WD vehicles during active snowfall between Tangmarg and Gulmarg.",
      "Prepaid 4x4 taxi stands available at Tangmarg base.",
      "Avoid overtaking on winding pine curves."
    ],
    alternateRoute: "None (Direct scenic highway via Magam-Kunzer-Tangmarg)",
    vehicleRestrictions: "All vehicles allowed; 4x4 / chains enforced during fresh snow.",
    emergencyContact: "Traffic Police Tangmarg: +91-1954-254222"
  },
  {
    id: "srinagar-pahalgam",
    route: "Srinagar ↔ Pampore ↔ Anantnag ↔ Pahalgam",
    from: "Srinagar",
    to: "Pahalgam Lidder Valley",
    distanceKm: 95,
    status: "OPEN",
    lastUpdated: "Today, 06:45 AM IST",
    reason: "Four-lane highway up to Anantnag bypass, scenic double-lane road along Lidder river to Pahalgam. Excellent condition.",
    advisories: [
      "Drive cautiously near apple orchard turns in Bijbehara and Mattan.",
      "Stop only at designated viewpoints to avoid blocking tourist traffic."
    ],
    alternateRoute: "Apple Expressway via Awantipora-Apple valley bypass",
    vehicleRestrictions: "Open for all vehicle types 24x7.",
    emergencyContact: "Pahalgam Traffic Help Desk: +91-1936-243224"
  },
  {
    id: "srinagar-sonamarg-zojila",
    route: "Srinagar ↔ Sonamarg ↔ Zojila Pass ↔ Kargil",
    from: "Srinagar / Ganderbal",
    to: "Sonamarg & Ladakh Axis",
    distanceKm: 120,
    status: "CAUTION",
    lastUpdated: "Today, 09:00 AM IST",
    reason: "Sonamarg is fully open via Z-Morh tunnel. Zojila Pass (11,575 ft) is operating on strict one-way convoy timings due to sub-zero temperatures and black ice.",
    advisories: [
      "Morning convoy from Sonamarg to Kargil departs 06:00 AM - 10:00 AM.",
      "Afternoon return convoy from Minamarg to Sonamarg opens 01:00 PM - 05:00 PM.",
      "High altitude sickness precautions recommended."
    ],
    alternateRoute: "Flight connectivity Srinagar to Leh",
    vehicleRestrictions: "4x4 and high-clearance vehicles preferred for Zojila summit.",
    emergencyContact: "Sonamarg Police Checkpoint: +91-194-2416225"
  },
  {
    id: "mughal-road",
    route: "Mughal Road (Shopian ↔ Pir Ki Gali ↔ Bafliaz)",
    from: "Shopian (Kashmir)",
    to: "Poonch / Rajouri (Jammu)",
    distanceKm: 84,
    status: "CAUTION",
    lastUpdated: "Today, 07:30 AM IST",
    reason: "Open for daylight traffic (06:00 AM to 05:00 PM). Fog and moisture near Pir Ki Gali pass (11,400 ft).",
    advisories: [
      "No movement permitted after 5:00 PM due to darkness and wildlife corridor.",
      "Check brakes and engine coolant before ascending high elevation pass."
    ],
    alternateRoute: "NH-44 via Banihal tunnel",
    vehicleRestrictions: "LMVs only; heavy multi-axle trucks restricted.",
    emergencyContact: "Shopian Police Control: +91-1933-261891"
  },
  {
    id: "bandipora-gurez",
    route: "Bandipora ↔ Razdan Pass ↔ Gurez Valley",
    from: "Bandipora",
    to: "Dawar (Gurez)",
    distanceKm: 85,
    status: "OPEN",
    lastUpdated: "Today, 06:00 AM IST",
    reason: "Razdan Pass (11,672 ft) is clear. BRO road maintenance teams active.",
    advisories: [
      "ID registration required at Tragbal and Razdan army checkpoints.",
      "Carry woolens and water bottles; no shops between Tragbal and Dawar (45 km)."
    ],
    alternateRoute: "Helicopter service (Srinagar/Bandipora to Dawar - subsidized)",
    vehicleRestrictions: "LMVs and 4x4 permitted.",
    emergencyContact: "Gurez Civil Administration Helpline: +91-1957-255222"
  }
];

export const EMERGENCY_CONTACTS_DATA: EmergencyContactItem[] = [
  {
    id: "ec-1",
    category: "Police",
    serviceName: "All-India Unified Emergency Response Support",
    department: "J&K Police Emergency System",
    location: "Jammu & Kashmir Statewide",
    number: "112",
    alternateNumber: "100",
    is24x7: true,
    priority: 1,
    address: "State Command Centre, Police Headquarters, Srinagar/Jammu"
  },
  {
    id: "ec-2",
    category: "Tourist Assistance",
    serviceName: "Tourist Police Central Desk",
    department: "Directorate of Tourism, J&K",
    location: "Tourist Reception Centre (TRC), Srinagar",
    number: "+91-194-2455512",
    alternateNumber: "+91-194-2502279",
    is24x7: true,
    priority: 1,
    address: "TRC Complex, Residency Road, Srinagar"
  },
  {
    id: "ec-3",
    category: "Women Safety",
    serviceName: "Women in Distress Helpline",
    department: "Ministry of Women & Child Development / J&K Police",
    location: "All J&K Districts",
    number: "181",
    alternateNumber: "+91-94190-00181",
    is24x7: true,
    priority: 1,
    address: "Dedicated 24x7 Rapid Response Squads"
  },
  {
    id: "ec-4",
    category: "Ambulance",
    serviceName: "National Ambulance Service (108 J&K)",
    department: "Directorate of Health Services",
    location: "Statewide Fleet with Advanced Life Support",
    number: "108",
    alternateNumber: "102",
    is24x7: true,
    priority: 2,
    address: "Emergency Medical Response Fleet Stations"
  },
  {
    id: "ec-5",
    category: "Rescue",
    serviceName: "High Altitude SDRF Rescue Force",
    department: "State Disaster Response Force J&K",
    location: "Srinagar, Gulmarg, Pahalgam, Sonamarg",
    number: "+91-194-2475494",
    alternateNumber: "+91-194-2452097",
    is24x7: true,
    priority: 2,
    address: "SDRF Headquarters, Batamaloo, Srinagar"
  },
  {
    id: "ec-6",
    category: "Ambulance",
    serviceName: "SMHS Hospital Emergency Srinagar",
    department: "Government Medical College Srinagar",
    location: "Karan Nagar, Srinagar",
    number: "+91-194-2504114",
    alternateNumber: "+91-194-2504119",
    is24x7: true,
    priority: 3,
    address: "Kak Sarai, Karan Nagar, Srinagar 190010"
  },
  {
    id: "ec-7",
    category: "Ambulance",
    serviceName: "SKIMS Super-Speciality Hospital",
    department: "Sher-i-Kashmir Institute of Medical Sciences",
    location: "Soura, Srinagar",
    number: "+91-194-2401013",
    alternateNumber: "+91-194-2401014",
    is24x7: true,
    priority: 3,
    address: "Soura, Srinagar 190011"
  },
  {
    id: "ec-8",
    category: "Fire",
    serviceName: "Fire & Emergency Services J&K",
    department: "Fire Department",
    location: "Statewide Fire Stations",
    number: "101",
    alternateNumber: "+91-194-2479488",
    is24x7: true,
    priority: 3,
    address: "Headquarters Batamaloo, Srinagar"
  },
  {
    id: "ec-9",
    category: "Disaster Management",
    serviceName: "J&K State Disaster Management Authority",
    department: "Department of Disaster Management",
    location: "Civil Secretariat Srinagar / Jammu",
    number: "+91-194-2484439",
    is24x7: true,
    priority: 4,
    address: "Civil Secretariat, Srinagar"
  },
  {
    id: "ec-10",
    category: "Tourist Assistance",
    serviceName: "Gulmarg Cable Car (Gondola) Control Room",
    department: "J&K Cable Car Corporation",
    location: "Gondola Base Station, Gulmarg",
    number: "+91-1954-254477",
    is24x7: false,
    priority: 4,
    address: "Gondola Road, Gulmarg 193403"
  }
];

export const SERVICE_FACILITIES_DATA: ServiceFacility[] = [
  {
    id: "fac-1",
    name: "SMHS Premier Government Hospital",
    category: "Hospitals",
    address: "Karan Nagar, Downtown Srinagar",
    district: "Srinagar",
    distanceKm: 3.2,
    phone: "+91-194-2504114",
    isOpen: true,
    timings: "24x7 Emergency & Trauma",
    lat: 34.0882,
    lng: 74.8012,
    rating: 4.6,
    features: ["Trauma ICU", "Oxygen Plant", "Blood Bank", "Burn Ward"]
  },
  {
    id: "fac-2",
    name: "SKIMS Tertiary Care Medical Center",
    category: "Hospitals",
    address: "Soura, Srinagar",
    district: "Srinagar",
    distanceKm: 8.5,
    phone: "+91-194-2401013",
    isOpen: true,
    timings: "24x7 Emergency",
    lat: 34.1374,
    lng: 74.8062,
    rating: 4.8,
    features: ["Advanced Cardiac", "Neurosurgery", "Heli-Evac Access"]
  },
  {
    id: "fac-3",
    name: "Sub-District Hospital Tangmarg / Gulmarg Base",
    category: "Hospitals",
    address: "Main Road, Tangmarg Base",
    district: "Baramulla",
    distanceKm: 38.0,
    phone: "+91-1954-254228",
    isOpen: true,
    timings: "24x7 Emergency",
    lat: 34.0583,
    lng: 74.4281,
    rating: 4.4,
    features: ["High Altitude Sickness Unit", "Fracture Clinic", "Ambulance"]
  },
  {
    id: "fac-4",
    name: "Tourist Police Assistance Post - Dal Lake Ghat 1",
    category: "Police Stations",
    address: "Boulevard Road, Opposite Ghat No. 1, Dal Lake",
    district: "Srinagar",
    distanceKm: 1.2,
    phone: "+91-194-2455512",
    isOpen: true,
    timings: "24x7 Open",
    lat: 34.0768,
    lng: 74.8329,
    rating: 4.7,
    features: ["Prepaid Rate Dispute Desk", "Lost & Found", "English/Hindi Speaking Officers"]
  },
  {
    id: "fac-5",
    name: "Police Station Gulmarg",
    category: "Police Stations",
    address: "Near Golf Club & Bus Stand, Gulmarg",
    district: "Baramulla",
    distanceKm: 51.5,
    phone: "+91-1954-254425",
    isOpen: true,
    timings: "24x7 Open",
    lat: 34.0492,
    lng: 74.3831,
    rating: 4.5,
    features: ["Snow Rescue Squad", "Gondola Assistance"]
  },
  {
    id: "fac-6",
    name: "J&K Bank 24x7 Cash ATM & Currency Exchange",
    category: "ATMs",
    address: "TRC Ground Floor, Residency Road",
    district: "Srinagar",
    distanceKm: 0.8,
    phone: "1800-890-2122",
    isOpen: true,
    timings: "24x7 Operational",
    lat: 34.0711,
    lng: 74.8190,
    rating: 4.9,
    features: ["International Cards Accepted (Visa/Mastercard)", "Cash Replenished Daily"]
  },
  {
    id: "fac-7",
    name: "State Bank of India Alpine ATM Gulmarg",
    category: "ATMs",
    address: "Main Market, Near Gondola Parking, Gulmarg",
    district: "Baramulla",
    distanceKm: 52.0,
    phone: "1800-425-3800",
    isOpen: true,
    timings: "24x7 Operational",
    lat: 34.0478,
    lng: 74.3814,
    rating: 4.3,
    features: ["Micro-ATM", "Cash Withdrawal"]
  },
  {
    id: "fac-8",
    name: "Indian Oil High Altitude Fuel Station Tangmarg",
    category: "Fuel Stations",
    address: "Tangmarg-Gulmarg Road Bypass",
    district: "Baramulla",
    distanceKm: 39.5,
    phone: "+91-1954-254110",
    isOpen: true,
    timings: "06:00 AM - 10:00 PM",
    lat: 34.0611,
    lng: 74.4255,
    rating: 4.6,
    features: ["Winter Grade Anti-Freeze Diesel", "Tire Air & Chains", "Clean Washrooms"]
  },
  {
    id: "fac-9",
    name: "Central 24x7 Medicos & Oxygen Supply",
    category: "Pharmacies",
    address: "Residency Road, Lal Chowk",
    district: "Srinagar",
    distanceKm: 0.5,
    phone: "+91-194-2478901",
    isOpen: true,
    timings: "24x7 Open",
    lat: 34.0722,
    lng: 74.8155,
    rating: 4.7,
    features: ["Portable Oxygen Cans", "Altitude Sickness Meds (Diamox)", "Thermal First Aid"]
  },
  {
    id: "fac-10",
    name: "TRC Tourist Information & Facilitation Centre",
    category: "Tourist Information",
    address: "Directorate of Tourism, TRC Residency Road",
    district: "Srinagar",
    distanceKm: 0.6,
    phone: "+91-194-2502281",
    isOpen: true,
    timings: "09:30 AM - 06:30 PM",
    lat: 34.0705,
    lng: 74.8202,
    rating: 4.8,
    features: ["Free Maps", "Govt Rate Cards", "Registered Guide Verifier", "Bus Bookings"]
  }
];

export const SCAM_ALERTS_DATA: ScamAlertItem[] = [
  {
    id: "scam-1",
    title: "Counterfeit Saffron & Fake Machine-made 'Pashmina'",
    category: "Shopping",
    severity: "HIGH",
    warningSign: "Hawkers at Dal Lake or highway stalls offering '100% pure Pashmina shawls' for ₹800–₹1,500, or selling red-dyed corn silk fibers as Grade-A Saffron.",
    scamDescription: "Unscrupulous sellers pass synthetic viscose or powerloom wool as authentic hand-spun Changthangi Kashmiri Pashmina, and dyed threads as Pampore saffron.",
    whatToDo: [
      "Look for the official Govt. of J&K GI (Geographical Indication) QR-code tag on Pashmina and Saffron.",
      "Conduct the burn test for Pashmina: genuine wool burns slowly with a distinct singed-hair scent and leaves soft ash, not melting plastic beads.",
      "Real saffron takes 10-15 minutes in warm water to release pure golden-yellow hue; the strands remain crimson red and do not fade."
    ],
    officialPrecaution: "Purchase from verified Kashmir Govt. Arts Emporium or certified cooperatives.",
    officialRateGuideline: "Genuine handwoven Pashmina starts around ₹6,000–₹15,000+; Pure GI Saffron is ~₹250–₹350/gram."
  },
  {
    id: "scam-2",
    title: "Fake Online Gondola Pass Websites & Parking Lot Touts",
    category: "Activity",
    severity: "HIGH",
    warningSign: "Touts approaching your car in Tangmarg or Gulmarg parking claiming 'Gondola passes are 100% sold out online' and asking ₹3,000–₹5,000 for VIP entry.",
    scamDescription: "Scammers create cloned phishing websites or sell printed screenshot passes with duplicate bar codes that fail verification turnstiles at Gulmarg base.",
    whatToDo: [
      "Book tickets EXCLUSIVELY on the official portal: https://jammukashmircablecar.com",
      "Official tickets carry dynamic QR codes linked directly to your Govt ID.",
      "If online slots are full, visit the official morning cancellation counter or plan sightseeing in the meadow instead of paying touts."
    ],
    officialPrecaution: "Report illegal pass sellers immediately to Gulmarg Tourist Police (+91-1954-254425).",
    officialRateGuideline: "Phase 1: ₹740; Phase 2: ₹950 (Official Govt Rates)."
  },
  {
    id: "scam-3",
    title: "Pony / Horse Ride Rate Inflations at Pahalgam & Gulmarg",
    category: "Transportation",
    severity: "MEDIUM",
    warningSign: "Pony operators quoting ₹3,000 to ₹4,500 per horse for short 3 km rides (e.g. to Baisaran or Kangdoori).",
    scamDescription: "Tourists unaware of official district rate cards are overcharged or taken halfway through the route and pressured to tip large sums.",
    whatToDo: [
      "Always hire through the Official Prepaid Pony Counter operated by the Tourism Department at Pahalgam Club / Gulmarg Stand.",
      "Obtain a printed prepaid receipt that states the destination, horse ID number, and fixed fee.",
      "Do not pay extra tipping beyond the receipt unless voluntary."
    ],
    officialPrecaution: "Pony union members must wear registered brass badges with their operator number.",
    officialRateGuideline: "Fixed rates typically range from ₹650 to ₹1,200 depending on circuit distance."
  },
  {
    id: "scam-4",
    title: "Fake Snow Gear & Overpriced Boot Rentals at Tangmarg",
    category: "Activity",
    severity: "LOW",
    warningSign: "Roadside agents stopping private cabs insisting that 'Gulmarg entry is forbidden without renting their specific rubber boots and long coats'.",
    scamDescription: "Drivers take commissions by stopping at private rental shops that charge ₹500–₹1,000 per person for low-quality rubber gumboots.",
    whatToDo: [
      "Wearing your own water-resistant hiking shoes with warm wool socks is completely acceptable.",
      "If you need boots in deep snow, rent from official stalls at standard rates (₹100–₹150/pair).",
      "Politely inform your taxi driver to proceed directly without unscheduled stops."
    ],
    officialPrecaution: "There is no legal requirement to rent external gear if you have your own winter shoes."
  },
  {
    id: "scam-5",
    title: "Shikara 'Floating Saffron & Spice' High Pressure Sales",
    category: "Shopping",
    severity: "MEDIUM",
    warningSign: "During a quiet sunset shikara ride, vendors pull alongside and aggressively pitch 'secret medicinal saffron', 'shilajit', or 'rare pearls'.",
    scamDescription: "Trapped in the boat, tourists feel obligated to buy low-grade items at ten times the market price.",
    whatToDo: [
      "A firm, polite 'No, Shukriya' (No, thank you) is usually sufficient.",
      "Instruct your shikara rider to continue rowing smoothly without docking alongside unrequested sales boats.",
      "Enjoy the landscape and save shopping for verified craft markets."
    ],
    officialPrecaution: "Shikara riders are officially mandated not to compel tourists into shopping stops."
  }
];

export const TRANSLATIONS_DATA: TranslationPhrase[] = [
  {
    id: "tr-1",
    category: "Essentials",
    english: "Hello / Greetings",
    hindi: "नमस्ते / अस्सलाम अलैकुम",
    urdu: "السلام علیکم / آداب",
    kashmiriUrdu: "سلام / کیا چھ حال؟",
    kashmiriRoman: "Salaam / Kya chhu haal?",
    audioPronunciationText: "Salaam! Kya chhu haal?"
  },
  {
    id: "tr-2",
    category: "Essentials",
    english: "Thank you very much",
    hindi: "बहुत बहुत धन्यवाद",
    urdu: "بہت بہت شکریہ",
    kashmiriUrdu: "واریاہ واریاہ شکریہ",
    kashmiriRoman: "Vaaryah vaaryah shukriya",
    audioPronunciationText: "Vaaryah vaaryah shukriya"
  },
  {
    id: "tr-3",
    category: "Emergency",
    english: "I need help urgently!",
    hindi: "मुझे तुरंत मदद चाहिए!",
    urdu: "مجھے فوری مدد چاہیے!",
    kashmiriUrdu: "میہ چھِ مددٕچ ضرورت!",
    kashmiriRoman: "Me chhi madadas zaroorat!",
    audioPronunciationText: "Me chhi madadas zaroorat"
  },
  {
    id: "tr-4",
    category: "Emergency",
    english: "Where is the nearest hospital?",
    hindi: "नजदीकी अस्पताल कहाँ है?",
    urdu: "قریبی ہسپتال کہاں ہے؟",
    kashmiriUrdu: "نزدیٖکی ہسپتال کتیٚتھ چھُ؟",
    kashmiriRoman: "Nazdeeki hospital kateth chhu?",
    audioPronunciationText: "Nazdeeki hospital kateth chhu"
  },
  {
    id: "tr-5",
    category: "Emergency",
    english: "Where is the police station?",
    hindi: "पुलिस स्टेशन कहाँ है?",
    urdu: "پولیس اسٹیشن کہاں ہے؟",
    kashmiriUrdu: "تھانہٕ کتیٚتھ چھُ؟",
    kashmiriRoman: "Thaana kateth chhu?",
    audioPronunciationText: "Thaana kateth chhu"
  },
  {
    id: "tr-6",
    category: "Shopping & Bargaining",
    english: "How much does this cost?",
    hindi: "यह कितने का है?",
    urdu: "یہ کتنے کا ہے؟",
    kashmiriUrdu: "یہٕ کیٚتس چھُ؟",
    kashmiriRoman: "Yih ketas chhu?",
    audioPronunciationText: "Yih ketas chhu"
  },
  {
    id: "tr-7",
    category: "Shopping & Bargaining",
    english: "Is this genuine Kashmiri Pashmina?",
    hindi: "क्या यह असली कश्मीरी पश्मीना है?",
    urdu: "کیا یہ اصلی کشمیری پشمینہ ہے؟",
    kashmiriUrdu: "کیا یہٕ چھا اصل پشمینہ؟",
    kashmiriRoman: "Kya yih chhaa asal Pashmina?",
    audioPronunciationText: "Kya yih chhaa asal Pashmina"
  },
  {
    id: "tr-8",
    category: "Directions",
    english: "Where is the Dal Lake / Shikara Ghat?",
    hindi: "डल झील / शिकारा घाट कहाँ है?",
    urdu: "ڈل جھیل / شکارہ گھاٹ کہاں ہے؟",
    kashmiriUrdu: "ڈل کتیٚتھ چھُ؟",
    kashmiriRoman: "Dall kateth chhu?",
    audioPronunciationText: "Dall kateth chhu"
  },
  {
    id: "tr-9",
    category: "Food & Dining",
    english: "Please serve hot Kashmiri Kahwa tea.",
    hindi: "कृपया गर्म कश्मीरी कहवा चाय दीजिए।",
    urdu: "برائے مہربانی گرم کشمیری قہوہ دیں۔",
    kashmiriUrdu: "گرَم کہوہ دِیو مہرَبٲنی کٔرِتھ۔",
    kashmiriRoman: "Garam Kahwa diyiv meharbaani karith.",
    audioPronunciationText: "Garam Kahwa diyiv meharbaani karith"
  },
  {
    id: "tr-10",
    category: "Transportation",
    english: "Is the road open to Gulmarg / Sonamarg?",
    hindi: "क्या गुलमर्ग / सोनमर्ग का रास्ता खुला है?",
    urdu: "کیا گلمرگ کا راستہ کھلا ہے؟",
    kashmiriUrdu: "گلمرگُک وتھ چھیٚکھ کھٔلِتھ؟",
    kashmiriRoman: "Gulmarguk vath chhekh khalith?",
    audioPronunciationText: "Gulmarguk vath chhekh khalith"
  }
];

export const TREKKING_ROUTES_DATA: TrekkingRouteItem[] = [
  {
    id: "kgl",
    name: "Kashmir Great Lakes (KGL) Trek",
    difficulty: "Moderate",
    distanceKm: 72,
    durationDays: "7 Days / 6 Nights",
    maxAltitudeMeters: 4191,
    maxAltitudeFt: "13,750 ft (Gadsar Pass)",
    baseCamp: "Shitkadi (Near Sonamarg)",
    bestSeason: "July to September (Lakes melt and flower meadows bloom)",
    weatherWarning: "Sudden alpine rain and hailstorms common near Nichnai Pass; temperatures drop below 0°C at night.",
    requiredPreparation: [
      "Physical cardio training (5 km run under 30 mins) for 4 weeks prior.",
      "High-ankle waterproof trekking boots with Vibram or deep grip lugs.",
      "Thermal base layers, 3-layer waterproof poncho, and -5°C rated sleeping bag."
    ],
    safetyTips: [
      "Acclimatize 24 hours in Sonamarg before ascending Nichnai.",
      "Strictly carry personal Diamox or consult doctor regarding AMS (Acute Mountain Sickness).",
      "Do not attempt without an IMF/J&K Tourism registered alpine guide and satellite emergency GPS tracker."
    ],
    permitRequired: true,
    permitDetails: "Army & Tourism Department permits issued at Sonamarg / TRC Srinagar with valid Photo ID.",
    highlights: [
      "Vishansar and Krishansar Twin Alpine Lakes",
      "Gadsar (Lake of Flowers) & Floating Icebergs",
      "Satsar 7 Interconnected Lakes Plateau",
      "Twin High Alpine Lakes: Gangabal and Nundkol under Mount Harmukh"
    ],
    imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "tarsar-marsar",
    name: "Tarsar Marsar Alpine Lakes Trek",
    difficulty: "Moderate",
    distanceKm: 48,
    durationDays: "6 Days / 5 Nights",
    maxAltitudeMeters: 4020,
    maxAltitudeFt: "13,200 ft (Tarsar Pass)",
    baseCamp: "Aru Valley (Pahalgam)",
    bestSeason: "July to mid-September",
    weatherWarning: "Rapid weather changes over Marsar lake ridge; dense mountain mist reduces visibility.",
    requiredPreparation: [
      "Trekking poles to navigate boulder fields near Sundersar.",
      "Waterproof backpack cover and gaiters.",
      "Hydration reservoir (drink 3-4 liters daily to avoid altitude headaches)."
    ],
    safetyTips: [
      "Camp only in designated sheltered zones away from flash runoff channels.",
      "Cross streams early morning when glacial water levels are at their lowest.",
      "Do not swim in freezing glacial lakes (hypothermia risk within 3 minutes)."
    ],
    permitRequired: true,
    permitDetails: "Obtain wildlife & forest clearance from Forest Division Pahalgam.",
    highlights: [
      "Camping directly beside the turquoise shores of Tarsar Lake",
      "Almond-shaped secret lake of Marsar shrouded in mist",
      "Sundersar Lake surrounded by alpine blue poppy flowers",
      "Aru Valley pine forest riverwalks"
    ],
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "alpather-lake",
    name: "Alpather Frozen Lake Summit Hike",
    difficulty: "Easy",
    distanceKm: 8,
    durationDays: "Day Trek (4-6 Hours)",
    maxAltitudeMeters: 3840,
    maxAltitudeFt: "12,600 ft",
    baseCamp: "Gulmarg Gondola Phase 2 (Apharwat Peak)",
    bestSeason: "June to October (Thawed turquoise waters) / May (Floating Ice sheets)",
    weatherWarning: "High wind chill at Apharwat ridge; cloud cover can roll in rapidly by 2 PM.",
    requiredPreparation: [
      "Layered warm fleece and wind-cheater jacket.",
      "Sun protection (UV index 11+ at 12,000 ft; polarized sunglasses mandatory)."
    ],
    safetyTips: [
      "Follow the marked cairn trail from Apharwat Station.",
      "Return to Gondola Phase 2 station before 4:00 PM (last Gondola descent).",
      "Check with ski patrol if snow cornices are stable."
    ],
    permitRequired: false,
    permitDetails: "Valid Gondola Phase 2 ticket and Photo ID required.",
    highlights: [
      "High altitude cirque lake cradled by Apharwat mountains",
      "Panoramic views of Nanga Parbat (8,126 m) across the horizon on clear days",
      "Floating snow floes till mid-summer"
    ],
    imageUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "thajiwas-glacier-trek",
    name: "Thajiwas Glacier & Bear Valley Nature Trail",
    difficulty: "Easy",
    distanceKm: 6,
    durationDays: "Day Hike (3-4 Hours)",
    maxAltitudeMeters: 2800,
    maxAltitudeFt: "9,186 ft",
    baseCamp: "Sonamarg Meadow",
    bestSeason: "April to November",
    weatherWarning: "Muddy terrain during early snowmelt; carry sturdy shoes.",
    requiredPreparation: [
      "Light daypack with water bottle and energy bars.",
      "Comfortable sports/hiking shoes."
    ],
    safetyTips: [
      "Avoid walking beneath sheer ice cliffs where melting chunks can detach.",
      "Stick to established nature paths along the glacial melt stream."
    ],
    permitRequired: false,
    permitDetails: "No special permit needed for day hikers.",
    highlights: [
      "Close-up views of ancient mountain glacier snout",
      "Alpine stream crossings and miniature waterfalls",
      "Pine and silver birch forest walks"
    ],
    imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80"
  }
];

export const HOTEL_STAYS_DATA: HotelStayItem[] = [
  {
    id: "stay-1",
    name: "Royal Heritage Houseboat Sukoon",
    type: "Houseboat",
    location: "Nigeen Lake (Quiet eco-zone)",
    district: "Srinagar",
    priceRange: "₹9,500 - ₹16,000",
    pricePerNightINR: 11500,
    rating: 4.9,
    reviewsCount: 342,
    amenities: ["Carved Walnut Wood Suites", "Central Heating & Electric Blankets", "Solar Hot Water", "Private Shikara Transfers", "Traditional Wazwan Dining"],
    safetyFeatures: ["Govt. Tourist Dept. Category A Certified", "Lifejackets on all Shikaras", "Fire Extinguishers & Smoke Alarms", "24x7 Lake Guard on Duty"],
    imageUrl: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=80",
    contactNumber: "+91-194-2420101",
    verifiedBySmartSafar: true
  },
  {
    id: "stay-2",
    name: "The Khyber Himalayan Resort & Spa",
    type: "Eco Resort",
    location: "Near Gondola Base, Gulmarg",
    district: "Baramulla",
    priceRange: "₹24,000 - ₹45,000",
    pricePerNightINR: 28000,
    rating: 4.9,
    reviewsCount: 890,
    amenities: ["Heated Indoor Swimming Pool with Mountain View", "Full Ski Storage & Gear Rental", "Luxury L'Occitane Spa", "Multi-Cuisine Restaurants"],
    safetyFeatures: ["On-site Doctor & Emergency Oxygen", "Automated Defibrillator (AED)", "4x4 Snow Transport Fleet", "ISO 22000 Certified Kitchen"],
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    contactNumber: "+91-1954-254666",
    verifiedBySmartSafar: true
  },
  {
    id: "stay-3",
    name: "Pahalgam Pine & River Retreat",
    type: "Heritage Hotel",
    location: "Lidder Riverfront, Pahalgam",
    district: "Anantnag",
    priceRange: "₹6,000 - ₹12,000",
    pricePerNightINR: 7500,
    rating: 4.7,
    reviewsCount: 215,
    amenities: ["Lidder River Garden View", "Radiator Heating", "Bonfire Evenings", "Complimentary Kahwa on Arrival", "Free Wi-Fi"],
    safetyFeatures: ["24x7 Security Surveillance", "First Aid Trained Staff", "Safe Vehicle Parking", "Verified Driver Dormitories"],
    imageUrl: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80",
    contactNumber: "+91-1936-243550",
    verifiedBySmartSafar: true
  },
  {
    id: "stay-4",
    name: "Dawar Heritage Dardic Homestay",
    type: "Homestay",
    location: "Dawar Main Village, Gurez Valley",
    district: "Bandipora",
    priceRange: "₹1,800 - ₹3,500",
    pricePerNightINR: 2400,
    rating: 4.8,
    reviewsCount: 94,
    amenities: ["Authentic Deodar Wood Rooms", "Homecooked Organic Meals (Dardic specialities)", "Bukhari Wood Fireplace", "Warm Kashmiri Blankets"],
    safetyFeatures: ["Registered with Bandipora Tourism", "Police Verified Host Family", "Emergency Radio Contact"],
    imageUrl: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80",
    contactNumber: "+91-1957-255310",
    verifiedBySmartSafar: true
  }
];

export const WEATHER_ALERTS_DATA: WeatherAlertItem[] = [
  {
    id: "alert-1",
    severity: "ADVISORY (YELLOW)",
    type: "Weather",
    location: "Gulmarg & Sonamarg Heights (>9,000 ft)",
    dateTime: "Today, Updated 2 hours ago",
    title: "Fresh Light Snowfall & Night Frost Forecast",
    description: "Sub-zero minimum temperatures (-2°C to -6°C) anticipated in upper elevations. Black ice may form on morning shaded curves along Tangmarg-Gulmarg stretch.",
    actionRequired: "Carry thermal layers, warm windcheater, and drive with snow chains before 9:00 AM.",
    source: "India Meteorological Department (IMD) Srinagar Centre"
  },
  {
    id: "alert-2",
    severity: "NORMAL (GREEN)",
    type: "Road",
    location: "NH-44 Jammu-Srinagar Highway",
    dateTime: "Today, Updated 1 hour ago",
    title: "Smooth Two-Way Traffic Movement on NH-44",
    description: "Traffic is flowing smoothly through Navayug and Chenani-Nashri tunnels. No major debris or waterlogging reported.",
    actionRequired: "Maintain safe 40-50 km/h speeds on Ramban winding stretches.",
    source: "J&K Traffic Police Headquarters"
  },
  {
    id: "alert-3",
    severity: "ADVISORY (YELLOW)",
    type: "Safety",
    location: "Dal Lake & Nigeen Lake, Srinagar",
    dateTime: "Today, Updated 4 hours ago",
    title: "Evening Mist & Boat Navigation Advisory",
    description: "Dense evening mist develops over lake waters post 6:30 PM. All commercial shikaras must operate with front illumination lanterns.",
    actionRequired: "Ensure lifejackets are accessible onboard during evening sunset cruises.",
    source: "Tourist Police Dal Lake Wing"
  }
];

export const WEATHER_DATA: WeatherItem[] = [
  {
    location: "Srinagar (Dal Lake)",
    temperature: "14°C",
    condition: "Sunny & Pleasant",
    wind: "8 km/h NW",
    rainProbability: "5%",
    advisory: "Ideal for Shikara ride & garden walks. Light jacket in evening."
  },
  {
    location: "Gulmarg (Apharwat)",
    temperature: "4°C",
    condition: "Partly Cloudy / Chilly",
    wind: "16 km/h SW",
    rainProbability: "15%",
    advisory: "Snow present at Phase 2 (12,293 ft). Heavy woolens & gloves required."
  },
  {
    location: "Pahalgam (Lidder)",
    temperature: "11°C",
    condition: "Clear Sky",
    wind: "10 km/h W",
    rainProbability: "10%",
    advisory: "River trails clear and dry. Excellent visibility for Betaab Valley."
  },
  {
    location: "Sonamarg (Zojila Pass)",
    temperature: "2°C",
    condition: "Breezy & Cold",
    wind: "22 km/h NE",
    rainProbability: "20%",
    advisory: "Sub-zero night temps. Early morning frost on high mountain pass."
  }
];
