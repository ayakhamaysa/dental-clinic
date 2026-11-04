import { motion } from "framer-motion";
import { services } from "../data/clinic";
import Icon from "./Icons";
import FadeUp from "./FadeUp";

export default function Services() {
  return (
    <section id="services" className="max-w-6xl mx-auto px-5 py-24">
      <FadeUp className="max-w-xl">
        <p className="text-navy-soft font-bold">خدماتنا</p>
        <h2 className="font-display text-4xl md:text-5xl mt-2">كل اللي بتحتاجه ابتسامتك، بمكان واحد</h2>
      </FadeUp>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mt-12">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: (i % 3) * 0.12 }}
            whileHover={{ y: -6 }}
            className="bg-white rounded-3xl p-7 border border-navy/5 shadow-sm"
          >
            <span className="w-12 h-12 rounded-2xl bg-mint-soft text-navy flex items-center justify-center">
              <Icon name={s.icon} />
            </span>
            <h3 className="font-display text-2xl mt-5">{s.title}</h3>
            <p className="text-muted mt-2 leading-relaxed">{s.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
