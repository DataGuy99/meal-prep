import { useState, useRef, useEffect } from "react";

const COLORS = {
  bg: "#FAFAF7",
  surface: "#F0EDE6",
  surfaceAlt: "#E6E1D8",
  primary: "#3D6B2E",
  primaryLight: "#5A8A47",
  red: "#C4532A",
  redLight: "#F4E0DA",
  text: "#1A1A1A",
  textSec: "#7A7067",
  border: "#DDD8CE",
  breakfast: "#7CB342",
  breakfastBg: "#E8F5C8",
  lunch: "#3949AB",
  lunchBg: "#D6DAF0",
  dinner: "#E65100",
  dinnerBg: "#FDE0CC",
  star: "#D4A017",
  starEmpty: "#D5CFC4",
  boost: "#0E7C6B",
  boostBg: "#D4F0EB",
  quarantine: "#C4532A",
  quarantineBg: "#F4E0DA",
  dry: "#8D6E3F",
  dryBg: "#F5EFE3",
  cold: "#2E7D9B",
  coldBg: "#DFF0F7",
  frozen: "#5C6BC0",
  frozenBg: "#E3E6F5",
  lock: "#6D4C91",
  lockBg: "#EDE4F5",
};

const MEAL_COLORS = {
  Breakfast: { bg: COLORS.breakfastBg, fg: COLORS.breakfast },
  Lunch: { bg: COLORS.lunchBg, fg: COLORS.lunch },
  Dinner: { bg: COLORS.dinnerBg, fg: COLORS.dinner },
};

const STORAGE_COLORS = {
  dry: { bg: COLORS.dryBg, fg: COLORS.dry, label: "Dry" },
  cold: { bg: COLORS.coldBg, fg: COLORS.cold, label: "Cold" },
  frozen: { bg: COLORS.frozenBg, fg: COLORS.frozen, label: "Frozen" },
};

const TABS = ["Recipes", "Plan", "Shop", "Pantry", "Settings"];
const TAB_ICONS = {
  Recipes: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><line x1="8" y1="7" x2="16" y2="7"/><line x1="8" y1="11" x2="13" y2="11"/></svg>,
  Plan: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  Shop: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>,
  Pantry: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 7l10-5 10 5-10 5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>,
  Settings: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
};

const StarRating = ({ rating, size = 16, onChange }) => (
  <div style={{ display: "flex", gap: 2 }}>
    {[1,2,3,4,5].map(i => (
      <span key={i} onClick={() => onChange?.(i)} style={{ cursor: onChange ? "pointer" : "default", color: i <= rating ? COLORS.star : COLORS.starEmpty, fontSize: size, lineHeight: 1 }}>★</span>
    ))}
  </div>
);

const Badge = ({ children, color, bg }) => (
  <span style={{ display: "inline-block", padding: "2px 8px", borderRadius: 99, fontSize: 11, fontWeight: 600, color, background: bg, whiteSpace: "nowrap" }}>{children}</span>
);

const Card = ({ children, style, onClick }) => (
  <div onClick={onClick} style={{ background: COLORS.surface, borderRadius: 10, padding: "12px 14px", border: `1px solid ${COLORS.border}`, cursor: onClick ? "pointer" : "default", ...style }}>{children}</div>
);

const Btn = ({ children, variant = "primary", style, onClick, small }) => {
  const s = {
    primary: { background: COLORS.primary, color: "#fff", border: "none" },
    secondary: { background: "transparent", color: COLORS.primary, border: `1.5px solid ${COLORS.primary}` },
    danger: { background: COLORS.red, color: "#fff", border: "none" },
    ghost: { background: "transparent", color: COLORS.textSec, border: `1px solid ${COLORS.border}` },
  };
  return <button onClick={onClick} style={{ ...s[variant], borderRadius: 8, padding: small ? "6px 12px" : "10px 16px", fontSize: small ? 12 : 14, fontWeight: 600, cursor: "pointer", ...style }}>{children}</button>;
};

const SectionLabel = ({ children }) => (
  <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2, color: COLORS.textSec, marginBottom: 8, marginTop: 16 }}>{children}</div>
);

