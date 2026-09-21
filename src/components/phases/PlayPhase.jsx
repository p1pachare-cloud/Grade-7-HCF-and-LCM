// src/components/phases/PlayPhase.jsx
// Phase 4: Play Phase Component (IntelliPlay 100 Practice Question Engine)

import React, { useState, useEffect } from 'react';
import WorldMap from '../gamification/WorldMap.jsx';
import QuestionRenderer from '../quiz/QuestionRenderer.jsx';
import HintOverlay from '../quiz/HintOverlay.jsx';
import FeedbackOverlay from '../shared/FeedbackOverlay.jsx';
import Mascot from '../shared/Mascot.jsx';
import XPTracker from '../gamification/XPTracker.jsx';
import StreakCounter from '../gamification/StreakCounter.jsx';
import StarRating from '../gamification/StarRating.jsx';
import { checkNumberAnswer, checkOrderingAnswer } from '../../utils/answerCheck.js';
import { calcStarsForWorld } from '../../utils/scoring.js';
import { getQuestionNarration } from '../../utils/narration.js';
import { Lightbulb, RotateCcw, ArrowRight, Trophy } from 'lucide-react';

export default function PlayPhase({
  worlds = [],
  currentWorld = 0,
  currentQuestion = 0,
  worldScores = [],
  attemptCount = 0,
  hintsUsed = 0,
  xp = 0,
  streak = 0,
  onSelectWorld,
  onAnswerCorrect,
  onAnswerIncorrect,
  onShowNudge,
  onUseHint,
  onNextQuestion,
  onRetryWorld,
  onOpenRuleCard,
  playNarration,
  className = ''
}) {
  const [userAnswer, setUserAnswer] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [showHintModal, setShowHintModal] = useState(false);

  const worldQuestions = worlds[currentWorld] || [];
  const question = worldQuestions[currentQuestion];

  useEffect(() => {
    setUserAnswer(null);
    setFeedback(null);
    setShowHintModal(false);
    if (question && playNarration) {
      playNarration(getQuestionNarration(question));
    }
  }, [currentWorld, currentQuestion, question, playNarration]);

  if (!question) {
    return <div className="p-8 text-center text-slate-400">Loading IntelliPlay questions...</div>;
  }

  const handleSubmitAnswer = () => {
    if (userAnswer == null && question.format !== 'ordering') return;

    let evalResult = { status: 'wrong' };

    if (question.format === 'mcq') {
      const isCorrect = typeof userAnswer === 'object' && userAnswer.n != null
        ? userAnswer.n === question.answer.n && userAnswer.d === question.answer.d
        : userAnswer === question.answer;
      evalResult = { status: isCorrect ? 'correct' : 'wrong' };
    } else if (question.format === 'numberInput' || question.format === 'fractionInput') {
      evalResult = checkNumberAnswer(userAnswer, question);
    } else if (question.format === 'ordering') {
      const isCorrect = checkOrderingAnswer(userAnswer || question.items, question.answer);
      evalResult = { status: isCorrect ? 'correct' : 'wrong' };
    } else if (question.format === 'trueFalse') {
      evalResult = { status: userAnswer === question.answer ? 'correct' : 'wrong' };
    }

    if (evalResult.status === 'correct') {
      setFeedback({ status: 'correct', text: '🎉 Correct! Brilliant calculation!' });
      onAnswerCorrect();
    } else if (evalResult.status === 'notLowest') {
      setFeedback({ status: 'notLowest', text: 'Right value — now write it in lowest terms!' });
      onShowNudge();
    } else {
      setFeedback({ status: 'wrong', text: 'Not quite. Check your steps and try again!' });
      onAnswerIncorrect();
    }
  };

  const currentScore = worldScores[currentWorld];
  const isWorldFinished = currentQuestion >= 9 && feedback?.status === 'correct';

  return (
    <div className={`max-w-4xl mx-auto space-y-6 ${className}`}>
      {/* World Map Navigation */}
      <WorldMap
        currentWorld={currentWorld}
        worldScores={worldScores}
        onSelectWorld={onSelectWorld}
      />

      {/* Play Header Stats */}
      <div className="flex items-center justify-between bg-slate-900/90 p-4 rounded-2xl border border-slate-700 shadow-md">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-400">
            World {currentWorld + 1} Question {currentQuestion + 1} / 10
          </span>
          <StarRating stars={currentScore ? calcStarsForWorld(currentScore) : 0} size="sm" />
        </div>
        <div className="flex items-center gap-3">
          <StreakCounter streak={streak} />
          <XPTracker xp={xp} />
        </div>
      </div>

      {/* Main Question Card */}
      <div className="relative bg-slate-900/90 p-6 sm:p-8 rounded-3xl border border-slate-700 shadow-2xl space-y-6">
        <Mascot
          mood={feedback?.status === 'correct' ? 'happy' : feedback?.status === 'wrong' ? 'encouraging' : 'idle'}
          className="mb-2"
        />

        <QuestionRenderer
          question={question}
          userAnswer={userAnswer}
          onChangeAnswer={setUserAnswer}
          onSubmit={handleSubmitAnswer}
          disabled={feedback?.status === 'correct'}
        />

        {/* Hint Overlay Modal if open */}
        {showHintModal && (
          <HintOverlay
            question={question}
            hintsUsed={hintsUsed}
            onClose={() => setShowHintModal(false)}
            onOpenRuleCard={onOpenRuleCard}
          />
        )}

        {/* Bottom Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
          <button
            onClick={() => { onUseHint(); setShowHintModal(true); }}
            className="px-4 py-2 bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 rounded-xl font-bold text-xs flex items-center gap-2"
          >
            <Lightbulb className="w-4 h-4 text-amber-400" /> Need a Hint? ({hintsUsed}/2)
          </button>

          {feedback?.status !== 'correct' ? (
            <button
              onClick={handleSubmitAnswer}
              className="px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm shadow-glow transition-all"
            >
              Submit Answer
            </button>
          ) : (
            <button
              onClick={onNextQuestion}
              className="px-8 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm shadow-lg flex items-center gap-2 animate-bounceIn"
            >
              Next Question <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Feedback Banner */}
        {feedback && (
          <FeedbackOverlay
            status={feedback.status}
            text={feedback.text}
            className="mt-4"
          />
        )}
      </div>

      {/* World Complete Retry Banner */}
      {isWorldFinished && (
        <div className="bg-slate-800/90 p-6 rounded-3xl border border-amber-500/40 text-center space-y-3">
          <h3 className="text-lg font-extrabold text-amber-400 flex items-center justify-center gap-2">
            <Trophy className="w-5 h-5" /> World {currentWorld + 1} Completed!
          </h3>
          <p className="text-xs text-slate-300">
            You scored {currentScore} / 10! Want to practice again with a fresh set of random questions?
          </p>
          <button
            onClick={() => onRetryWorld(currentWorld)}
            className="px-6 py-2.5 bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs rounded-xl flex items-center gap-2 mx-auto"
          >
            <RotateCcw className="w-4 h-4" /> Replay World with Fresh Questions
          </button>
        </div>
      )}
    </div>
  );
}
