import React, { createContext, useContext, useMemo, useState } from 'react';

export type NotificationType = 'success' | 'error' | 'info';

type Notification = {
  id: string;
  type: NotificationType;
  message: string;
};

type NotificationsContextType = {
  notify: (message: string, type?: NotificationType) => void;
};

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

export const NotificationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const notify = (message: string, type: NotificationType = 'info') => {
    const id = crypto.randomUUID();
    setNotifications((current) => [...current, { id, type, message }]);
    window.setTimeout(() => {
      setNotifications((current) => current.filter((n) => n.id !== id));
    }, 4000);
  };

  const value = useMemo(() => ({ notify }), []);

  return (
    <NotificationsContext.Provider value={value}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3 max-w-sm">
        {notifications.map((note) => (
          <div
            key={note.id}
            className={`rounded-xl border px-4 py-3 shadow-xl backdrop-blur-xl transition-all duration-300 ${
              note.type === 'success'
                ? 'bg-emerald-500/90 border-emerald-400 text-white'
                : note.type === 'error'
                ? 'bg-rose-500/90 border-rose-400 text-white'
                : 'glass-card text-white'
            }`}
          >
            <p className="text-sm font-medium">{note.message}</p>
          </div>
        ))}
      </div>
    </NotificationsContext.Provider>
  );
};

export function useNotifications() {
  const context = useContext(NotificationsContext);
  if (!context) throw new Error('useNotifications must be used within NotificationsProvider');
  return context;
}
