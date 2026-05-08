/* global React, ReactDOM, TweaksPanel, TweakSection, TweakRadio, TweakToggle, TweakSelect, TweakText, TweakSlider, useTweaks */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "status": "open",
  "surface": "parchment",
  "orientation": "portrait",
  "showEmblem": true,
  "openTime": "11:00",
  "closeTime": "22:00",
  "lastOrder": "21:30",
  "showLastOrder": true,
  "closedDay": "Tuesday",
  "phone": "084 279 0999",
  "showPhone": true,
  "language": "bilingual"
}/*EDITMODE-END*/;

/* ─────────────────────────── i18n maps ─────────────────────────── */

const DAY_TH = {
  Monday: "วันจันทร์",
  Tuesday: "วันอังคาร",
  Wednesday: "วันพุธ",
  Thursday: "วันพฤหัสบดี",
  Friday: "วันศุกร์",
  Saturday: "วันเสาร์",
  Sunday: "วันอาทิตย์",
};

/* Format "HH:MM" → display string */
function fmtTime(t) {
  if (!t) return "";
  const [h, m] = t.split(":").map((n) => parseInt(n, 10));
  if (Number.isNaN(h)) return t;
  return `${String(h).padStart(2, "0")}.${String(m || 0).padStart(2, "0")}`;
}

/* ─────────────────────────── App ─────────────────────────── */

function DoorSign() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  const isClosed = t.status === "closed";

  return (
    <>
      <div className={`stage stage--${t.surface}`}>
        <SignSurface t={t} isClosed={isClosed} />
      </div>

      <TweaksPanel title="Door Sign · Tweaks">
        <TweakSection label="Status">
          <TweakRadio
            label="Showing"
            value={t.status}
            options={[
              { value: "open", label: "Open" },
              { value: "closed", label: "Closed" },
            ]}
            onChange={(v) => setTweak("status", v)}
          />
        </TweakSection>

        <TweakSection label="Sign Style">
          <TweakSelect
            label="Surface"
            value={t.surface}
            options={[
              { value: "parchment", label: "Parchment (printed)" },
              { value: "decal",     label: "Window decal (cut vinyl)" },
              { value: "chalkboard",label: "Chalkboard (hanging)" },
              { value: "enamel",    label: "Enamel plaque" },
            ]}
            onChange={(v) => setTweak("surface", v)}
          />
          <TweakRadio
            label="Format"
            value={t.orientation}
            options={[
              { value: "portrait",  label: "Door" },
              { value: "landscape", label: "Window" },
            ]}
            onChange={(v) => setTweak("orientation", v)}
          />
          <TweakRadio
            label="Language"
            value={t.language}
            options={[
              { value: "bilingual", label: "EN + TH" },
              { value: "en",        label: "EN only" },
              { value: "th",        label: "TH only" },
            ]}
            onChange={(v) => setTweak("language", v)}
          />
          <TweakToggle
            label="SAHA emblem"
            value={t.showEmblem}
            onChange={(v) => setTweak("showEmblem", v)}
          />
        </TweakSection>

        <TweakSection label="Hours">
          <TweakText
            label="Open"
            value={t.openTime}
            placeholder="11:00"
            onChange={(v) => setTweak("openTime", v)}
          />
          <TweakText
            label="Close"
            value={t.closeTime}
            placeholder="22:00"
            onChange={(v) => setTweak("closeTime", v)}
          />
          <TweakToggle
            label="Last-order line"
            value={t.showLastOrder}
            onChange={(v) => setTweak("showLastOrder", v)}
          />
          {t.showLastOrder && (
            <TweakText
              label="Last order"
              value={t.lastOrder}
              placeholder="21:30"
              onChange={(v) => setTweak("lastOrder", v)}
            />
          )}
        </TweakSection>

        <TweakSection label="Closure">
          <TweakSelect
            label="Closed on"
            value={t.closedDay}
            options={Object.keys(DAY_TH).map((d) => ({ value: d, label: d }))}
            onChange={(v) => setTweak("closedDay", v)}
          />
        </TweakSection>

        <TweakSection label="Contact">
          <TweakToggle
            label="Show phone"
            value={t.showPhone}
            onChange={(v) => setTweak("showPhone", v)}
          />
          {t.showPhone && (
            <TweakText
              label="Phone"
              value={t.phone}
              placeholder="084 279 0999"
              onChange={(v) => setTweak("phone", v)}
            />
          )}
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

/* ─────────────────────────── Sign surface ─────────────────────────── */

function SignSurface({ t, isClosed }) {
  const showEN = t.language !== "th";
  const showTH = t.language !== "en";

  return (
    <div
      className={`sign sign--${t.orientation} sign--${t.surface} ${
        isClosed ? "sign--closed-state" : "sign--open-state"
      }`}
      role="img"
      aria-label={isClosed ? "Closed" : "Open"}
    >
      <div className="sign__inner">
        {/* Crest — emblem + wordmark */}
        <header className="crest">
          {t.showEmblem && (
            <img className="crest__emblem" src="../assets/saha-logo.png" alt="" />
          )}
          <div className="crest__wordmark">
            <div className="crest__name">SAHA</div>
            <div className="crest__sub">Steak · Butcher</div>
          </div>
        </header>

        <div className="hairline" aria-hidden="true"></div>

        {/* Status — the loudest element */}
        <section className="status" aria-live="polite">
          <div className="status__word">
            {isClosed ? "Closed" : "Open"}
          </div>
          {showTH && (
            <div className="status__th">
              {isClosed ? "ปิด" : "เปิด"}
            </div>
          )}
        </section>

        {/* Hours block */}
        <section className="hours">
          {showEN && (
            <div className="hours__label">Today's Hours</div>
          )}
          <div className="hours__time">
            <span className="hours__num">{fmtTime(t.openTime)}</span>
            <span className="hours__dash" aria-hidden="true">—</span>
            <span className="hours__num">{fmtTime(t.closeTime)}</span>
          </div>
          {t.showLastOrder && (
            <div className="hours__last">
              {showEN && <span>Last Order&nbsp;·&nbsp;{fmtTime(t.lastOrder)}</span>}
              {showEN && showTH && <span className="sep">·</span>}
              {showTH && <span className="th">รับออเดอร์สุดท้าย {fmtTime(t.lastOrder)}</span>}
            </div>
          )}
        </section>

        {/* Phone — stamped block */}
        {t.showPhone && (
          <section className="phone">
            {showEN && <div className="phone__label">Reservations</div>}
            <div className="phone__num">{t.phone}</div>
          </section>
        )}

        {/* Closed-day notice */}
        <footer className="closure">
          {showEN && (
            <div className="closure__en">
              Closed every <strong>{t.closedDay}</strong>
            </div>
          )}
          {showTH && (
            <div className="closure__th">
              หยุดทุก<strong>{DAY_TH[t.closedDay] || t.closedDay}</strong>
            </div>
          )}
          {showTH && (
            <div className="closure__note">
              (ยกเว้นอังคารที่ตรงวันหยุดนักขัตฤกษ์ เปิดปกติ)
            </div>
          )}
        </footer>
      </div>
    </div>
  );
}

/* ─────────────────────────── Mount ─────────────────────────── */

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<DoorSign />);
