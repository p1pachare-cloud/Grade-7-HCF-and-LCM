// src/components/phases/StoryPhase.jsx
// Phase 2: Story Component matching exact reference UI (2-column image + golden takeaway pill layout)

import React, { useEffect, useState } from 'react';
import { STORY_PANELS } from '../../data/storyContent.js';
import RuleCard from '../shared/RuleCard.jsx';
import { ChevronLeft, ChevronRight, Image as ImageIcon, Sparkles, CheckCircle, Lightbulb } from 'lucide-react';
import { getStoryPanelNarration } from '../../utils/narration.js';

export default function StoryPhase({
  storyPanel = 0,
  onNextPanel,
  onPrevPanel,
  onFinishStory,
  playNarration,
  onOpenRuleCard,
  className = ''
}) {
  const currentPanelData = STORY_PANELS[storyPanel] || STORY_PANELS[0];
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
    if (playNarration) {
      playNarration(getStoryPanelNarration(storyPanel));
    }
  }, [storyPanel, playNarration]);

  const totalPanels = STORY_PANELS.length;
  const isLastPanel = storyPanel === totalPanels - 1;

  return (
    <div className={`max-w-5xl mx-auto space-y-6 ${className}`}>
      {/* Main Story Container matching reference design */}
      <div className="bg-slate-900/95 border border-slate-700/80 p-6 sm:p-8 rounded-3xl shadow-2xl backdrop-blur-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          
          {/* LEFT COLUMN: Image Frame Area (Reserved for panel images) */}
          <div className="relative rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden flex flex-col items-center justify-center p-4 min-h-[280px] sm:min-h-[360px] shadow-inner group">
            {/* Top Badge Overlay */}
            <div className="absolute top-3 left-3 z-10 bg-rose-600/90 text-white font-extrabold text-[10px] sm:text-xs px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-md">
              <span className="w-2 h-2 rounded-full bg-amber-300 animate-ping" />
              Global HQ
            </div>

            {currentPanelData.image && !imgError ? (
              <img
                src={currentPanelData.image}
                alt={currentPanelData.imageAlt || currentPanelData.title}
                onError={() => setImgError(true)}
                className="w-full h-full object-cover rounded-xl"
              />
            ) : (
              /* Image Placeholder Frame when asset is loading or missing */
              <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 space-y-3 bg-gradient-to-b from-slate-900 to-slate-950 rounded-xl border border-dashed border-slate-800">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-400/40 text-amber-400 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <ImageIcon className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-black text-amber-400 uppercase tracking-wide">
                    GLOBAL MATH GUILD
                  </h3>
                  <p className="text-xs font-bold text-slate-300">
                    {currentPanelData.title}
                  </p>
                  <span className="inline-block text-[10px] text-slate-500 border border-slate-800 bg-slate-900 px-2.5 py-1 rounded-full mt-2">
                    🖼 Image Space Reserved
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Title, Story Text, Golden Pill Callout & Navigation */}
          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Title */}
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-snug drop-shadow-md">
                {currentPanelData.title}
              </h2>

              {/* Story Text */}
              <p className="text-white text-lg sm:text-xl leading-relaxed font-black tracking-wide drop-shadow-sm">
                {currentPanelData.text}
              </p>

              {/* Golden Takeaway Pill Box matching reference UI */}
              <div className="border-2 border-amber-400/90 bg-amber-500/15 px-6 py-4 rounded-full flex items-center justify-center text-center text-amber-300 text-sm sm:text-base font-black shadow-lg my-3">
                <span>{currentPanelData.takeaway}</span>
              </div>
            </div>

            {/* Guild Rule Card Display on Final Panel */}
            {currentPanelData.showRuleCard && (
              <div className="bg-slate-800/90 p-4 rounded-2xl border-2 border-amber-400 text-center space-y-2 animate-bounceIn">
                <h4 className="text-sm font-black text-amber-400 uppercase tracking-wider">🏅 Guild Rule Card Unlocked</h4>
                <button
                  onClick={onOpenRuleCard}
                  className="px-5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-md cursor-pointer"
                >
                  View Rule Card
                </button>
              </div>
            )}

            {/* BOTTOM NAVIGATION BAR matching reference screenshot */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
              {/* Prev Button */}
              <button
                onClick={onPrevPanel}
                disabled={storyPanel === 0}
                className="px-6 py-3 rounded-full bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-slate-200 font-black text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" /> Prev
              </button>

              {/* Dash / Dot Pagination Indicator + Step Counter */}
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex items-center gap-1.5">
                  {STORY_PANELS.map((_, idx) => (
                    <div
                      key={idx}
                      className={`transition-all duration-300 ${
                        idx === storyPanel
                          ? 'w-7 h-2 bg-amber-400 rounded-full shadow-glow'
                          : 'w-2.5 h-2.5 bg-slate-700 rounded-full'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm sm:text-base font-black text-slate-200 ml-1">
                  {storyPanel + 1} / {totalPanels}
                </span>
              </div>

              {/* Next Button */}
              {!isLastPanel ? (
                <button
                  onClick={onNextPanel}
                  className="px-7 py-3 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-glow flex items-center gap-1.5 transition-all cursor-pointer hover:scale-105 active:scale-95"
                >
                  Next Panel <ChevronRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={onFinishStory}
                  className="px-7 py-3 rounded-full bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-xs sm:text-sm shadow-lg flex items-center gap-1.5 transition-all cursor-pointer hover:scale-105 active:scale-95"
                >
                  Simulations <CheckCircle className="w-5 h-5" />
                </button>
              )}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

