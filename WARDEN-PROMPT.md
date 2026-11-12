# Context prompt: the WARDEN site (read this fully before changing anything)

I'm giving you an existing cinematic 3D website. I want to **change its narrative** (story, copy, brand), and the site is now called **WARDEN**. Before editing, understand how it is built. Do not touch the 3D engine or rebuild it; re-theme it.

## 1. What the site is
A single-page, scroll-driven WebGL site (vanilla JS, three.js, GSAP ScrollTrigger, Lenis smooth scroll, Vite). The 3D scene *is* the page: a dark industrial hangar with an 11.4 m, 40-tonne mech (`public/models/hangar/mech.glb`) and a small recon drone (`drone.glb`) circling it with a searchlight. The page text is HTML laid over a fixed full-screen `<canvas id="gl">`.

Current narrative (the thing to replace): a fictional manufacturer, "Hangar Nine Heavy Systems", recruits six test pilots (Cohort 09) for its mech, the HN-9 "Warden". Tone: deadpan, confident, dry humour, Titanfall / Pacific Rim title sequence. Disaster-response framing, not combat.

New direction: the brand/site name is **WARDEN** (it was "Hangar Nine"; the mech was "HN-9 Warden"). Keep the mech and the experience; I'll give you the new story/copy. If I haven't specified something, propose it and keep it consistent.

