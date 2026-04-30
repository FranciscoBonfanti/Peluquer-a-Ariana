import { useState } from 'react';

const MONTH_NAMES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const DAY_LABELS = ['Do','Lu','Ma','Mi','Ju','Vi','Sa'];

interface MiniCalendarProps {
  selected: Date | null;
  onSelect: (date: Date) => void;
}

export function MiniCalendar({ selected, onSelect }: MiniCalendarProps) {
  const today = new Date();
  const [view, setView] = useState({ year: today.getFullYear(), month: today.getMonth() });

  const daysInMonth = new Date(view.year, view.month + 1, 0).getDate();
  const firstDay = new Date(view.year, view.month, 1).getDay();

  const cells: (number | null)[] = Array(firstDay).fill(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const isToday = (d: number) => d === today.getDate() && view.month === today.getMonth() && view.year === today.getFullYear();
  const isPast = (d: number) => new Date(view.year, view.month, d) < new Date(new Date().toDateString());
  const isSunday = (d: number) => new Date(view.year, view.month, d).getDay() === 0;
  const isSelected = (d: number) => selected?.getDate() === d && selected?.getMonth() === view.month && selected?.getFullYear() === view.year;

  const prevMonth = () => setView(v => v.month === 0 ? { year: v.year - 1, month: 11 } : { ...v, month: v.month - 1 });
  const nextMonth = () => setView(v => v.month === 11 ? { year: v.year + 1, month: 0 } : { ...v, month: v.month + 1 });

  return (
    <div className="bg-white rounded-2xl border border-charcoal/8 p-5 select-none">
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="p-1.5 rounded-lg hover:bg-gray-100 text-muted transition-colors text-lg">‹</button>
        <span className="font-display font-semibold text-charcoal">{MONTH_NAMES[view.month]} {view.year}</span>
        <button onClick={nextMonth} className="p-1.5 rounded-lg hover:bg-gray-100 text-muted transition-colors text-lg">›</button>
      </div>

      <div className="grid grid-cols-7 gap-0.5 mb-1">
        {DAY_LABELS.map(d => (
          <div key={d} className="text-center text-[11px] font-semibold text-muted tracking-wider py-1">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-0.5">
        {cells.map((d, i) => {
          if (!d) return <div key={i} />;
          const disabled = isPast(d) || isSunday(d);
          const sel = isSelected(d);
          const tod = isToday(d);
          return (
            <button
              key={i}
              disabled={disabled}
              onClick={() => onSelect(new Date(view.year, view.month, d))}
              className="aspect-square min-h-[36px] rounded-lg font-sans text-[13px] font-medium transition-colors duration-150 outline-none"
              style={{
                cursor: disabled ? 'not-allowed' : 'pointer',
                fontWeight: sel ? 600 : 400,
                background: sel ? 'var(--rose)' : tod ? 'rgba(196,116,138,0.1)' : 'transparent',
                color: disabled ? '#ccc' : sel ? '#fff' : tod ? 'var(--rose)' : '#1A1A1A',
              }}
              onMouseEnter={e => { if (!disabled && !sel) (e.target as HTMLElement).style.background = '#FDF0EF'; }}
              onMouseLeave={e => { if (!disabled && !sel) (e.target as HTMLElement).style.background = 'transparent'; }}
            >
              {d}
            </button>
          );
        })}
      </div>
    </div>
  );
}
