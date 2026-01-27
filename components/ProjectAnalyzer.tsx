import React, { useState } from 'react';
import { analyzeProjectIdea } from '../services/geminiService';
import { Lightbulb, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

const ProjectAnalyzer: React.FC = () => {
  const [idea, setIdea] = useState('');
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    if (!idea.trim()) return;
    setIsAnalyzing(true);
    setAnalysis(null);
    try {
      const result = await analyzeProjectIdea(idea);
      setAnalysis(result);
    } catch (err) {
      setAnalysis("Ошибка анализа. Попробуйте позже.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 to-brand-950 rounded-2xl border border-slate-700 p-8 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-brand-500/20 rounded-lg">
          <Lightbulb className="w-6 h-6 text-brand-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Оценка идей (AI Beta)</h2>
          <p className="text-slate-400">Проверьте жизнеспособность вашего инженерного проекта с помощью Gemini</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <label className="block text-sm font-medium text-slate-300">Опишите вашу идею</label>
          <textarea
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            className="w-full h-40 bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-500 transition-colors resize-none"
            placeholder="Например: Автономная система очистки солнечных панелей с использованием дронов..."
          />
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !idea.trim()}
            className="w-full py-3 bg-brand-600 hover:bg-brand-500 text-white font-semibold rounded-lg transition-all flex justify-center items-center gap-2 disabled:opacity-50"
          >
            {isAnalyzing ? (
              <>Анализирую...</>
            ) : (
              <>
                Оценить проект <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        <div className="bg-slate-800/30 rounded-lg p-6 border border-slate-700/50 min-h-[240px]">
          <h3 className="text-lg font-semibold text-white mb-4 border-b border-slate-700 pb-2">Результат</h3>
          {analysis ? (
            <div className="prose prose-invert prose-sm text-slate-300 whitespace-pre-wrap">
              {analysis}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-500">
              {isAnalyzing ? (
                <div className="animate-pulse flex flex-col items-center">
                  <div className="w-8 h-8 bg-slate-600 rounded-full mb-2"></div>
                  <div className="w-32 h-4 bg-slate-600 rounded"></div>
                </div>
              ) : (
                <p className="text-center">Введите описание проекта слева<br/>для получения экспресс-анализа.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectAnalyzer;
