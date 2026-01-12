import React, { useState, useRef, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  User, 
  Circle, 
  Square, 
  Type, 
  ArrowUpRight, 
  Settings, 
  Download,
  X,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

const ASSETS = {
  players: [
    { id: 'player-blue', type: 'player', color: '#3b82f6', label: 'Home' },
    { id: 'player-red', type: 'player', color: '#ef4444', label: 'Away' },
    { id: 'gk-blue', type: 'player', color: '#60a5fa', label: 'GK-H', isGK: true },
    { id: 'gk-red', type: 'player', color: '#f87171', label: 'GK-A', isGK: true },
  ],
  equipment: [
    { id: 'ball', type: 'icon', icon: '⚽', label: 'Ball' },
    { id: 'cone-orange', type: 'icon', icon: '⏏️', color: 'orange', label: 'Cone' },
    { id: 'pole', type: 'icon', icon: '📍', label: 'Pole' },
    { id: 'ladder', type: 'shape', variant: 'rect', color: 'rgba(255,255,255,0.3)', label: 'Ladder' },
  ],
  shapes: [
    { id: 'arrow', type: 'shape', variant: 'arrow', label: 'Arrow' },
    { id: 'zone', type: 'shape', variant: 'zone', label: 'Zone' },
  ]
};

const App = () => {
  const [elements, setElements] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('players');
  const [draggedItem, setDraggedItem] = useState(null);
  const pitchRef = useRef(null);

  // Handle adding elements via click/drag
  const addElementToPitch = (asset, clientX, clientY) => {
    const rect = pitchRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;

    const newElement = {
      ...asset,
      instanceId: Date.now(),
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    };

    setElements((prev) => [...prev, newElement]);
  };

  // Drag logic for elements already on the pitch
  const handleElementDrag = (instanceId, e) => {
    const rect = pitchRef.current.getBoundingClientRect();
    const touch = e.touches ? e.touches[0] : e;
    
    const x = ((touch.clientX - rect.left) / rect.width) * 100;
    const y = ((touch.clientY - rect.top) / rect.height) * 100;

    setElements(prev => prev.map(el => 
      el.instanceId === instanceId 
        ? { ...el, x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) }
        : el
    ));
  };

  const removeElement = (instanceId) => {
    setElements(prev => prev.filter(el => el.instanceId !== instanceId));
  };

  return (
    <div className="flex h-screen w-screen bg-slate-900 overflow-hidden font-sans text-slate-100 select-none touch-none">
      
      {/* Sidebar Trigger */}
      <div className={`fixed left-0 top-0 bottom-0 z-50 flex items-center transition-all duration-300 ${isSidebarOpen ? 'translate-x-64' : 'translate-x-0'}`}>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="bg-emerald-600 p-3 rounded-r-2xl shadow-xl border-y border-r border-emerald-400/30 flex items-center justify-center active:scale-95 transition-transform"
        >
          {isSidebarOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
        </button>
      </div>

      {/* Slide-out Tool Menu */}
      <aside className={`fixed left-0 top-0 bottom-0 w-64 bg-slate-800 border-r border-slate-700 z-40 shadow-2xl transition-transform duration-300 ease-in-out flex flex-col ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4 border-b border-slate-700 flex justify-between items-center bg-slate-800/50 backdrop-blur-md sticky top-0">
          <h2 className="font-bold text-lg text-emerald-400 uppercase tracking-wider">Drill Tools</h2>
          <button onClick={() => setIsSidebarOpen(false)} className="p-1 hover:bg-slate-700 rounded"><X size={20}/></button>
        </div>

        <div className="flex bg-slate-900 p-1 m-2 rounded-lg">
          {['players', 'equipment', 'shapes'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 text-xs font-semibold rounded-md transition-all ${activeTab === tab ? 'bg-emerald-600 text-white' : 'text-slate-400'}`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-4 grid grid-cols-2 gap-3 content-start">
          {ASSETS[activeTab].map((asset) => (
            <div
              key={asset.id}
              draggable
              onDragEnd={(e) => addElementToPitch(asset, e.clientX, e.clientY)}
              onClick={(e) => addElementToPitch(asset, window.innerWidth / 2, window.innerHeight / 2)}
              className="bg-slate-700/50 border border-slate-600 rounded-xl p-3 flex flex-col items-center justify-center gap-2 active:bg-emerald-900/40 cursor-grab transition-colors"
            >
              {asset.type === 'player' && (
                <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center shadow-lg" style={{ backgroundColor: asset.color }}>
                   <User size={14} className="text-white" />
                </div>
              )}
              {asset.type === 'icon' && <span className="text-2xl">{asset.icon}</span>}
              {asset.type === 'shape' && (
                <div className={`w-8 h-8 ${asset.variant === 'zone' ? 'rounded-md' : 'rounded-full'} border-2 border-dashed border-slate-400`} />
              )}
              <span className="text-[10px] font-medium text-slate-300">{asset.label}</span>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-slate-700 bg-slate-900/50">
           <button 
            onClick={() => setElements([])}
            className="w-full flex items-center justify-center gap-2 py-3 bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl hover:bg-red-500/20 transition-all"
           >
             <Trash2 size={16} />
             <span className="text-sm font-bold">Clear Pitch</span>
           </button>
        </div>
      </aside>

      {/* Main Pitch View */}
      <main className="flex-1 relative bg-[#2d5a27] overflow-hidden">
        {/* Grass Pattern */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" 
             style={{ background: 'repeating-linear-gradient(90deg, #000, #000 10%, transparent 10%, transparent 20%)' }}></div>
        
        {/* Pitch Lines Wrapper */}
        <div 
          ref={pitchRef}
          className="relative w-full h-full border-4 border-white/40 m-auto flex flex-col pointer-events-auto"
        >
          {/* Top Goal Area */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[10%] border-b-4 border-x-4 border-white/40 rounded-b-sm">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1/2 border-b-4 border-x-4 border-white/40"></div>
             {/* Physical Goal Post */}
             <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-[60%] h-2 bg-white/80 rounded-full shadow-lg"></div>
          </div>

          {/* Center Circle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-4 border-white/40 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white/40 rounded-full"></div>
          </div>
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/40 -translate-y-1/2"></div>

          {/* Bottom Goal Area */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-[10%] border-t-4 border-x-4 border-white/40 rounded-t-sm">
             <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1/2 border-t-4 border-x-4 border-white/40"></div>
             {/* Physical Goal Post */}
             <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-[60%] h-2 bg-white/80 rounded-full shadow-lg"></div>
          </div>

          {/* Corner Arcs */}
          <div className="absolute top-0 left-0 w-8 h-8 border-r-4 border-b-4 border-white/40 rounded-br-full"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-l-4 border-b-4 border-white/40 rounded-bl-full"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-r-4 border-t-4 border-white/40 rounded-tr-full"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-l-4 border-t-4 border-white/40 rounded-tl-full"></div>

          {/* Draggable Elements Layer */}
          <div className="absolute inset-0">
            {elements.map((el) => (
              <div
                key={el.instanceId}
                style={{ 
                  left: `${el.x}%`, 
                  top: `${el.y}%`,
                  transform: 'translate(-50%, -50%)',
                  zIndex: 100
                }}
                className="absolute group cursor-move touch-none"
                onTouchMove={(e) => handleElementDrag(el.instanceId, e)}
                onMouseDown={(e) => {
                  const moveHandler = (moveEvent) => handleElementDrag(el.instanceId, moveEvent);
                  const upHandler = () => {
                    window.removeEventListener('mousemove', moveHandler);
                    window.removeEventListener('mouseup', upHandler);
                  };
                  window.addEventListener('mousemove', moveHandler);
                  window.addEventListener('mouseup', upHandler);
                }}
              >
                {/* Element Renderers */}
                {el.type === 'player' && (
                  <div className="relative">
                    <div 
                      className={`w-10 h-10 rounded-full border-2 border-white shadow-xl flex items-center justify-center transition-transform active:scale-125 ${el.isGK ? 'animate-pulse' : ''}`}
                      style={{ backgroundColor: el.color }}
                    >
                      <User size={18} className="text-white" />
                    </div>
                    {/* Delete handle */}
                    <button 
                      onClick={(e) => { e.stopPropagation(); removeElement(el.instanceId); }}
                      className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={10} />
                    </button>
                  </div>
                )}

                {el.type === 'icon' && (
                  <div className="relative text-3xl drop-shadow-lg active:scale-125 transition-transform">
                    {el.icon}
                    <button 
                      onClick={(e) => { e.stopPropagation(); removeElement(el.instanceId); }}
                      className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={10} className="text-white"/>
                    </button>
                  </div>
                )}

                {el.type === 'shape' && el.variant === 'zone' && (
                  <div className="relative w-24 h-16 border-2 border-dashed border-white/60 bg-white/10 rounded-lg flex items-center justify-center text-[10px] text-white/50 italic">
                    Zone
                    <button 
                      onClick={(e) => { e.stopPropagation(); removeElement(el.instanceId); }}
                      className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={10} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Info Overlay */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 pointer-events-none">
          <div className="bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-emerald-400 border border-emerald-500/30">
            {elements.filter(e => e.type === 'player').length} PLAYERS ON FIELD
          </div>
        </div>
        
        {/* Instruction (Mobile) */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 px-4 py-2 rounded-2xl text-[10px] text-white/80 border border-white/10 animate-bounce md:hidden">
          Tap Sidebar to add equipment
        </div>
      </main>

      {/* Floating Action Bar */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3">
        <button className="bg-white/10 backdrop-blur-md p-4 rounded-full border border-white/20 text-white shadow-2xl active:scale-90 transition-transform">
          <Settings size={24} />
        </button>
        <button className="bg-emerald-500 p-4 rounded-full text-white shadow-2xl shadow-emerald-500/40 active:scale-90 transition-transform">
          <Download size={24} />
        </button>
      </div>

    </div>
  );
};

export default App;