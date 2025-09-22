import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="w-full h-[10vh] shadow-sm bg-[var(--color-brand-dark)] border-b flex items-center px-6">
      <Link to="/" className="text-3xl font-bold text-brand-white hover:text-brand-accent transition-colors">
        OpenForms
      </Link>
    </header>
  );
}
