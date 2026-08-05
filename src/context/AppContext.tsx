import { createContext, useEffect, useMemo, useState, type ReactNode } from 'react';

type Theme = 'dark' | 'light';

interface AppContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const AppContext = createContext<AppContextValue>({
  theme: 'dark',
  setTheme: () => undefined,
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = window.localStorage.getItem('weekly-pipeline-theme');
    return savedTheme === 'light' ? 'light' : 'dark';
  });

  useEffect(() => {
    window.localStorage.setItem('weekly-pipeline-theme', theme);
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const value = useMemo(() => ({ theme, setTheme }), [theme]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
