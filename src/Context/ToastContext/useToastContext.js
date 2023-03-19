import { useContext } from 'react';

const useToastContext = (ctx) => useContext(ctx) || {};

export default useToastContext;
