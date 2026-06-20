/* ============================================================
   KRESZ Code Web App — Quiz question bank
   Each question:
   { cat, sign?, q{hu,en}, options{hu[],en[]}, answer, explain{hu,en} }
   `cat` matches a quiz category id; `sign` references a sign id
   so the quiz can render its SVG.
   ============================================================ */
(function (global) {
  "use strict";

  const QUESTIONS = [
    // ---------------- GENERAL ----------------
    {
      cat: "general",
      q: {
        hu: "Mekkora az általános sebességhatár lakott területen, ha tábla másként nem rendelkezik?",
        en: "What is the default speed limit in built-up areas, unless signed otherwise?",
      },
      options: {
        hu: ["30 km/h", "40 km/h", "50 km/h", "60 km/h"],
        en: ["30 km/h", "40 km/h", "50 km/h", "60 km/h"],
      },
      answer: 2,
      explain: {
        hu: "Lakott területen az általános sebességhatár 50 km/h, kivéve, ha tábla mást ír elő.",
        en: "In built-up areas the default limit is 50 km/h unless a sign indicates otherwise.",
      },
    },
    {
      cat: "general",
      q: {
        hu: "Mennyi az alkoholszint megengedett határa a vezetők számára Magyarországon?",
        en: "What is the permitted blood-alcohol limit for drivers in Hungary?",
      },
      options: {
        hu: ["0,0 ‰ (zéró tolerancia)", "0,2 ‰", "0,5 ‰", "0,8 ‰"],
        en: ["0.0 ‰ (zero tolerance)", "0.2 ‰", "0.5 ‰", "0.8 ‰"],
      },
      answer: 0,
      explain: {
        hu: "Magyarországon zéró tolerancia van: vezetés közben semmilyen alkohol nem lehet a szervezetben.",
        en: "Hungary applies zero tolerance: no alcohol at all is allowed while driving.",
      },
    },
    {
      cat: "general",
      q: {
        hu: "Mikor kötelező a tompított fényszóró használata személygépkocsival lakott területen kívül, nappal?",
        en: "When must a car use dipped headlights outside built-up areas during the day?",
      },
      options: {
        hu: ["Soha", "Csak esőben", "Mindig (nappal is)", "Csak alagútban"],
        en: ["Never", "Only in rain", "Always (even in daylight)", "Only in tunnels"],
      },
      answer: 2,
      explain: {
        hu: "Lakott területen kívül nappal is kötelező legalább a tompított fényszóró (vagy nappali menetfény) használata.",
        en: "Outside built-up areas, dipped headlights (or daytime running lights) are mandatory even in daylight.",
      },
    },
    {
      cat: "general",
      q: {
        hu: "Mit kell tenned, ha hátulról megkülönböztető jelzést használó (kék fény, sziréna) jármű közeledik?",
        en: "What must you do when an emergency vehicle (blue lights and siren) approaches from behind?",
      },
      options: {
        hu: [
          "Gyorsíts, hogy ne tartsd fel",
          "Hirtelen fékezz le",
          "Adj szabad utat, szükség esetén állj félre",
          "Hagyd figyelmen kívül, ha zöld a lámpa",
        ],
        en: [
          "Speed up so you don't hold it up",
          "Brake suddenly",
          "Give way, pull aside if necessary",
          "Ignore it if your light is green",
        ],
      },
      answer: 2,
      explain: {
        hu: "Szabad utat kell biztosítani: lassíts, húzódj félre, és szükség esetén állj meg — még piros lámpánál is óvatosan utat engedhetsz.",
        en: "You must give way: slow down, pull aside and stop if needed — you may carefully clear the way even at a red light.",
      },
    },
    {
      cat: "general",
      q: {
        hu: "Mikor használhatod a vészvillogót menet közben?",
        en: "When may you use hazard warning lights while moving?",
      },
      options: {
        hu: [
          "Ha gyorsan szeretnél parkolni bárhol",
          "Ha váratlan forgalmi akadály/veszély miatt figyelmeztetni kell a mögötted jövőket",
          "Éjszaka világítás helyett",
          "Soha nem szabad menet közben",
        ],
        en: [
          "To park quickly anywhere",
          "To warn following traffic of a sudden obstacle/hazard",
          "At night instead of headlights",
          "Never while moving",
        ],
      },
      answer: 1,
      explain: {
        hu: "A vészvillogó akkor használható menet közben, ha hirtelen kialakult veszélyre (pl. torlódás vége) kell figyelmeztetni a többi járművezetőt.",
        en: "Hazard lights may be used while moving to warn other drivers of a sudden danger (e.g. the tail of a traffic jam).",
      },
    },
    {
      cat: "general",
      q: {
        hu: "Mit jelez a felfestett záróvonal (folytonos terelővonal) az úttest közepén?",
        en: "What does a solid centre line painted on the road mean?",
      },
      options: {
        hu: [
          "Szabadon át lehet lépni",
          "Tilos átlépni vagy ráhajtani",
          "Csak előzéskor szabad átlépni",
          "Csak éjszaka érvényes",
        ],
        en: [
          "You may cross it freely",
          "You must not cross or straddle it",
          "Cross it only to overtake",
          "It is valid only at night",
        ],
      },
      answer: 1,
      explain: {
        hu: "A folytonos záróvonalat tilos átlépni vagy érinteni; elválasztja a forgalmi irányokat vagy sávokat.",
        en: "A solid line must not be crossed or touched; it separates traffic directions or lanes.",
      },
    },

    // ---------------- SIGNS (recognition) ----------------
    {
      cat: "signs",
      sign: "p-stop",
      q: { hu: "Mit jelent ez a tábla?", en: "What does this sign mean?" },
      options: {
        hu: [
          "Elsőbbségadás kötelező",
          "Állj! Elsőbbségadás kötelező — meg kell állni",
          "Behajtani tilos",
          "Főútvonal",
        ],
        en: [
          "Give way",
          "Stop and give way — you must stop",
          "No entry",
          "Priority road",
        ],
      },
      answer: 1,
      explain: {
        hu: "A nyolcszögletű STOP tábla kötelező megállást ír elő a megállás helyénél, majd elsőbbségadást.",
        en: "The octagonal STOP sign requires a full stop at the stop line, then giving way.",
      },
    },
    {
      cat: "signs",
      sign: "pr-no-entry",
      q: { hu: "Mit jelent ez a tábla?", en: "What does this sign mean?" },
      options: {
        hu: [
          "Behajtani tilos (ebből az irányból)",
          "Egyirányú út",
          "Megállni tilos",
          "Útszűkület",
        ],
        en: [
          "No entry (from this direction)",
          "One-way street",
          "No stopping",
          "Road narrows",
        ],
      },
      answer: 0,
      explain: {
        hu: "A piros korong fehér vízszintes sávval azt jelzi: ebből az irányból behajtani tilos.",
        en: "A red disc with a white horizontal bar means no entry from this direction.",
      },
    },
    {
      cat: "signs",
      sign: "p-give-way",
      q: { hu: "Mit jelent ez a tábla?", en: "What does this sign mean?" },
      options: {
        hu: [
          "Állj, kötelező megállás",
          "Elsőbbségadás kötelező",
          "Veszélyes kanyar",
          "Gyalogátkelő",
        ],
        en: [
          "Stop, mandatory halt",
          "Give way (yield)",
          "Dangerous bend",
          "Pedestrian crossing",
        ],
      },
      answer: 1,
      explain: {
        hu: "A fordított, csúcsára állított háromszög az elsőbbségadás kötelező táblája; meg kell adni az elsőbbséget.",
        en: "The downward-pointing triangle is the give-way sign; you must yield to other traffic.",
      },
    },
    {
      cat: "signs",
      sign: "pr-no-overtaking",
      q: { hu: "Mit jelent ez a tábla?", en: "What does this sign mean?" },
      options: {
        hu: [
          "Két sáv egyesül",
          "Előzni tilos",
          "Kétirányú forgalom",
          "Párhuzamos parkolás",
        ],
        en: [
          "Two lanes merge",
          "No overtaking",
          "Two-way traffic",
          "Parallel parking",
        ],
      },
      answer: 1,
      explain: {
        hu: "Az egymás melletti piros és fekete autó az előzési tilalmat jelzi (a kétkerekűek előzése jellemzően megengedett).",
        en: "Two cars side by side (red and black) indicate a ban on overtaking (overtaking two-wheelers is usually allowed).",
      },
    },
    {
      cat: "signs",
      sign: "m-roundabout",
      q: { hu: "Mit jelent ez a kék tábla?", en: "What does this blue sign mean?" },
      options: {
        hu: [
          "Körforgalom — a nyilak irányában kötelező haladni",
          "Veszélyes kanyar",
          "Kötelező megfordulni",
          "Parkoló",
        ],
        en: [
          "Roundabout — travel in the direction of the arrows",
          "Dangerous bend",
          "Mandatory U-turn",
          "Parking",
        ],
      },
      answer: 0,
      explain: {
        hu: "A kék kör a körforgalom kötelező haladási irányát mutatja (Magyarországon az óramutatóval ellentétesen).",
        en: "The blue circle shows the mandatory direction in a roundabout (anti-clockwise in Hungary).",
      },
    },
    {
      cat: "signs",
      sign: "p-priority-road",
      q: { hu: "Mit jelent ez a sárga tábla?", en: "What does this yellow sign mean?" },
      options: {
        hu: [
          "Útépítés",
          "Főútvonal — elsőbbséged van a kereszteződésekben",
          "Terelőút",
          "Sebességkorlátozás vége",
        ],
        en: [
          "Road works",
          "Priority road — you have priority at junctions",
          "Diversion",
          "End of speed limit",
        ],
      },
      answer: 1,
      explain: {
        hu: "A sárga, fehér kerettel ellátott rombusz a főútvonalat jelzi: a kereszteződésekben elsőbbséged van.",
        en: "The yellow diamond with a white border marks a priority road: you have priority at junctions.",
      },
    },
    {
      cat: "signs",
      sign: "pr-no-stopping",
      q: { hu: "Mit jelent ez a tábla?", en: "What does this sign mean?" },
      options: {
        hu: ["Várakozni tilos", "Megállni tilos", "Behajtani tilos", "Parkolóhely"],
        en: ["No waiting", "No stopping", "No entry", "Parking area"],
      },
      answer: 1,
      explain: {
        hu: "A kék korong piros kerettel és piros X-szel a megállási tilalmat jelzi (a várakozni tilos csak egy átlós vonal).",
        en: "The blue disc with red border and a red cross means no stopping (no waiting has only one diagonal line).",
      },
    },
    {
      cat: "signs",
      sign: "w-children",
      q: { hu: "Mit jelez ez a háromszög alakú tábla?", en: "What does this triangular sign warn of?" },
      options: {
        hu: ["Gyalogátkelő", "Gyermekek (pl. iskola közelében)", "Munkagödör", "Vásár"],
        en: ["Pedestrian crossing", "Children (e.g. near a school)", "Road works", "Market"],
      },
      answer: 1,
      explain: {
        hu: "A piros szegélyű háromszög gyermekek (iskola, játszótér) közelségére figyelmeztet — fokozott óvatosság szükséges.",
        en: "The red-bordered triangle warns of children (school, playground) — extra caution is required.",
      },
    },

    // ---------------- PRIORITY / JUNCTIONS ----------------
    {
      cat: "priority",
      q: {
        hu: "Azonos rangú útkereszteződésben, jelzőtábla nélkül kinek van elsőbbsége?",
        en: "At an unsigned junction of equal-rank roads, who has priority?",
      },
      options: {
        hu: [
          "Aki gyorsabban ér oda",
          "A jobbról érkezőnek (jobbkéz-szabály)",
          "A balról érkezőnek",
          "Mindig az egyenesen haladónak",
        ],
        en: [
          "Whoever gets there faster",
          "The vehicle coming from the right (right-hand rule)",
          "The vehicle coming from the left",
          "Always the one going straight",
        ],
      },
      answer: 1,
      explain: {
        hu: "Jelzés hiányában a jobbkéz-szabály érvényes: a jobbról érkezőnek kell elsőbbséget adni.",
        en: "Without signs the right-hand rule applies: give way to traffic coming from your right.",
      },
    },
    {
      cat: "priority",
      q: {
        hu: "Körforgalomban — eltérő jelzés hiányában — kinek van elsőbbsége?",
        en: "In a roundabout, absent other signs, who has priority?",
      },
      options: {
        hu: [
          "A körbe behajtani szándékozónak",
          "A körforgalomban már bent haladónak",
          "A nagyobb járműnek",
          "A jobbról érkezőnek mindig",
        ],
        en: [
          "The vehicle wishing to enter",
          "The vehicle already on the roundabout",
          "The larger vehicle",
          "Always the one from the right",
        ],
      },
      answer: 1,
      explain: {
        hu: "A korszerű körforgalmaknál a körben haladónak van elsőbbsége; a behajtónak kell elsőbbséget adnia.",
        en: "At modern roundabouts the vehicle already circulating has priority; the entering vehicle must give way.",
      },
    },
    {
      cat: "priority",
      q: {
        hu: "Bekanyarodáskor kinek kell elsőbbséget adnod a gyalogosoknak?",
        en: "When turning, to which pedestrians must you give way?",
      },
      options: {
        hu: [
          "Senkinek, a járműé az elsőbbség",
          "Csak a zebrán lévőknek a túloldalon",
          "Az úttesten, amelyre bekanyarodsz, áthaladó gyalogosoknak",
          "Csak gyermekeknek",
        ],
        en: [
          "None, the vehicle has priority",
          "Only those on a zebra on the far side",
          "Pedestrians crossing the road you are turning into",
          "Only children",
        ],
      },
      answer: 2,
      explain: {
        hu: "Bekanyarodáskor elsőbbséget kell adni annak az úttestnek a gyalogosforgalmának, amelyre rá kívánsz hajtani.",
        en: "When turning you must give way to pedestrians crossing the road you are turning into.",
      },
    },
    {
      cat: "priority",
      sign: "p-priority-over",
      q: {
        hu: "Ezzel a táblával jelzett szűk útszakaszon kinek van elsőbbsége?",
        en: "On a narrow section marked with this sign, who has priority?",
      },
      options: {
        hu: [
          "Neked (a fekete nyíl irányában)",
          "A szembejövőnek",
          "A nagyobb járműnek",
          "Mindig meg kell állni",
        ],
        en: [
          "You (the black-arrow direction)",
          "Oncoming traffic",
          "The larger vehicle",
          "You must always stop",
        ],
      },
      answer: 0,
      explain: {
        hu: "A fekete nyíl a te irányod elsőbbségét jelzi a szemből érkezőkkel (piros nyíl) szemben.",
        en: "The black arrow shows that your direction has priority over oncoming traffic (red arrow).",
      },
    },
    {
      cat: "priority",
      q: {
        hu: "Villamossal találkozva kereszteződésben mi a fő szabály?",
        en: "When meeting a tram at a junction, what is the main rule?",
      },
      options: {
        hu: [
          "A villamosnak mindig van elsőbbsége minden helyzetben",
          "A villamos elsőbbsége gyakran erősebb, mert nehezebben áll meg és nem tud kitérni",
          "A villamosnak sosincs elsőbbsége",
          "Csak este van elsőbbsége",
        ],
        en: [
          "The tram always has priority in every situation",
          "A tram often has stronger priority because it cannot easily stop or steer aside",
          "A tram never has priority",
          "It has priority only at night",
        ],
      },
      answer: 1,
      explain: {
        hu: "A villamos kötött pályán halad, nehezen áll meg és nem tér ki, ezért elsőbbsége sok helyzetben erősebb — mindig légy óvatos vele.",
        en: "A tram runs on rails, cannot easily stop or swerve, so its priority is often stronger — always be cautious around it.",
      },
    },

    // ---------------- MOPED (AM) ----------------
    {
      cat: "moped",
      q: {
        hu: "Hány éves kortól vezethető segédmotoros kerékpár (AM kategória)?",
        en: "From what age can you ride a moped (category AM)?",
      },
      options: { hu: ["12", "14", "16", "18"], en: ["12", "14", "16", "18"] },
      answer: 1,
      explain: {
        hu: "Az AM kategóriás vezetői engedély 14 éves kortól szerezhető meg.",
        en: "The AM-category licence can be obtained from the age of 14.",
      },
    },
    {
      cat: "moped",
      q: {
        hu: "Mekkora a segédmotoros kerékpár (AM) maximális tervezési sebessége?",
        en: "What is the maximum design speed of an AM-category moped?",
      },
      options: {
        hu: ["25 km/h", "45 km/h", "60 km/h", "90 km/h"],
        en: ["25 km/h", "45 km/h", "60 km/h", "90 km/h"],
      },
      answer: 1,
      explain: {
        hu: "A segédmotoros kerékpár legnagyobb tervezési sebessége 45 km/h, motorja legfeljebb 50 cm³.",
        en: "A moped's maximum design speed is 45 km/h, with an engine up to 50 cm³.",
      },
    },
    {
      cat: "moped",
      q: {
        hu: "Kötelező-e a bukósisak viselése segédmotoros kerékpáron?",
        en: "Is a crash helmet mandatory on a moped?",
      },
      options: {
        hu: ["Igen, kötelező", "Csak lakott területen kívül", "Nem kötelező", "Csak utasnak"],
        en: ["Yes, mandatory", "Only outside built-up areas", "Not required", "Only for a passenger"],
      },
      answer: 0,
      explain: {
        hu: "A segédmotoros kerékpáron a vezetőnek (és utasnak) kötelező a megfelelő bukósisak viselése.",
        en: "On a moped the rider (and passenger) must wear an appropriate crash helmet.",
      },
    },
    {
      cat: "moped",
      sign: "pr-no-moped",
      q: { hu: "Mit jelent ez a tábla egy segédmotoros számára?", en: "What does this sign mean for a moped rider?" },
      options: {
        hu: [
          "Segédmotoros kerékpárral behajtani tilos",
          "Segédmotoros kerékpár-parkoló",
          "Kötelező segédmotorral haladni",
          "Motorszerviz",
        ],
        en: [
          "No mopeds (entry prohibited)",
          "Moped parking",
          "Mopeds compulsory",
          "Moped repair shop",
        ],
      },
      answer: 0,
      explain: {
        hu: "A piros körben lévő segédmotor azt jelzi: ezzel a járművel tilos behajtani az útszakaszra.",
        en: "A moped in a red circle means mopeds are prohibited from entering this road.",
      },
    },
    {
      cat: "moped",
      q: {
        hu: "Használhat-e segédmotoros kerékpár autópályát?",
        en: "May a moped use the motorway?",
      },
      options: {
        hu: ["Igen, mindig", "Csak nappal", "Nem, tilos", "Csak forgalom hiányában"],
        en: ["Yes, always", "Only in daytime", "No, it is prohibited", "Only when there is no traffic"],
      },
      answer: 2,
      explain: {
        hu: "Segédmotoros kerékpárral tilos autópályán és autóúton közlekedni a kis sebesség miatt.",
        en: "Mopeds are prohibited on motorways and expressways because of their low speed.",
      },
    },

    // ---------------- MOTORCYCLE (A) ----------------
    {
      cat: "motorcycle",
      q: {
        hu: "Hány éves kortól szerezhető meg a korlátozás nélküli „A” motoros kategória közvetlenül?",
        en: "From what age can the unrestricted 'A' motorcycle category be obtained directly?",
      },
      options: { hu: ["18", "20", "24", "21"], en: ["18", "20", "24", "21"] },
      answer: 2,
      explain: {
        hu: "A korlátlan „A” kategória közvetlenül 24 éves kortól, vagy 2 év A2-tapasztalattal 20 évesen szerezhető meg.",
        en: "The unrestricted 'A' category is available directly from 24, or at 20 with two years of A2 experience.",
      },
    },
    {
      cat: "motorcycle",
      q: {
        hu: "Nappal kötelező-e a tompított fény használata motorkerékpáron?",
        en: "Must a motorcycle use dipped headlights during the day?",
      },
      options: {
        hu: ["Igen, mindig", "Csak lakott területen kívül", "Nem", "Csak esőben"],
        en: ["Yes, always", "Only outside built-up areas", "No", "Only in rain"],
      },
      answer: 0,
      explain: {
        hu: "Motorkerékpárnak nappal is folyamatosan kell tompított (vagy nappali menet-) fényt használnia a jó láthatóság érdekében.",
        en: "A motorcycle must keep dipped (or daytime running) lights on even during the day for visibility.",
      },
    },
    {
      cat: "motorcycle",
      q: {
        hu: "Megengedett-e a motorkerékpárok számára a sávok közötti elfékezett sávváltogatás („filtering”) a magyar KRESZ szerint?",
        en: "Is lane-splitting/filtering between lanes allowed for motorcycles under Hungarian rules?",
      },
      options: {
        hu: [
          "Igen, bármikor",
          "Általában nem; a sávban kell haladni és a sávváltás szabályait betartani",
          "Csak autópályán",
          "Csak dugóban, korlátlanul",
        ],
        en: [
          "Yes, any time",
          "Generally no; you must stay in lane and follow lane-change rules",
          "Only on the motorway",
          "Only in jams, without limits",
        ],
      },
      answer: 1,
      explain: {
        hu: "A motorosnak is a forgalmi sávban kell haladnia; a sávok közötti „átszlalom” veszélyes és nem megengedett szabályos manőverként.",
        en: "Motorcyclists must travel within a lane; weaving between lanes is dangerous and not a permitted manoeuvre.",
      },
    },
    {
      cat: "motorcycle",
      sign: "pr-no-motorcycle",
      q: { hu: "Mit jelent ez a tábla?", en: "What does this sign mean?" },
      options: {
        hu: ["Motorszerviz", "Motorkerékpárral behajtani tilos", "Motoros parkoló", "Kötelező motorút"],
        en: ["Motorcycle service", "No motorcycles", "Motorcycle parking", "Compulsory motorcycle route"],
      },
      answer: 1,
      explain: {
        hu: "A piros körben lévő motorkerékpár a behajtási tilalmat jelzi motorkerékpárok számára.",
        en: "A motorcycle in a red circle indicates that motorcycles are prohibited from entering.",
      },
    },

    // ---------------- CAR (B) ----------------
    {
      cat: "car",
      q: {
        hu: "Mekkora az általános sebességhatár autópályán személygépkocsival?",
        en: "What is the default car speed limit on a motorway?",
      },
      options: {
        hu: ["100 km/h", "110 km/h", "120 km/h", "130 km/h"],
        en: ["100 km/h", "110 km/h", "120 km/h", "130 km/h"],
      },
      answer: 3,
      explain: {
        hu: "Személygépkocsival az autópályán az általános sebességhatár 130 km/h (autóúton 110 km/h).",
        en: "For cars the default motorway limit is 130 km/h (expressway 110 km/h).",
      },
    },
    {
      cat: "car",
      q: {
        hu: "Mekkora össztömegig vezethető jármű B kategóriás engedéllyel?",
        en: "Up to what total mass may you drive a vehicle with a category-B licence?",
      },
      options: {
        hu: ["2500 kg", "3500 kg", "5000 kg", "7500 kg"],
        en: ["2500 kg", "3500 kg", "5000 kg", "7500 kg"],
      },
      answer: 1,
      explain: {
        hu: "B kategóriával legfeljebb 3500 kg megengedett össztömegű jármű vezethető, max. 8+1 fővel.",
        en: "Category B allows vehicles up to 3500 kg total mass, with a maximum of 8+1 occupants.",
      },
    },
    {
      cat: "car",
      q: {
        hu: "Kötelező-e a biztonsági öv a hátsó ülésen utazóknak?",
        en: "Are rear-seat passengers required to wear seat belts?",
      },
      options: {
        hu: ["Csak a városon kívül", "Igen, mindenkinek", "Nem, csak elöl", "Csak gyermekeknek"],
        en: ["Only outside town", "Yes, for everyone", "No, only in front", "Only for children"],
      },
      answer: 1,
      explain: {
        hu: "A biztonsági öv használata minden ülésen, minden utasra kötelező, ahol van öv beszerelve.",
        en: "Seat-belt use is mandatory in every seat, for every occupant, where belts are fitted.",
      },
    },
    {
      cat: "car",
      q: {
        hu: "Mit kell tartanod a kötelezően magaddal vinni a gépkocsiban a forgalmi engedély és jogosítvány mellett?",
        en: "Besides the licence and registration, what must a car carry by law?",
      },
      options: {
        hu: [
          "Pótkereket és szerszámot",
          "Elsősegélydobozt és elakadásjelző háromszöget",
          "Tűzoltó készüléket kötelezően",
          "Tartalék izzókészletet",
        ],
        en: [
          "A spare wheel and tools",
          "A first-aid kit and a warning triangle",
          "A fire extinguisher (mandatory)",
          "A spare-bulb kit",
        ],
      },
      answer: 1,
      explain: {
        hu: "Személygépkocsiban kötelező az elsősegélydoboz és az elakadásjelző háromszög; láthatósági mellény erősen ajánlott.",
        en: "Cars must carry a first-aid kit and a warning triangle; a hi-vis vest is strongly recommended.",
      },
    },
    {
      cat: "car",
      sign: "pr-speed-50",
      q: { hu: "Mit ír elő ez a tábla?", en: "What does this sign require?" },
      options: {
        hu: [
          "Legalább 50 km/h kötelező",
          "Legfeljebb 50 km/h sebesség engedélyezett",
          "50 méter múlva kanyar",
          "50-es út száma",
        ],
        en: [
          "At least 50 km/h required",
          "Maximum 50 km/h allowed",
          "Bend in 50 metres",
          "Road number 50",
        ],
      },
      answer: 1,
      explain: {
        hu: "A piros korong a számmal a megengedett legnagyobb sebességet jelzi — itt 50 km/h.",
        en: "A red circle with a number shows the maximum permitted speed — here 50 km/h.",
      },
    },

    // ---------------- TRUCK (C) ----------------
    {
      cat: "truck",
      q: {
        hu: "Mekkora az általános sebességhatár tehergépkocsival (3,5 t felett) autópályán?",
        en: "What is the default truck (over 3.5 t) speed limit on a motorway?",
      },
      options: {
        hu: ["80 km/h", "90 km/h", "100 km/h", "110 km/h"],
        en: ["80 km/h", "90 km/h", "100 km/h", "110 km/h"],
      },
      answer: 0,
      explain: {
        hu: "A 3,5 tonna feletti tehergépkocsik autópályán legfeljebb 80 km/h sebességgel haladhatnak.",
        en: "Trucks over 3.5 tonnes may travel at no more than 80 km/h on motorways.",
      },
    },
    {
      cat: "truck",
      q: {
        hu: "Mit kell figyelembe venned a tehergépkocsi nagy holttere miatt?",
        en: "What must you consider because of a truck's large blind spots?",
      },
      options: {
        hu: [
          "Semmit, a tükrök mindent mutatnak",
          "Kanyarodás és sávváltás előtt fokozottan ellenőrizni kell a holtteret",
          "Csak hátramenetben fontos",
          "Csak éjszaka",
        ],
        en: [
          "Nothing, mirrors show everything",
          "Check blind spots carefully before turning and changing lanes",
          "Only matters when reversing",
          "Only at night",
        ],
      },
      answer: 1,
      explain: {
        hu: "A tehergépkocsinak nagy a holttere; kanyarodás, sávváltás és tolatás előtt különösen körültekintően kell ellenőrizni.",
        en: "Trucks have large blind spots; check especially carefully before turning, changing lanes and reversing.",
      },
    },
    {
      cat: "truck",
      q: {
        hu: "Mi a tachográf (menetíró) szerepe?",
        en: "What is the role of the tachograph?",
      },
      options: {
        hu: [
          "Üzemanyag mérése",
          "A vezetési és pihenőidők rögzítése",
          "Navigáció",
          "Sebességkorlátozó kikapcsolása",
        ],
        en: [
          "Measuring fuel",
          "Recording driving and rest times",
          "Navigation",
          "Disabling the speed limiter",
        ],
      },
      answer: 1,
      explain: {
        hu: "A tachográf rögzíti a vezetési és pihenőidőket, amelyek betartása a fáradtság elleni védelem miatt kötelező.",
        en: "The tachograph records driving and rest times, whose observance is mandatory to guard against fatigue.",
      },
    },
    {
      cat: "truck",
      sign: "pr-no-trucks",
      q: { hu: "Mit jelent ez a tábla?", en: "What does this sign mean?" },
      options: {
        hu: [
          "Tehergépkocsival behajtani tilos",
          "Teherautó-parkoló",
          "Rakodóhely",
          "Kötelező teherautóút",
        ],
        en: ["No trucks (entry prohibited)", "Truck parking", "Loading bay", "Compulsory truck route"],
      },
      answer: 0,
      explain: {
        hu: "A piros körben lévő tehergépkocsi a behajtási tilalmat jelzi (a tömeghatár a táblán szerepelhet).",
        en: "A truck in a red circle indicates a ban on entry (a weight limit may be shown on the sign).",
      },
    },

    // ---------------- BUS (D) ----------------
    {
      cat: "bus",
      q: {
        hu: "Lakott területen mit kell tenned, ha az autóbusz a megállóból ki akar haladni és bekapcsolja az irányjelzőt?",
        en: "In a built-up area, what must you do when a bus signals to pull out of a stop?",
      },
      options: {
        hu: [
          "Gyorsíts, hogy elmenj előtte",
          "Adj elsőbbséget az autóbusznak (lassíts, engedd ki)",
          "Dudálj rá",
          "Semmi teendő",
        ],
        en: [
          "Speed up to pass it",
          "Give way to the bus (slow down and let it out)",
          "Honk at it",
          "Nothing to do",
        ],
      },
      answer: 1,
      explain: {
        hu: "Lakott területen elsőbbséget kell adni a megállóból kihaladó, irányjelzőt használó autóbusznak — de balesetveszélyt nem szabad okozni.",
        en: "In built-up areas you must give way to a bus pulling out of a stop with its indicator on — without causing danger.",
      },
    },
    {
      cat: "bus",
      q: {
        hu: "Mekkora az általános sebességhatár autóbusszal lakott területen kívül, sima úton?",
        en: "What is the default bus speed limit on an ordinary road outside built-up areas?",
      },
      options: {
        hu: ["60 km/h", "70 km/h", "80 km/h", "90 km/h"],
        en: ["60 km/h", "70 km/h", "80 km/h", "90 km/h"],
      },
      answer: 1,
      explain: {
        hu: "Autóbusszal lakott területen kívül, sima úton az általános sebességhatár 70 km/h.",
        en: "For buses on ordinary roads outside built-up areas the default limit is 70 km/h.",
      },
    },
    {
      cat: "bus",
      q: {
        hu: "Mi a legfontosabb szempont autóbuszvezetőként induláskor?",
        en: "What is the most important consideration for a bus driver when setting off?",
      },
      options: {
        hu: [
          "A menetrend mindenáron",
          "Az utasok biztonsága és a biztonságos beszállás",
          "A gyors gyorsítás",
          "A rádió hangereje",
        ],
        en: [
          "Keeping the timetable at any cost",
          "Passenger safety and safe boarding",
          "Fast acceleration",
          "The radio volume",
        ],
      },
      answer: 1,
      explain: {
        hu: "Az utasok biztonsága az elsődleges: csak akkor indulj el, ha mindenki biztonságosan beszállt és az ajtók zárva vannak.",
        en: "Passenger safety is paramount: only set off once everyone has boarded safely and the doors are closed.",
      },
    },

    // ---------------- BICYCLE ----------------
    {
      cat: "bicycle",
      q: {
        hu: "Kötelező-e a láthatósági mellény kerékpárosnak lakott területen kívül, éjszaka?",
        en: "Is a hi-vis vest mandatory for a cyclist outside built-up areas at night?",
      },
      options: {
        hu: ["Igen, kötelező", "Csak ajánlott", "Nem", "Csak gyermekeknek"],
        en: ["Yes, mandatory", "Only recommended", "No", "Only for children"],
      },
      answer: 0,
      explain: {
        hu: "Lakott területen kívül, éjszaka vagy rossz látási viszonyok között a kerékpárosnak kötelező fényvisszaverő mellényt viselni.",
        en: "Outside built-up areas, at night or in poor visibility, cyclists must wear a reflective vest.",
      },
    },
    {
      cat: "bicycle",
      q: {
        hu: "Hol kell kerékpározni, ha van kijelölt kerékpárút?",
        en: "Where must you cycle when a designated cycle path exists?",
      },
      options: {
        hu: [
          "Az úttest közepén",
          "A kerékpárúton (annak használata kötelező)",
          "A járdán mindig",
          "Bárhol szabadon",
        ],
        en: [
          "In the middle of the road",
          "On the cycle path (its use is mandatory)",
          "Always on the pavement",
          "Anywhere you like",
        ],
      },
      answer: 1,
      explain: {
        hu: "Ahol van kerékpárút vagy kerékpársáv, annak használata kötelező; egyébként az úttest jobb szélén kell haladni.",
        en: "Where a cycle path or lane exists, you must use it; otherwise ride on the right edge of the road.",
      },
    },
    {
      cat: "bicycle",
      q: {
        hu: "Hány éves korig kísérheti felnőtt a gyermeket az úttesten kerékpárral, ahol ez előírás?",
        en: "Up to what age should a child be supervised when cycling on the road?",
      },
      options: { hu: ["10", "12", "14", "16"], en: ["10", "12", "14", "16"] },
      answer: 1,
      explain: {
        hu: "12 éven aluli gyermek az úttesten csak megfelelő felügyelettel kerékpározhat; egyébként a járdán is haladhat, ha nincs kerékpárút.",
        en: "A child under 12 may cycle on the road only with proper supervision; otherwise they may use the pavement if no cycle path exists.",
      },
    },
    {
      cat: "bicycle",
      sign: "m-cyclepath",
      q: { hu: "Mit jelent ez a kék tábla?", en: "What does this blue sign mean?" },
      options: {
        hu: [
          "Kerékpárral behajtani tilos",
          "Kerékpárút — kerékpárosok számára kötelező",
          "Kerékpárszerviz",
          "Kerékpárverseny",
        ],
        en: [
          "No bicycles",
          "Cycle path — mandatory for cyclists",
          "Bicycle repair",
          "Bicycle race",
        ],
      },
      answer: 1,
      explain: {
        hu: "A kék körben lévő fehér kerékpár a kerékpárutat jelzi, amelynek használata a kerékpárosok számára kötelező.",
        en: "A white bicycle in a blue circle marks a cycle path, which cyclists are required to use.",
      },
    },
    {
      cat: "bicycle",
      q: {
        hu: "Szabad-e kézben tartott mobiltelefont használni kerékpározás közben?",
        en: "May you use a hand-held mobile phone while cycling?",
      },
      options: {
        hu: ["Igen", "Nem", "Csak álló helyzetben", "Csak kerékpárúton"],
        en: ["Yes", "No", "Only while stationary", "Only on a cycle path"],
      },
      answer: 2,
      explain: {
        hu: "Menet közben tilos a kézben tartott mobil használata; ha telefonálnod kell, állj meg biztonságosan.",
        en: "Using a hand-held phone while riding is prohibited; if you must use it, stop safely first.",
      },
    },
  ];

  global.KRESZ = global.KRESZ || {};
  global.KRESZ.QUESTIONS = QUESTIONS;
})(window);
