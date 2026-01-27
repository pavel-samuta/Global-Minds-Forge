import React, { useState } from 'react';
import { Plus, CheckSquare, Clock, User, FileText, MoreHorizontal } from 'lucide-react';
import { Project, Task } from '../types';

interface ProjectBoardProps {
  projects: Project[];
  onCreateProject: (p: Project) => void;
}

const ProjectBoard: React.FC<ProjectBoardProps> = ({ projects, onCreateProject }) => {
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [newProjectTitle, setNewProjectTitle] = useState('');

  const handleCreate = () => {
    if (!newProjectTitle.trim()) return;
    const newProject: Project = {
      id: Date.now().toString(),
      title: newProjectTitle,
      description: "Новый инженерный проект",
      owner: "Павел Самута",
      team: ["Вы"],
      tasks: [],
      milestones: ["Старт"],
      files: []
    };
    onCreateProject(newProject);
    setNewProjectTitle('');
    setShowNewProjectModal(false);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Управление Проектами</h2>
          <p className="text-slate-400">Координируйте задачи, команду и ресурсы</p>
        </div>
        <button 
          onClick={() => setShowNewProjectModal(true)}
          className="bg-brand-600 hover:bg-brand-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors"
        >
          <Plus className="w-5 h-5" /> Новый проект
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(project => (
          <div key={project.id} className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-brand-500/50 transition-all cursor-pointer group">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-brand-500/10 p-2 rounded-lg">
                <FileText className="w-6 h-6 text-brand-400" />
              </div>
              <button className="text-slate-500 hover:text-white">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-400 transition-colors">{project.title}</h3>
            <p className="text-slate-400 text-sm mb-6 line-clamp-2">{project.description}</p>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 flex items-center gap-2">
                  <CheckSquare className="w-4 h-4" /> Задачи
                </span>
                <span className="text-white font-medium">{project.tasks.length} активных</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 flex items-center gap-2">
                  <User className="w-4 h-4" /> Команда
                </span>
                <div className="flex -space-x-2">
                   {project.team.map((member, i) => (
                     <div key={i} className="w-6 h-6 rounded-full bg-slate-600 border border-slate-800 flex items-center justify-center text-[10px] text-white">
                       {member[0]}
                     </div>
                   ))}
                </div>
              </div>
            </div>

            <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
               <div className="bg-brand-500 h-full w-1/3"></div>
            </div>
          </div>
        ))}

        {/* New Project Modal */}
        {showNewProjectModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 w-full max-w-md">
              <h3 className="text-xl font-bold text-white mb-4">Создать проект</h3>
              <input
                autoFocus
                type="text"
                value={newProjectTitle}
                onChange={(e) => setNewProjectTitle(e.target.value)}
                placeholder="Название проекта..."
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white mb-4 focus:outline-none focus:border-brand-500"
              />
              <div className="flex gap-3 justify-end">
                <button 
                  onClick={() => setShowNewProjectModal(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white"
                >
                  Отмена
                </button>
                <button 
                  onClick={handleCreate}
                  className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-lg"
                >
                  Создать
                </button