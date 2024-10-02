import { useContext } from 'react';
import { MainContext } from './MainContext';

const useMainContext = () => useContext(MainContext);

export default useMainContext;