## 2. Experience flow (this order is the structure; keep it unless I say otherwise)
1. **Loader**: two blast-door halves, a % counter and a firmware boot log. Doors open at 100%.
2. **Hero, cold state**: hangar almost black, mech barely visible, red emergency strobes, HUD reads "Reactor cold", pilot seat "VACANT". Mouse moves the drone's searchlight.
3. **Signature interaction, press and hold** (mouse/touch anywhere, or Space, ~1.9 s) to fill a radial "Hold to initiate" gauge. On completion: flash, floodlights clank on bay by bay (volumetric beams + dust), visor glows, steam bursts, HUD boots, a holographic scan plane travels up the mech, page switches from cold to live. Gauge text changes to "Online" / "Warden online".
4. **Scroll**: the camera orbits the mech through named shots; each section has a camera shot (`SHOTS` in `main.js`, keyed by each section's `data-shot`).
5. **Four "Systems" sections** with hotspots projected from 3D onto the mech and a leader line to the card.
6. **Stats**, count-up numbers.
7. **Program** timeline + requirements + pilot quote with portrait.
8. **Apply CTA** (camera swings behind to a dawn-lit hangar door), then footer.
Also: sound toggle (synthesized audio), custom cursor, magnetic buttons, sticky nav, HUD frame with live readouts (RCTR / CORE / HYD / SYNC), a height ruler (11.4 m).

## 3. File map
- `index.html`: ALL page copy lives here (full text in section 5).
- `style.css`: layout/typography. Palette: gunmetal, fog grey, hazard amber `#ffb000`, sparing cyan. Fonts: Chakra Petch, Rajdhani, Share Tech Mono (Google Fonts).
- `main.js`: orchestration: loader, power-up sequence, scroll to camera shots, hotspots, HUD, hold input, frame loop. Some copy is also set from JS: HUD boot lines (`.hud-boot`), `.g-label`/`.ignite-title`/`.ignite-hint` changed on power-up (~line 539-542), hotspot labels in `SPOTS` (~line 389), HUD state strings (`.hud-state`).
- `world.js`: procedural hangar (gantries, catwalks, hazard stripes, wet floor, dawn door texture `img/hangar/dawn.webp`). `fx.js`: mech shader / scan / steam / sparks. `volumetric.js`: floodlight beams. `audio.js`: synth sound.
- `src/core/`: shared engine (post-processing, reflections, scroll, UI). Don't modify except for performance.
- `public/models/hangar/{mech,drone}.glb`, `public/img/hangar/{pilot,dawn}.webp`.

## 4. Rules for the narrative change
- **Section ids/classes and `data-shot`/`data-spot` attributes drive the 3D.** Don't rename or reorder sections without updating `SHOTS`, `SCRIM`, `SPOTS` and `shotList` in `main.js`. Changing text is always safe; changing structure needs matching JS edits.
- Keep the hotspot count at 4 (reactor, knee, shoulder, gun) tied to the 4 `.sec.spec` sections, or tell me if you'd need to change that. Camera targets are tied to the mech's physical parts, so a new story should map onto the same four body parts.
- Keep text lengths similar so layouts don't break (headline ≈ 6-10 words, card body ≈ 45-60 words, 3 data pairs per card, 4 stats, 3 steps, 4 timeline items, 4 requirements).
- Update everything that mentions the old brand: `<title>`, meta description, brand logo text, loader lines, HUD ids ("HN-9 · A7-019"), reticle text, footer, legal line, favicon colour if needed, `package.json` name.
- Preserve the cold/live duality: the copy in the hero should work in the dark "asleep" state; the power-up is the story's first beat.
- After edits run `npm run dev` and check every section, the loader and the hold interaction. Work in small steps and tell me what you changed.

## 5. Complete current text (replace as the new narrative requires)

**Meta:** title "Hangar Nine — HN-9 “Warden” Test-Pilot Program". Description: "HN-9 “Warden”. Forty tons. One pilot. Hangar Nine is recruiting six test pilots for Cohort 09."

**Loader:** "Hangar Nine Heavy Systems" / "HN-9 FW 4.12.0". Log: › Bay 09 link established · › Mounting chassis mesh A7-019 · › Loading actuator map ··· 41/41 · › Recon drone RD-3 docked · › Warming shaders · › Standby. Awaiting pilot.

**Nav:** logo "Hangar**Nine**"; links The Warden / Systems / Numbers / Program; sound toggle "Snd Off"; button "Apply · Cohort 09".

**HUD:** top "HN-9 · A7-019 | Reactor cold | 03:12:07"; side readouts RCTR 0.3%, CORE 31°C, HYD 0 bar, SYNC —; reticle "HN-9 WARDEN / PILOT SEAT · VACANT"; ruler "11.4 m".

**Hero:** eyebrow "Northfield Proving Ground · Bay 09 · 03:12 local"; title "HN-9" + “Warden”; tag "Forty tons. *One pilot.*"; lede "Hangar Nine is recruiting six test pilots for the Warden’s final certification year. It has been asleep since the last shift. Wake it up."
Gauge: "Hold to initiate"; "Cold start"; hint "Press and hold anywhere — or hold Space — to bring the reactor up."; after power-up: "Online", "Warden online", "Forty-one actuators, one empty seat. Scroll to walk around it."; cue "Move to aim the drone’s searchlight · Scroll to walk around it"; hold gauge label "Hold".

**01 — Cold start** (id `warden`): "Standby to standing weight in *9.2 seconds.*" Body: "The Warden idles at 0.3% reactor draw — just enough to keep the gyros warm and the coolant moving. What you just did is the fastest cold start of any frame in its class. Every pilot in the program has done it a few hundred times, and every one of them still grins when the lights come on."
Steps: T+0.0 Ignition. "The salt core reaches operating temperature in 3.1 s. You feel it through the seat first." · T+3.4 Handshake. "Forty-one actuators report in, heel to crown, in 0.6 s." · T+9.2 Sync. "The harness calibrates to your reflexes — not the other way round."

**02.1 Systems · Reactor** (hotspot "01 Reactor"): "A 42-megawatt heart, sealed for life." Body: "A molten-salt core the size of a beer keg sits behind the chest plate. It is sealed at the factory and never opened again. It makes enough power for a small town and enough heat to boil the rain off the armour." Data: Output 42 MW cont. / Endurance 96 h / Failsafe Passive drain-down.

**02.2 Systems · Actuators** (hotspot "02 Actuators", knee): "Forty-one joints that know when you flinch." Body: "Every joint is an electro-hydraulic actuator with its own controller and its own opinion. The knees carry 1,900 kilonewtons at full stride and still correct for a loose paving slab in under a millisecond. You decide where to go. They decide not to fall over." Data: Joints 41 / Response 0.8 ms / Knee load 1,900 kN.

**02.3 Systems · Armour** (hotspot "03 Armour", shoulder): "Bolted, not welded. On purpose." Body: "Layered ceramic over a titanium lattice, hung in 212 panels. Every one comes off with a single socket size, so a four-person field crew can swap a shoulder in forty minutes — in the rain, at night, with you still in the seat." Data: Composite 180 mm / Panels 212 / Field swap 40 min.

**02.4 Systems · Hardpoints** (hotspot "04 Hardpoints", gun): "The last thing you certify. The least interesting." Body: "A six-barrel rotary on the right shoulder, a twelve-cell pod on the left, and a 2.1-metre forearm shield you will use more than both. Trials fire inert rounds only. Most of your hours go into lifting, bracing and walking — the Warden’s first deployments are disaster response." Data: Rotary 30 mm × 6 / Pod 12 cells / Shield 2.1 m.

**03 — Numbers** ("The numbers the insurers asked about first"): 11.4 m Standing height, heel to crown · 40 t Mass with a full core — and one pilot · 42 MW Continuous reactor output · 68 km/h Top speed on flat ground. Yes, it runs.

**04 — Program · Cohort 09:** "Six seats. Twenty-three weeks. *One very large first step.*" Timeline: Wk 01–08 Simulator "A full-scale motion rig. You will fall over in here so you never do out there." · Wk 09–16 Tethered "The Warden on a sixty-tonne gantry harness. Your first real steps, with a safety net the size of a building." · Wk 17–23 Untethered "The proving ground: rubble fields, flooded streets, night work, rain." · Grad. Callsign "Painted on a shoulder plate by the crew who kept you upright."
"You bring": 1,500+ hours rotary or fixed-wing — or five years running heavy plant · Sustained 5 g tolerance and a clean medical · Standing height 1.60–1.93 m. The seat is not adjustable; the pilot is. · Calm. We test for it.
Quote (with portrait `pilot.webp`, alt "Captain Ines Varga in a grey flight suit, helmet under her arm, in the hangar"): “The first step is the loudest thing you will ever feel. The second one is yours.” — Capt. Ines Varga · Pilot 004 · Cohort 03

**05 — Apply:** kicker "Applications close 14 November"; title "Your shift starts at *dawn.*"; body "Shortlisted candidates spend two days at Northfield: one in the simulator, one in the seat. Nobody arrives with mech experience. Nobody has any."; buttons "Begin application", "Pilot’s brief · PDF 2.4 MB"; meta "2,418 applied for Cohort 08 · Six seats · Northfield, Gate C".

**Footer:** mark "Hangar**Nine**"; "Heavy Systems · Northfield Proving Ground · Bay 09". Columns: Program (Cohort 09, Requirements, Apply) · Hangar (The Warden, Safety record, Ground crew careers) · Visit (Gate C, Northfield / Tours Saturdays, 10:00 / Ear protection provided). Legal: "© 2026 Hangar Nine Heavy Systems — a fictional manufacturer." / "The Warden is not for sale. The seats are."

## 6. First step
Confirm you understand the structure by summarising it in your own words in under 10 bullets, then ask me for the new narrative (or propose one) before editing.
