/* ============================================================
   KRESZ Code Web App — Vehicle / licence category dataset
   Covers every Hungarian driving-licence category + bicycle.
   ============================================================ */
(function (global) {
  "use strict";

  const VEHICLES = [
    {
      id: "bicycle",
      code: "🚲",
      icon: "bicycle",
      accent: "#16a34a",
      name: { hu: "Kerékpár", en: "Bicycle" },
      minAge: { hu: "Nincs (12 év alatt felügyelet)", en: "None (under 12 supervised)" },
      speed: { hu: "Lakott területen kívül kötelező a bukósisak nagyobb sebességnél", en: "Helmet recommended; required off built-up areas at speed" },
      allows: {
        hu: "Emberi erővel hajtott, legfeljebb 300 W névleges teljesítményű rásegítésű kétkerekű.",
        en: "Human-powered two-wheelers, including pedal-assist up to 300 W rated power.",
      },
      rules: {
        hu: [
          "Lakott területen kívül és éjszaka kötelező a láthatósági mellény.",
          "Kerékpárúton annak használata kötelező; egyébként az úttest jobb szélén közlekedj.",
          "Tilos a kézben tartott mobiltelefon használata menet közben.",
          "Legfeljebb 0,0‰ – ittasan tilos kerékpározni (szigorú szankciók).",
        ],
        en: [
          "A hi-vis vest is mandatory outside built-up areas and at night.",
          "Use the cycle path where one exists; otherwise ride on the right edge of the road.",
          "Using a hand-held phone while riding is prohibited.",
          "Riding under the influence of alcohol is prohibited and strictly penalised.",
        ],
      },
      quizCat: "bicycle",
    },
    {
      id: "am",
      code: "AM",
      icon: "moped",
      accent: "#0ea5e9",
      name: { hu: "Segédmotoros kerékpár (AM)", en: "Moped (AM)" },
      minAge: { hu: "14 év", en: "14 years" },
      speed: { hu: "Max. 45 km/h", en: "Max. 45 km/h" },
      allows: {
        hu: "Legfeljebb 50 cm³ motorú, max. 45 km/h sebességű kétkerekű (kismotor), valamint kis teljesítményű három- és négykerekű segédmotor.",
        en: "Two-wheeled mopeds up to 50 cm³ and 45 km/h, plus light three- and four-wheeled mopeds.",
      },
      rules: {
        hu: [
          "Kötelező a megfelelő bukósisak viselése.",
          "Autópályán és autóúton tilos közlekedni.",
          "Ahol van, a kerékpársávot/kerékpárutat is használhatja, ha tábla engedi.",
          "Lakott területen kívül is legfeljebb 45 km/h.",
        ],
        en: [
          "A proper crash helmet is mandatory.",
          "Mopeds may not use motorways or expressways.",
          "May use cycle lanes/paths where a sign permits it.",
          "Maximum 45 km/h even outside built-up areas.",
        ],
      },
      quizCat: "moped",
    },
    {
      id: "a1",
      code: "A1",
      icon: "motorcycle",
      accent: "#6366f1",
      name: { hu: "Könnyű motorkerékpár (A1)", en: "Light motorcycle (A1)" },
      minAge: { hu: "16 év", en: "16 years" },
      speed: { hu: "Max. 11 kW, ≤ 125 cm³", en: "Max. 11 kW, ≤ 125 cm³" },
      allows: {
        hu: "Legfeljebb 125 cm³ és 11 kW teljesítményű motorkerékpárok (a teljesítmény/tömeg arány max. 0,1 kW/kg), valamint kis teljesítményű triciklik.",
        en: "Motorcycles up to 125 cm³ and 11 kW (power-to-weight max 0.1 kW/kg) and small tricycles.",
      },
      rules: {
        hu: [
          "Kötelező a bukósisak és ajánlott a védőruházat.",
          "Nappal is kötelező a tompított fényszóró használata.",
          "A sebességhatárok megegyeznek a többi gépjárműével, kivéve külön korlátozás.",
        ],
        en: [
          "Helmet mandatory; protective clothing strongly recommended.",
          "Dipped headlight required even during the day.",
          "Speed limits match other motor vehicles unless otherwise restricted.",
        ],
      },
      quizCat: "motorcycle",
    },
    {
      id: "a2",
      code: "A2",
      icon: "motorcycle",
      accent: "#7c3aed",
      name: { hu: "Motorkerékpár (A2)", en: "Motorcycle (A2)" },
      minAge: { hu: "18 év", en: "18 years" },
      speed: { hu: "Max. 35 kW", en: "Max. 35 kW" },
      allows: {
        hu: "Legfeljebb 35 kW teljesítményű motorkerékpárok (teljesítmény/tömeg arány max. 0,2 kW/kg), amelyek nem kétszer akkora teljesítményű alapjárműből származnak.",
        en: "Motorcycles up to 35 kW (power-to-weight max 0.2 kW/kg), not derived from a machine over twice that power.",
      },
      rules: {
        hu: [
          "A1-ről A2-re, majd A-ra fokozatosan lehet lépni (gyakorlat és életkor szerint).",
          "Kötelező bukósisak és a látható, lehetőleg fényvisszaverő ruházat ajánlott.",
        ],
        en: [
          "Progression A1 → A2 → A is staged by experience and age.",
          "Helmet mandatory; high-visibility/reflective gear recommended.",
        ],
      },
      quizCat: "motorcycle",
    },
    {
      id: "a",
      code: "A",
      icon: "motorcycle",
      accent: "#9333ea",
      name: { hu: "Motorkerékpár (A)", en: "Motorcycle (A)" },
      minAge: { hu: "24 év (vagy 2 év A2 után 20)", en: "24 years (or 20 with 2 yrs of A2)" },
      speed: { hu: "Teljesítménykorlát nélkül", en: "No power limit" },
      allows: {
        hu: "Bármilyen teljesítményű motorkerékpár oldalkocsival vagy anélkül, valamint a nagy teljesítményű motoros triciklik.",
        en: "Motorcycles of any power, with or without sidecar, and powerful motor tricycles.",
      },
      rules: {
        hu: [
          "A legnagyobb teljesítményű kategória — fokozott felelősség és tapasztalat szükséges.",
          "Kötelező a bukósisak; defenzív vezetés és megfelelő követési távolság ajánlott.",
        ],
        en: [
          "The highest-power category — demands extra responsibility and experience.",
          "Helmet mandatory; defensive riding and safe following distances advised.",
        ],
      },
      quizCat: "motorcycle",
    },
    {
      id: "b",
      code: "B",
      icon: "car",
      accent: "#2563eb",
      name: { hu: "Személygépkocsi (B)", en: "Car (B)" },
      minAge: { hu: "17 év", en: "17 years" },
      speed: { hu: "Lakott: 50 · Úton: 90 · Autóút: 110 · Autópálya: 130 km/h", en: "Town 50 · Road 90 · Expressway 110 · Motorway 130 km/h" },
      allows: {
        hu: "Legfeljebb 3500 kg össztömegű és max. 8+1 fős gépkocsik, könnyű utánfutóval (≤ 750 kg) vontatva.",
        en: "Vehicles up to 3500 kg and max 8+1 seats, towing a light trailer (≤ 750 kg).",
      },
      rules: {
        hu: [
          "Minden utasnak kötelező a biztonsági öv használata.",
          "0,0‰ – vezetés közben tilos bármennyi alkohol a szervezetben.",
          "Kézi mobiltelefon használata vezetés közben tilos.",
          "Gyermek testmagasságától függően gyermekülés kötelező.",
        ],
        en: [
          "Seat belts are mandatory for every occupant.",
          "Zero tolerance (0.0‰) — no alcohol while driving.",
          "Using a hand-held phone while driving is prohibited.",
          "Child restraints are required depending on the child's height.",
        ],
      },
      quizCat: "car",
    },
    {
      id: "be",
      code: "B+E",
      icon: "car",
      accent: "#1d4ed8",
      name: { hu: "Személygépkocsi pótkocsival (B+E)", en: "Car with trailer (B+E)" },
      minAge: { hu: "18 év", en: "18 years" },
      speed: { hu: "Vontatáskor alacsonyabb határok", en: "Lower limits while towing" },
      allows: {
        hu: "B kategóriás vontató jármű 750 kg-ot meghaladó össztömegű pótkocsival.",
        en: "A category-B towing vehicle with a trailer exceeding 750 kg.",
      },
      rules: {
        hu: [
          "Vontatáskor a megengedett sebesség alacsonyabb (pl. autópályán 80 km/h).",
          "Ügyelj a megnövekedett fékútra és a nagyobb kanyarodási ívre.",
          "A pótkocsi megfelelő terhelése és rögzítése kötelező.",
        ],
        en: [
          "Speed limits are lower while towing (e.g. 80 km/h on motorways).",
          "Account for the longer braking distance and wider turning radius.",
          "The trailer must be correctly loaded and secured.",
        ],
      },
      quizCat: "car",
    },
    {
      id: "c",
      code: "C",
      icon: "truck",
      accent: "#ea580c",
      name: { hu: "Tehergépkocsi (C)", en: "Truck (C)" },
      minAge: { hu: "21 év (GKI-val 18)", en: "21 years (18 with CPC)" },
      speed: { hu: "Lakott: 50 · Úton: 70 · Autópálya: 80 km/h", en: "Town 50 · Road 70 · Motorway 80 km/h" },
      allows: {
        hu: "3500 kg össztömeget meghaladó tehergépkocsik (a vezetőn kívül max. 8 fő), könnyű pótkocsival.",
        en: "Trucks over 3500 kg (max 8 passengers besides the driver), with a light trailer.",
      },
      rules: {
        hu: [
          "Kötelező a vezetési és pihenőidő betartása, menetíró (tachográf) használata.",
          "Alacsonyabb sebességhatárok érvényesek, mint a személygépkocsira.",
          "Fokozottan ügyelj a holttérre és a hosszú fékútra.",
        ],
        en: [
          "Driving/rest times must be observed and a tachograph used.",
          "Lower speed limits apply than for cars.",
          "Pay extra attention to blind spots and the long braking distance.",
        ],
      },
      quizCat: "truck",
    },
    {
      id: "ce",
      code: "C+E",
      icon: "truck",
      accent: "#c2410c",
      name: { hu: "Tehergépkocsi pótkocsival (C+E)", en: "Truck with trailer (C+E)" },
      minAge: { hu: "21 év (GKI-val 18)", en: "21 years (18 with CPC)" },
      speed: { hu: "Nyerges/pótkocsis szerelvény határai", en: "Articulated combination limits" },
      allows: {
        hu: "C kategóriás vontató nehéz pótkocsival vagy félpótkocsival (nyerges szerelvény).",
        en: "A category-C tractor unit with a heavy trailer or semi-trailer (articulated rig).",
      },
      rules: {
        hu: [
          "A leghosszabb és legnehezebb közúti szerelvények — kiemelt körültekintés szükséges.",
          "A kanyarodás, tolatás és előzés különös figyelmet igényel.",
        ],
        en: [
          "The longest, heaviest road combinations — demand maximum care.",
          "Turning, reversing and overtaking require special attention.",
        ],
      },
      quizCat: "truck",
    },
    {
      id: "d",
      code: "D",
      icon: "bus",
      accent: "#0d9488",
      name: { hu: "Autóbusz (D)", en: "Bus (D)" },
      minAge: { hu: "24 év (GKI-val 21)", en: "24 years (21 with CPC)" },
      speed: { hu: "Lakott: 50 · Úton: 70 · Autópálya: 80–100 km/h", en: "Town 50 · Road 70 · Motorway 80–100 km/h" },
      allows: {
        hu: "8 főnél több személy szállítására tervezett autóbuszok, könnyű pótkocsival.",
        en: "Buses designed to carry more than 8 passengers, with a light trailer.",
      },
      rules: {
        hu: [
          "Utasok biztonsága az első — indulás előtt győződj meg a biztonságos beszállásról.",
          "Megállóból kihaladáskor lakott területen elsőbbséget kell adni az autóbusznak.",
          "Vezetési és pihenőidő, menetíró használata kötelező.",
        ],
        en: [
          "Passenger safety comes first — ensure safe boarding before setting off.",
          "In built-up areas, buses must be given priority when pulling out of a stop.",
          "Driving/rest times and tachograph use are mandatory.",
        ],
      },
      quizCat: "bus",
    },
    {
      id: "t",
      code: "T",
      icon: "tractor",
      accent: "#65a30d",
      name: { hu: "Mezőgazdasági vontató (T)", en: "Agricultural tractor (T)" },
      minAge: { hu: "16 év", en: "16 years" },
      speed: { hu: "Jellemzően max. 40 km/h", en: "Typically max. 40 km/h" },
      allows: {
        hu: "Mezőgazdasági vontató és lassú jármű, pótkocsival; jellemzően kis sebességű közúti közlekedésre.",
        en: "Agricultural tractors and slow vehicles with trailers; typically low-speed road use.",
      },
      rules: {
        hu: [
          "Autópályán és autóúton tilos közlekedni.",
          "Lassú jármű hátsó jelzéssel; éjjel és rossz látási viszonyok közt fokozott figyelem.",
          "Lakott területen kívül a feltartott forgalmat lehetőség szerint engedd el.",
        ],
        en: [
          "Motorways and expressways are off-limits.",
          "Slow-vehicle marking required; extra care at night and in poor visibility.",
          "Let held-up traffic pass where possible outside built-up areas.",
        ],
      },
      quizCat: "general",
    },
  ];

  global.KRESZ = global.KRESZ || {};
  global.KRESZ.VEHICLES = VEHICLES;
})(window);
