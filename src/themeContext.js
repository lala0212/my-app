import React, { createContext, useState } from 'react';
import { lightTheme, darkTheme } from './theme';

export const ThemeContext = createContext();
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = isDarkMode ? darkTheme : lightTheme;
  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, setIsDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};