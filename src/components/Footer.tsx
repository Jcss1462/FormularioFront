// src/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="w-full h-[6vh] bg-[var(--color-brand-dark)] text-[var(--color-brand-white)] py-4">
      <div className="max-w-7xl mx-auto px-4 text-center text-sm">
        © {new Date().getFullYear()} OpenForms. Todos los derechos reservados.
      </div>
    </footer>
  )
}
