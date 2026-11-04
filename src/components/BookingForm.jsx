import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clinic, services, timeSlots, closedDays } from "../data/clinic";
import Icon from "./Icons";
import FadeUp from "./FadeUp";

// Today's date as "2026-11-01", so the date picker can't go back in time
const today = new Date().toISOString().split("T")[0];

const emptyForm = { name: "", phone: "", service: "", date: "", time: "", notes: "", website: "" };

export default function BookingForm() {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | done | failed

  // One function updates any field by its name
  const update = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
    setErrors({ ...errors, [field]: "" });
  };

  // Check every field and return the problems we found
  function validate() {
    const e = {};
    if (form.name.trim().length < 3) e.name = "اكتب اسمك الكامل";
    // Palestinian mobile: 059xxxxxxx or 056xxxxxxx (10 digits)
    if (!/^05[69]\d{7}$/.test(form.phone.replace(/\s|-/g, ""))) e.phone = "رقم الجوال لازم يبلش بـ 059 أو 056 ويكون 10 أرقام";
    if (!form.service) e.service = "اختار الخدمة";
    if (!form.date) e.date = "اختار اليوم";
    else if (closedDays.includes(new Date(form.date).getDay())) e.date = "العيادة مسكرة بهاد اليوم، اختار يوم ثاني";
    if (!form.time) e.time = "اختار الساعة";
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const found = validate();
    if (Object.keys(found).length > 0) return setErrors(found);

    // "website" is a hidden field. People don't see it, spam bots fill it.
    if (form.website) return setStatus("done");

    setStatus("sending");

    // No Formspree ID yet: act like it worked (demo mode)
    if (!clinic.formspreeId) {
      await new Promise((r) => setTimeout(r, 900));
      return setStatus("done");
    }

    try {
      const response = await fetch(`https://formspree.io/f/${clinic.formspreeId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `حجز جديد: ${form.name} - ${form.date} ${form.time}`,
          الاسم: form.name,
          الجوال: form.phone,
          الخدمة: form.service,
          اليوم: form.date,
          الساعة: form.time,
          ملاحظات: form.notes || "-",
        }),
      });
      setStatus(response.ok ? "done" : "failed");
    } catch {
      setStatus("failed");
    }
  }

  function reset() {
    setForm(emptyForm);
    setStatus("idle");
  }

  const field = (name) =>
    `w-full bg-paper border rounded-2xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-mint transition ${
      errors[name] ? "border-red-400" : "border-navy/10"
    }`;

  return (
    <section id="book" className="bg-mint-soft">
      <div className="max-w-6xl mx-auto px-5 py-24 grid gap-12 lg:grid-cols-5">
        <FadeUp className="lg:col-span-2">
          <p className="text-navy-soft font-bold">احجز موعدك</p>
          <h2 className="font-display text-4xl md:text-5xl mt-2">بدقيقة، ومن جوالك</h2>
          <p className="text-muted mt-4 leading-relaxed">
            عبّي الفورم وبنتواصل معك على الجوال خلال ساعات الدوام لتأكيد الموعد.
          </p>
          <ul className="mt-8 space-y-3">
            {["بدون انتظار على التلفون", "تأكيد الموعد على الجوال", "تقدر تغيّر أو تلغي بأي وقت"].map((t) => (
              <li key={t} className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-mint text-navy flex items-center justify-center">
                  <Icon name="check" className="w-4 h-4" />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </FadeUp>

        <FadeUp delay={0.15} className="lg:col-span-3">
          <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-sm">
            <AnimatePresence mode="wait">
              {status === "done" ? (
                <Success key="done" name={form.name} date={form.date} time={form.time} onReset={reset} />
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  noValidate
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid gap-4 sm:grid-cols-2"
                >
                  <Field label="الاسم الكامل" error={errors.name}>
                    <input id="name" value={form.name} onChange={update("name")} className={field("name")} autoComplete="name" />
                  </Field>

                  <Field label="رقم الجوال" error={errors.phone}>
                    <input id="phone" value={form.phone} onChange={update("phone")} className={field("phone")} inputMode="tel" placeholder="059xxxxxxx" dir="ltr" autoComplete="tel" />
                  </Field>

                  <Field label="الخدمة" error={errors.service} wide>
                    <select id="service" value={form.service} onChange={update("service")} className={field("service")}>
                      <option value="">اختار الخدمة</option>
                      {services.map((s) => (
                        <option key={s.title} value={s.title}>{s.title}</option>
                      ))}
                    </select>
                  </Field>

                  <Field label="اليوم" error={errors.date}>
                    <input id="date" type="date" min={today} value={form.date} onChange={update("date")} className={field("date")} />
                  </Field>

                  <Field label="الساعة" error={errors.time}>
                    <select id="time" value={form.time} onChange={update("time")} className={field("time")}>
                      <option value="">اختار الساعة</option>
                      {timeSlots.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </Field>

                  <Field label="ملاحظات (اختياري)" wide>
                    <textarea id="notes" value={form.notes} onChange={update("notes")} rows={3} className={field("notes")} placeholder="مثلاً: عندي وجع بضرس من يومين" />
                  </Field>

                  {/* Hidden from people, only bots fill it */}
                  <input type="text" name="website" value={form.website} onChange={update("website")} className="hidden" tabIndex={-1} autoComplete="off" />

                  {status === "failed" && (
                    <p className="sm:col-span-2 text-red-600 text-sm bg-red-50 rounded-xl px-4 py-3">
                      ما قدرنا نبعت الحجز، جرب مرة ثانية أو اتصل على {clinic.phone}
                    </p>
                  )}

                  <motion.button
                    type="submit"
                    disabled={status === "sending"}
                    whileTap={{ scale: 0.98 }}
                    className="sm:col-span-2 bg-navy text-paper font-bold rounded-full py-4 mt-2 disabled:opacity-60"
                  >
                    {status === "sending" ? "جاري الإرسال..." : "تأكيد الحجز"}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

function Field({ label, error, wide, children }) {
  return (
    <label className={`block ${wide ? "sm:col-span-2" : ""}`}>
      <span className="block text-sm font-bold mb-2">{label}</span>
      {children}
      {error && <span className="block text-red-600 text-sm mt-1.5">{error}</span>}
    </label>
  );
}

// "2026-11-07" → "السبت 7 نوفمبر"
function prettyDate(value) {
  return new Date(value).toLocaleDateString("ar", { weekday: "long", day: "numeric", month: "long" });
}

function Success({ name, date, time, onReset }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="text-center py-10"
    >
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.15 }}
        className="w-16 h-16 mx-auto rounded-full bg-mint text-navy flex items-center justify-center"
      >
        <Icon name="check" className="w-8 h-8" />
      </motion.span>
      <h3 className="font-display text-3xl mt-6">وصل طلب الحجز</h3>
      <p className="text-muted mt-3 leading-relaxed">
        شكراً {name.split(" ")[0]}، طلبت موعد يوم {prettyDate(date)} الساعة {time}.
        <br />
        رح نتصل فيك لنأكدلك الموعد.
      </p>
      <button onClick={onReset} className="mt-8 text-navy-soft font-bold underline">
        حجز موعد ثاني
      </button>
    </motion.div>
  );
}
