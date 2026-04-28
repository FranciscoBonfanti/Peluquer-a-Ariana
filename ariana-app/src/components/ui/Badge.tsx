interface BadgeProps {
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no-show';
}

const config: Record<BadgeProps['status'], { label: string; className: string }> = {
  pending: { label: 'Pendiente', className: 'bg-yellow-100 text-yellow-700' },
  confirmed: { label: 'Confirmado', className: 'bg-blue-100 text-blue-700' },
  completed: { label: 'Completado', className: 'bg-green-100 text-green-700' },
  cancelled: { label: 'Cancelado', className: 'bg-red-100 text-red-500' },
  'no-show': { label: 'No se presentó', className: 'bg-gray-100 text-gray-500' },
};

export function Badge({ status }: BadgeProps) {
  const { label, className } = config[status];
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${className}`}>
      {label}
    </span>
  );
}
