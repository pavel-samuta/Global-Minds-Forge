import React from 'react';
import Hero from './components/Hero';
import NetworkGraph from './components/NetworkGraph';
import RatingChart from './components/RatingChart';
import ProjectAnalyzer from './components/ProjectAnalyzer';
import AIChat from './components/AIChat';
import { Globe, Users, TrendingUp, Search, Award } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-brand-950 text-slate-200 font-sans selection:bg-brand-500/30">
      
      {/* Navigation */}
      <nav className="fixed w-full z-40 bg-brand-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="container mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-brand-600 p-2 rounded-lg">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">Global Minds Forge</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
            <a href="#about" className="hover:text-white transition-colors">О нас</a>
            <a href="#features" className="hover:text-white transition-colors">Возможности</a>
            <a href="#investment" className="hover:text-white transition-colors">Инвесторам</a>
          </div>
        </div>
      </nav>

      <main>
        <Hero />

        {/* Features Grid */}
        <section id="features" className="py-20 bg-slate-900/50">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              
              <div className="space-y-12">
                <div className="max-w-xl">
                  <h2 className="text-3xl font-bold text-white mb-6">Инновационная экосистема</h2>
                  <p className="text-slate-400 leading-relaxed">
                    Мы стимулируем прогресс путем совместного исследования, инжиниринга и обучения. Найдите единомышленников и финансирование в одном месте.
                  </p>
                </div>

                <div className="grid gap-6">
                  <div className="flex gap-4 p-4 bg-slate-800/40 rounded-xl border border-slate-700/50">
                    <div className="bg-blue-500/10 p-3 rounded-lg h-fit">
                      <Award className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">ERI (Инженерный рейтинг)</h4>
                      <p className="text-sm text-slate-400">Постоянный идентификатор, отражающий историю разработок, публикации и опыт.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 p-4 bg-slate-800/40 rounded-xl border border-slate-700/50">
                    <div className="bg-purple-500/10 p-3 rounded-lg h-fit">
                      <Search className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Семантический поиск</h4>
                      <p className="text-sm text-slate-400">Умный поиск связей, проектов и научных публикаций по смысловому соответствию.</p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-slate-800/40 rounded-xl border border-slate-700/50">
                    <div className="bg-green-500/10 p-3 rounded-lg h-fit">
                      <TrendingUp className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Инвестиции</h4>
                      <p className="text-sm text-slate-400">Прямой доступ к инвесторам для перспективных инженерных команд.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-6">
                <RatingChart />
                <NetworkGraph />
              </div>

            </div>
          </div>
        </section>

        {/* Project Analyzer Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
             <ProjectAnalyzer />
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-brand-950 border-t border-slate-800 py-12">
          <div className="container mx-auto px-6 text-center">
            <p className="text-slate-500 mb-4">© 2024 Global Minds Forge. Все права защищены.</p>
            <p className="text-slate-600 text-sm">Павел Самута</p>
          </div>
        </footer>
      </main>

      {/* Floating Chat Assistant */}
      <AIChat />
    </div>
  );
}

export default App;
