import { clinic } from "../data/clinic";
import Icon from "./Icons";

export default function Header() {
  return (
    <header className="absolute top-0 inset-x-0 z-20">
      <nav className="max-w-6xl mx-auto px-5 h-20 flex items-center justify-between text-paper">
        <a href="#" className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-xl bg-mint/15 text-mint flex items-center justify-center">
            <Icon name="tooth" className="w-6 h-6" />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-xl">{clinic.name}</span>
            <span className="block text-xs text-paper/60">{clinic.subtitle}</span>
          </span>
        </a>
        <a href="#book" className="bg-mint text-navy font-bold text-sm px-5 py-2.5 rounded-full hover:bg-white transition-colors">
          احجز موعد
        </a>
      </nav>
    </header>
  );
}
