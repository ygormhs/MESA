import { Clock, Plus, Copy, Check } from 'lucide-react';

const DAYS = [
    { id: 'seg', label: 'Segunda-feira' },
    { id: 'ter', label: 'Terça-feira' },
    { id: 'qua', label: 'Quarta-feira' },
    { id: 'qui', label: 'Quinta-feira' },
    { id: 'sex', label: 'Sexta-feira' },
    { id: 'sab', label: 'Sábado' },
    { id: 'dom', label: 'Domingo' }
];

export default function StepHours({ data, updateData }) {

    // Initialize hours if empty
    const hours = data.hours || DAYS.reduce((acc, day) => ({
        ...acc,
        [day.id]: { isOpen: true, start: '11:30', end: '23:00' }
    }), {});

    const updateDay = (dayId, field, value) => {
        const newHours = {
            ...hours,
            [dayId]: { ...hours[dayId], [field]: value }
        };
        updateData('hours', newHours);
    };

    const copyToAll = () => {
        const monday = hours['seg'];
        const newHours = DAYS.reduce((acc, day) => ({
            ...acc,
            [day.id]: { ...monday }
        }), {});
        updateData('hours', newHours);
    };

    return (
        <div className="space-y-6">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Horário de Funcionamento</h2>
                <p className="text-gray-500">Defina quando os clientes podem te visitar</p>
            </div>

            <div className="flex justify-end mb-4">
                <button
                    onClick={copyToAll}
                    className="text-sm font-medium text-mesa-green hover:underline flex items-center gap-1"
                >
                    <Copy size={14} />
                    Copiar Seg para todos
                </button>
            </div>

            <div className="space-y-3">
                {DAYS.map((day) => {
                    const dayData = hours[day.id] || { isOpen: false, start: '', end: '' };

                    return (
                        <div key={day.id} className="flex items-center gap-4 py-3 border-b border-gray-100 last:border-0">
                            {/* Toggle Button */}
                            <div className="flex-1 min-w-[120px]">
                                <span className="font-medium text-gray-700 block">{day.label}</span>
                            </div>

                            {/* Status Toggle */}
                            <button
                                onClick={() => updateDay(day.id, 'isOpen', !dayData.isOpen)}
                                className={`
                                    flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors min-w-[90px] justify-center
                                    ${dayData.isOpen
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-gray-100 text-gray-500'}
                                `}
                            >
                                {dayData.isOpen ? 'Aberto' : 'Fechado'}
                            </button>

                            {/* Time Inputs */}
                            {dayData.isOpen ? (
                                <div className="flex items-center gap-2 flex-1 justify-end">
                                    <input
                                        type="time"
                                        value={dayData.start}
                                        onChange={(e) => updateDay(day.id, 'start', e.target.value)}
                                        className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1.5 text-sm focus:ring-1 focus:ring-mesa-green outline-none"
                                    />
                                    <span className="text-gray-400 text-sm">até</span>
                                    <input
                                        type="time"
                                        value={dayData.end}
                                        onChange={(e) => updateDay(day.id, 'end', e.target.value)}
                                        className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1.5 text-sm focus:ring-1 focus:ring-mesa-green outline-none"
                                    />
                                </div>
                            ) : (
                                <div className="flex-1 text-center text-sm text-gray-400 italic">
                                    Não abre neste dia
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="bg-blue-50 p-4 rounded-xl flex gap-3 text-blue-700 text-sm mt-6">
                <Clock size={20} className="shrink-0" />
                <p>Os horários que você configurar aqui serão usados para mostrar aos clientes se o restaurante está aberto ou fechado em tempo real.</p>
            </div>
        </div>
    );
}
