/* ============================================================
   KRESZ Code Web App — Quiz question bank
   Each question:
   { cat, sign?, q{hu,en}, options{hu[],en[]}, answer, explain{hu,en} }
   `cat` matches a quiz category id; `sign` references a sign id
   so the quiz can render its SVG.

   Sign-recognition questions for ALL signs are generated
   automatically at the bottom of this file.
   ============================================================ */
(function (global) {
  "use strict";

  const K = (global.KRESZ = global.KRESZ || {});

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = (Math.random() * (i + 1)) | 0;
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // ========================================================================
  //  HAND-WRITTEN RULE QUESTIONS
  // ========================================================================
  const HAND = [
    // ------------------------------------------------------------------
    // GENERAL
    // ------------------------------------------------------------------
    {
      cat: "general",
      q: { hu: "Mekkora az általános sebességhatár lakott területen, ha tábla másként nem rendelkezik?", en: "What is the default speed limit in built-up areas, unless signed otherwise?" },
      options: { hu: ["30 km/h", "40 km/h", "50 km/h", "60 km/h"], en: ["30 km/h", "40 km/h", "50 km/h", "60 km/h"] },
      answer: 2,
      explain: { hu: "Lakott területen az általános sebességhatár 50 km/h, kivéve, ha tábla mást ír elő.", en: "In built-up areas the default limit is 50 km/h unless a sign indicates otherwise." },
    },
    {
      cat: "general",
      q: { hu: "Mekkora az általános sebességhatár lakott területen kívül, sima úton, személygépkocsival?", en: "What is the default car speed limit on an ordinary road outside built-up areas?" },
      options: { hu: ["80 km/h", "90 km/h", "100 km/h", "110 km/h"], en: ["80 km/h", "90 km/h", "100 km/h", "110 km/h"] },
      answer: 1,
      explain: { hu: "Lakott területen kívül, sima (egyéb) úton a személygépkocsi általános sebességhatára 90 km/h.", en: "Outside built-up areas on an ordinary road the default car limit is 90 km/h." },
    },
    {
      cat: "general",
      q: { hu: "Mekkora az általános sebességhatár autóúton személygépkocsival?", en: "What is the default car speed limit on an expressway (autóút)?" },
      options: { hu: ["90 km/h", "100 km/h", "110 km/h", "130 km/h"], en: ["90 km/h", "100 km/h", "110 km/h", "130 km/h"] },
      answer: 2,
      explain: { hu: "Autóúton a személygépkocsi általános sebességhatára 110 km/h.", en: "On an expressway the default car limit is 110 km/h." },
    },
    {
      cat: "general",
      q: { hu: "Mekkora az általános sebességhatár autópályán személygépkocsival?", en: "What is the default car speed limit on a motorway?" },
      options: { hu: ["100 km/h", "110 km/h", "120 km/h", "130 km/h"], en: ["100 km/h", "110 km/h", "120 km/h", "130 km/h"] },
      answer: 3,
      explain: { hu: "Autópályán a személygépkocsi általános sebességhatára 130 km/h.", en: "On a motorway the default car limit is 130 km/h." },
    },
    {
      cat: "general",
      q: { hu: "Mekkora a megengedett legnagyobb sebesség a lakó-pihenő övezetben?", en: "What is the maximum speed in a residential (home) zone?" },
      options: { hu: ["10 km/h", "20 km/h", "30 km/h", "40 km/h"], en: ["10 km/h", "20 km/h", "30 km/h", "40 km/h"] },
      answer: 1,
      explain: { hu: "Lakó-pihenő övezetben legfeljebb 20 km/h sebességgel szabad közlekedni, és a gyalogosoknak elsőbbségük van.", en: "In a residential zone the maximum speed is 20 km/h and pedestrians have priority." },
    },
    {
      cat: "general",
      q: { hu: "Mennyi az alkoholszint megengedett határa a vezetők számára Magyarországon?", en: "What is the permitted blood-alcohol limit for drivers in Hungary?" },
      options: { hu: ["0,0 ‰ (zéró tolerancia)", "0,2 ‰", "0,5 ‰", "0,8 ‰"], en: ["0.0 ‰ (zero tolerance)", "0.2 ‰", "0.5 ‰", "0.8 ‰"] },
      answer: 0,
      explain: { hu: "Magyarországon zéró tolerancia van: vezetés közben semmilyen alkohol nem lehet a szervezetben.", en: "Hungary applies zero tolerance: no alcohol at all is allowed while driving." },
    },
    {
      cat: "general",
      q: { hu: "Mikor kötelező a tompított fényszóró használata személygépkocsival lakott területen kívül, nappal?", en: "When must a car use dipped headlights outside built-up areas during the day?" },
      options: { hu: ["Soha", "Csak esőben", "Mindig (nappal is)", "Csak alagútban"], en: ["Never", "Only in rain", "Always (even in daylight)", "Only in tunnels"] },
      answer: 2,
      explain: { hu: "Lakott területen kívül nappal is kötelező legalább a tompított fényszóró (vagy nappali menetfény) használata.", en: "Outside built-up areas, dipped headlights (or daytime running lights) are mandatory even in daylight." },
    },
    {
      cat: "general",
      q: { hu: "Mit kell tenned, ha hátulról megkülönböztető jelzést használó (kék fény, sziréna) jármű közeledik?", en: "What must you do when an emergency vehicle (blue lights and siren) approaches from behind?" },
      options: { hu: ["Gyorsíts, hogy ne tartsd fel", "Hirtelen fékezz le", "Adj szabad utat, szükség esetén állj félre", "Hagyd figyelmen kívül, ha zöld a lámpa"], en: ["Speed up so you don't hold it up", "Brake suddenly", "Give way, pull aside if necessary", "Ignore it if your light is green"] },
      answer: 2,
      explain: { hu: "Szabad utat kell biztosítani: lassíts, húzódj félre, és szükség esetén állj meg.", en: "You must give way: slow down, pull aside and stop if needed." },
    },
    {
      cat: "general",
      q: { hu: "Mikor használhatod a vészvillogót menet közben?", en: "When may you use hazard warning lights while moving?" },
      options: { hu: ["Ha gyorsan szeretnél parkolni bárhol", "Ha váratlan forgalmi akadály/veszély miatt figyelmeztetni kell a mögötted jövőket", "Éjszaka világítás helyett", "Soha nem szabad menet közben"], en: ["To park quickly anywhere", "To warn following traffic of a sudden obstacle/hazard", "At night instead of headlights", "Never while moving"] },
      answer: 1,
      explain: { hu: "A vészvillogó menet közben akkor használható, ha hirtelen kialakult veszélyre (pl. torlódás vége) kell figyelmeztetni.", en: "Hazard lights may be used while moving to warn others of a sudden danger (e.g. the tail of a traffic jam)." },
    },
    {
      cat: "general",
      q: { hu: "Mit jelez a felfestett folytonos záróvonal az úttest közepén?", en: "What does a solid centre line painted on the road mean?" },
      options: { hu: ["Szabadon át lehet lépni", "Tilos átlépni vagy ráhajtani", "Csak előzéskor szabad átlépni", "Csak éjszaka érvényes"], en: ["You may cross it freely", "You must not cross or straddle it", "Cross it only to overtake", "It is valid only at night"] },
      answer: 1,
      explain: { hu: "A folytonos záróvonalat tilos átlépni vagy érinteni; elválasztja a forgalmi irányokat vagy sávokat.", en: "A solid line must not be crossed or touched; it separates traffic directions or lanes." },
    },
    {
      cat: "general",
      q: { hu: "Melyik oldalon kell előzni főszabály szerint?", en: "On which side must you overtake as a general rule?" },
      options: { hu: ["A jobb oldalon", "A bal oldalon", "Bármelyiken", "Középen"], en: ["On the right", "On the left", "Either side", "Down the middle"] },
      answer: 1,
      explain: { hu: "Előzni főszabály szerint balról kell. Jobbról csak kivételes esetben (pl. balra bekanyarodó jármű mellett) szabad.", en: "As a rule you overtake on the left. Overtaking on the right is allowed only in exceptional cases (e.g. past a vehicle turning left)." },
    },
    {
      cat: "general",
      q: { hu: "Mely felszerelést kötelező a személygépkocsiban tartani?", en: "Which equipment must a car carry by law?" },
      options: { hu: ["Pótkerék és emelő", "Elsősegélydoboz és elakadásjelző háromszög", "Tűzoltó készülék", "Tartalék izzókészlet"], en: ["A spare wheel and jack", "A first-aid kit and a warning triangle", "A fire extinguisher", "A spare-bulb kit"] },
      answer: 1,
      explain: { hu: "Személygépkocsiban kötelező az elsősegélydoboz és az elakadásjelző háromszög; a láthatósági mellény erősen ajánlott.", en: "Cars must carry a first-aid kit and a warning triangle; a hi-vis vest is strongly recommended." },
    },
    {
      cat: "general",
      q: { hu: "Kötelező-e a biztonsági öv használata a hátsó ülésen?", en: "Are rear-seat occupants required to wear a seat belt?" },
      options: { hu: ["Csak lakott területen kívül", "Igen, minden ülésen kötelező", "Nem, csak elöl", "Csak autópályán"], en: ["Only outside built-up areas", "Yes, in every seat", "No, only in front", "Only on motorways"] },
      answer: 1,
      explain: { hu: "A biztonsági öv használata minden ülésen, minden utasra kötelező, ahol van öv beszerelve.", en: "Seat-belt use is mandatory in every seat where a belt is fitted." },
    },
    {
      cat: "general",
      q: { hu: "Szabad-e kézben tartott mobiltelefont használni vezetés közben?", en: "May you use a hand-held mobile phone while driving?" },
      options: { hu: ["Igen", "Nem, tilos", "Csak lakott területen", "Csak álló helyzetben, járó motornál is"], en: ["Yes", "No, it is prohibited", "Only in town", "Only when stopped, even with the engine running"] },
      answer: 1,
      explain: { hu: "Vezetés közben tilos a kézben tartott mobiltelefon használata; csak kihangosítóval, a vezetés zavarása nélkül megengedett.", en: "Using a hand-held phone while driving is prohibited; only hands-free use without distraction is allowed." },
    },
    {
      cat: "general",
      q: { hu: "Milyen testmagasságig kell a gyermeknek a testméretének megfelelő gyermekbiztonsági rendszert használnia?", en: "Up to what height must a child use an appropriate child restraint?" },
      options: { hu: ["120 cm", "135 cm", "150 cm", "160 cm"], en: ["120 cm", "135 cm", "150 cm", "160 cm"] },
      answer: 2,
      explain: { hu: "A 150 cm-nél alacsonyabb gyermeket a testméretének megfelelő gyermekbiztonsági rendszerben kell szállítani.", en: "A child shorter than 150 cm must be carried in a child restraint suited to their size." },
    },
    {
      cat: "general",
      q: { hu: "Mit kell tenned piros jelzésnél a jelzőlámpánál?", en: "What must you do at a red traffic light?" },
      options: { hu: ["Lassan áthajtani, ha üres", "Megállni a megállási hely vonalánál", "Csak körülnézni és menni", "Dudálni és menni"], en: ["Drive through slowly if it's clear", "Stop at the stop line", "Just look around and go", "Honk and go"] },
      answer: 1,
      explain: { hu: "Piros jelzésnél meg kell állni a megállási hely (stopvonal) előtt, és meg kell várni a szabad jelzést.", en: "At red you must stop at the stop line and wait for a green signal." },
    },
    {
      cat: "general",
      q: { hu: "Mit jelent a villogó sárga fényjelzés?", en: "What does a flashing amber traffic signal mean?" },
      options: { hu: ["Tilos a behajtás", "Fokozott óvatossággal, a szabályok szerint áthaladhatsz", "Kötelező megállás", "A lámpa elromlott, fordulj vissza"], en: ["No entry", "Proceed with extra caution under the normal rules", "Mandatory stop", "The light is broken, turn back"] },
      answer: 1,
      explain: { hu: "A villogó sárga azt jelzi, hogy a kereszteződésben fokozott óvatossággal, az elsőbbségi szabályok szerint haladhatsz át.", en: "Flashing amber means proceed through the junction with extra caution, obeying the priority rules." },
    },
    {
      cat: "general",
      q: { hu: "Mi a teendő alagútban közlekedés közben?", en: "What is required when driving through a tunnel?" },
      options: { hu: ["Kapcsold ki a fényeket", "Kapcsold be a tompított fényt; tilos a megfordulás és a tolatás", "Használj távolsági fényt végig", "Vészvillogóval haladj"], en: ["Turn your lights off", "Switch on dipped headlights; U-turns and reversing are prohibited", "Use full beam throughout", "Drive with hazard lights on"] },
      answer: 1,
      explain: { hu: "Alagútban kötelező a tompított fényszóró; tilos a megfordulás, a tolatás és a megállás (kivéve vészhelyzet).", en: "In a tunnel dipped headlights are mandatory; U-turns, reversing and stopping (except emergencies) are prohibited." },
    },
    {
      cat: "general",
      q: { hu: "Lakott területen kívül, műszaki hiba miatt megállva, miért kell a járművön kívülre lépve láthatósági mellényt viselni?", en: "Outside a built-up area, why must you wear a hi-vis vest when getting out of a broken-down vehicle?" },
      options: { hu: ["Nem kötelező", "Mert kötelező és a láthatóságod menti az életed", "Csak télen", "Csak éjszaka, autópályán"], en: ["It isn't required", "Because it's mandatory and your visibility can save your life", "Only in winter", "Only at night, on the motorway"] },
      answer: 1,
      explain: { hu: "Lakott területen kívül az úttestre lépő járművezetőnek kötelező a fényvisszaverő mellény viselése.", en: "Outside built-up areas a driver stepping onto the carriageway must wear a reflective vest." },
    },
    {
      cat: "general",
      q: { hu: "Mikor kell az irányjelzőt használni?", en: "When must you use your direction indicator?" },
      options: { hu: ["Csak bekanyarodáskor", "Minden irányváltoztatás és sávváltás előtt időben", "Csak ha más is jön", "Soha, ha üres az út"], en: ["Only when turning", "In good time before every change of direction or lane", "Only if others are around", "Never, if the road is empty"] },
      answer: 1,
      explain: { hu: "Minden irányváltoztatást (kanyarodás, sávváltás, kiállás, megállás) időben jelezni kell irányjelzővel.", en: "Every change of direction (turning, lane change, pulling out or in) must be signalled in good time." },
    },
    {
      cat: "general",
      q: { hu: "Mi a helyes követési távolság elve normál körülmények között?", en: "What is the rule of thumb for a safe following distance in normal conditions?" },
      options: { hu: ["Fél másodperc", "Legalább 2 másodperc", "10 méter bármilyen sebességnél", "Nincs jelentősége"], en: ["Half a second", "At least 2 seconds", "10 metres at any speed", "It doesn't matter"] },
      answer: 1,
      explain: { hu: "Az elöl haladótól legalább 2 másodperces követési távolságot tarts; rossz látási/útviszonyok közt többet.", en: "Keep at least a 2-second gap to the vehicle ahead; more in poor conditions." },
    },

    // ------------------------------------------------------------------
    // PRIORITY & JUNCTIONS
    // ------------------------------------------------------------------
    {
      cat: "priority",
      q: { hu: "Azonos rangú útkereszteződésben, jelzés nélkül kinek van elsőbbsége?", en: "At an unsigned junction of equal-rank roads, who has priority?" },
      options: { hu: ["Aki gyorsabban ér oda", "A jobbról érkezőnek (jobbkéz-szabály)", "A balról érkezőnek", "Mindig az egyenesen haladónak"], en: ["Whoever gets there faster", "Traffic from the right (right-hand rule)", "Traffic from the left", "Always the one going straight"] },
      answer: 1,
      explain: { hu: "Jelzés hiányában a jobbkéz-szabály érvényes: a jobbról érkezőnek kell elsőbbséget adni.", en: "Without signs the right-hand rule applies: give way to traffic from your right." },
    },
    {
      cat: "priority",
      q: { hu: "Körforgalomban — eltérő jelzés hiányában — kinek van elsőbbsége?", en: "In a roundabout, absent other signs, who has priority?" },
      options: { hu: ["A behajtani szándékozónak", "A körben már bent haladónak", "A nagyobb járműnek", "A jobbról érkezőnek"], en: ["The vehicle wishing to enter", "The vehicle already circulating", "The larger vehicle", "Traffic from the right"] },
      answer: 1,
      explain: { hu: "A körforgalomban a körben haladónak van elsőbbsége; a behajtónak kell elsőbbséget adnia.", en: "On a roundabout the circulating vehicle has priority; the entering vehicle must give way." },
    },
    {
      cat: "priority",
      q: { hu: "Bekanyarodáskor mely gyalogosoknak kell elsőbbséget adnod?", en: "When turning, to which pedestrians must you give way?" },
      options: { hu: ["Senkinek", "Csak a túloldali zebrán állóknak", "Az úttesten, amelyre bekanyarodsz, áthaladóknak", "Csak gyermekeknek"], en: ["None", "Only those on the far-side zebra", "Pedestrians crossing the road you turn into", "Only children"] },
      answer: 2,
      explain: { hu: "Bekanyarodáskor elsőbbséget kell adni annak az úttestnek a gyalogosforgalmának, amelyre rákanyarodsz.", en: "When turning you must give way to pedestrians crossing the road you are turning into." },
    },
    {
      cat: "priority",
      q: { hu: "Mit kell tenned az „Állj! Elsőbbségadás kötelező” (STOP) táblánál, ha a kereszteződés üres?", en: "What must you do at a STOP sign if the junction is clear?" },
      options: { hu: ["Lassítás elég", "Akkor is teljesen meg kell állni", "Csak körülnézni", "Dudálni"], en: ["Slowing down is enough", "You must still come to a full stop", "Just look around", "Honk"] },
      answer: 1,
      explain: { hu: "A STOP táblánál minden esetben teljesen meg kell állni a megállás helyén, akkor is, ha üres a kereszteződés.", en: "At a STOP sign you must always come to a complete stop at the stop line, even if the junction is clear." },
    },
    {
      cat: "priority",
      q: { hu: "Ha a rendőr karjelzése ellentmond a jelzőlámpának, melyiket kell követni?", en: "If a police officer's hand signal contradicts the traffic light, which do you obey?" },
      options: { hu: ["A jelzőlámpát", "A rendőr utasítását", "Amelyik kedvezőbb", "Egyiket sem, megállsz és vársz"], en: ["The traffic light", "The police officer's instruction", "Whichever is more favourable", "Neither — stop and wait"] },
      answer: 1,
      explain: { hu: "A forgalmat irányító rendőr (személy) jelzése erősebb a jelzőlámpánál és a tábláknál is.", en: "A traffic-directing officer's signal overrides both the traffic lights and the signs." },
    },
    {
      cat: "priority",
      q: { hu: "Balra bekanyarodáskor kinek kell elsőbbséget adnod?", en: "When turning left, to whom must you give way?" },
      options: { hu: ["Senkinek", "A szemből érkező, egyenesen haladó és jobbra kanyarodó forgalomnak", "Csak a mögötted jövőnek", "A balról érkezőnek"], en: ["No one", "Oncoming traffic going straight or turning right", "Only traffic behind you", "Traffic from the left"] },
      answer: 1,
      explain: { hu: "Balra kanyarodáskor elsőbbséget kell adni a szemből érkező, egyenesen vagy jobbra haladó járműveknek.", en: "When turning left you must give way to oncoming vehicles going straight or turning right." },
    },
    {
      cat: "priority",
      q: { hu: "Földútról vagy ingatlanról szilárd burkolatú útra hajtva mi a szabály?", en: "What is the rule when entering a paved road from a dirt road or a property?" },
      options: { hu: ["Elsőbbséged van", "Elsőbbséget kell adnod az úton haladóknak", "A nagyobb jármű megy előbb", "A jobbkéz-szabály"], en: ["You have priority", "You must give way to traffic on the road", "The bigger vehicle goes first", "The right-hand rule applies"] },
      answer: 1,
      explain: { hu: "Földútról, ingatlanról, parkolóból kihajtva mindig elsőbbséget kell adni az úton haladóknak.", en: "When emerging from a dirt road, property or car park you must always give way to traffic on the road." },
    },
    {
      cat: "priority",
      q: { hu: "Villamossal találkozva mi a fő szabály a kereszteződésben?", en: "When meeting a tram at a junction, what is the main rule?" },
      options: { hu: ["A villamosnak sosincs elsőbbsége", "Elsőbbsége gyakran erősebb, mert nehezen áll meg és nem tud kitérni", "Csak este van elsőbbsége", "Mindig a villamos vár"], en: ["A tram never has priority", "Its priority is often stronger because it can't easily stop or steer aside", "It only has priority at night", "The tram always waits"] },
      answer: 1,
      explain: { hu: "A villamos kötött pályán halad, nehezen áll meg és nem tér ki, ezért elsőbbsége sok helyzetben erősebb.", en: "A tram runs on rails and cannot easily stop or swerve, so its priority is often stronger." },
    },
    {
      cat: "priority",
      q: { hu: "Mit jelez a sárga rombusz alakú „Főútvonal” tábla?", en: "What does the yellow diamond 'priority road' sign tell you?" },
      sign: "p-priority-road",
      options: { hu: ["Útépítés", "Elsőbbséged van a kereszteződésekben a következő útkereszteződésig", "Sebességkorlátozás vége", "Terelőút"], en: ["Road works", "You have priority at junctions until the next junction", "End of speed limit", "Diversion"] },
      answer: 1,
      explain: { hu: "A főútvonal tábla azt jelzi, hogy a kereszteződésekben elsőbbséged van a következő útkereszteződésig.", en: "The priority-road sign means you have priority at junctions up to the next junction." },
    },
    {
      cat: "priority",
      sign: "p-priority-over",
      q: { hu: "Ezzel a táblával jelzett szűk útszakaszon kinek van elsőbbsége?", en: "On a narrow section marked with this sign, who has priority?" },
      options: { hu: ["Neked (fekete nyíl)", "A szembejövőnek", "A nagyobb járműnek", "Mindig meg kell állni"], en: ["You (black arrow)", "Oncoming traffic", "The larger vehicle", "You must always stop"] },
      answer: 0,
      explain: { hu: "A fekete nyíl a te irányod elsőbbségét jelzi a szemből érkezőkkel (piros nyíl) szemben.", en: "The black arrow shows your direction has priority over oncoming traffic (red arrow)." },
    },
    {
      cat: "priority",
      q: { hu: "Köteles vagy-e elsőbbséget adni a kijelölt gyalogos-átkelőhelyen áthaladni készülő gyalogosnak?", en: "Must you give way to a pedestrian about to use a marked crossing?" },
      options: { hu: ["Nem, a járműé az elsőbbség", "Igen, ha az úttestre lépett vagy lépni készül", "Csak gyermek esetén", "Csak ha int"], en: ["No, the vehicle has priority", "Yes, once they have stepped on or are about to", "Only for children", "Only if they wave"] },
      answer: 1,
      explain: { hu: "A kijelölt átkelőhelyen a gyalogosnak elsőbbsége van, ha rálépett vagy lépni készül; biztosítani kell az áthaladását.", en: "At a marked crossing pedestrians have priority once on or about to step onto it; let them cross." },
    },
    {
      cat: "priority",
      q: { hu: "Mit kell tenned, ha a forgalmi sávod megszűnik (besorolás)?", en: "What must you do when your lane ends (merging)?" },
      options: { hu: ["Erőből besorolsz", "Kölcsönös figyelemmel, „cipzár elv” szerint sorolsz be", "Megállsz a sáv végén és vársz sokáig", "Dudálsz"], en: ["Force your way in", "Merge cooperatively using the 'zip' principle", "Stop at the end and wait a long time", "Honk"] },
      answer: 1,
      explain: { hu: "Sávmegszűnéskor a „cipzár elv” szerint, kölcsönös előzékenységgel, felváltva kell besorolni.", en: "When a lane ends, merge alternately and cooperatively using the 'zip' principle." },
    },
    {
      cat: "priority",
      q: { hu: "Tilos megfordulni (visszafordulni) a következő helyek közül melyiken?", en: "U-turns are prohibited in which of these places?" },
      options: { hu: ["Üres mellékutcában", "Útkereszteződésben jelzőlámpánál, hídon, alagútban, beláthatatlan helyen", "Saját utcádban", "Parkolóban"], en: ["In an empty side street", "At signalised junctions, on bridges, in tunnels and where visibility is poor", "In your own street", "In a car park"] },
      answer: 1,
      explain: { hu: "Megfordulni tilos ott, ahol az veszélyes vagy zavaró: hídon, alagútban, vasúti átjáróban, beláthatatlan helyen, autópályán stb.", en: "U-turns are banned where dangerous or obstructive: on bridges, in tunnels, at level crossings, where visibility is poor, on motorways, etc." },
    },
    {
      cat: "priority",
      q: { hu: "Lakott területen az autóbusz megállóból kihaladva, irányjelzőt használva mi a teendőd?", en: "In a built-up area, what must you do when a bus signals to pull out of a stop?" },
      options: { hu: ["Gyorsíts, hogy elmenj előtte", "Adj elsőbbséget az autóbusznak", "Dudálj rá", "Semmi"], en: ["Speed up to pass", "Give way to the bus", "Honk at it", "Nothing"] },
      answer: 1,
      explain: { hu: "Lakott területen elsőbbséget kell adni a megállóból kihaladó, irányjelzőt használó autóbusznak (balesetveszély nélkül).", en: "In built-up areas you must give way to a bus pulling out of a stop with its indicator on (without causing danger)." },
    },

    // ------------------------------------------------------------------
    // MOPED (AM)
    // ------------------------------------------------------------------
    {
      cat: "moped",
      q: { hu: "Hány éves kortól vezethető segédmotoros kerékpár (AM kategória)?", en: "From what age can you ride a moped (category AM)?" },
      options: { hu: ["12", "14", "16", "18"], en: ["12", "14", "16", "18"] },
      answer: 1,
      explain: { hu: "Az AM kategóriás vezetői engedély 14 éves kortól szerezhető meg.", en: "The AM-category licence can be obtained from age 14." },
    },
    {
      cat: "moped",
      q: { hu: "Mekkora a segédmotoros kerékpár (AM) legnagyobb tervezési sebessége?", en: "What is the maximum design speed of an AM moped?" },
      options: { hu: ["25 km/h", "45 km/h", "60 km/h", "90 km/h"], en: ["25 km/h", "45 km/h", "60 km/h", "90 km/h"] },
      answer: 1,
      explain: { hu: "A segédmotoros kerékpár legnagyobb tervezési sebessége 45 km/h, motorja legfeljebb 50 cm³.", en: "A moped's maximum design speed is 45 km/h, with an engine up to 50 cm³." },
    },
    {
      cat: "moped",
      q: { hu: "Kötelező-e a bukósisak viselése segédmotoros kerékpáron?", en: "Is a crash helmet mandatory on a moped?" },
      options: { hu: ["Igen, kötelező", "Csak lakott területen kívül", "Nem kötelező", "Csak utasnak"], en: ["Yes, mandatory", "Only outside built-up areas", "Not required", "Only for a passenger"] },
      answer: 0,
      explain: { hu: "A segédmotoros kerékpáron a vezetőnek (és utasnak) kötelező a megfelelő bukósisak viselése.", en: "On a moped the rider (and passenger) must wear an appropriate crash helmet." },
    },
    {
      cat: "moped",
      sign: "pr-no-moped",
      q: { hu: "Mit jelent ez a tábla egy segédmotoros számára?", en: "What does this sign mean for a moped rider?" },
      options: { hu: ["Segédmotoros kerékpárral behajtani tilos", "Segédmotor-parkoló", "Kötelező segédmotorral haladni", "Motorszerviz"], en: ["No mopeds (entry prohibited)", "Moped parking", "Mopeds compulsory", "Moped repair shop"] },
      answer: 0,
      explain: { hu: "A piros körben lévő segédmotor azt jelzi: ezzel a járművel tilos behajtani.", en: "A moped in a red circle means mopeds are prohibited from entering." },
    },
    {
      cat: "moped",
      q: { hu: "Használhat-e segédmotoros kerékpár autópályát vagy autóutat?", en: "May a moped use a motorway or expressway?" },
      options: { hu: ["Igen, mindig", "Csak nappal", "Nem, tilos", "Csak forgalom hiányában"], en: ["Yes, always", "Only in daytime", "No, it is prohibited", "Only when there is no traffic"] },
      answer: 2,
      explain: { hu: "Segédmotoros kerékpárral tilos autópályán és autóúton közlekedni a kis sebesség miatt.", en: "Mopeds are prohibited on motorways and expressways because of their low speed." },
    },
    {
      cat: "moped",
      q: { hu: "Hol kell segédmotoros kerékpárral közlekedni az úttesten, ha nincs kerékpáros létesítmény?", en: "Where should a moped ride on the road if there is no cycle facility?" },
      options: { hu: ["Az úttest közepén", "Az úttest jobb szélén", "A bal oldalon", "A járdán"], en: ["In the middle of the road", "On the right edge of the road", "On the left side", "On the pavement"] },
      answer: 1,
      explain: { hu: "Kerékpárút/kerékpársáv hiányában a segédmotorosnak az úttest jobb szélén kell haladnia.", en: "Without a cycle path/lane, a moped must ride on the right edge of the carriageway." },
    },
    {
      cat: "moped",
      q: { hu: "Szállítható-e utas a segédmotoros kerékpáron?", en: "May a passenger be carried on a moped?" },
      options: { hu: ["Mindig, korlátlanul", "Csak ha a jármű két személyre van kialakítva (üléssel, lábtartóval)", "Soha", "Csak gyermek a kormányon"], en: ["Always, without limit", "Only if the vehicle is built for two (seat and footrests)", "Never", "Only a child on the handlebars"] },
      answer: 1,
      explain: { hu: "Utas csak akkor szállítható, ha a segédmotor két személy szállítására van kialakítva (megfelelő ülés és lábtartó).", en: "A passenger may be carried only if the moped is designed for two (proper seat and footrests)." },
    },
    {
      cat: "moped",
      q: { hu: "Vonatkozik-e a zéró tolerancia (0,0 ‰ alkohol) a segédmotorosra is?", en: "Does the zero-tolerance alcohol rule (0.0 ‰) apply to moped riders too?" },
      options: { hu: ["Nem", "Igen, rá is vonatkozik", "Csak éjszaka", "Csak 18 év alatt"], en: ["No", "Yes, it applies to them too", "Only at night", "Only under 18"] },
      answer: 1,
      explain: { hu: "A segédmotor is jármű, ezért a vezetőjére is a zéró tolerancia vonatkozik.", en: "A moped is a vehicle, so the rider is also subject to zero tolerance." },
    },
    {
      cat: "moped",
      q: { hu: "Köteles-e a segédmotoros nappal is világítani?", en: "Must a moped use its light during the day too?" },
      options: { hu: ["Nem", "Igen, nappal is tompított fénnyel kell közlekednie", "Csak esőben", "Csak lakott területen"], en: ["No", "Yes, it must use a dipped light even by day", "Only in rain", "Only in town"] },
      answer: 1,
      explain: { hu: "A segédmotoros kerékpárnak nappal is égő (tompított) fényszóróval kell közlekednie a jó láthatóságért.", en: "A moped must ride with its dipped light on even during the day for visibility." },
    },
    {
      cat: "moped",
      q: { hu: "Használhatja-e a segédmotoros a kerékpárutat?", en: "May a moped use a cycle path?" },
      options: { hu: ["Soha", "Csak ha azt kiegészítő tábla kifejezetten megengedi", "Mindig", "Csak éjszaka"], en: ["Never", "Only if a supplementary sign expressly permits it", "Always", "Only at night"] },
      answer: 1,
      explain: { hu: "Segédmotorral a kerékpárút csak akkor használható, ha azt tábla kifejezetten engedélyezi.", en: "A moped may use a cycle path only where a sign expressly allows it." },
    },

    // ------------------------------------------------------------------
    // MOTORCYCLE (A)
    // ------------------------------------------------------------------
    {
      cat: "motorcycle",
      q: { hu: "Hány éves kortól szerezhető meg közvetlenül a korlátlan „A” motoros kategória?", en: "From what age can the unrestricted 'A' motorcycle category be obtained directly?" },
      options: { hu: ["18", "20", "21", "24"], en: ["18", "20", "21", "24"] },
      answer: 3,
      explain: { hu: "A korlátlan „A” kategória közvetlenül 24 éves kortól, vagy 2 év A2-tapasztalattal 20 évesen szerezhető meg.", en: "The unrestricted 'A' category is available directly from 24, or at 20 with two years of A2 experience." },
    },
    {
      cat: "motorcycle",
      q: { hu: "Mekkora az A2 kategória legnagyobb teljesítménye?", en: "What is the maximum power of the A2 category?" },
      options: { hu: ["11 kW", "25 kW", "35 kW", "Korlátlan"], en: ["11 kW", "25 kW", "35 kW", "Unlimited"] },
      answer: 2,
      explain: { hu: "Az A2 kategória legfeljebb 35 kW teljesítményű motorkerékpárokra jogosít.", en: "The A2 category permits motorcycles up to 35 kW." },
    },
    {
      cat: "motorcycle",
      q: { hu: "Nappal kötelező-e a tompított fény használata motorkerékpáron?", en: "Must a motorcycle use a dipped headlight during the day?" },
      options: { hu: ["Igen, mindig", "Csak lakott területen kívül", "Nem", "Csak esőben"], en: ["Yes, always", "Only outside built-up areas", "No", "Only in rain"] },
      answer: 0,
      explain: { hu: "A motorkerékpárnak nappal is folyamatosan tompított (vagy nappali menet-) fénnyel kell közlekednie.", en: "A motorcycle must keep its dipped (or daytime running) light on even by day." },
    },
    {
      cat: "motorcycle",
      q: { hu: "Kötelező-e a bukósisak a motorkerékpár vezetőjének és utasának?", en: "Is a helmet mandatory for the rider and passenger of a motorcycle?" },
      options: { hu: ["Csak a vezetőnek", "Igen, mindkettőnek", "Nem kötelező", "Csak autópályán"], en: ["Only the rider", "Yes, for both", "Not required", "Only on motorways"] },
      answer: 1,
      explain: { hu: "A motorkerékpár vezetőjének és utasának egyaránt kötelező a bukósisak viselése.", en: "Both the rider and passenger of a motorcycle must wear a crash helmet." },
    },
    {
      cat: "motorcycle",
      q: { hu: "Megengedett-e a sávok közötti „átszlalomozás” (sorok között cikázás) a magyar KRESZ szerint?", en: "Is weaving/filtering between lanes allowed under Hungarian rules?" },
      options: { hu: ["Igen, bármikor", "Általában nem; a forgalmi sávban kell haladni", "Csak autópályán", "Csak dugóban, korlátlanul"], en: ["Yes, any time", "Generally no; you must travel within a lane", "Only on motorways", "Only in jams, without limits"] },
      answer: 1,
      explain: { hu: "A motorosnak is a forgalmi sávban kell haladnia; a sorok közötti cikázás veszélyes és nem szabályos manőver.", en: "Motorcyclists must travel within a lane; weaving between rows is dangerous and not a legal manoeuvre." },
    },
    {
      cat: "motorcycle",
      sign: "pr-no-motorcycle",
      q: { hu: "Mit jelent ez a tábla?", en: "What does this sign mean?" },
      options: { hu: ["Motorszerviz", "Motorkerékpárral behajtani tilos", "Motoros parkoló", "Kötelező motorút"], en: ["Motorcycle service", "No motorcycles", "Motorcycle parking", "Compulsory motorcycle route"] },
      answer: 1,
      explain: { hu: "A piros körben lévő motorkerékpár a behajtási tilalmat jelzi motorok számára.", en: "A motorcycle in a red circle means motorcycles are prohibited from entering." },
    },
    {
      cat: "motorcycle",
      q: { hu: "Mit kell tudni a motoros utas szállításáról?", en: "What is required to carry a passenger on a motorcycle?" },
      options: { hu: ["Semmi külön", "Megfelelő utasülés és lábtartó szükséges", "Csak gyermeket lehet", "Csak oldalkocsiban"], en: ["Nothing special", "A proper passenger seat and footrests are required", "Only a child may ride", "Only in a sidecar"] },
      answer: 1,
      explain: { hu: "Utas csak akkor szállítható, ha a motorkerékpár rendelkezik utasüléssel és lábtartóval.", en: "A passenger may be carried only if the motorcycle has a passenger seat and footrests." },
    },
    {
      cat: "motorcycle",
      q: { hu: "Miért különösen fontos a védőruházat motorozáskor?", en: "Why is protective clothing especially important when riding?" },
      options: { hu: ["Nem fontos", "Mert bukás esetén jelentősen csökkenti a sérülés súlyosságát", "Csak a divat miatt", "Csak versenyen"], en: ["It isn't important", "Because it greatly reduces injury severity in a fall", "Only for fashion", "Only when racing"] },
      answer: 1,
      explain: { hu: "A motoros nincs karosszériával védve, ezért a bukósisak és a védőruházat életet menthet.", en: "A rider has no bodywork for protection, so a helmet and protective gear can save lives." },
    },
    {
      cat: "motorcycle",
      q: { hu: "Hogyan változik a motor féktávolsága nedves úton?", en: "How does a motorcycle's braking distance change on a wet road?" },
      options: { hu: ["Csökken", "Jelentősen megnő, ezért lassabban és nagyobb követési távval kell haladni", "Nem változik", "Csak kanyarban számít"], en: ["It decreases", "It increases significantly, so ride slower with more distance", "No change", "Only matters in bends"] },
      answer: 1,
      explain: { hu: "Nedves úton a tapadás csökken, a féktávolság megnő — mérsékelt sebesség és nagyobb követési távolság szükséges.", en: "On a wet road grip drops and braking distance grows — ride slower and keep more distance." },
    },
    {
      cat: "motorcycle",
      q: { hu: "Hol helyezkedj el a forgalmi sávban a legjobb láthatóságért és biztonságért?", en: "Where should you position yourself in the lane for best visibility and safety?" },
      options: { hu: ["Mindig a sáv közepén az olajcsík fölött", "A sávon belül a jól látható, biztonságos nyomvonalon, kerülve az olajos sávközepet", "A padkán", "A szembejövő sávban"], en: ["Always dead-centre over the oil strip", "On a visible, safe line within the lane, avoiding the oily centre", "On the verge", "In the oncoming lane"] },
      answer: 1,
      explain: { hu: "A sávon belül olyan nyomvonalat válassz, ahol jól látnak és jól látsz; kerüld a csúszós sávközepet.", en: "Choose a line within the lane where you are seen and can see well; avoid the slippery centre strip." },
    },

    // ------------------------------------------------------------------
    // CAR (B)
    // ------------------------------------------------------------------
    {
      cat: "car",
      q: { hu: "Hány éves kortól szerezhető meg a „B” kategóriás vezetői engedély Magyarországon?", en: "From what age can you get a category-B licence in Hungary?" },
      options: { hu: ["16", "17", "18", "21"], en: ["16", "17", "18", "21"] },
      answer: 1,
      explain: { hu: "A „B” kategóriás vezetői engedély 17 éves kortól szerezhető meg.", en: "A category-B licence can be obtained from age 17." },
    },
    {
      cat: "car",
      q: { hu: "Mekkora össztömegig vezethető jármű B kategóriás engedéllyel?", en: "Up to what total mass may you drive with a category-B licence?" },
      options: { hu: ["2500 kg", "3500 kg", "5000 kg", "7500 kg"], en: ["2500 kg", "3500 kg", "5000 kg", "7500 kg"] },
      answer: 1,
      explain: { hu: "B kategóriával legfeljebb 3500 kg össztömegű, max. 8+1 fős jármű vezethető.", en: "Category B allows vehicles up to 3500 kg and a maximum of 8+1 occupants." },
    },
    {
      cat: "car",
      sign: "pr-speed-50",
      q: { hu: "Mit ír elő ez a tábla?", en: "What does this sign require?" },
      options: { hu: ["Legalább 50 km/h kötelező", "Legfeljebb 50 km/h megengedett", "50 méter múlva kanyar", "Útszám: 50"], en: ["At least 50 km/h required", "Maximum 50 km/h allowed", "Bend in 50 metres", "Road number 50"] },
      answer: 1,
      explain: { hu: "A piros korong a számmal a megengedett legnagyobb sebességet jelzi — itt 50 km/h.", en: "A red circle with a number shows the maximum permitted speed — here 50 km/h." },
    },
    {
      cat: "car",
      q: { hu: "Mely okmányokat kell magadnál tartanod vezetés közben?", en: "Which documents must you carry while driving?" },
      options: { hu: ["Csak a jogosítványt", "Vezetői engedély, forgalmi engedély (és érvényes biztosítás)", "Csak a forgalmit", "Semmit, ha helyben vezetsz"], en: ["Just the licence", "Driving licence, registration (and valid insurance)", "Just the registration", "Nothing if driving locally"] },
      answer: 1,
      explain: { hu: "Vezetés közben magadnál kell tartanod a vezetői és a forgalmi engedélyt; a kötelező biztosításnak érvényesnek kell lennie.", en: "While driving you must carry your driving licence and the registration; valid third-party insurance is required." },
    },
    {
      cat: "car",
      q: { hu: "Mit kell ellenőrizned indulás előtt a biztonságos vezetéshez?", en: "What should you check before setting off for safe driving?" },
      options: { hu: ["Semmit", "Tükrök beállítása, biztonsági öv, gumiabroncsok, fények állapota", "Csak az üzemanyagot", "Csak a rádiót"], en: ["Nothing", "Mirrors, seat belt, tyres and lights", "Only the fuel", "Only the radio"] },
      answer: 1,
      explain: { hu: "Indulás előtt állítsd be a tükröket és az ülést, kapcsold be az övet, és ellenőrizd a gumikat és a világítást.", en: "Before setting off adjust mirrors and seat, fasten your belt and check tyres and lights." },
    },
    {
      cat: "car",
      q: { hu: "Mekkora a legnagyobb pótkocsi össztömege, amely sima B kategóriával vontatható?", en: "What is the maximum trailer mass towable with a plain category-B licence?" },
      options: { hu: ["250 kg", "500 kg", "750 kg", "1000 kg"], en: ["250 kg", "500 kg", "750 kg", "1000 kg"] },
      answer: 2,
      explain: { hu: "Sima B kategóriával legfeljebb 750 kg össztömegű könnyű pótkocsi vontatható (efölött B+E vagy B96 szükséges).", en: "With a plain B licence you may tow a light trailer up to 750 kg (above that you need B+E or B96)." },
    },
    {
      cat: "car",
      q: { hu: "Mit jelez a kigyulladó ABS-lámpa, és mi a teendő?", en: "What does an illuminated ABS warning light mean, and what should you do?" },
      options: { hu: ["A motor túlmelegedett", "Az ABS hibás lehet; a fékek működnek, de óvatosan vezess és javíttasd", "Üres a tank", "Nyitva az ajtó"], en: ["The engine overheated", "The ABS may be faulty; brakes still work — drive carefully and get it fixed", "The tank is empty", "A door is open"] },
      answer: 1,
      explain: { hu: "Az ABS-lámpa az blokkolásgátló hibáját jelzi; a fékrendszer alapból még működik, de erős fékezésnél a kerekek blokkolhatnak — javíttasd.", en: "The ABS light indicates an anti-lock fault; basic braking still works, but wheels may lock under hard braking — get it repaired." },
    },
    {
      cat: "car",
      q: { hu: "Mi a helyes teendő, ha vízen áthaladva nedves lett a fék?", en: "What's the correct action if your brakes get wet after driving through water?" },
      options: { hu: ["Semmi, magától jó lesz", "Lassan haladva, óvatosan próbáld a féket, hogy felszáradjon", "Erősen fékezz egyből", "Húzd be a kéziféket"], en: ["Nothing, it fixes itself", "Drive slowly and gently test the brakes to dry them", "Brake hard immediately", "Pull the handbrake"] },
      answer: 1,
      explain: { hu: "Vízátfolyás után lassan haladva, finoman fékezgetve szárítsd ki a fékeket, mielőtt rászorulnál.", en: "After fording water, dry the brakes by driving slowly and braking gently before you need them." },
    },
    {
      cat: "car",
      q: { hu: "Hol tilos a várakozás (parkolás)?", en: "Where is parking prohibited?" },
      options: { hu: ["Kijelölt parkolóban", "Kijelölt gyalogos-átkelőhelyen és előtte, útkereszteződésben, hídon", "Lakott területen kívül", "Saját udvarban"], en: ["In a marked car park", "On/just before a pedestrian crossing, at junctions, on bridges", "Outside built-up areas", "In your own yard"] },
      answer: 1,
      explain: { hu: "Tilos várakozni gyalogátkelőn és előtte, kereszteződésben, hídon, alagútban, ahol akadályoznád a forgalmat.", en: "Parking is banned on/before crossings, at junctions, on bridges and in tunnels — anywhere you'd obstruct traffic." },
    },
    {
      cat: "car",
      q: { hu: "Mi a fékút és a reakcióidő alatt megtett út összege?", en: "What is the sum of the reaction distance and the braking distance called?" },
      options: { hu: ["Követési távolság", "Megállási út (féktávolság)", "Látótávolság", "Kanyarodási ív"], en: ["Following distance", "Total stopping distance", "Sight distance", "Turning radius"] },
      answer: 1,
      explain: { hu: "A megállási út a reakcióidő alatt megtett út és a tényleges fékút összege; a sebesség négyzetével arányosan nő.", en: "Total stopping distance is the reaction distance plus the actual braking distance; it grows with the square of speed." },
    },
    {
      cat: "car",
      q: { hu: "Mit kell tenned, ha a köd erősen csökkenti a látótávolságot?", en: "What should you do when fog badly reduces visibility?" },
      options: { hu: ["Távolsági fényt kapcsolsz", "Lassítasz, tompított (és ködfény) bekapcsol, nagyobb követési táv", "Gyorsítasz, hogy kiérj", "Vészvillogóval száguldasz"], en: ["Switch to full beam", "Slow down, use dipped (and fog) lights, increase distance", "Speed up to get out", "Race with hazards on"] },
      answer: 1,
      explain: { hu: "Ködben lassíts, használj tompított és ködfényszórót (a távolsági visszaverődik), és tarts nagyobb követési távolságot.", en: "In fog slow down, use dipped and fog lights (full beam reflects back) and keep a larger gap." },
    },
    {
      cat: "car",
      q: { hu: "Megengedett-e jobbról előzni?", en: "Is overtaking on the right ever allowed?" },
      options: { hu: ["Soha", "Igen, pl. balra bekanyarodni készülő jármű mellett, vagy párhuzamos közlekedésnél a sávban", "Mindig szabad", "Csak autópályán"], en: ["Never", "Yes, e.g. past a vehicle about to turn left, or within lanes in parallel traffic", "Always", "Only on motorways"] },
      answer: 1,
      explain: { hu: "Jobbról elhaladni a balra bekanyarodó mellett, illetve párhuzamos sávos közlekedésnél a saját sávban szabad.", en: "You may pass on the right beside a vehicle turning left, or stay in your lane during parallel lane traffic." },
    },

    // ------------------------------------------------------------------
    // TRUCK (C)
    // ------------------------------------------------------------------
    {
      cat: "truck",
      q: { hu: "Mekkora az általános sebességhatár 3,5 t feletti tehergépkocsival autópályán?", en: "What is the default speed limit for a truck over 3.5 t on a motorway?" },
      options: { hu: ["80 km/h", "90 km/h", "100 km/h", "110 km/h"], en: ["80 km/h", "90 km/h", "100 km/h", "110 km/h"] },
      answer: 0,
      explain: { hu: "A 3,5 tonna feletti tehergépkocsi autópályán legfeljebb 80 km/h sebességgel haladhat.", en: "A truck over 3.5 t may do no more than 80 km/h on a motorway." },
    },
    {
      cat: "truck",
      q: { hu: "Mekkora az általános sebességhatár tehergépkocsival lakott területen kívül, sima úton?", en: "What's the default truck speed on an ordinary road outside built-up areas?" },
      options: { hu: ["60 km/h", "70 km/h", "80 km/h", "90 km/h"], en: ["60 km/h", "70 km/h", "80 km/h", "90 km/h"] },
      answer: 1,
      explain: { hu: "3,5 t feletti tehergépkocsival lakott területen kívül, sima úton az általános határ 70 km/h.", en: "For trucks over 3.5 t the default on ordinary roads outside built-up areas is 70 km/h." },
    },
    {
      cat: "truck",
      q: { hu: "Mi a tachográf (menetíró) szerepe?", en: "What is the role of the tachograph?" },
      options: { hu: ["Üzemanyag mérése", "A vezetési és pihenőidők rögzítése", "Navigáció", "A sebességkorlátozó kikapcsolása"], en: ["Measuring fuel", "Recording driving and rest times", "Navigation", "Disabling the speed limiter"] },
      answer: 1,
      explain: { hu: "A tachográf a vezetési és pihenőidőket rögzíti, amelyek betartása a fáradtság elleni védelem miatt kötelező.", en: "The tachograph records driving and rest times, which must be observed to guard against fatigue." },
    },
    {
      cat: "truck",
      q: { hu: "Miért különösen veszélyes a tehergépkocsi holttere?", en: "Why are a truck's blind spots especially dangerous?" },
      options: { hu: ["Nem veszélyesek", "A sofőr nem lát egyes területeket; kanyarodás/sávváltás előtt fokozottan ellenőrizni kell", "Csak hátramenetben", "Csak éjszaka"], en: ["They aren't", "The driver can't see certain areas; check carefully before turning/changing lanes", "Only when reversing", "Only at night"] },
      answer: 1,
      explain: { hu: "A nagy holttér miatt a kamion mellett és előtt is lehetnek nem látható résztvevők; manőver előtt alaposan ellenőrizz.", en: "Large blind spots can hide road users beside and in front; check thoroughly before any manoeuvre." },
    },
    {
      cat: "truck",
      sign: "pr-no-trucks",
      q: { hu: "Mit jelent ez a tábla?", en: "What does this sign mean?" },
      options: { hu: ["Tehergépkocsival behajtani tilos", "Teherautó-parkoló", "Rakodóhely", "Kötelező teherautóút"], en: ["No trucks (entry prohibited)", "Truck parking", "Loading bay", "Compulsory truck route"] },
      answer: 0,
      explain: { hu: "A piros körben lévő tehergépkocsi a behajtási tilalmat jelzi (a tömeghatár a táblán szerepelhet).", en: "A truck in a red circle means trucks are banned (a weight limit may be shown)." },
    },
    {
      cat: "truck",
      q: { hu: "Miért fontos a rakomány megfelelő rögzítése?", en: "Why is proper load securing important?" },
      options: { hu: ["Nem fontos", "Az elmozduló rakomány felborulást/balesetet okozhat és büntethető", "Csak a gyorshajtás miatt", "Csak télen"], en: ["It isn't important", "A shifting load can cause rollover/accidents and is punishable", "Only because of speeding", "Only in winter"] },
      answer: 1,
      explain: { hu: "A rosszul rögzített rakomány elmozdulhat, felboríthatja a járművet vagy az úttestre eshet — szabályos rögzítés kötelező.", en: "An unsecured load can shift, overturn the vehicle or fall onto the road — proper securing is mandatory." },
    },
    {
      cat: "truck",
      q: { hu: "Hogyan befolyásolja a nagy tömeg a fékutat?", en: "How does heavy mass affect braking distance?" },
      options: { hu: ["Csökkenti", "Jelentősen megnöveli, ezért nagyobb követési távolság kell", "Nem hat rá", "Csak lejtőn"], en: ["Reduces it", "Greatly increases it, so keep more distance", "No effect", "Only downhill"] },
      answer: 1,
      explain: { hu: "A nagy tömegű jármű féktávolsága lényegesen hosszabb; tarts nagyobb követési távolságot és fékezz korábban.", en: "A heavy vehicle's braking distance is much longer; keep more distance and brake earlier." },
    },
    {
      cat: "truck",
      q: { hu: "Mit ír elő a vezetési és pihenőidőre vonatkozó szabály fő célja?", en: "What is the main aim of driving- and rest-time rules?" },
      options: { hu: ["Gyorsabb szállítás", "A fáradtságból eredő balesetek megelőzése", "Üzemanyag-megtakarítás", "Kevesebb adminisztráció"], en: ["Faster delivery", "Preventing fatigue-related accidents", "Saving fuel", "Less paperwork"] },
      answer: 1,
      explain: { hu: "A kötelező vezetési és pihenőidők célja a vezető kipihentsége, így a fáradtság okozta balesetek megelőzése.", en: "Mandatory driving/rest times keep the driver rested, preventing fatigue-related crashes." },
    },
    {
      cat: "truck",
      q: { hu: "Lejtőn hosszú ereszkedésnél mi a helyes féktechnika nehéz járművel?", en: "On a long descent, what's the correct braking technique with a heavy vehicle?" },
      options: { hu: ["Folyamatos lábfék végig", "Alacsony fokozat (motorfék) és szakaszos fékezés a túlmelegedés ellen", "Üresben gurulni", "Csak kézifék"], en: ["Constant footbrake all the way", "Low gear (engine braking) and intermittent braking to avoid overheating", "Coast in neutral", "Handbrake only"] },
      answer: 1,
      explain: { hu: "Hosszú lejtőn alacsony fokozatban a motorféket használd, a lábféket szakaszosan, nehogy túlmelegedjen és elfáradjon.", en: "On long descents use a low gear for engine braking and apply the footbrake intermittently to avoid brake fade." },
    },

    // ------------------------------------------------------------------
    // BUS (D)
    // ------------------------------------------------------------------
    {
      cat: "bus",
      q: { hu: "Mekkora az általános sebességhatár autóbusszal lakott területen kívül, sima úton?", en: "What's the default bus speed on an ordinary road outside built-up areas?" },
      options: { hu: ["60 km/h", "70 km/h", "80 km/h", "90 km/h"], en: ["60 km/h", "70 km/h", "80 km/h", "90 km/h"] },
      answer: 1,
      explain: { hu: "Autóbusszal lakott területen kívül, sima úton az általános sebességhatár 70 km/h.", en: "For buses on ordinary roads outside built-up areas the default is 70 km/h." },
    },
    {
      cat: "bus",
      q: { hu: "Mekkora az általános sebességhatár autóbusszal autópályán?", en: "What's the default bus speed limit on a motorway?" },
      options: { hu: ["70 km/h", "80 km/h", "100 km/h", "130 km/h"], en: ["70 km/h", "80 km/h", "100 km/h", "130 km/h"] },
      answer: 1,
      explain: { hu: "Autóbusszal az autópályán az általános sebességhatár 80 km/h (külön feltételekkel egyes buszok 100 km/h).", en: "For buses the default motorway limit is 80 km/h (some buses 100 km/h under special conditions)." },
    },
    {
      cat: "bus",
      q: { hu: "Mi a legfontosabb szempont autóbuszvezetőként induláskor?", en: "What is the most important consideration for a bus driver when setting off?" },
      options: { hu: ["A menetrend mindenáron", "Az utasok biztonsága és a biztonságos beszállás", "A gyors gyorsítás", "A rádió hangereje"], en: ["The timetable at any cost", "Passenger safety and safe boarding", "Fast acceleration", "Radio volume"] },
      answer: 1,
      explain: { hu: "Az utasok biztonsága az elsődleges: csak akkor indulj, ha mindenki biztonságosan beszállt és az ajtók zárva.", en: "Passenger safety comes first: only set off once everyone has boarded and the doors are closed." },
    },
    {
      cat: "bus",
      q: { hu: "Hány éves kortól szerezhető meg a „D” (autóbusz) kategória általános esetben?", en: "From what age is the 'D' (bus) category generally available?" },
      options: { hu: ["18", "21", "24", "26"], en: ["18", "21", "24", "26"] },
      answer: 2,
      explain: { hu: "A „D” kategória általában 24 éves kortól szerezhető meg (GKI-val, korlátozással 21 évesen is).", en: "The 'D' category is generally available from age 24 (from 21 with a CPC, subject to limits)." },
    },
    {
      cat: "bus",
      sign: "i-busstop",
      q: { hu: "Mit jelez ez a tábla?", en: "What does this sign indicate?" },
      options: { hu: ["Autóbusz-megállóhely", "Buszsáv vége", "Buszpályaudvar", "Autóbusszal behajtani tilos"], en: ["Bus stop", "End of bus lane", "Bus station", "No buses"] },
      answer: 0,
      explain: { hu: "A tábla menetrend szerinti autóbusz megállóhelyét jelzi; környékén külön megállási szabályok vannak.", en: "The sign marks a scheduled bus stop; special stopping rules apply nearby." },
    },
    {
      cat: "bus",
      q: { hu: "Mire kell figyelni az autóbusz nagy mérete és hosszú tengelytávja miatt kanyarodáskor?", en: "What must you watch for when turning, given a bus's size and long wheelbase?" },
      options: { hu: ["Semmire", "A hátsó kerekek beljebb vágnak (belívás), és nagy a holttér", "Csak a sebességre", "Csak a tükörre"], en: ["Nothing", "The rear wheels cut in (off-tracking) and blind spots are large", "Only speed", "Only the mirror"] },
      answer: 1,
      explain: { hu: "Kanyarodáskor a busz hátsó kerekei beljebb haladnak; ügyelj a belívásra, a holttérre és a gyalogosokra.", en: "When turning, a bus's rear wheels track inside the front; mind the off-tracking, blind spots and pedestrians." },
    },
    {
      cat: "bus",
      q: { hu: "Mi a teendő, ha utas menet közben fel akar állni vagy le akar szállni a megállón kívül?", en: "What should you do if a passenger wants to stand or alight between stops?" },
      options: { hu: ["Azonnal megállsz bárhol", "Kéred, hogy maradjon biztonságban; csak kijelölt megállóban, biztonságosan engeded le", "Gyorsítasz", "Kinyitod az ajtót menet közben"], en: ["Stop anywhere at once", "Ask them to stay safe; let them off only at a stop, safely", "Speed up", "Open the door while moving"] },
      answer: 1,
      explain: { hu: "Az utasok biztonsága érdekében csak kijelölt megállóban, biztonságosan szabad le- és felszállni; menet közben az ajtó zárva.", en: "For safety, boarding/alighting is only at designated stops; doors stay closed while moving." },
    },
    {
      cat: "bus",
      q: { hu: "Miért kell az autóbuszvezetőnek különösen simán fékeznie és gyorsítania?", en: "Why must a bus driver brake and accelerate especially smoothly?" },
      options: { hu: ["Üzemanyag miatt", "Az álló/ülő utasok eleshetnek, megsérülhetnek", "A menetrend miatt", "Nincs jelentősége"], en: ["For fuel", "Standing/seated passengers could fall and get hurt", "For the timetable", "It doesn't matter"] },
      answer: 1,
      explain: { hu: "A hirtelen fékezés vagy gyorsítás az álló utasokat felboríthatja; a sima vezetés az utasok biztonságát szolgálja.", en: "Sudden braking or acceleration can throw standing passengers; smooth driving protects them." },
    },

    // ------------------------------------------------------------------
    // BICYCLE
    // ------------------------------------------------------------------
    {
      cat: "bicycle",
      q: { hu: "Kötelező-e a láthatósági mellény kerékpárosnak lakott területen kívül, éjszaka?", en: "Is a hi-vis vest mandatory for a cyclist outside built-up areas at night?" },
      options: { hu: ["Igen, kötelező", "Csak ajánlott", "Nem", "Csak gyermeknek"], en: ["Yes, mandatory", "Only recommended", "No", "Only for children"] },
      answer: 0,
      explain: { hu: "Lakott területen kívül, éjszaka vagy rossz látási viszonyok közt a kerékpárosnak kötelező a fényvisszaverő mellény.", en: "Outside built-up areas, at night or in poor visibility, cyclists must wear a reflective vest." },
    },
    {
      cat: "bicycle",
      q: { hu: "Hol kell kerékpározni, ha van kijelölt kerékpárút?", en: "Where must you cycle when a cycle path exists?" },
      options: { hu: ["Az úttest közepén", "A kerékpárúton (kötelező használni)", "Mindig a járdán", "Bárhol"], en: ["Middle of the road", "On the cycle path (its use is mandatory)", "Always on the pavement", "Anywhere"] },
      answer: 1,
      explain: { hu: "Ahol van kerékpárút/sáv, annak használata kötelező; egyébként az úttest jobb szélén kell haladni.", en: "Where a cycle path/lane exists you must use it; otherwise ride on the right edge of the road." },
    },
    {
      cat: "bicycle",
      q: { hu: "Hány éves korig kerékpározhat gyermek az úttesten csak felügyelettel?", en: "Up to what age may a child only cycle on the road under supervision?" },
      options: { hu: ["10", "12", "14", "16"], en: ["10", "12", "14", "16"] },
      answer: 1,
      explain: { hu: "12 éven aluli gyermek az úttesten csak felügyelettel kerékpározhat; egyébként a járdán is haladhat, ha nincs kerékpárút.", en: "A child under 12 may cycle on the road only with supervision; otherwise they may use the pavement if there is no cycle path." },
    },
    {
      cat: "bicycle",
      sign: "m-cyclepath",
      q: { hu: "Mit jelent ez a kék tábla?", en: "What does this blue sign mean?" },
      options: { hu: ["Kerékpárral behajtani tilos", "Kerékpárút — kötelező használni", "Kerékpárszerviz", "Kerékpárverseny"], en: ["No bicycles", "Cycle path — mandatory to use", "Bicycle repair", "Bicycle race"] },
      answer: 1,
      explain: { hu: "A kék körben lévő fehér kerékpár kerékpárutat jelez, amelynek használata kötelező.", en: "A white bicycle in a blue circle marks a cycle path, which you must use." },
    },
    {
      cat: "bicycle",
      q: { hu: "Szabad-e kézben tartott mobiltelefont használni kerékpározás közben?", en: "May you use a hand-held phone while cycling?" },
      options: { hu: ["Igen", "Nem, menet közben tilos", "Csak kerékpárúton", "Csak lakott területen"], en: ["Yes", "No, it's prohibited while riding", "Only on a cycle path", "Only in town"] },
      answer: 1,
      explain: { hu: "Menet közben tilos a kézben tartott mobil használata; ha telefonálnod kell, állj meg biztonságosan.", en: "Using a hand-held phone while riding is prohibited; stop safely first if you must use it." },
    },
    {
      cat: "bicycle",
      q: { hu: "Milyen világítás kötelező a kerékpáron sötétben?", en: "What lighting is mandatory on a bicycle in the dark?" },
      options: { hu: ["Semmi", "Elöl fehér, hátul piros lámpa és hátul piros fényvisszaverő", "Csak első lámpa", "Csak hátsó prizma"], en: ["None", "A white front light, a red rear light and a red rear reflector", "Front light only", "Rear reflector only"] },
      answer: 1,
      explain: { hu: "Sötétben elöl fehér (vagy sárga), hátul piros lámpa, valamint hátul piros fényvisszaverő kötelező.", en: "In the dark a white (or amber) front light, a red rear light and a red rear reflector are required." },
    },
    {
      cat: "bicycle",
      q: { hu: "Ittasan szabad-e kerékpározni?", en: "May you cycle while under the influence of alcohol?" },
      options: { hu: ["Igen, korlátlanul", "Nem, ittasan tilos és szankcionálható", "Csak kis mennyiség után", "Csak nappal"], en: ["Yes, without limit", "No, it's prohibited and punishable", "Only after a little", "Only by day"] },
      answer: 1,
      explain: { hu: "Ittasan kerékpározni tilos; a kerékpáros is jármű vezetője, az alkohol szigorúan szankcionálható.", en: "Cycling under the influence is prohibited; a cyclist is a vehicle operator and alcohol is strictly penalised." },
    },
    {
      cat: "bicycle",
      q: { hu: "Hogyan jelezd a kanyarodási szándékodat kerékpárral?", en: "How do you signal your intention to turn on a bicycle?" },
      options: { hu: ["Nem kell jelezni", "Kézzel, a kanyarodás irányába kinyújtott karral", "Csak fejmozdulattal", "Dudával"], en: ["No need to signal", "By hand, extending the arm toward the turn", "Only by nodding", "With a horn"] },
      answer: 1,
      explain: { hu: "Kerékpárral a kanyarodást időben, a megfelelő oldali kar kinyújtásával kell jelezni.", en: "On a bike, signal a turn in good time by extending the arm on the relevant side." },
    },
    {
      cat: "bicycle",
      q: { hu: "Hogyan haladhatnak a kerékpárosok az úttesten egymáshoz képest?", en: "How may cyclists ride relative to each other on the road?" },
      options: { hu: ["Mindig kettesével egymás mellett", "Főszabály szerint egy sorban, egymás mögött", "Hármasával", "Cikcakkban"], en: ["Always two abreast", "As a rule single file, one behind the other", "Three abreast", "Zig-zagging"] },
      answer: 1,
      explain: { hu: "Az úttesten a kerékpárosok főszabály szerint egymás mögött, egy sorban közlekedhetnek.", en: "On the road cyclists must, as a rule, ride single file, one behind the other." },
    },
    {
      cat: "bicycle",
      q: { hu: "Mit kell tenned kerékpárral kijelölt gyalogos-átkelőhelyen való áthaladáskor?", en: "What should you do when crossing at a marked pedestrian crossing on a bike?" },
      options: { hu: ["Áthajtasz teljes sebességgel", "Letolod a kerékpárt, vagy lépésben haladsz (kivéve kerékpáros átvezetés)", "Dudálsz", "Felgyorsítasz"], en: ["Ride across at full speed", "Push the bike or go at walking pace (unless it's a cycle crossing)", "Honk", "Speed up"] },
      answer: 1,
      explain: { hu: "Gyalogátkelőn a kerékpárt jellemzően le kell tolni vagy lépésben átvezetni; gyorsan áthajtani veszélyes és szabálytalan.", en: "At a pedestrian crossing you should generally push the bike or walk it across; riding fast is dangerous and against the rules." },
    },
  ];

  // ========================================================================
  //  AUTO-GENERATED SIGN-RECOGNITION QUESTIONS (covers every sign)
  // ========================================================================
  function generateSignQuestions() {
    const signs = K.SIGNS || [];
    const byCat = {};
    signs.forEach((s) => {
      (byCat[s.category] = byCat[s.category] || []).push(s);
    });
    const pick = (arr, n, exclude) =>
      shuffle(arr.filter((x) => x !== exclude)).slice(0, n);

    return signs.map((s) => {
      let distract = pick(byCat[s.category] || [], 3, s);
      if (distract.length < 3) {
        const more = pick(
          signs.filter((x) => x.category !== s.category && x !== s),
          3 - distract.length
        );
        distract = distract.concat(more);
      }
      const choices = shuffle([s].concat(distract));
      return {
        cat: "signs",
        sign: s.id,
        q: { hu: "Mit jelent ez a tábla?", en: "What does this sign mean?" },
        options: {
          hu: choices.map((c) => c.name.hu),
          en: choices.map((c) => c.name.en),
        },
        answer: choices.indexOf(s),
        explain: s.desc,
      };
    });
  }

  K.QUESTIONS = HAND.concat(generateSignQuestions());
})(window);
