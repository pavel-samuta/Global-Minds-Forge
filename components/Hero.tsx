import React, { useState, useRef } from 'react';
import { Play, Pause, Loader2 } from 'lucide-react';
import { generateSpeech } from '../services/geminiService';
import { decode, decodeAudioData } from '../utils/audioUtils';

const INTRO_TEXT = "Global Minds Forge — это научно-информационная социальная сеть, призванная объединить инженеров, инвесторов, художников и научных исследователей для создания решений великого универсального инжиниринга.";

const Hero: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);

  const handlePlayTTS = async () => {
    if (isPlaying) {
      if (sourceNodeRef.current) {
        sourceNodeRef.current.stop();
        sourceNodeRef.current = null;
      }
      setIsPlaying(false);
      return;
    }

    setIsLoading(true);
    try {
      const base64Audio = await generateSpeech(INTRO_TEXT);
      if (!base64Audio) throw new Error("No audio generated");

      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      }

      const audioBuffer = await decodeAudioData(
        decode(base64Audio),
        audioContextRef.current,
        24000,
        1
      );

      const source = audioContextRef.current.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContextRef.current.destination);
      
      source.onended = () => setIsPlaying(false);
      
      source.start();
      sourceNodeRef.current = source;
      setIsPlaying(true);

    } catch (err) {
      console.error(err);
      alert("Не удалось воспроизвести аудио.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden pt-20 pb-32">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-4 px-3 py-1 bg-brand-500/10 rounded-full border border-brand-500/30">
            <span className="text-brand-500 font-medium text-sm tracking-wider uppercase">Основано Павлом Самута</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-brand-100 to-brand-500">
            Global Minds Forge
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-400 mb-10 leading-relaxed">
            Научно-информационная сеть для решений <br/> <span className="text-brand-500">великого универсального инжиниринга</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white rounded-lg font-bold text-lg transition-all shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)]">
              Присоединиться к GMF
            </button>
            
            <button 
              onClick={handlePlayTTS}
              disabled={isLoading}
              className="flex items-center gap-2 px-6 py-4 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-medium border border-slate-700 transition-all"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : isPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5" />
              )}
              {isPlaying ? "Остановить" : "Слушать о проекте"}
            </button>
          </div>
        </div>
      </div>
      
      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-600/10 rounded-full blur-[100px] -z-10" />
    </section>
  );
};

export default Hero;
