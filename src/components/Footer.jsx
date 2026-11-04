import { clinic } from "../data/clinic";

export default function Footer() {
  return (
    <footer className="bg-navy text-paper/70">
      <div className="max-w-6xl mx-auto px-5 py-10 flex flex-col sm:flex-row gap-4 justify-between items-center text-sm">
        <p>{clinic.name} {clinic.subtitle} · {clinic.address}</p>
        <div className="flex gap-4">
          <a href={`https://wa.me/${clinic.whatsapp}`} target="_blank" className="hover:text-mint">واتساب</a>
          <a href={clinic.instagram} target="_blank" className="hover:text-mint">إنستغرام</a>
        </div>
      </div>
      <p className="border-t border-paper/10 py-5 text-center text-xs">
        تصميم وتطوير{" "}
        <a href="https://www.instagram.com/oneclick.ps" target="_blank" className="font-bold text-mint">One Click</a>
      </p>
    </footer>
  );
}
