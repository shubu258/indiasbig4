// Site copy lives here so sections stay presentational.
// Team names, reviews and brand names are placeholders: replace with real data before launch.

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Blog", href: "#newsletter" },
  { label: "FAQs", href: "#faqs" },
  { label: "Contact Us", href: "#contact" },
];

// `code` is the short label printed on each floating 3D cube in the hero
export const services = [
  { code: "BOOKS", icon: "books", title: "Accounting & Bookkeeping", text: "Accurate, up-to-date books on cloud software, with monthly reconciliations you can rely on." },
  { code: "TAX", icon: "tax", title: "Tax Advisory & Compliance", text: "Income tax, GST and TDS filings, tax planning and representation, always on time." },
  { code: "PAY", icon: "payroll", title: "Payroll Management", text: "Salary processing, payslips, PF, ESI and professional tax handled every single month." },
  { code: "MIS", icon: "reporting", title: "Finance Operations & Reporting", text: "Payables, receivables and clear MIS reports that show exactly where your business stands." },
  { code: "CFO", icon: "cfo", title: "Virtual CFO & Financial Advisory", text: "Budgeting, cash-flow forecasting, fundraising support and board-ready insights." },
  { code: "AUDIT", icon: "audit", title: "Audit Preparation & Support", text: "Audit-ready records, schedules and auditor coordination for a smooth, stress-free close." },
  { code: "SETUP", icon: "entry", title: "India Entry & Business Setup", text: "Company incorporation, registrations and regulatory approvals for businesses entering India." },
];

export const heroCubes = services.map((s) => ({ title: s.code, sub: s.title }));

export const stats = [
  { value: 15, suffix: "+", label: "Years of practice" },
  { value: 2500, suffix: "+", label: "Clients served" },
  { value: 40, suffix: "+", label: "Qualified experts" },
  { value: 98, suffix: "%", label: "Client retention" },
];

export const team = [
  { initials: "AS", name: "CA Arjun Sharma", role: "Founder & Managing Partner", bio: "20+ years in statutory audit and corporate taxation. FCA, DISA.", colors: ["#ff9b00", "#ffcc66"] },
  { initials: "PM", name: "CA Priya Mehta", role: "Partner, Taxation", bio: "Specialist in direct tax, international taxation and transfer pricing.", colors: ["#2a0e4a", "#6b3fa0"] },
  { initials: "RK", name: "CA Rahul Kapoor", role: "Partner, GST & Indirect Tax", bio: "Has handled 1,000+ GST registrations, audits and departmental litigations.", colors: ["#1e3a8a", "#4f7bd9"] },
  { initials: "NI", name: "CA Neha Iyer", role: "Partner, Advisory", bio: "Virtual CFO for 50+ startups; expert in valuation and fundraising.", colors: ["#e07b00", "#2a0e4a"] },
];

export const reviews = [
  { text: "They turned our messy books into investor-ready financials in three weeks. Our Series A due diligence went smoothly.", name: "Vikram Rao", role: "Founder, SaaS startup" },
  { text: "GST reconciliations used to eat our weekends. They automated the process and caught ₹12 lakh in missed ITC.", name: "Anjali Desai", role: "Director, Manufacturing" },
  { text: "Responsive, precise and always proactive. They flag compliance deadlines before we even think of them.", name: "Sameer Khan", role: "CFO, Retail chain" },
  { text: "Company incorporation, PAN, TAN, GST: everything done in under 10 days. Truly hassle-free.", name: "Ritika Bansal", role: "Co-founder, D2C brand" },
  { text: "Their tax planning saved our family business a significant amount, all completely compliant.", name: "Harish Gupta", role: "Partner, Trading firm" },
  { text: "The virtual CFO service gave us board-level reporting without the cost of a full-time hire.", name: "Meera Nair", role: "CEO, Healthtech" },
];

export const steps = [
  { title: "Discovery Call", text: "We understand your business, current compliance status and goals in a free consultation." },
  { title: "Tailored Plan", text: "A clear scope, timeline and fixed-fee proposal. No surprises, no hidden charges." },
  { title: "Expert Execution", text: "A dedicated CA and team handle filings, audits and documentation with rigorous checks." },
  { title: "Review & Grow", text: "Regular reports, insights and proactive advice to help your business scale confidently." },
];

export const brandsRowA = ["Novatek", "Kaveri Foods", "Bluepeak", "Zenstack", "Arcadia Retail", "Trivana Labs", "Orbit Logistics", "Saffron Homes"];
export const brandsRowB = ["Meridian Steel", "Pixelwave", "Greenfield Agro", "Lumen Health", "Coastline Motors", "Vertex Fintech", "Indigo Textiles", "Summit Edu"];

export const faqs = [
  { q: "How quickly can you set up my business in India?", a: "Most Private Limited and LLP incorporations are completed within 7–10 working days, subject to name approval and document readiness. Foreign subsidiaries take a little longer due to additional approvals." },
  { q: "Do you work with clients outside my city?", a: "Yes. Our processes are fully digital, and we serve clients across India and NRIs abroad with secure online document sharing." },
  { q: "What does a Virtual CFO service include?", a: "Monthly MIS, cash-flow forecasting, budgeting, investor reporting and strategic finance guidance, without a full-time hire." },
  { q: "How are your fees structured?", a: "We offer transparent fixed-fee packages for most services, agreed upfront after a free discovery call." },
];
