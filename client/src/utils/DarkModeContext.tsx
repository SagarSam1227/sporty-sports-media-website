import { createContext } from 'react';
import { darkmodeInterface } from '../vite-env';

// Provide an object with the same shape as darkmodeInterface as the default value
const defaultDarkModeValue: darkmodeInterface = {
  isDarkmode: false,
  setIsDarkmode: (value: boolean) => void{},
}

const DarkModeContext = createContext<darkmodeInterface>(defaultDarkModeValue);

export default DarkModeContext;
