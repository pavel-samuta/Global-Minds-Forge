import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const data = [
  { name: 'Публикации', value: 40 },
  { name: 'Патенты', value: 30 },
  { name: 'Проекты', value: 60 },
  { name: 'Внедрения', value: 20 },
  { name: 'Менторство', value: 15 },
];

const RatingChart: React.FC = () => {
  return (
    <div className="w-full bg-slate-900/50 rounded-xl border border-slate-700 p-6 shadow-lg backdrop-blur-sm h-full">
      <h3 className="text-xl font-semibold mb-2 text-slate-200">Состав ERI (Инженерный Рейтинг)</h3>
      <p className="text-sm text-slate-400 mb-6">Вклад различных активностей в рейтинг инженера</p>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }}
              itemStyle={{ color: '#38bdf8' }}
            />
            <Bar dataKey="value" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RatingChart;
