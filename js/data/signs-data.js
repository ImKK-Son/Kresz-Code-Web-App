/* ============================================================
   KRESZ Code Web App — Road sign dataset
   Each sign: { id, category, name{hu,en}, desc{hu,en}, svg }
   SVGs are inline so the app works fully offline.
   ============================================================ */
(function (global) {
  "use strict";

  // Realistic sign palette (independent of UI theme)
  const RED = "#e4002b";
  const BLUE = "#0050a0";
  const YELLOW = "#ffcc00";
  const BLACK = "#1a1a1a";
  const WHITE = "#ffffff";

  const NS = `xmlns="http://www.w3.org/2000/svg"`;
  const svg = (inner) =>
    `<svg viewBox="0 0 100 100" ${NS} role="img" preserveAspectRatio="xMidYMid meet">${inner}</svg>`;

  // --- Shape templates ----------------------------------------------------
  const warn = (sym) =>
    svg(
      `<polygon points="50,8 94,84 6,84" fill="${WHITE}" stroke="${RED}" stroke-width="7" stroke-linejoin="round"/>${sym}`
    );
  const prohibit = (sym) =>
    svg(`<circle cx="50" cy="50" r="43" fill="${WHITE}" stroke="${RED}" stroke-width="8"/>${sym}`);
  const mandatory = (sym) =>
    svg(`<circle cx="50" cy="50" r="45" fill="${BLUE}"/>${sym}`);
  const info = (sym, bg) =>
    svg(`<rect x="8" y="8" width="84" height="84" rx="6" fill="${bg || BLUE}"/>${sym}`);

  // --- Reusable symbols ---------------------------------------------------
  const text = (t, opts = {}) =>
    `<text x="${opts.x || 50}" y="${opts.y || 52}" text-anchor="middle" dominant-baseline="central" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="${opts.size || 40}" fill="${opts.fill || BLACK}">${t}</text>`;

  const pedestrian = (cx, cy, s, fill) =>
    `<g transform="translate(${cx},${cy}) scale(${s})" fill="${fill}">
      <circle cx="0" cy="-22" r="5"/>
      <path d="M-2,-16 q-9,4 -11,13 l3,2 q3,-6 6,-8 l-1,9 -7,16 4,2 6,-13 3,7 -3,12 4,1 4,-13 q1,-3 -1,-7 l-1,-11 q4,5 9,6 l1,-4 q-6,-2 -9,-7 q-2,-3 -7,-2z"/>
    </g>`;

  const bicycle = (cx, cy, s, fill) =>
    `<g transform="translate(${cx},${cy}) scale(${s})" fill="none" stroke="${fill}" stroke-width="2.4">
      <circle cx="-12" cy="6" r="9"/>
      <circle cx="12" cy="6" r="9"/>
      <path d="M-12,6 L-2,-9 L10,-9 M-2,-9 L4,6 H-12 M4,6 L12,6 M10,-9 l3,0" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="-12" cy="6" r="1.4" fill="${fill}"/>
      <circle cx="12" cy="6" r="1.4" fill="${fill}"/>
    </g>`;

  const moped = (cx, cy, s, fill) =>
    `<g transform="translate(${cx},${cy}) scale(${s})" fill="${fill}">
      <circle cx="-13" cy="8" r="6.5" fill="none" stroke="${fill}" stroke-width="2.6"/>
      <circle cx="13" cy="8" r="6.5" fill="none" stroke="${fill}" stroke-width="2.6"/>
      <path d="M-13,8 l8,-12 h10 l4,5 h6 l-2,4 h-9 l-4,-5 h-6 z" />
      <path d="M5,-4 l4,-6 h6" fill="none" stroke="${fill}" stroke-width="2.6" stroke-linecap="round"/>
    </g>`;

  const motorcycle = (cx, cy, s, fill) =>
    `<g transform="translate(${cx},${cy}) scale(${s})" fill="${fill}">
      <circle cx="-15" cy="8" r="7.5" fill="none" stroke="${fill}" stroke-width="3"/>
      <circle cx="15" cy="8" r="7.5" fill="none" stroke="${fill}" stroke-width="3"/>
      <path d="M-15,8 l6,-9 h12 l5,9 M-9,-1 h14 l5,-6 h5" fill="none" stroke="${fill}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    </g>`;

  const car = (cx, cy, s, fill) =>
    `<g transform="translate(${cx},${cy}) scale(${s})" fill="${fill}">
      <path d="M-20,4 l3,-8 q1,-3 5,-3.5 q7,-1 14,0 q4,0.5 5,3.5 l3,8 q3,0.5 3,4 v3 q0,2 -2,2 h-3 a3.2,3.2 0 0 1 -6.4,0 h-13.2 a3.2,3.2 0 0 1 -6.4,0 h-3 q-2,0 -2,-2 v-3 q0,-3.5 3,-4z"/>
      <path d="M-12,-5 h24 l2,6 h-28z" fill="${WHITE}"/>
    </g>`;

  const truck = (cx, cy, s, fill) =>
    `<g transform="translate(${cx},${cy}) scale(${s})" fill="${fill}">
      <path d="M-24,-8 h22 v10 h9 l5,6 v6 h-3 a3,3 0 0 1 -6,0 h-12 a3,3 0 0 1 -6,0 h-9 a3,3 0 0 1 -1,-2 v-24 a2,2 0 0 1 1,-2z"/>
      <path d="M2,-2 h6 l3,4 h-9z" fill="${WHITE}"/>
    </g>`;

  const bus = (cx, cy, s, fill) =>
    `<g transform="translate(${cx},${cy}) scale(${s})" fill="${fill}">
      <rect x="-20" y="-12" width="40" height="22" rx="4"/>
      <rect x="-16" y="-8" width="32" height="8" fill="${WHITE}"/>
      <circle cx="-11" cy="11" r="3.4"/>
      <circle cx="11" cy="11" r="3.4"/>
    </g>`;

  const deer = (cx, cy, s, fill) =>
    `<g transform="translate(${cx},${cy}) scale(${s})" fill="${fill}">
      <path d="M14,-18 l3,-6 1,5 4,-3 -2,5 4,0 -5,4 -4,2 q-3,2 -3,6 l1,16 -3,0 -2,-12 -7,0 -2,12 -3,0 1,-14 q-6,-2 -8,-8 l-4,1 1,-4 5,-1 q4,-7 12,-7 6,0 8,3z"/>
    </g>`;

  const arrow = (rot, fill) =>
    `<g transform="rotate(${rot} 50 50)"><path d="M50,24 l16,20 h-9 v22 h-14 v-22 h-9z" fill="${fill}"/></g>`;

  const bar = (fill) =>
    `<rect x="22" y="44" width="56" height="12" rx="2" fill="${fill || WHITE}"/>`;

  const slash = () =>
    `<line x1="20" y1="78" x2="80" y2="22" stroke="${RED}" stroke-width="8" stroke-linecap="round"/>`;
  const cross = () =>
    `<line x1="24" y1="76" x2="76" y2="24" stroke="${RED}" stroke-width="7" stroke-linecap="round"/>
     <line x1="24" y1="24" x2="76" y2="76" stroke="${RED}" stroke-width="7" stroke-linecap="round"/>`;

  // ========================================================================
  //  SIGN DEFINITIONS
  // ========================================================================
  const SIGNS = [
    // ---------------- WARNING (Veszélyt jelző) ----------------
    {
      id: "w-bend-right",
      category: "warning",
      name: { hu: "Veszélyes kanyar (jobbra)", en: "Dangerous bend (right)" },
      desc: {
        hu: "Az úton éles, jobbra ívelő kanyar következik. Csökkentsd a sebességet, és kerüld az előzést.",
        en: "A sharp bend to the right is ahead. Reduce speed and avoid overtaking.",
      },
      svg: warn(
        `<path d="M40,80 V58 Q40,42 56,42 H60" fill="none" stroke="${BLACK}" stroke-width="6" stroke-linecap="round"/><path d="M55,34 l12,8 -12,8z" fill="${BLACK}"/>`
      ),
    },
    {
      id: "w-double-bend",
      category: "warning",
      name: { hu: "Egymás utáni veszélyes kanyarok", en: "Double bend" },
      desc: {
        hu: "Több egymást követő ellentétes ívű kanyar következik. Tartsd a jobb oldalt és mérsékelt sebességet.",
        en: "Several successive bends in opposite directions. Keep right and a moderate speed.",
      },
      svg: warn(
        `<path d="M40,82 q0,-16 12,-20 q12,-4 12,-20 V34" fill="none" stroke="${BLACK}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/><path d="M58,38 l6,-12 6,12z" fill="${BLACK}"/>`
      ),
    },
    {
      id: "w-crossroads",
      category: "warning",
      name: { hu: "Útkereszteződés", en: "Crossroads ahead" },
      desc: {
        hu: "Azonos rangú utak kereszteződése következik. A jobbkéz-szabály érvényes, ha tábla vagy jelzés másként nem rendelkezik.",
        en: "A junction of roads of equal rank is ahead. The right-hand rule applies unless signs indicate otherwise.",
      },
      svg: warn(
        `<rect x="46" y="34" width="8" height="46" fill="${BLACK}"/><rect x="28" y="52" width="44" height="8" fill="${BLACK}"/>`
      ),
    },
    {
      id: "w-pedestrian",
      category: "warning",
      name: { hu: "Gyalogos-átkelőhely", en: "Pedestrian crossing ahead" },
      desc: {
        hu: "Kijelölt gyalogos-átkelőhely közeledik. Lassíts, és készülj fel a gyalogosok elsőbbségének megadására.",
        en: "A marked pedestrian crossing is ahead. Slow down and be ready to give way to pedestrians.",
      },
      svg: warn(pedestrian(50, 60, 1.05, BLACK)),
    },
    {
      id: "w-children",
      category: "warning",
      name: { hu: "Gyermekek", en: "Children" },
      desc: {
        hu: "Iskola, játszótér vagy más, gyermekek által gyakran használt terület következik. Fokozott figyelem és lassabb haladás szükséges.",
        en: "A school, playground or other area frequented by children is ahead. Pay extra attention and slow down.",
      },
      svg: warn(
        pedestrian(58, 60, 0.85, BLACK) + pedestrian(42, 62, 0.7, BLACK)
      ),
    },
    {
      id: "w-cyclists",
      category: "warning",
      name: { hu: "Kerékpárosok", en: "Cyclists" },
      desc: {
        hu: "Kerékpárút keresztezi az utat, vagy kerékpárosok léphetnek az úttestre. Számíts a kerékpáros forgalomra.",
        en: "A cycle path crosses the road or cyclists may enter it. Expect bicycle traffic.",
      },
      svg: warn(bicycle(50, 58, 1.25, BLACK)),
    },
    {
      id: "w-roadworks",
      category: "warning",
      name: { hu: "Útépítés (munkagödör)", en: "Road works" },
      desc: {
        hu: "Útépítési vagy karbantartási munka folyik. Lassíts, tartsd a biztonságos követési távolságot, és kövesd a terelést.",
        en: "Road works or maintenance ahead. Slow down, keep a safe distance and follow any diversions.",
      },
      svg: warn(
        `<g fill="${BLACK}"><circle cx="48" cy="40" r="4"/><path d="M44,46 h8 l4,18 -4,2 -4,-14 -4,14 -4,-2z"/><line x1="50" y1="50" x2="72" y2="40" stroke="${BLACK}" stroke-width="3"/><path d="M68,34 l10,2 -3,9z"/></g>`
      ),
    },
    {
      id: "w-slippery",
      category: "warning",
      name: { hu: "Csúszós úttest", en: "Slippery road" },
      desc: {
        hu: "Az úttest csúszóssá válhat (eső, jég, sár). Csökkentsd a sebességet, és kerüld a hirtelen kormány- és fékmozdulatokat.",
        en: "The road may become slippery (rain, ice, mud). Reduce speed and avoid sudden steering or braking.",
      },
      svg: warn(
        car(50, 52, 0.95, BLACK) +
          `<path d="M30,72 q4,-5 8,0 t8,0" fill="none" stroke="${BLACK}" stroke-width="3"/><path d="M54,72 q4,-5 8,0 t8,0" fill="none" stroke="${BLACK}" stroke-width="3"/>`
      ),
    },
    {
      id: "w-two-way",
      category: "warning",
      name: { hu: "Kétirányú forgalom", en: "Two-way traffic" },
      desc: {
        hu: "Egyirányú útszakasz után ismét kétirányúvá válik a forgalom, vagy szembejövő forgalomra kell számítani.",
        en: "Traffic becomes two-way again after a one-way section, or oncoming traffic must be expected.",
      },
      svg: warn(
        `<path d="M40,76 V40 M40,40 l-6,8 12,0z" fill="${BLACK}" stroke="${BLACK}" stroke-width="6" stroke-linecap="round"/><path d="M60,40 V76 M60,76 l-6,-8 12,0z" fill="${BLACK}" stroke="${BLACK}" stroke-width="6" stroke-linecap="round"/>`
      ),
    },
    {
      id: "w-traffic-light",
      category: "warning",
      name: { hu: "Fényjelző készülék", en: "Traffic signals ahead" },
      desc: {
        hu: "Forgalomirányító fényjelző készülék (jelzőlámpa) következik. Készülj fel a megállásra.",
        en: "Traffic-light signals are ahead. Be prepared to stop.",
      },
      svg: warn(
        `<rect x="42" y="32" width="16" height="40" rx="4" fill="${BLACK}"/><circle cx="50" cy="40" r="4" fill="#e4002b"/><circle cx="50" cy="52" r="4" fill="${YELLOW}"/><circle cx="50" cy="64" r="4" fill="#009640"/>`
      ),
    },
    {
      id: "w-wild-animals",
      category: "warning",
      name: { hu: "Vadveszély", en: "Wild animals" },
      desc: {
        hu: "Az útszakaszon vadak léphetnek az úttestre. Főleg hajnalban és alkonyatkor fokozottan figyelj, és lassíts.",
        en: "Wild animals may step onto the road. Be especially careful at dawn and dusk, and slow down.",
      },
      svg: warn(deer(48, 58, 0.95, BLACK)),
    },
    {
      id: "w-uneven",
      category: "warning",
      name: { hu: "Egyenetlen úttest", en: "Uneven road" },
      desc: {
        hu: "Az úttest egyenetlen (kátyúk, bukkanók). Csökkentsd a sebességet a jármű és az utasok védelmében.",
        en: "The road surface is uneven (potholes, bumps). Reduce speed to protect the vehicle and occupants.",
      },
      svg: warn(
        `<path d="M24,68 q8,-22 16,0 q8,-22 16,0 q8,-22 16,0" fill="none" stroke="${BLACK}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>`
      ),
    },
    {
      id: "w-roundabout",
      category: "warning",
      name: { hu: "Körforgalom", en: "Roundabout ahead" },
      desc: {
        hu: "Körforgalom következik. A körben haladóknak elsőbbségük van, ha jelzés másként nem rendelkezik.",
        en: "A roundabout is ahead. Traffic already on the roundabout has priority unless signed otherwise.",
      },
      svg: warn(
        `<g fill="none" stroke="${BLACK}" stroke-width="6"><path d="M38,46 a16,16 0 1 1 -4,16"/></g><path d="M30,54 l6,12 -14,-2z" fill="${BLACK}"/>`
      ),
    },
    {
      id: "w-narrow",
      category: "warning",
      name: { hu: "Az úttest beszűkülése", en: "Road narrows" },
      desc: {
        hu: "Az úttest mindkét oldalról vagy egyik oldalról szűkül. Igazítsd a sebességet és a sávhasználatot.",
        en: "The road narrows from both sides or one side. Adjust your speed and lane use.",
      },
      svg: warn(
        `<path d="M30,80 L42,40 M70,80 L58,40" fill="none" stroke="${BLACK}" stroke-width="6" stroke-linecap="round"/>`
      ),
    },
    {
      id: "w-railway",
      category: "warning",
      name: { hu: "Vasúti átjáró (sorompó nélkül)", en: "Railway crossing (no barrier)" },
      desc: {
        hu: "Biztosító berendezés (sorompó) nélküli vasúti átjáró következik. Lassíts, győződj meg a szabad pályáról, és csak akkor hajts át, ha biztonságos.",
        en: "An unguarded railway crossing (no barrier) is ahead. Slow down, make sure the track is clear, and cross only when safe.",
      },
      svg: warn(
        `<g fill="${BLACK}"><rect x="32" y="50" width="26" height="14" rx="2"/><rect x="50" y="42" width="12" height="22" rx="2"/><circle cx="38" cy="68" r="3.5"/><circle cx="54" cy="68" r="3.5"/><rect x="34" y="38" width="6" height="8"/><circle cx="37" cy="34" r="3" opacity="0.6"/></g>`
      ),
    },
    {
      id: "w-tram",
      category: "warning",
      name: { hu: "Villamos", en: "Tram crossing" },
      desc: {
        hu: "Villamospálya keresztezi az utat. A villamos kötött pályán halad és nehezen áll meg — gyakran erősebb az elsőbbsége.",
        en: "A tramway crosses the road. Trams run on rails and cannot stop easily — they often have stronger priority.",
      },
      svg: warn(
        `<g fill="${BLACK}"><rect x="38" y="40" width="24" height="28" rx="4"/><rect x="42" y="45" width="16" height="8" fill="${WHITE}"/><line x1="50" y1="40" x2="50" y2="30" stroke="${BLACK}" stroke-width="2.5"/><circle cx="44" cy="72" r="2.6"/><circle cx="56" cy="72" r="2.6"/></g>`
      ),
    },

    // ---------------- PRIORITY (Elsőbbség) ----------------
    {
      id: "p-priority-road",
      category: "priority",
      name: { hu: "Főútvonal", en: "Priority road" },
      desc: {
        hu: "Olyan úton haladsz, amely a kereszteződésekben elsőbbséget élvez. A jelzés a következő útkereszteződésig érvényes.",
        en: "You are on a road that has priority at junctions. Valid until the next junction.",
      },
      svg: svg(
        `<rect x="50" y="14" width="50.9" height="50.9" rx="6" transform="rotate(45 50 50)" fill="${YELLOW}" stroke="${WHITE}" stroke-width="5"/><rect x="50" y="26" width="34" height="34" rx="3" transform="rotate(45 50 50)" fill="${YELLOW}" stroke="${BLACK}" stroke-width="0"/>`
      ),
    },
    {
      id: "p-priority-end",
      category: "priority",
      name: { hu: "Főútvonal vége", en: "End of priority road" },
      desc: {
        hu: "Megszűnik a főútvonal-jelleg. A következő kereszteződésekben már nem élvezel automatikus elsőbbséget.",
        en: "The priority road ends. You no longer automatically have priority at upcoming junctions.",
      },
      svg: svg(
        `<rect x="50" y="14" width="50.9" height="50.9" rx="6" transform="rotate(45 50 50)" fill="${YELLOW}" stroke="${WHITE}" stroke-width="5"/><line x1="26" y1="74" x2="74" y2="26" stroke="${BLACK}" stroke-width="6"/>`
      ),
    },
    {
      id: "p-give-way",
      category: "priority",
      name: { hu: "Elsőbbségadás kötelező", en: "Give way (Yield)" },
      desc: {
        hu: "A kereszteződésben meg kell adnod az elsőbbséget a keresztező úton érkezőknek. Ha kell, állj meg.",
        en: "You must give way to traffic on the crossing road. Stop if necessary.",
      },
      svg: svg(
        `<polygon points="50,86 8,16 92,16" fill="${WHITE}" stroke="${RED}" stroke-width="8" stroke-linejoin="round"/>`
      ),
    },
    {
      id: "p-stop",
      category: "priority",
      name: { hu: "Állj! Elsőbbségadás kötelező", en: "Stop and give way" },
      desc: {
        hu: "Kötelező megállni a megállás helyét jelző vonalnál (vagy a belátható pontnál), és csak ezután, elsőbbség megadása mellett haladhatsz tovább.",
        en: "You must stop at the stop line (or where you can see), then proceed only after giving way.",
      },
      svg: svg(
        `<polygon points="32,8 68,8 92,32 92,68 68,92 32,92 8,68 8,32" fill="${RED}" stroke="${WHITE}" stroke-width="4"/>${text(
          "STOP",
          { fill: WHITE, size: 22 }
        )}`
      ),
    },
    {
      id: "p-priority-over",
      category: "priority",
      name: { hu: "Elsőbbség a szembejövővel szemben", en: "Priority over oncoming traffic" },
      desc: {
        hu: "Szűk útszakaszon neked van elsőbbséged a szemből érkezőkkel szemben (fekete nyíl). A piros nyíl iránya köteles várakozni.",
        en: "On a narrow section you have priority over oncoming traffic (black arrow). The red-arrow direction must wait.",
      },
      svg: info(
        `<path d="M40,72 V32 l-7,9 14,0z" fill="${BLACK}" stroke="${BLACK}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/><path d="M62,28 V68 l-7,-9 14,0z" fill="${RED}" stroke="${RED}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>`
      ),
    },
    {
      id: "p-give-way-oncoming",
      category: "priority",
      name: { hu: "Elsőbbségadás a szembejövőnek", en: "Give way to oncoming traffic" },
      desc: {
        hu: "Szűk útszakaszon a szemből érkezőknek van elsőbbsége. A piros nyíl iránya (te) köteles megvárni a szembejövőket.",
        en: "On a narrow section oncoming traffic has priority. The red-arrow direction (you) must wait for them.",
      },
      svg: prohibit(
        `<path d="M40,72 V28 l-7,9 14,0z" fill="${RED}" stroke="${RED}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/><path d="M62,28 V72 l-7,-9 14,0z" fill="${BLACK}" stroke="${BLACK}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>`
      ),
    },

    // ---------------- PROHIBITORY (Tilalmi) ----------------
    {
      id: "pr-no-entry",
      category: "prohibitory",
      name: { hu: "Behajtani tilos", en: "No entry" },
      desc: {
        hu: "Az adott irányból tilos behajtani. Jellemzően egyirányú utca ellenkező végén alkalmazzák.",
        en: "Entry is prohibited from this direction. Typically used at the wrong end of a one-way street.",
      },
      svg: svg(`<circle cx="50" cy="50" r="43" fill="${RED}"/>${bar(WHITE)}`),
    },
    {
      id: "pr-no-vehicles",
      category: "prohibitory",
      name: { hu: "Mindkét irányból behajtani tilos", en: "No vehicles (both directions)" },
      desc: {
        hu: "Az úttestre semmilyen jármű nem hajthat be egyik irányból sem (kivételeket kiegészítő tábla jelölhet).",
        en: "No vehicles may enter from either direction (exceptions may be shown on a supplementary plate).",
      },
      svg: prohibit(""),
    },
    {
      id: "pr-speed-50",
      category: "prohibitory",
      name: { hu: "Sebességkorlátozás (50)", en: "Speed limit (50)" },
      desc: {
        hu: "A táblán jelzett sebességnél (km/h) gyorsabban tilos haladni a korlátozás visszavonásáig.",
        en: "You must not exceed the speed shown (km/h) until the limit is lifted.",
      },
      svg: prohibit(text("50", { size: 42 })),
    },
    {
      id: "pr-speed-30",
      category: "prohibitory",
      name: { hu: "Sebességkorlátozás (30)", en: "Speed limit (30)" },
      desc: {
        hu: "Gyakori lakott területen, iskolák és lakó-pihenő övezetek közelében. Legfeljebb 30 km/h sebesség engedélyezett.",
        en: "Common in built-up areas, near schools and residential zones. Maximum 30 km/h allowed.",
      },
      svg: prohibit(text("30", { size: 42 })),
    },
    {
      id: "pr-no-overtaking",
      category: "prohibitory",
      name: { hu: "Előzni tilos", en: "No overtaking" },
      desc: {
        hu: "Tilos a járművek előzése (a kerékpár, segédmotoros kerékpár és kétkerekű motorkerékpár előzése jellemzően megengedett).",
        en: "Overtaking is prohibited (overtaking bicycles, mopeds and two-wheeled motorcycles is usually allowed).",
      },
      svg: prohibit(
        car(40, 50, 0.62, RED) + car(62, 50, 0.62, BLACK)
      ),
    },
    {
      id: "pr-no-stopping",
      category: "prohibitory",
      name: { hu: "Megállni tilos", en: "No stopping" },
      desc: {
        hu: "Tilos a megállás és a várakozás is (a forgalmi okból történő megállás kivételével). Kék alapon piros kereszt.",
        en: "Stopping and waiting are both prohibited (except stops forced by traffic). Red cross on blue.",
      },
      svg: svg(
        `<circle cx="50" cy="50" r="43" fill="${BLUE}" stroke="${RED}" stroke-width="8"/>${cross()}`
      ),
    },
    {
      id: "pr-no-parking",
      category: "prohibitory",
      name: { hu: "Várakozni tilos", en: "No waiting (no parking)" },
      desc: {
        hu: "Tilos a várakozás (hosszabb állás), de a be- és kiszálláshoz, rakodáshoz szükséges megállás megengedett.",
        en: "Waiting (parking) is prohibited, but stopping to board/alight or load is allowed.",
      },
      svg: svg(
        `<circle cx="50" cy="50" r="43" fill="${BLUE}" stroke="${RED}" stroke-width="8"/>${slash()}`
      ),
    },
    {
      id: "pr-no-moped",
      category: "prohibitory",
      name: { hu: "Segédmotoros kerékpárral behajtani tilos", en: "No mopeds" },
      desc: {
        hu: "Segédmotoros kerékpárral (AM kategória) tilos az útszakaszra behajtani.",
        en: "Mopeds (category AM) are prohibited from entering this road.",
      },
      svg: prohibit(moped(50, 50, 1.05, BLACK)),
    },
    {
      id: "pr-no-motorcycle",
      category: "prohibitory",
      name: { hu: "Motorkerékpárral behajtani tilos", en: "No motorcycles" },
      desc: {
        hu: "Motorkerékpárral tilos az útszakaszra behajtani.",
        en: "Motorcycles are prohibited from entering this road.",
      },
      svg: prohibit(motorcycle(50, 50, 0.95, BLACK)),
    },
    {
      id: "pr-no-bicycle",
      category: "prohibitory",
      name: { hu: "Kerékpárral behajtani tilos", en: "No bicycles" },
      desc: {
        hu: "Kerékpárral tilos az útszakaszra behajtani.",
        en: "Bicycles are prohibited from entering this road.",
      },
      svg: prohibit(bicycle(50, 50, 1.4, BLACK)),
    },
    {
      id: "pr-no-trucks",
      category: "prohibitory",
      name: { hu: "Tehergépkocsival behajtani tilos", en: "No trucks" },
      desc: {
        hu: "A megengedett legnagyobb össztömeget meghaladó tehergépkocsival tilos a behajtás (tömeg a táblán szerepelhet).",
        en: "Trucks over the indicated maximum weight are prohibited (the weight may be shown on the sign).",
      },
      svg: prohibit(truck(48, 50, 0.95, BLACK)),
    },
    {
      id: "pr-no-pedestrian",
      category: "prohibitory",
      name: { hu: "Gyalogosok számára lezárt útszakasz", en: "No pedestrians" },
      desc: {
        hu: "Gyalogosok számára tilos az útszakasz használata.",
        en: "Pedestrians are prohibited from using this road.",
      },
      svg: svg(
        `<circle cx="50" cy="50" r="43" fill="${WHITE}" stroke="${RED}" stroke-width="8"/>${pedestrian(
          50,
          54,
          1.0,
          BLACK
        )}${slash()}`
      ),
    },
    {
      id: "pr-weight",
      category: "prohibitory",
      name: { hu: "Tömegkorlátozás", en: "Weight limit" },
      desc: {
        hu: "Tilos a behajtás a táblán jelzett megengedett legnagyobb össztömeget (tonna) meghaladó járművel.",
        en: "Vehicles exceeding the maximum weight shown (tonnes) must not enter.",
      },
      svg: prohibit(text("7.5t", { size: 26 })),
    },
    {
      id: "pr-height",
      category: "prohibitory",
      name: { hu: "Magasságkorlátozás", en: "Height limit" },
      desc: {
        hu: "Tilos a behajtás a táblán jelzett magasságot meghaladó (rakománnyal együtt mért) járművel.",
        en: "Vehicles taller than the height shown (including load) must not enter.",
      },
      svg: prohibit(
        `<path d="M20,30 H80 M22,30 l8,-5 0,10z M78,30 l-8,-5 0,10z" fill="${BLACK}" stroke="${BLACK}" stroke-width="3"/>${text(
          "3.5m",
          { y: 58, size: 24 }
        )}`
      ),
    },
    {
      id: "pr-no-left",
      category: "prohibitory",
      name: { hu: "Balra bekanyarodni tilos", en: "No left turn" },
      desc: {
        hu: "A kereszteződésben tilos balra bekanyarodni.",
        en: "Turning left at the junction is prohibited.",
      },
      svg: prohibit(
        `<path d="M62,72 V52 Q62,42 50,42 H38 M44,36 l-10,6 10,6z" fill="none" stroke="${BLACK}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>${slash()}`
      ),
    },
    {
      id: "pr-no-uturn",
      category: "prohibitory",
      name: { hu: "Megfordulni tilos", en: "No U-turn" },
      desc: {
        hu: "Tilos a járművel megfordulni (visszafordulni) az útszakaszon.",
        en: "Making a U-turn is prohibited on this stretch of road.",
      },
      svg: prohibit(
        `<path d="M38,72 V46 a12,12 0 0 1 24,0 V64 M56,58 l6,8 6,-8" fill="none" stroke="${BLACK}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>${slash()}`
      ),
    },
    {
      id: "pr-no-horn",
      category: "prohibitory",
      name: { hu: "Hangjelzés adása tilos", en: "No horn" },
      desc: {
        hu: "Tilos a hangjelzés (duda) használata, kivéve baleset elhárítása érdekében.",
        en: "Using the horn is prohibited, except to avoid an accident.",
      },
      svg: prohibit(
        `<g fill="${BLACK}"><path d="M30,46 h8 l12,-8 v24 l-12,-8 h-8z"/><path d="M54,42 q6,8 0,16" fill="none" stroke="${BLACK}" stroke-width="3"/></g>${slash()}`
      ),
    },
    {
      id: "pr-no-cars",
      category: "prohibitory",
      name: { hu: "Gépkocsival behajtani tilos", en: "No motor cars" },
      desc: {
        hu: "Személygépkocsival (és általában gépkocsival) tilos az útszakaszra behajtani.",
        en: "Motor cars are prohibited from entering this road.",
      },
      svg: prohibit(car(50, 50, 1.0, BLACK)),
    },

    // ---------------- MANDATORY (Utasítást adó) ----------------
    {
      id: "m-straight",
      category: "mandatory",
      name: { hu: "Kötelező haladási irány (egyenesen)", en: "Mandatory direction: straight" },
      desc: {
        hu: "A jelzett irányban (egyenesen) kötelező továbbhaladni.",
        en: "You must continue in the indicated direction (straight ahead).",
      },
      svg: mandatory(arrow(0, WHITE)),
    },
    {
      id: "m-right",
      category: "mandatory",
      name: { hu: "Kötelező haladási irány (jobbra)", en: "Mandatory direction: right" },
      desc: {
        hu: "A jelzett irányban (jobbra) kötelező továbbhaladni.",
        en: "You must continue in the indicated direction (to the right).",
      },
      svg: mandatory(arrow(90, WHITE)),
    },
    {
      id: "m-left",
      category: "mandatory",
      name: { hu: "Kötelező haladási irány (balra)", en: "Mandatory direction: left" },
      desc: {
        hu: "A jelzett irányban (balra) kötelező továbbhaladni.",
        en: "You must continue in the indicated direction (to the left).",
      },
      svg: mandatory(arrow(-90, WHITE)),
    },
    {
      id: "m-roundabout",
      category: "mandatory",
      name: { hu: "Körforgalom", en: "Roundabout" },
      desc: {
        hu: "Körforgalom, amelyben a nyilak által jelzett irányban (Magyarországon az óramutató járásával ellentétesen) kötelező haladni.",
        en: "A roundabout in which you must travel in the direction of the arrows (anti-clockwise in Hungary).",
      },
      svg: mandatory(
        `<g fill="none" stroke="${WHITE}" stroke-width="6"><path d="M34,42 a20,20 0 1 1 -6,20"/></g><path d="M24,54 l8,12 -16,-1z" fill="${WHITE}"/>`
      ),
    },
    {
      id: "m-cyclepath",
      category: "mandatory",
      name: { hu: "Kerékpárút", en: "Cycle path" },
      desc: {
        hu: "Kizárólag kerékpárosok (és a jogszabály szerint megengedett egyéb járművek) számára fenntartott út, használata kötelező.",
        en: "A path reserved for cyclists (and other vehicles permitted by law); its use is mandatory.",
      },
      svg: mandatory(bicycle(50, 50, 1.6, WHITE)),
    },
    {
      id: "m-footpath",
      category: "mandatory",
      name: { hu: "Gyalogút", en: "Pedestrian path" },
      desc: {
        hu: "Kizárólag gyalogosok számára fenntartott út. Más járművel használata tilos.",
        en: "A path reserved for pedestrians only. Use by other vehicles is prohibited.",
      },
      svg: mandatory(pedestrian(50, 54, 1.15, WHITE)),
    },
    {
      id: "m-shared",
      category: "mandatory",
      name: { hu: "Gyalog- és kerékpárút", en: "Shared foot and cycle path" },
      desc: {
        hu: "Gyalogosok és kerékpárosok közös használatára kijelölt út. Egymásra kölcsönösen figyelni kell.",
        en: "A path designated for shared use by pedestrians and cyclists. Both must watch out for each other.",
      },
      svg: mandatory(
        pedestrian(34, 54, 0.9, WHITE) + bicycle(64, 50, 1.0, WHITE)
      ),
    },
    {
      id: "m-min-speed",
      category: "mandatory",
      name: { hu: "Kötelező legkisebb sebesség", en: "Minimum speed" },
      desc: {
        hu: "A táblán jelzett sebességnél (km/h) lassabban tilos haladni, ha a forgalmi helyzet egyébként megengedi.",
        en: "You must not travel slower than the speed shown (km/h) when traffic conditions allow.",
      },
      svg: mandatory(text("30", { fill: WHITE, size: 40 })),
    },
    {
      id: "m-snow-chains",
      category: "mandatory",
      name: { hu: "Hólánc használata kötelező", en: "Snow chains mandatory" },
      desc: {
        hu: "A jelzett útszakaszon legalább két hajtott keréken hóláncot kell használni.",
        en: "Snow chains must be fitted on at least two driven wheels on the marked section.",
      },
      svg: mandatory(
        `<circle cx="50" cy="50" r="18" fill="none" stroke="${WHITE}" stroke-width="5"/><circle cx="50" cy="50" r="7" fill="${WHITE}"/><circle cx="50" cy="50" r="26" fill="none" stroke="${WHITE}" stroke-width="3" stroke-dasharray="4 4"/>`
      ),
    },
    {
      id: "m-keep-right",
      category: "mandatory",
      name: { hu: "Kötelező elhaladási irány (jobbra)", en: "Keep right (pass this side)" },
      desc: {
        hu: "Az akadályt (pl. terelősziget) a tábla által jelzett oldalon, jobbról kell kikerülni.",
        en: "You must pass the obstacle (e.g. a traffic island) on the side shown — to the right.",
      },
      svg: mandatory(arrow(45, WHITE)),
    },

    // ---------------- INFORMATION (Tájékoztató) ----------------
    {
      id: "i-crossing",
      category: "information",
      name: { hu: "Kijelölt gyalogos-átkelőhely", en: "Pedestrian crossing" },
      desc: {
        hu: "Kijelölt gyalogos-átkelőhely (zebra). A gyalogosnak elsőbbsége van, ha az úttestre lépett vagy lépni készül.",
        en: "A marked pedestrian crossing (zebra). Pedestrians have priority once on or about to step onto it.",
      },
      svg: info(
        `<rect x="22" y="22" width="56" height="56" rx="3" fill="${WHITE}"/>${pedestrian(
          50,
          48,
          0.95,
          BLACK
        )}<g fill="${BLACK}"><rect x="30" y="66" width="6" height="8"/><rect x="40" y="66" width="6" height="8"/><rect x="50" y="66" width="6" height="8"/><rect x="60" y="66" width="6" height="8"/></g>`
      ),
    },
    {
      id: "i-parking",
      category: "information",
      name: { hu: "Várakozóhely (parkoló)", en: "Parking" },
      desc: {
        hu: "Az úttesten vagy mellette kijelölt várakozóhely. Kiegészítő tábla szabályozhatja a módját és időtartamát.",
        en: "A designated parking area on or beside the road. A plate may regulate how and how long you may park.",
      },
      svg: info(text("P", { fill: WHITE, size: 56 })),
    },
    {
      id: "i-oneway",
      category: "information",
      name: { hu: "Egyirányú forgalmú út", en: "One-way street" },
      desc: {
        hu: "Az úton a forgalom csak a nyíl által jelzett egy irányban halad.",
        en: "Traffic on this road flows in one direction only, as shown by the arrow.",
      },
      svg: svg(
        `<rect x="6" y="34" width="88" height="32" rx="5" fill="${BLUE}"/><path d="M24,50 H72 M72,50 l-12,-8 v16z" fill="${WHITE}" stroke="${WHITE}" stroke-width="6" stroke-linejoin="round"/>`
      ),
    },
    {
      id: "i-busstop",
      category: "information",
      name: { hu: "Autóbusz-megállóhely", en: "Bus stop" },
      desc: {
        hu: "Menetrend szerinti autóbusz megállóhelye. Környezetében a megállásra és várakozásra külön szabályok vonatkoznak.",
        en: "A scheduled bus stop. Special rules on stopping and waiting apply in its vicinity.",
      },
      svg: info(bus(50, 50, 1.0, WHITE)),
    },
    {
      id: "i-deadend",
      category: "information",
      name: { hu: "Zsákutca", en: "Dead end" },
      desc: {
        hu: "Az út nem folytatódik (nincs átmenő forgalom). Csak addig hajthatsz be, ameddig az út tart.",
        en: "The road does not continue (no through traffic). You can only drive to its end.",
      },
      svg: info(
        `<path d="M50,72 V42 H34 M50,72 V42 H66" fill="none" stroke="${WHITE}" stroke-width="7" stroke-linecap="round"/><rect x="30" y="30" width="40" height="8" fill="${RED}"/>`
      ),
    },
    {
      id: "i-motorway",
      category: "information",
      name: { hu: "Autópálya", en: "Motorway" },
      desc: {
        hu: "Autópálya kezdete. Csak gyorsan haladó gépjárművek használhatják; gyalogos, kerékpár, segédmotor és lassú jármű tilos. Külön sebességhatárok érvényesek.",
        en: "Start of a motorway. Only fast motor vehicles may use it; pedestrians, bicycles, mopeds and slow vehicles are banned. Special speed limits apply.",
      },
      svg: info(
        `<g fill="${WHITE}"><rect x="30" y="60" width="8" height="16"/><rect x="62" y="60" width="8" height="16"/><path d="M34,60 q16,-30 32,0z"/><rect x="46" y="30" width="8" height="22"/></g>`,
        "#009640"
      ),
    },
    {
      id: "i-expressway",
      category: "information",
      name: { hu: "Autóút", en: "Expressway" },
      desc: {
        hu: "Autóút kezdete. Gépjárműforgalom számára fenntartott út; az autópályához hasonló, de attól eltérő szabályokkal.",
        en: "Start of an expressway. Reserved for motor traffic; similar to a motorway but with some different rules.",
      },
      svg: info(car(50, 50, 1.1, WHITE)),
    },
    {
      id: "i-hospital",
      category: "information",
      name: { hu: "Kórház", en: "Hospital" },
      desc: {
        hu: "Kórház a közelben. Kerüld a szükségtelen hangjelzést, és számíts mentőautók forgalmára.",
        en: "A hospital is nearby. Avoid unnecessary use of the horn and expect ambulance traffic.",
      },
      svg: info(
        `<rect x="30" y="30" width="40" height="40" rx="4" fill="${WHITE}"/><rect x="46" y="36" width="8" height="28" fill="#e4002b"/><rect x="36" y="46" width="28" height="8" fill="#e4002b"/>`
      ),
    },
    {
      id: "i-residential",
      category: "information",
      name: { hu: "Lakó-pihenő övezet", en: "Residential (home) zone" },
      desc: {
        hu: "Lakó-pihenő övezet kezdete. Legfeljebb 20 km/h sebesség, a gyalogosok az úttestet is használhatják, és csak kijelölt helyen szabad várakozni.",
        en: "Start of a residential zone. Max 20 km/h, pedestrians may use the road, and parking is only allowed in marked places.",
      },
      svg: info(
        `<g fill="${WHITE}"><path d="M28,52 l22,-16 22,16 v0 h-6 v16 h-32 v-16z"/></g>${car(
          40,
          74,
          0.4,
          WHITE
        )}${pedestrian(64, 70, 0.5, WHITE)}`
      ),
    },
    {
      id: "i-pedestrian-zone",
      category: "information",
      name: { hu: "Gyalogos övezet", en: "Pedestrian zone" },
      desc: {
        hu: "Gyalogos övezet kezdete, ahol jellemzően csak gyalogosforgalom van; járművel csak engedéllyel, lépésben szabad közlekedni.",
        en: "Start of a pedestrian zone, typically for pedestrians only; vehicles may enter only with permission, at walking pace.",
      },
      svg: info(pedestrian(50, 52, 1.3, WHITE)),
    },
    {
      id: "i-firstaid",
      category: "information",
      name: { hu: "Elsősegélyhely", en: "First aid station" },
      desc: {
        hu: "Elsősegélynyújtó hely a közelben.",
        en: "A first aid station is nearby.",
      },
      svg: info(
        `<rect x="30" y="30" width="40" height="40" rx="4" fill="${WHITE}"/><rect x="46" y="38" width="8" height="24" fill="#009640"/><rect x="38" y="46" width="24" height="8" fill="#009640"/>`
      ),
    },
    {
      id: "i-parking-garage",
      category: "information",
      name: { hu: "Parkolóház", en: "Parking garage" },
      desc: {
        hu: "Fedett, többszintes parkolóépület a közelben.",
        en: "A covered, multi-storey parking building is nearby.",
      },
      svg: info(
        `<path d="M28,52 l22,-16 22,16 v0 h-44z" fill="${WHITE}"/><rect x="30" y="52" width="40" height="22" fill="${WHITE}"/>${text(
          "P",
          { fill: BLUE, size: 24, y: 62 }
        )}`
      ),
    },
    {
      id: "i-fuel",
      category: "information",
      name: { hu: "Üzemanyagtöltő állomás", en: "Petrol / fuel station" },
      desc: {
        hu: "Üzemanyagtöltő állomás a közelben.",
        en: "A fuel (petrol) station is nearby.",
      },
      svg: info(
        `<g fill="${WHITE}"><rect x="32" y="28" width="22" height="44" rx="3"/><rect x="36" y="33" width="14" height="13" fill="${BLUE}"/></g><path d="M54,40 l7,5 v17 a4,4 0 0 0 8,0 V48 l-6,-6" fill="none" stroke="${WHITE}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>`
      ),
    },
  ];

  // Category metadata (order + accent colour for UI chips)
  const SIGN_CATEGORIES = [
    { id: "warning", color: "#e4002b" },
    { id: "priority", color: "#ffb400" },
    { id: "prohibitory", color: "#e4002b" },
    { id: "mandatory", color: "#0050a0" },
    { id: "information", color: "#0050a0" },
  ];

  global.KRESZ = global.KRESZ || {};
  global.KRESZ.SIGNS = SIGNS;
  global.KRESZ.SIGN_CATEGORIES = SIGN_CATEGORIES;
})(window);
