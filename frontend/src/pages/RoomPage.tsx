import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Settings, Users, Trash2 } from 'lucide-react'
import { AnimatePresence } from 'framer-motion'
import { PlayerBoard } from '../components/PlayerBoard'
import { Keyboard } from '../components/Keyboard'

export default function RoomPage() {
  const navigate = useNavigate()
  const [players, setPlayers] = useState([{ id: 1, color: '--color-neon-green' }])

  const addPlayer = () => {
    if (players.length < 4) {
      const colors = ['--color-neon-green', '--color-neon-yellow', '--color-neon-cyan', '--color-neon-pink']
      const nextId = Math.max(...players.map(p => p.id), 0) + 1
      setPlayers([...players, { id: nextId, color: colors[players.length] }])
    }
  }

  const removePlayer = (id: number) => {
    if (players.length > 1) {
      setPlayers(players.filter(p => p.id !== id))
    }
  }

  return (
    <div className="flex h-screen bg-[#0a0a0c] text-white overflow-hidden font-sans selection:bg-cyan-500/30">
      
      {/* SIDEBAR - Fixed size and layout */}
      <aside className="w-80 h-full bg-black/20 backdrop-blur-xl border-r border-white/10 p-8 flex flex-col shrink-0 gap-10 overflow-y-auto">
        {/* LOGO AREA */}
        <div className="flex flex-col gap-4">
          <h1 
            onClick={() => navigate('/')}
            className="text-4xl font-black italic tracking-tighter bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition-opacity"
          >
            WordLine
          </h1>
          <div className="flex gap-2">
            <button className="glass-morphism px-3 py-1.5 rounded-full text-[10px] font-bold hover:bg-white/10 transition-all uppercase tracking-widest border border-white/10">
              Help
            </button>
            <button className="glass-morphism px-3 py-1.5 rounded-full text-[10px] font-bold hover:bg-white/10 transition-all uppercase tracking-widest border border-white/10 text-pink-500">
              About
            </button>
          </div>
        </div>

        <section>
          <div className="flex items-center gap-2 mb-6 text-cyan-400">
            <Settings size={18} />
            <h2 className="text-xs font-bold uppercase tracking-[0.2em]">Room Settings</h2>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-white/40">Game Language</label>
              <select className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-cyan-500/50">
                <option>English (US)</option>
                <option>Portuguese (BR)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40">Max Tries</label>
                <input type="number" defaultValue={6} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-cyan-500/30" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40">Word Length</label>
                <input type="number" defaultValue={5} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-cyan-500/30" />
              </div>
            </div>
          </div>
        </section>

        <section className="flex-1">
          <div className="flex items-center gap-2 mb-6 text-pink-500">
            <Users size={18} />
            <h2 className="text-xs font-bold uppercase tracking-[0.2em]">Players ({players.length}/4)</h2>
          </div>
          
          <div className="space-y-3">
            {players.map((p) => (
              <div key={p.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 group">
                <div 
                  className="w-2 h-2 rounded-full" 
                  style={{ 
                    backgroundColor: `var(${p.color})`, 
                    boxShadow: `0 0 10px var(${p.color})` 
                  }} 
                />
                <span className="text-sm font-medium flex-1">Player {p.id}</span>
                {players.length > 1 && (
                  <button 
                    onClick={() => removePlayer(p.id)}
                    className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-500/20 hover:text-red-500 rounded-lg transition-all"
                    title="Remove Player"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            ))}
            
            {players.length < 4 && (
              <button 
                onClick={addPlayer}
                className="w-full p-3 rounded-xl border border-dashed border-white/20 flex items-center justify-center gap-2 text-white/40 hover:text-white hover:border-white/40 transition-all text-xs font-bold uppercase"
              >
                <Plus size={14} /> Add Player
              </button>
            )}
          </div>
        </section>
      </aside>

      {/* GAME AREA - Absolute Centering */}
      <main className="flex-1 relative flex flex-col items-center justify-center p-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent">
        
        {/* Board Container */}
        <div className="w-full h-full flex items-center justify-center">
          <div className="flex flex-wrap gap-12 justify-center items-center">
            <AnimatePresence>
              {players.map((p) => (
                <PlayerBoard key={p.id} playerNumber={p.id} color={`var(${p.color})`} />
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* KEYBOARD - Absolutely positioned at bottom */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-3xl px-6 pointer-events-none">
           <div className="pointer-events-auto">
              <Keyboard />
           </div>
        </div>

      </main>
    </div>
  )
}

