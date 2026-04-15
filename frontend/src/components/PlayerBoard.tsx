import { motion } from "framer-motion";

interface PlayerBoardProps {
  playerNumber: number;
  color: string; // Ex: 'var(--color-neon-green)'
}

export const PlayerBoard = ({ playerNumber, color }: PlayerBoardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 10 }}
      className="relative"
    >
      <div 
        className="glass-morphism w-[320px] rounded-[2.5rem] p-8 border-t-2 transition-all duration-500"
        style={{ 
          borderColor: `color-mix(in srgb, ${color}, transparent 75%)`,
          boxShadow: `0 20px 40px -20px color-mix(in srgb, ${color}, transparent 85%)` 
        }}
      >
        <div className="flex justify-between items-center mb-6">
           <span className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color }}>
             Player 0{playerNumber}
           </span>
        </div>
        
        {/* Letter Grid Placeholder */}
        <div className="grid grid-cols-5 gap-3">
          {Array.from({ length: 30 }).map((_, i) => (
            <div 
              key={i} 
              className="aspect-square rounded-2xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-xl font-bold text-white/20"
            >
              -
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
