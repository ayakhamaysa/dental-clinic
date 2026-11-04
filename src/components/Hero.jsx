import { motion } from "framer-motion";
import { clinic, hours } from "../data/clinic";
import Icon from "./Icons";

export default function Hero() {
  return (
    <section className="relative bg-navy text-paper pt-32 pb-24 overflow-hidden">
      {/* Large soft tooth outline in the background */}
      <svg viewBox="0 0 24 24" className="absolute -left-24 -bottom-24 w-[34rem] text-mint/10" fill="none" stroke="currentColor" strokeWidth="0.6">
        <path d="M8 3C5 3 4 5.5 4 8c0 3 1.5 4 2 7 .5 3 1 6 2.5 6S10 17 11 15c.5-1 1.5-1 2 0 1 2 1 6 2.5 6s2-3 2.5-6c.5-3 2-4 2-7 0-2.5-1-5-4-5-2 0-3 1-4 1S10 3 8 3z" />
      </svg>

      <div className="relative max-w-6xl mx-auto px-5 grid gap-12 md:grid-cols-5 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="md:col-span-3"
        >
          <p className="text-mint font-medium">{clinic.doctor}</p>
          <h1 className="font-display text-5xl md:text-7xl leading-tight mt-3">{clinic.tagline}</h1>
          <p className="text-lg text-paper/75 mt-6 max-w-lg leading-relaxed">{clinic.intro}</p>

          <div className="flex flex-wrap gap-3 mt-8">
            <motion.a
              href="#book"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="bg-mint text-navy font-bold px-8 py-3.5 rounded-full"
            >
              احجز موعدك الآن
            </motion.a>
            <a href="#services" className="border border-paper/25 px-8 py-3.5 rounded-full hover:border-mint transition-colors">
              خدماتنا
            </a>
          </div>
        </motion.div>

        {/* Quick info card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
          className="md:col-span-2 bg-navy-soft/70 backdrop-blur rounded-3xl p-6 border border-paper/10"
        >
          <InfoRow icon="clock" title="أوقات الدوام">
            {hours.map((h) => (
              <span key={h.days} className="block">
                <span className="block">{h.days}</span>
                <span className="block text-paper/70">{h.time}</span>
              </span>
            ))}
          </InfoRow>
          <InfoRow icon="pin" title="العنوان">{clinic.address}</InfoRow>
          <InfoRow icon="phone" title="للاستفسار">
            <span dir="ltr" className="text-right block">{clinic.phone}</span>
          </InfoRow>
        </motion.div>
      </div>
    </section>
  );
}

function InfoRow({ icon, title, children }) {
  return (
    <div className="flex gap-4 py-4 border-b border-paper/10 last:border-b-0">
      <span className="w-10 h-10 shrink-0 rounded-xl bg-mint/15 text-mint flex items-center justify-center">
        <Icon name={icon} className="w-5 h-5" />
      </span>
      <div className="flex-1 text-sm">
        <p className="font-bold mb-1">{title}</p>
        <div className="text-paper/80 space-y-1">{children}</div>
      </div>
    </div>
  );
}
