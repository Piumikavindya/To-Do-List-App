import React, {createContext, useEffect} from 'react';

export const ThemeContext = createContext();

const defaultTheme = 'light';
const darkTheme = 'dark'

export default function ThemeProvider({children}) {

    const toggleTheme = () =>{
        const oldtheme =getTheme()
const newTheme = oldtheme === defaultTheme ? darkTheme : defaultTheme
       
updateTheme(newTheme,oldtheme)

    };

    useEffect(()=>{
        const theme = getTheme();
        if(! theme) updateTheme(defaultTheme);
        else updateTheme(theme);
    },[]);
  return (
    <ThemeContext.Provider value={{toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
}
//created a method called 'getTheme()' because we can call mathod where ever we need
const getTheme = () =>  localStorage.getItem('theme');

const updateTheme = (theme, themeToRemove) => {
    if(themeToRemove) document.documentElement.classList.remove(themeToRemove );
    document.documentElement.classList.add(theme);

    localStorage.setItem("theme", theme);
}