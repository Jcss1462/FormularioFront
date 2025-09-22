import { useUIStore } from "../store/useUIStore";
// src/components/LoadingOverlay.tsx
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";


export default function LoadingOverlay() {
  const loading = useUIStore((state) => state.loading);

  if (!loading) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
    >
      <div className="flex flex-col items-center">
        <Loader2 className="h-12 w-12 text-brand-light animate-spin" />
        <p className="mt-3 text-white font-medium">Cargando...</p>
      </div>
    </motion.div>
  );
}
