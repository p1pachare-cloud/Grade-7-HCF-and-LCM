// src/components/quiz/QuestionRenderer.jsx
// Question renderer dispatcher component based on question format

import React from 'react';
import McqQuestion from './McqQuestion.jsx';
import NumberInputQuestion from './NumberInputQuestion.jsx';
import FractionInputQuestion from './FractionInputQuestion.jsx';
import OrderingQuestion from './OrderingQuestion.jsx';
import TrueFalseQuestion from './TrueFalseQuestion.jsx';
import Frac from '../shared/Frac.jsx';

export default function QuestionRenderer({
  question,
  userAnswer,
  onChangeAnswer,
  onSubmit,
  disabled = false,
  className = ''
}) {
  if (!question) return null;

  const renderStem = (stem) => {
    // Replace {n/d} tokens with Frac components
    const parts = stem.split(/(\{.*?\}|\bHCF\b|\bLCM\b)/g);
    return parts.map((part, i) => {
      if (part.startsWith('{') && part.endsWith('}')) {
        const [n, d] = part.slice(1, -1).split('/').map(Number);
        return <Frac key={i} n={n} d={d} size="md" className="mx-1" />;
      }
      if (part === 'HCF' || part === 'LCM') {
        return <strong key={i} className="text-amber-400 font-extrabold px-1">{part}</strong>;
      }
      return part;
    });
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Question Stem */}
      <div className="bg-slate-800/90 p-7 sm:p-8 rounded-3xl border border-slate-700 shadow-xl text-xl sm:text-2xl font-black text-white leading-relaxed text-center drop-shadow-sm">
        {renderStem(question.stem)}
      </div>

      {/* Format Dispatcher */}
      {question.format === 'mcq' && (
        <McqQuestion
          question={question}
          selectedOption={userAnswer}
          onSelectOption={(opt) => onChangeAnswer(opt.v)}
          disabled={disabled}
        />
      )}

      {question.format === 'numberInput' && (
        <NumberInputQuestion
          value={userAnswer || ''}
          onChange={onChangeAnswer}
          onSubmit={onSubmit}
          disabled={disabled}
        />
      )}

      {question.format === 'fractionInput' && (
        <FractionInputQuestion
          value={userAnswer}
          onChange={onChangeAnswer}
          onSubmit={onSubmit}
          allowImproper={question.allowImproper}
          disabled={disabled}
        />
      )}

      {question.format === 'ordering' && (
        <OrderingQuestion
          items={question.items}
          onChange={onChangeAnswer}
          disabled={disabled}
        />
      )}

      {question.format === 'trueFalse' && (
        <TrueFalseQuestion
          selectedValue={userAnswer}
          onSelect={onChangeAnswer}
          disabled={disabled}
        />
      )}
    </div>
  );
}
