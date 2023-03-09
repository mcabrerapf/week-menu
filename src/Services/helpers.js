import { API } from 'aws-amplify';

export const iterateOverObj = (obj, keys) => {
  const currentKey = keys.shift();
  const currentObj = obj[currentKey];
  if (keys.length) return iterateOverObj(currentObj, keys);
  return currentObj;
};

export const getResultData = (data, dataKeysString) => {
  const dataKeys = dataKeysString.split('-');
  return iterateOverObj(data, dataKeys);
};

export const fetchData = async (queryObject, dataKeys) => {
  try {
    const result = await API.graphql(queryObject);
    const { data } = result;
    if (!data) return null;
    const resultMatch = getResultData(data, dataKeys);
    return resultMatch;
  } catch (error) {
    console.error(error);
    return error;
  }
};
