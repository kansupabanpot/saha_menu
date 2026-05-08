/* global React, ReactDOM, TweaksPanel, TweakSection, TweakRadio, TweakToggle, TweakText, useTweaks */

const TWEAK_DEFAULTS_V2 = /*EDITMODE-BEGIN*/{
  "ink": "crimson",
  "openTime": "11:00",
  "closeTime": "22:00",
  "lastOrder": "21:30",
  "showLastOrder": true,
  "closedDay": "Tuesday",
  "phone": "084 279 0999",
  "showPhone": true,
  "outline": true
}/*EDITMODE-END*/;

const DAY_TH_V2 = {
  Monday: "วันจันทร์",
  Tuesday: "วันอังคาร",
  Wednesday: "วันพุธ",
  Thursday: "วันพฤหัสบดี",
  Friday: "วันศุกร์",
  Saturday: "วันเสาร์",
  Sunday: "วันอาทิตย์",
};

function fmtTimeV2(t) {
  if (!t) return "";
  const [h, m] = t.split(":").map((n) => parseInt(n, 10));
  if (Number.isNaN(h)) return t;
  return `${String(h).padStart(2, "0")}.${String(m || 0).padStart(2, "0")}`;
}

const INKS = {
  crimson: { ink: "#8B2020", stage: "#F5F0C8", emblemMode: "dark" },   /* crimson on cream */
  black:   { ink: "#1A1A1A", stage: "#F5F0C8", emblemMode: "dark" },   /* black on cream */
  cream:   { ink: "#F5F0C8", stage: "#5C1A1A", emblemMode: "light" },  /* cream on burgundy */
  white:   { ink: "#FFFFFF", stage: "#5C1A1A", emblemMode: "light" },  /* white on burgundy */
};

function DoorPlaqueV2() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS_V2);
  const ink = INKS[t.ink] || INKS.crimson;

  const closedDayTh = DAY_TH_V2[t.closedDay] || t.closedDay;

  return (
    <>
      <div className="stage" style={{ background: ink.stage }}>
        <div
          className={`plaque ${t.outline ? "plaque--outlined" : ""}`}
          style={{ "--ink": ink.ink }}
          role="img"
          aria-label={`Hours ${fmtTimeV2(t.openTime)} to ${fmtTimeV2(t.closeTime)}, closed ${t.closedDay}`}
        >
          {/* LEFT — mark + wordmark (one unit) */}
          <div className="plaque__brand">
            <div className={`plaque__emblem plaque__emblem--${ink.emblemMode}`} aria-hidden="true">
              <img src="../assets/saha-logo.png" alt="" />
            </div>
            <div className="plaque__wordmark">
              <div className="plaque__name1">SAHA</div>
              <div className="plaque__name2">Steak and Butcher</div>
            </div>
          </div>

          {/* DIVIDER */}
          <div className="plaque__divider" aria-hidden="true"></div>

          {/* RIGHT — information stack */}
          <div className="plaque__info">
            <div className="plaque__hours">
              {fmtTimeV2(t.openTime)}<span className="dash">–</span>{fmtTimeV2(t.closeTime)}
            </div>
            {t.showLastOrder && (
              <div className="plaque__last">Last order {fmtTimeV2(t.lastOrder)}</div>
            )}

            <div className="plaque__closed">
              <div className="plaque__closedEN">Closed {t.closedDay}s</div>
              <div className="plaque__closedTH">หยุดทุก{closedDayTh}</div>
            </div>

            {t.showPhone && (
              <div className="plaque__phone">{t.phone}</div>
            )}
          </div>
        </div>
      </div>

      <TweaksPanel title="Plaque · Production">
        <TweakSection label="Color">
          <TweakRadio
            label="Ink"
            value={t.ink}
            options={[
              { value: "crimson", label: "Crimson" },
              { value: "black",   label: "Black" },
              { value: "cream",   label: "Cream" },
              { value: "white",   label: "White" },
            ]}
            onChange={(v) => setTweak("ink", v)}
          />
          <TweakToggle
            label="Hairline border"
            value={t.outline}
            onChange={(v) => setTweak("outline", v)}
          />
        </TweakSection>

        <TweakSection label="Hours">
          <TweakText label="Open"  value={t.openTime}  placeholder="11:00" onChange={(v) => setTweak("openTime", v)} />
          <TweakText label="Close" value={t.closeTime} placeholder="22:00" onChange={(v) => setTweak("closeTime", v)} />
          <TweakToggle label="Show last-order line" value={t.showLastOrder} onChange={(v) => setTweak("showLastOrder", v)} />
          {t.showLastOrder && (
            <TweakText label="Last order" value={t.lastOrder} placeholder="21:30" onChange={(v) => setTweak("lastOrder", v)} />
          )}
        </TweakSection>

        <TweakSection label="Closure">
          <TweakRadio
            label="Closed day"
            value={t.closedDay}
            options={["Monday", "Tuesday", "Wednesday", "Thursday"].map((d) => ({ value: d, label: d.slice(0,3) }))}
            onChange={(v) => setTweak("closedDay", v)}
          />
          <TweakRadio
            label=""
            value={t.closedDay}
            options={["Friday", "Saturday", "Sunday"].map((d) => ({ value: d, label: d.slice(0,3) }))}
            onChange={(v) => setTweak("closedDay", v)}
          />
        </TweakSection>

        <TweakSection label="Phone">
          <TweakToggle label="Show phone" value={t.showPhone} onChange={(v) => setTweak("showPhone", v)} />
          {t.showPhone && (
            <TweakText label="Number" value={t.phone} placeholder="084 279 0999" onChange={(v) => setTweak("phone", v)} />
          )}
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

const rootV2 = ReactDOM.createRoot(document.getElementById("root"));
rootV2.render(<DoorPlaqueV2 />);
