import { useContext } from 'react';

const useMainContext = (ctx) => useContext(ctx) || {};

export default useMainContext;