const Combobox = ({ options, value, onChange, placeholder, multi, selected = [] }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef();
  const filtered = options.filter(o => o.toLowerCase().includes(search.toLowerCase()) && !selected.includes(o));
  useEffect(() => {
    const h = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  if (multi) {
    return (
      <div ref={ref} style={{ position: "relative", width: "100%" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4, padding: "4px 8px", borderRadius: 6, border: `1.5px solid ${COLORS.border}`, background: "#fff", minHeight: 34, alignItems: "center", cursor: "text" }} onClick={() => setOpen(true)}>
          {selected.map(s => (
            <span key={s} style={{ display: "inline-flex", alignItems: "center", gap: 3, padding: "2px 6px", borderRadius: 4, background: `${COLORS.primary}15`, color: COLORS.primary, fontSize: 11, fontWeight: 600 }}>
              {s} <span onClick={e => { e.stopPropagation(); onChange(selected.filter(x => x !== s)); }} style={{ cursor: "pointer", fontSize: 13, lineHeight: 1 }}>×</span>
            </span>
          ))}
          <input value={search} onChange={e => { setSearch(e.target.value); setOpen(true); }} placeholder={selected.length ? "" : placeholder} style={{ border: "none", outline: "none", fontSize: 13, flex: 1, minWidth: 60, background: "transparent" }} />
        </div>
        {open && (
          <div style={{ position: "absolute", top: "100%", left: 0, right: 0, maxHeight: 160, overflowY: "auto", background: "#fff", border: `1px solid ${COLORS.border}`, borderRadius: 6, marginTop: 2, zIndex: 10, boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
            {filtered.map(o => (
              <div key={o} onClick={() => { onChange([...selected, o]); setSearch(""); }} style={{ padding: "8px 10px", cursor: "pointer", fontSize: 13 }}>{o}</div>
            ))}
            {filtered.length === 0 && search && (
              <div onClick={() => { onChange([...selected, search.toLowerCase()]); setSearch(""); }} style={{ padding: "8px 10px", cursor: "pointer", fontSize: 13, color: COLORS.primary, fontWeight: 600 }}>+ Add "{search.toLowerCase()}"</div>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div ref={ref} style={{ position: "relative", width: "100%" }}>
      <input value={open ? search : value || ""} placeholder={placeholder} onFocus={() => { setOpen(true); setSearch(""); }} onChange={e => setSearch(e.target.value)} style={{ width: "100%", padding: "8px 10px", borderRadius: 6, border: `1.5px solid ${COLORS.border}`, fontSize: 14, background: "#fff", boxSizing: "border-box", outline: "none" }} />
      {open && (
        <div style={{ position: "absolute", top: "100%", left: 0, right: 0, maxHeight: 160, overflowY: "auto", background: "#fff", border: `1px solid ${COLORS.border}`, borderRadius: 6, marginTop: 2, zIndex: 10, boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
          {filtered.map(o => (
            <div key={o} onClick={() => { onChange(o); setOpen(false); setSearch(""); }} style={{ padding: "8px 10px", cursor: "pointer", fontSize: 13, background: o === value ? COLORS.surface : "transparent" }}>{o}</div>
          ))}
          {filtered.length === 0 && search && (
            <div onClick={() => { onChange(search.toLowerCase()); setOpen(false); setSearch(""); }} style={{ padding: "8px 10px", cursor: "pointer", fontSize: 13, color: COLORS.primary, fontWeight: 600 }}>+ Add "{search.toLowerCase()}"</div>
          )}
        </div>
      )}
    </div>
  );
};

// --- SAMPLE DATA ---
const SAMPLE_RECIPES = [
  { id: 1, name: "Butter Chicken", stars: 4, tags: ["chicken", "curry"], mealTags: ["lunch", "dinner"], servings: 5, slotsMin: 3, slotsMax: 5, fatigue: 0.2, freq: 12, quarantine: false, ingredients: ["chicken thigh", "butter", "tomato paste", "cream", "garam masala", "rice"], tagScore: 50 },
  { id: 2, name: "Greek Salad", stars: 3, tags: ["salad", "vegetarian"], mealTags: ["breakfast", "lunch"], servings: 2, slotsMin: 1, slotsMax: 2, fatigue: 0.8, freq: 4, quarantine: false, ingredients: ["cucumber", "tomato", "red onion", "feta", "olive oil", "oregano"], tagScore: 22 },
  { id: 3, name: "Beef Stew", stars: 5, tags: ["beef", "soup"], mealTags: ["dinner"], servings: 6, slotsMin: 4, slotsMax: 6, fatigue: 0.0, freq: 8, quarantine: false, ingredients: ["chuck roast", "potato", "carrot", "onion", "beef broth", "tomato paste"], tagScore: 35 },
  { id: 4, name: "Chicken Masala", stars: 3, tags: ["chicken", "curry"], mealTags: ["lunch", "dinner"], servings: 4, slotsMin: 2, slotsMax: 4, fatigue: 0.5, freq: 3, quarantine: true, quarantineItems: [{ ingredient: "xanthan gum", sub: "" }], ingredients: ["chicken breast", "yogurt", "xanthan gum", "onion", "garlic", "masala spice"], tagScore: 50 },
  { id: 5, name: "Pasta Primavera", stars: 4, tags: ["pasta", "vegetarian"], mealTags: ["lunch", "dinner"], servings: 4, slotsMin: 2, slotsMax: 4, fatigue: 0.6, freq: 6, quarantine: false, ingredients: ["penne", "bell pepper", "zucchini", "cherry tomato", "olive oil", "parmesan"], tagScore: 28 },
  { id: 6, name: "Salmon Bowl", stars: 5, tags: ["seafood", "grain"], mealTags: ["lunch", "dinner"], servings: 2, slotsMin: 1, slotsMax: 2, fatigue: 0.1, freq: 2, quarantine: false, ingredients: ["salmon fillet", "rice", "avocado", "edamame", "soy sauce", "sesame seeds"], tagScore: 29 },
  { id: 7, name: "Overnight Oats", stars: 4, tags: ["grain", "vegetarian"], mealTags: ["breakfast"], servings: 3, slotsMin: 2, slotsMax: 3, fatigue: 0.4, freq: 7, quarantine: false, ingredients: ["oats", "milk", "chia seeds", "honey", "banana"], tagScore: 24 },
  { id: 8, name: "Egg & Avocado Toast", stars: 3, tags: ["vegetarian"], mealTags: ["breakfast"], servings: 1, slotsMin: 1, slotsMax: 1, fatigue: 0.9, freq: 3, quarantine: false, ingredients: ["bread", "egg", "avocado", "salt", "chili flakes"], tagScore: 10 },
];

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MEALS = ["Breakfast", "Lunch", "Dinner"];

const initPlan = () => {
  const p = {};
  DAYS.forEach(d => { p[d] = {}; MEALS.forEach(m => { p[d][m] = null; }); });
  p["Mon"]["Lunch"] = { recipe: "Butter Chicken", chunk: "1/5", locked: true };
  p["Tue"]["Lunch"] = { recipe: "Butter Chicken", chunk: "2/5", locked: true };
  p["Wed"]["Lunch"] = { recipe: "Butter Chicken", chunk: "3/5", locked: false };
  p["Thu"]["Lunch"] = { recipe: "Butter Chicken", chunk: "4/5", locked: false };
  p["Fri"]["Lunch"] = { recipe: "Butter Chicken", chunk: "5/5", locked: false };
  p["Mon"]["Dinner"] = { recipe: "Beef Stew", chunk: "1/6", locked: false };
  p["Tue"]["Dinner"] = { recipe: "Beef Stew", chunk: "2/6", locked: false };
  p["Thu"]["Dinner"] = { recipe: "Beef Stew", chunk: "3/6", locked: false };
  p["Sat"]["Dinner"] = { recipe: "Beef Stew", chunk: "4/6", locked: false };
  p["Tue"]["Breakfast"] = { recipe: "Overnight Oats", chunk: "1/3", locked: false };
  p["Wed"]["Breakfast"] = { recipe: "Overnight Oats", chunk: "2/3", locked: true };
  p["Thu"]["Breakfast"] = { recipe: "Overnight Oats", chunk: "3/3", locked: false };
  p["Fri"]["Dinner"] = { recipe: "Pasta Primavera", chunk: "1/4", locked: false };
  p["Sat"]["Lunch"] = { recipe: "Salmon Bowl", chunk: "1/2", locked: false };
  p["Sun"]["Lunch"] = { recipe: "Salmon Bowl", chunk: "2/2", locked: false };
  return p;
};

const SAMPLE_PANTRY = [
  { name: "rice", qty: 3, unit: "kg", floor: 1, storage: "dry", store: "costco" },
  { name: "olive oil", qty: 0.5, unit: "L", floor: 0.5, storage: "dry", store: "costco" },
  { name: "chicken thigh", qty: 0, unit: "kg", floor: 0, storage: "cold", store: "butcher" },
  { name: "onion", qty: 2, unit: "pcs", floor: 3, storage: "dry", store: "aldi" },
  { name: "garlic", qty: 1, unit: "head", floor: 2, storage: "dry", store: "aldi" },
  { name: "tomato paste", qty: 3, unit: "can", floor: 2, storage: "dry", store: "aldi" },
  { name: "butter", qty: 1, unit: "block", floor: 1, storage: "cold", store: "aldi" },
  { name: "soy sauce", qty: 1, unit: "bottle", floor: 1, storage: "dry", store: "aldi" },
  { name: "frozen peas", qty: 2, unit: "bag", floor: 1, storage: "frozen", store: "costco" },
  { name: "ice cream", qty: 1, unit: "tub", floor: 0, storage: "frozen", store: "aldi" },
  { name: "milk", qty: 1, unit: "L", floor: 1, storage: "cold", store: "aldi" },
  { name: "cream", qty: 0, unit: "ml", floor: 0, storage: "cold", store: "aldi" },
  { name: "frozen berries", qty: 1, unit: "bag", floor: 1, storage: "frozen", store: "costco" },
  { name: "oats", qty: 2, unit: "kg", floor: 1, storage: "dry", store: "costco" },
];

const SAMPLE_SHOP_MEAL = [
  { name: "chicken thigh", qty: "1.5 kg", category: "Meat", store: "butcher", checked: false },
  { name: "cream", qty: "500 ml", category: "Dairy", store: "aldi", checked: false },
  { name: "chuck roast", qty: "1 kg", category: "Meat", store: "butcher", checked: false },
  { name: "salmon fillet", qty: "400 g", category: "Seafood", store: "costco", checked: true },
  { name: "feta", qty: "200 g", category: "Dairy", store: "aldi", checked: false },
  { name: "penne", qty: "500 g", category: "Pantry", store: "aldi", checked: false },
  { name: "avocado", qty: "2 pcs", category: "Produce", store: "aldi", checked: false },
  { name: "bell pepper", qty: "3 pcs", category: "Produce", store: "aldi", checked: true },
];

const SAMPLE_SHOP_FLOOR = [
  { name: "olive oil", qty: "1 L", reason: "At floor (0.5L)", store: "costco", checked: false },
  { name: "onion", qty: "5 pcs", reason: "Below floor (2/3)", store: "aldi", checked: false },
  { name: "garlic", qty: "2 heads", reason: "Below floor (1/2)", store: "aldi", checked: false },
];

const SAMPLE_RED_LIST = ["xanthan gum", "msg", "artificial sweetener"];
const SAMPLE_EXCLUDES = [{ ingredient: "peanuts", daysLeft: 12 }, { ingredient: "shellfish", daysLeft: 5 }];
const SAMPLE_BOOSTS = [{ item: "vegetables", weight: "+20%" }, { item: "salad", weight: "+15%" }];
const SAMPLE_TAG_WEIGHTS = [
  { tag: "chicken", weight: 30 }, { tag: "beef", weight: 25 }, { tag: "salad", weight: 12 },
  { tag: "pasta", weight: 18 }, { tag: "seafood", weight: 15 }, { tag: "soup", weight: 10 },
  { tag: "grain", weight: 14 }, { tag: "curry", weight: 20 }, { tag: "vegetarian", weight: 10 }, { tag: "pastry", weight: 8 },
];
const SAMPLE_MEAL_TARGETS = [
  { meal: "Breakfast", target: "60–80", color: COLORS.breakfast },
  { meal: "Lunch", target: "100–120", color: COLORS.lunch },
  { meal: "Dinner", target: "45–60", color: COLORS.dinner },
];
const SAMPLE_RANGES = [
  { tag: "salad", min: 3, max: 5, period: "week" },
  { tag: "chicken", min: 2, max: 4, period: "week" },
  { tag: "beef", min: 1, max: 3, period: "week" },
];

// --- NOTIFICATION BAR ---
const NotificationBar = ({ notifications }) => {
  if (!notifications?.length) return null;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 12 }}>
      {notifications.map((n, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", borderRadius: 8, fontSize: 12, fontWeight: 500, background: n.type === "quarantine" ? COLORS.quarantineBg : n.type === "frequency" ? "#FFF3CD" : n.type === "deficit" ? COLORS.lunchBg : COLORS.boostBg, color: n.type === "quarantine" ? COLORS.quarantine : n.type === "frequency" ? "#856404" : n.type === "deficit" ? COLORS.lunch : COLORS.boost }}>
          <span style={{ fontSize: 15 }}>{n.icon}</span>
          <span style={{ flex: 1 }}>{n.text}</span>
          {n.action && <Btn small variant="ghost" style={{ fontSize: 11, padding: "3px 8px", color: "inherit", borderColor: "currentColor" }}>{n.action}</Btn>}
        </div>
      ))}
    </div>
  );
};

// --- RECIPES TAB ---
const RecipesTab = () => {
  const [filter, setFilter] = useState("all");
  const [expandedId, setExpandedId] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [addTags, setAddTags] = useState([]);
  const [addMealTags, setAddMealTags] = useState([]);

  const notifications = [
    { type: "quarantine", icon: "🔴", text: "Chicken Masala has 1 unresolved red-list item", action: "Resolve" },
    { type: "frequency", icon: "🔔", text: "Butter Chicken picked 12× recently. Take a break?", action: "Shelve" },
  ];

  const filtered = SAMPLE_RECIPES.filter(r => {
    if (filter === "favorites") return r.stars >= 4;
    if (filter === "quarantine") return r.quarantine;
    return true;
  });

  return (
    <div>
      <NotificationBar notifications={notifications} />
      <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
        {["all", "favorites", "quarantine"].map(f => (
          <Btn key={f} small variant={filter === f ? "primary" : "ghost"} onClick={() => setFilter(f)}>
            {f === "all" ? "All" : f === "favorites" ? "★ Favorites" : "🔴 Quarantined"}
          </Btn>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {filtered.map(r => (
          <Card key={r.id} onClick={() => setExpandedId(expandedId === r.id ? null : r.id)}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 15, fontWeight: 700, color: COLORS.text }}>{r.name}</span>
                  {r.quarantine && <Badge color={COLORS.quarantine} bg={COLORS.quarantineBg}>Quarantined</Badge>}
                </div>
                <div style={{ display: "flex", gap: 4, marginTop: 4, flexWrap: "wrap" }}>
                  {r.tags.map(t => <Badge key={t} color={COLORS.primary} bg={`${COLORS.primary}18`}>{t}</Badge>)}
                  {r.mealTags.map(t => <Badge key={t} color={MEAL_COLORS[t.charAt(0).toUpperCase()+t.slice(1)]?.fg || COLORS.textSec} bg={MEAL_COLORS[t.charAt(0).toUpperCase()+t.slice(1)]?.bg || COLORS.surface}>{t}</Badge>)}
                </div>
                <div style={{ fontSize: 11, color: COLORS.textSec, marginTop: 3 }}>
                  {r.servings} servings · {r.slotsMin}–{r.slotsMax} slots · Score: {r.tagScore}
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, flexShrink: 0 }}>
                <StarRating rating={r.stars} size={14} />
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 10, color: COLORS.textSec }}>Fatigue</span>
                  <div style={{ width: 40, height: 4, borderRadius: 2, background: COLORS.border }}>
                    <div style={{ width: `${r.fatigue * 100}%`, height: 4, borderRadius: 2, background: r.fatigue > 0.7 ? COLORS.primary : r.fatigue > 0.3 ? COLORS.star : COLORS.red }} />
                  </div>
                </div>
                <span style={{ fontSize: 10, color: COLORS.textSec }}>Used {r.freq}×</span>
              </div>
            </div>
            {expandedId === r.id && (
              <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px solid ${COLORS.border}` }}>
                <div style={{ display: "flex", gap: 12, marginBottom: 8 }}>
                  <div>
                    <div style={{ fontSize: 10, color: COLORS.textSec, fontWeight: 600 }}>Slot range</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}>
                      <input type="number" defaultValue={r.slotsMin} style={{ width: 36, padding: "3px 5px", borderRadius: 4, border: `1px solid ${COLORS.border}`, fontSize: 13, textAlign: "center" }} />
                      <span style={{ color: COLORS.textSec, fontSize: 12 }}>–</span>
                      <input type="number" defaultValue={r.slotsMax} style={{ width: 36, padding: "3px 5px", borderRadius: 4, border: `1px solid ${COLORS.border}`, fontSize: 13, textAlign: "center" }} />
                      <span style={{ fontSize: 11, color: COLORS.textSec }}>meals</span>
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: 10, color: COLORS.textSec, fontWeight: 600 }}>Tag score</div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.primary, marginTop: 2 }}>{r.tagScore}</div>
                  </div>
                </div>
                <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.textSec, marginBottom: 4 }}>Ingredients</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {r.ingredients.map(ing => {
                    const isRed = SAMPLE_RED_LIST.includes(ing);
                    return (
                      <span key={ing} style={{ fontSize: 12, padding: "3px 8px", borderRadius: 4, background: isRed ? COLORS.quarantineBg : "#fff", border: `1px solid ${isRed ? COLORS.quarantine : COLORS.border}`, color: isRed ? COLORS.quarantine : COLORS.text, fontWeight: isRed ? 600 : 400 }}>
                        {isRed && "⚠ "}{ing}
                      </span>
                    );
                  })}
                </div>
                {r.quarantine && r.quarantineItems && (
                  <div style={{ marginTop: 8 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.quarantine, marginBottom: 4 }}>Substitutions needed</div>
                    {r.quarantineItems.map(qi => (
                      <div key={qi.ingredient} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                        <span style={{ fontSize: 12, color: COLORS.quarantine, fontWeight: 600, minWidth: 90 }}>{qi.ingredient}</span>
                        <span style={{ fontSize: 12, color: COLORS.textSec }}>→</span>
                        <input placeholder="substitute..." style={{ flex: 1, padding: "5px 8px", borderRadius: 5, border: `1.5px solid ${COLORS.quarantine}`, fontSize: 12, outline: "none" }} />
                        <Btn small variant="primary" style={{ padding: "4px 10px", fontSize: 11 }}>✓</Btn>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </Card>
        ))}
      </div>

      <div style={{ marginTop: 16 }}>
        {!showAdd ? (
          <Btn onClick={() => setShowAdd(true)} style={{ width: "100%" }}>+ Add Recipe</Btn>
        ) : (
          <Card style={{ border: `2px solid ${COLORS.primary}` }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.primary, marginBottom: 10 }}>New Recipe</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <input placeholder="Recipe name" style={{ padding: "8px 10px", borderRadius: 6, border: `1.5px solid ${COLORS.border}`, fontSize: 14 }} />
              <div>
                <div style={{ fontSize: 11, color: COLORS.textSec, marginBottom: 3, fontWeight: 600 }}>Category tags</div>
                <Combobox multi options={["chicken", "beef", "pork", "seafood", "salad", "grain", "pasta", "soup", "pastry", "vegetarian", "curry", "fish"]} placeholder="Type or select..." selected={addTags} onChange={setAddTags} />
              </div>
              <div>
                <div style={{ fontSize: 11, color: COLORS.textSec, marginBottom: 3, fontWeight: 600 }}>Meal suitability</div>
                <Combobox multi options={["breakfast", "lunch", "dinner"]} placeholder="breakfast, lunch, dinner..." selected={addMealTags} onChange={setAddMealTags} />
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: COLORS.textSec, marginBottom: 3, fontWeight: 600 }}>Servings</div>
                  <input type="number" defaultValue={4} style={{ width: "100%", padding: "8px 10px", borderRadius: 6, border: `1.5px solid ${COLORS.border}`, fontSize: 14, boxSizing: "border-box" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: COLORS.textSec, marginBottom: 3, fontWeight: 600 }}>Slot range</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <input type="number" defaultValue={2} style={{ width: "100%", padding: "8px 6px", borderRadius: 6, border: `1.5px solid ${COLORS.border}`, fontSize: 14, boxSizing: "border-box", textAlign: "center" }} />
                    <span style={{ color: COLORS.textSec }}>–</span>
                    <input type="number" defaultValue={4} style={{ width: "100%", padding: "8px 6px", borderRadius: 6, border: `1.5px solid ${COLORS.border}`, fontSize: 14, boxSizing: "border-box", textAlign: "center" }} />
                  </div>
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: COLORS.textSec, marginBottom: 3, fontWeight: 600 }}>Rating</div>
                <StarRating rating={0} size={22} onChange={() => {}} />
              </div>
              <textarea placeholder="Paste ingredients (one per line)..." rows={4} style={{ padding: "8px 10px", borderRadius: 6, border: `1.5px solid ${COLORS.border}`, fontSize: 13, resize: "vertical", fontFamily: "inherit" }} />
              <div style={{ display: "flex", gap: 8 }}>
                <Btn style={{ flex: 1 }}>Save Recipe</Btn>
                <Btn variant="ghost" onClick={() => setShowAdd(false)}>Cancel</Btn>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

// --- PLAN TAB ---
const PlanTab = () => {
  const [plan, setPlan] = useState(initPlan);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [chunkData, setChunkData] = useState([
    { name: "Butter Chicken", used: 5, total: 5, meals: "5× Lunch", color: COLORS.lunch, score: 50 },
    { name: "Beef Stew", used: 4, total: 6, meals: "4× Dinner", color: COLORS.dinner, score: 35 },
    { name: "Overnight Oats", used: 3, total: 3, meals: "3× Breakfast", color: COLORS.breakfast, score: 24 },
    { name: "Pasta Primavera", used: 1, total: 4, meals: "1× Dinner", color: COLORS.dinner, score: 28 },
    { name: "Salmon Bowl", used: 2, total: 2, meals: "2× Lunch", color: COLORS.lunch, score: 29 },
  ]);

  const updateChunk = (name, delta) => {
    setChunkData(prev => prev.map(c => {
      if (c.name !== name) return c;
      const newUsed = Math.max(0, Math.min(c.total, c.used + delta));
      return { ...c, used: newUsed };
    }));
  };

  const totalFreed = chunkData.reduce((acc, c) => acc + Math.max(0, c.total - c.used), 0);

  const toggleLock = (day, meal) => {
    setPlan(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      if (next[day][meal]) next[day][meal].locked = !next[day][meal].locked;
      return next;
    });
  };

  const emptySlots = DAYS.reduce((acc, d) => acc + MEALS.filter(m => !plan[d][m]).length, 0);
  const availableSlots = emptySlots + totalFreed;

  const notifications = availableSlots > 0 ? [
    { type: "deficit", icon: "📋", text: `${emptySlots} empty + ${totalFreed} freed = ${availableSlots} slot${availableSlots > 1 ? "s" : ""} for generator`, action: "Autofill" },
  ] : [];

  return (
    <div>
      <NotificationBar notifications={notifications} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: COLORS.text }}>Week of Jun 16–22</span>
        <div style={{ display: "flex", gap: 6 }}>
          <Btn small variant="secondary">🎲 Reroll unlocked</Btn>
          <Btn small>Generate</Btn>
        </div>
      </div>

      <div style={{ overflowX: "auto", marginLeft: -4, marginRight: -4, paddingLeft: 4, paddingRight: 4 }}>
        <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 3, minWidth: 480 }}>
          <thead>
            <tr>
              <th style={{ width: 42 }}></th>
              {MEALS.map(m => <th key={m} style={{ fontSize: 10, fontWeight: 700, color: MEAL_COLORS[m].fg, textAlign: "center", padding: "4px 2px" }}>{m}</th>)}
            </tr>
          </thead>
          <tbody>
            {DAYS.map(d => (
              <tr key={d}>
                <td style={{ fontSize: 12, fontWeight: 700, color: COLORS.text, padding: "2px 4px", verticalAlign: "middle" }}>{d}</td>
                {MEALS.map(m => {
                  const slot = plan[d]?.[m];
                  const isSelected = selectedSlot?.day === d && selectedSlot?.meal === m;
                  return (
                    <td key={m} style={{ padding: 2, verticalAlign: "top" }}>
                      {slot ? (
                        <div onClick={() => setSelectedSlot({ day: d, meal: m })} style={{
                          background: MEAL_COLORS[m].bg,
                          border: `1.5px solid ${isSelected ? MEAL_COLORS[m].fg : `${MEAL_COLORS[m].fg}40`}`,
                          borderRadius: 6, padding: "4px 6px", minHeight: 36, position: "relative", cursor: "pointer",
                        }}>
                          {slot.locked && (
                            <span style={{ position: "absolute", top: 2, right: 3, fontSize: 9, color: COLORS.lock }}>🔒</span>
                          )}
                          <div style={{ fontSize: 11, fontWeight: 600, color: MEAL_COLORS[m].fg, lineHeight: 1.2, paddingRight: slot.locked ? 14 : 0 }}>{slot.recipe}</div>
                          <div style={{ fontSize: 9, color: COLORS.textSec, marginTop: 1 }}>{slot.chunk}</div>
                        </div>
                      ) : (
                        <div onClick={() => setSelectedSlot({ day: d, meal: m })} style={{
                          border: `1.5px dashed ${isSelected ? MEAL_COLORS[m].fg : COLORS.border}`,
                          borderRadius: 6, padding: "5px 6px", minHeight: 36, display: "flex",
                          alignItems: "center", justifyContent: "center", cursor: "pointer",
                        }}>
                          <span style={{ fontSize: 14, color: isSelected ? MEAL_COLORS[m].fg : COLORS.border }}>+</span>
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedSlot && plan[selectedSlot.day]?.[selectedSlot.meal] && (
        <Card style={{ marginTop: 10, border: `2px solid ${MEAL_COLORS[selectedSlot.meal].fg}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: COLORS.text }}>
              {selectedSlot.day} {selectedSlot.meal}: {plan[selectedSlot.day][selectedSlot.meal].recipe}
            </span>
            <span style={{ fontSize: 11, color: COLORS.textSec }} onClick={() => setSelectedSlot(null)}>✕</span>
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            <Btn small variant={plan[selectedSlot.day][selectedSlot.meal].locked ? "primary" : "ghost"} onClick={() => toggleLock(selectedSlot.day, selectedSlot.meal)} style={plan[selectedSlot.day][selectedSlot.meal].locked ? { background: COLORS.lock } : {}}>
              {plan[selectedSlot.day][selectedSlot.meal].locked ? "🔒 Locked" : "🔓 Lock"}
            </Btn>
            <Btn small variant="secondary">🎲 Reroll this</Btn>
            <Btn small variant="ghost">Edit slots</Btn>
            <Btn small variant="ghost" style={{ color: COLORS.red, borderColor: COLORS.red }}>Remove</Btn>
          </div>
        </Card>
      )}

      <SectionLabel>Chunk Summary</SectionLabel>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {chunkData.map(c => {
          const freed = c.total - c.used;
          return (
            <div key={c.name} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 0" }}>
              <div style={{ width: 4, height: 36, borderRadius: 2, background: c.color }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.text }}>{c.name}</div>
                <div style={{ fontSize: 11, color: COLORS.textSec }}>{c.meals}</div>
              </div>
              <Badge color={COLORS.primary} bg={`${COLORS.primary}15`}>Score {c.score}</Badge>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <button onClick={() => updateChunk(c.name, -1)} style={{ width: 22, height: 22, borderRadius: 4, border: `1px solid ${COLORS.border}`, background: COLORS.surface, cursor: "pointer", fontSize: 13, fontWeight: 700, color: COLORS.textSec, display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                <span style={{ fontSize: 13, fontWeight: 700, color: c.used < c.total ? COLORS.red : COLORS.primary, minWidth: 32, textAlign: "center" }}>{c.used}/{c.total}</span>
                <button onClick={() => updateChunk(c.name, 1)} style={{ width: 22, height: 22, borderRadius: 4, border: `1px solid ${COLORS.border}`, background: COLORS.surface, cursor: "pointer", fontSize: 13, fontWeight: 700, color: COLORS.textSec, display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
              </div>
              {freed > 0 && <span style={{ fontSize: 10, color: COLORS.red, fontWeight: 600, minWidth: 40 }}>+{freed} free</span>}
            </div>
          );
        })}
      </div>
      {totalFreed > 0 && (
        <div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 8, background: COLORS.lunchBg, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: COLORS.lunch }}>{totalFreed} freed slot{totalFreed > 1 ? "s" : ""} available for generator</span>
          <Btn small style={{ background: COLORS.lunch }}>Fill freed slots</Btn>
        </div>
      )}

      <SectionLabel>Range Compliance</SectionLabel>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {[
          { tag: "salad", used: 0, min: 3, max: 5, ok: false },
          { tag: "chicken", used: 5, min: 2, max: 4, ok: false },
          { tag: "beef", used: 2, min: 1, max: 3, ok: true },
        ].map(r => (
          <div key={r.tag} style={{ padding: "6px 10px", borderRadius: 6, background: r.ok ? COLORS.boostBg : COLORS.quarantineBg, border: `1px solid ${r.ok ? COLORS.boost : COLORS.quarantine}30`, fontSize: 12 }}>
            <span style={{ fontWeight: 600, color: r.ok ? COLORS.boost : COLORS.quarantine }}>{r.tag}</span>
            <span style={{ color: COLORS.textSec, marginLeft: 4 }}>{r.used}/{r.min}–{r.max}</span>
            {!r.ok && <span style={{ marginLeft: 4 }}>{r.used < r.min ? "↓" : "↑"}</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

// --- SHOP TAB ---
const ShopTab = () => {
  const [items, setItems] = useState(SAMPLE_SHOP_MEAL);
  const [floorItems, setFloorItems] = useState(SAMPLE_SHOP_FLOOR);
  const [groupBy, setGroupBy] = useState("category");
  const toggle = i => setItems(p => p.map((item, idx) => idx === i ? { ...item, checked: !item.checked } : item));
  const toggleFloor = i => setFloorItems(p => p.map((item, idx) => idx === i ? { ...item, checked: !item.checked } : item));

  const groupKey = groupBy === "store" ? "store" : "category";
  const groups = [...new Set(items.map(i => i[groupKey]))];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: COLORS.text }}>Shopping List</span>
        <span style={{ fontSize: 12, color: COLORS.textSec }}>{items.filter(i => i.checked).length + floorItems.filter(i => i.checked).length}/{items.length + floorItems.length}</span>
      </div>
      <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
        <Btn small variant={groupBy === "category" ? "primary" : "ghost"} onClick={() => setGroupBy("category")}>By category</Btn>
        <Btn small variant={groupBy === "store" ? "primary" : "ghost"} onClick={() => setGroupBy("store")}>By store</Btn>
      </div>

      <SectionLabel>From Meal Plan</SectionLabel>
      {groups.map(g => (
        <div key={g} style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.primary, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.8 }}>{g}</div>
          {items.filter(i => i[groupKey] === g).map(item => {
            const ri = items.indexOf(item);
            return (
              <div key={ri} onClick={() => toggle(ri)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderRadius: 6, background: item.checked ? `${COLORS.primary}08` : "transparent", cursor: "pointer", marginBottom: 2 }}>
                <div style={{ width: 20, height: 20, borderRadius: 4, border: `2px solid ${item.checked ? COLORS.primary : COLORS.border}`, background: item.checked ? COLORS.primary : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {item.checked && <span style={{ color: "#fff", fontSize: 12, fontWeight: 700 }}>✓</span>}
                </div>
                <span style={{ flex: 1, fontSize: 14, color: item.checked ? COLORS.textSec : COLORS.text, textDecoration: item.checked ? "line-through" : "none" }}>{item.name}</span>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 12, color: COLORS.textSec }}>{item.qty}</div>
                  {groupBy === "category" && <div style={{ fontSize: 9, color: COLORS.textSec }}>{item.store}</div>}
                </div>
              </div>
            );
          })}
        </div>
      ))}

      <SectionLabel>Staple Replenishment</SectionLabel>
      <div style={{ background: COLORS.surface, borderRadius: 8, padding: "4px 0" }}>
        {floorItems.map((item, i) => (
          <div key={i} onClick={() => toggleFloor(i)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", cursor: "pointer" }}>
            <div style={{ width: 20, height: 20, borderRadius: 4, border: `2px solid ${item.checked ? COLORS.primary : COLORS.red}`, background: item.checked ? COLORS.primary : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              {item.checked && <span style={{ color: "#fff", fontSize: 12, fontWeight: 700 }}>✓</span>}
            </div>
            <span style={{ flex: 1, fontSize: 14, color: item.checked ? COLORS.textSec : COLORS.text, textDecoration: item.checked ? "line-through" : "none" }}>{item.name}</span>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 12, color: COLORS.textSec }}>{item.qty}</div>
              <div style={{ fontSize: 10, color: COLORS.red }}>{item.reason}</div>
              <div style={{ fontSize: 9, color: COLORS.textSec }}>{item.store}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 12 }}>
        <Btn variant="secondary" style={{ width: "100%" }}>+ Add item manually</Btn>
      </div>
    </div>
  );
};

// --- PANTRY TAB ---
const PantryTab = () => {
  const [storageFilter, setStorageFilter] = useState("all");
  const [pantry, setPantry] = useState(SAMPLE_PANTRY);
  const [editingIdx, setEditingIdx] = useState(null);

  const filtered = pantry.filter(p => storageFilter === "all" || p.storage === storageFilter)
    .sort((a, b) => {
      const aBelow = a.floor > 0 && a.qty <= a.floor ? 0 : 1;
      const bBelow = b.floor > 0 && b.qty <= b.floor ? 0 : 1;
      return aBelow - bBelow;
    });

  const counts = { dry: 0, cold: 0, frozen: 0 };
  pantry.forEach(p => counts[p.storage]++);

  const updateFloor = (name, newFloor) => {
    setPantry(prev => prev.map(p => p.name === name ? { ...p, floor: Math.max(0, Number(newFloor) || 0) } : p));
  };
  const updateQty = (name, newQty) => {
    setPantry(prev => prev.map(p => p.name === name ? { ...p, qty: Math.max(0, Number(newQty) || 0) } : p));
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: COLORS.text }}>Pantry Inventory</span>
        <Btn small>+ Add Item</Btn>
      </div>
      <div style={{ fontSize: 12, color: COLORS.textSec, marginBottom: 10 }}>
        {pantry.filter(p => p.floor > 0 && p.qty <= p.floor).length} items at or below floor
      </div>

      <div style={{ display: "flex", gap: 4, marginBottom: 12 }}>
        <Btn small variant={storageFilter === "all" ? "primary" : "ghost"} onClick={() => setStorageFilter("all")}>All ({pantry.length})</Btn>
        {Object.entries(STORAGE_COLORS).map(([key, sc]) => (
          <Btn key={key} small variant={storageFilter === key ? "primary" : "ghost"} onClick={() => setStorageFilter(key)}
            style={storageFilter === key ? { background: sc.fg } : { color: sc.fg, borderColor: sc.fg }}>
            {sc.label} ({counts[key]})
          </Btn>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {filtered.map((item, i) => {
          const belowFloor = item.floor > 0 && item.qty <= item.floor;
          const sc = STORAGE_COLORS[item.storage];
          const isEditing = editingIdx === item.name;
          return (
            <div key={item.name}>
              <div onClick={() => setEditingIdx(isEditing ? null : item.name)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: isEditing ? "8px 8px 0 0" : 8, background: belowFloor ? COLORS.quarantineBg : COLORS.surface, border: `1px solid ${belowFloor ? `${COLORS.quarantine}30` : COLORS.border}`, borderBottom: isEditing ? "none" : undefined, cursor: "pointer" }}>
                <div style={{ width: 4, height: 32, borderRadius: 2, background: sc.fg, flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.text }}>{item.name}</div>
                  <div style={{ display: "flex", gap: 6, alignItems: "center", marginTop: 2 }}>
                    <Badge color={sc.fg} bg={sc.bg}>{sc.label}</Badge>
                    <span style={{ fontSize: 10, color: COLORS.textSec }}>{item.store}</span>
                    <span style={{ fontSize: 10, color: belowFloor ? COLORS.quarantine : COLORS.textSec }}>Floor: {item.floor} {item.unit}</span>
                  </div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: belowFloor ? COLORS.quarantine : COLORS.text }}>{item.qty}</div>
                  <div style={{ fontSize: 10, color: COLORS.textSec }}>{item.unit}</div>
                </div>
                {belowFloor && <span style={{ fontSize: 12 }}>⚠️</span>}
              </div>
              {isEditing && (
                <div style={{ padding: "10px 12px", background: belowFloor ? COLORS.quarantineBg : COLORS.surface, border: `1px solid ${belowFloor ? `${COLORS.quarantine}30` : COLORS.border}`, borderTop: `1px dashed ${COLORS.border}`, borderRadius: "0 0 8px 8px", display: "flex", gap: 12, alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 600, color: COLORS.textSec, marginBottom: 2 }}>Qty ({item.unit})</div>
                    <input type="number" value={item.qty} onChange={e => updateQty(item.name, e.target.value)} style={{ width: 56, padding: "5px 6px", borderRadius: 5, border: `1.5px solid ${COLORS.border}`, fontSize: 14, textAlign: "center", fontWeight: 600 }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 600, color: COLORS.textSec, marginBottom: 2 }}>Floor ({item.unit})</div>
                    <input type="number" value={item.floor} onChange={e => updateFloor(item.name, e.target.value)} style={{ width: 56, padding: "5px 6px", borderRadius: 5, border: `1.5px solid ${belowFloor ? COLORS.quarantine : COLORS.border}`, fontSize: 14, textAlign: "center", fontWeight: 600 }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 600, color: COLORS.textSec, marginBottom: 2 }}>Store</div>
                    <span style={{ fontSize: 13, color: COLORS.text }}>{item.store}</span>
                  </div>
                  <div style={{ marginLeft: "auto" }}>
                    <Btn small variant="ghost" style={{ color: COLORS.red, borderColor: COLORS.red, fontSize: 11, padding: "4px 8px" }}>Delete</Btn>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// --- SETTINGS TAB ---
const SettingsTab = () => {
  const [section, setSection] = useState("weights");
  return (
    <div>
      <div style={{ display: "flex", gap: 4, marginBottom: 14, flexWrap: "wrap" }}>
        {[["weights","Tag Weights"],["targets","Meal Targets"],["ranges","Ranges"],["redlist","Red List"],["excludes","Excludes"],["boosts","Boosts"]].map(([k, l]) => (
          <Btn key={k} small variant={section === k ? "primary" : "ghost"} onClick={() => setSection(k)}>{l}</Btn>
        ))}
      </div>

      {section === "weights" && (
        <div>
          <div style={{ fontSize: 12, color: COLORS.textSec, marginBottom: 10 }}>Weight per tag — drives randomization probability and tag score calculation</div>
          {SAMPLE_TAG_WEIGHTS.map(tw => (
            <div key={tw.tag} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.text, minWidth: 80 }}>{tw.tag}</span>
              <div style={{ flex: 1, height: 6, borderRadius: 3, background: COLORS.border }}>
                <div style={{ width: `${tw.weight}%`, height: 6, borderRadius: 3, background: COLORS.primary }} />
              </div>
              <input type="number" defaultValue={tw.weight} style={{ width: 44, padding: "3px 5px", borderRadius: 4, border: `1px solid ${COLORS.border}`, fontSize: 12, textAlign: "center" }} />
            </div>
          ))}
          <Btn small variant="secondary" style={{ marginTop: 8 }}>+ Add tag</Btn>
        </div>
      )}

      {section === "targets" && (
        <div>
          <div style={{ fontSize: 12, color: COLORS.textSec, marginBottom: 10 }}>Target tag-score range per meal type — recipes are picked to sum toward these</div>
          {SAMPLE_MEAL_TARGETS.map(mt => (
            <div key={mt.meal} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, padding: "10px 12px", borderRadius: 8, background: COLORS.surface }}>
              <div style={{ width: 4, height: 32, borderRadius: 2, background: mt.color }} />
              <span style={{ fontSize: 14, fontWeight: 700, color: mt.color, minWidth: 80 }}>{mt.meal}</span>
              <span style={{ fontSize: 14, color: COLORS.text }}>{mt.target}</span>
            </div>
          ))}
        </div>
      )}

      {section === "ranges" && (
        <div>
          <div style={{ fontSize: 12, color: COLORS.textSec, marginBottom: 10 }}>Min–max occurrences per tag per week</div>
          {SAMPLE_RANGES.map(r => (
            <div key={r.tag} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, padding: "10px 12px", borderRadius: 8, background: COLORS.surface }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.text, minWidth: 70 }}>{r.tag}</span>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <input type="number" defaultValue={r.min} style={{ width: 40, padding: "4px 6px", borderRadius: 4, border: `1px solid ${COLORS.border}`, fontSize: 13, textAlign: "center" }} />
                <span style={{ color: COLORS.textSec }}>–</span>
                <input type="number" defaultValue={r.max} style={{ width: 40, padding: "4px 6px", borderRadius: 4, border: `1px solid ${COLORS.border}`, fontSize: 13, textAlign: "center" }} />
              </div>
              <span style={{ fontSize: 11, color: COLORS.textSec }}>/ {r.period}</span>
            </div>
          ))}
          <Btn small variant="secondary" style={{ marginTop: 6 }}>+ Add range</Btn>
        </div>
      )}

      {section === "redlist" && (
        <div>
          <div style={{ fontSize: 12, color: COLORS.textSec, marginBottom: 10 }}>Recipes with these ingredients are quarantined until substituted</div>
          {SAMPLE_RED_LIST.map(item => (
            <div key={item} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", borderRadius: 8, background: COLORS.quarantineBg, marginBottom: 4 }}>
              <span style={{ fontSize: 14 }}>🔴</span>
              <span style={{ flex: 1, fontSize: 13, fontWeight: 600, color: COLORS.quarantine }}>{item}</span>
              <Btn small variant="ghost" style={{ fontSize: 11, padding: "3px 8px", color: COLORS.quarantine, borderColor: COLORS.quarantine }}>Remove</Btn>
            </div>
          ))}
          <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
            <input placeholder="Add to red list..." style={{ flex: 1, padding: "8px 10px", borderRadius: 6, border: `1.5px solid ${COLORS.border}`, fontSize: 13 }} />
            <Btn small variant="danger">Add</Btn>
          </div>
        </div>
      )}

      {section === "excludes" && (
        <div>
          <div style={{ fontSize: 12, color: COLORS.textSec, marginBottom: 10 }}>Hard-excluded ingredients with expiry countdown</div>
          {SAMPLE_EXCLUDES.map(ex => (
            <div key={ex.ingredient} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, padding: "10px 12px", borderRadius: 8, background: COLORS.surface }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.text, flex: 1 }}>{ex.ingredient}</span>
              <Badge color={COLORS.red} bg={COLORS.quarantineBg}>{ex.daysLeft}d left</Badge>
              <Btn small variant="ghost" style={{ fontSize: 11, padding: "3px 8px" }}>Lift</Btn>
            </div>
          ))}
          <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
            <input placeholder="Ingredient..." style={{ flex: 1, minWidth: 100, padding: "8px 10px", borderRadius: 6, border: `1.5px solid ${COLORS.border}`, fontSize: 13 }} />
            <input type="number" placeholder="Days" style={{ width: 60, padding: "8px 10px", borderRadius: 6, border: `1.5px solid ${COLORS.border}`, fontSize: 13 }} />
            <Btn small>Exclude</Btn>
          </div>
        </div>
      )}

      {section === "boosts" && (
        <div>
          <div style={{ fontSize: 12, color: COLORS.textSec, marginBottom: 10 }}>Soft weight boosts for ingredients or tags</div>
          {SAMPLE_BOOSTS.map(b => (
            <div key={b.item} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, padding: "10px 12px", borderRadius: 8, background: COLORS.boostBg }}>
              <span style={{ fontSize: 14 }}>⬆</span>
              <span style={{ flex: 1, fontSize: 13, fontWeight: 600, color: COLORS.boost }}>{b.item}</span>
              <Badge color={COLORS.boost} bg="#fff">{b.weight}</Badge>
              <Btn small variant="ghost" style={{ fontSize: 11, padding: "3px 8px", color: COLORS.boost, borderColor: COLORS.boost }}>Remove</Btn>
            </div>
          ))}
          <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
            <Combobox options={["vegetables","salad","chicken","grain","seafood","fiber","protein"]} placeholder="Ingredient or tag..." />
            <Btn small>Boost</Btn>
          </div>
        </div>
      )}
    </div>
  );
};

// --- MAIN ---
export default function MealPrepApp() {
  const [tab, setTab] = useState("Plan");
  return (
    <div style={{ minHeight: "100vh", background: COLORS.bg, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', color: COLORS.text, display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "14px 16px 10px", borderBottom: `1px solid ${COLORS.border}`, background: COLORS.bg }}>
        <div style={{ fontSize: 20, fontWeight: 800, color: COLORS.primary, letterSpacing: -0.5 }}>Prep</div>
      </div>
      <div style={{ flex: 1, padding: "12px 16px 90px", overflowY: "auto" }}>
        {tab === "Recipes" && <RecipesTab />}
        {tab === "Plan" && <PlanTab />}
        {tab === "Shop" && <ShopTab />}
        {tab === "Pantry" && <PantryTab />}
        {tab === "Settings" && <SettingsTab />}
      </div>
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, display: "flex", justifyContent: "space-around", padding: "8px 0 12px", background: COLORS.bg, borderTop: `1px solid ${COLORS.border}`, zIndex: 20 }}>
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, background: "none", border: "none", color: tab === t ? COLORS.primary : COLORS.textSec, fontSize: 10, fontWeight: tab === t ? 700 : 500, cursor: "pointer", padding: "2px 8px" }}>
            {TAB_ICONS[t]}
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}
