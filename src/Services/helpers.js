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

export const fetchData = async (queryObject, dataKeys) => API.graphql(queryObject)
  .then((res) => {
    const { data } = res || {};
    const resultMatch = getResultData(data, dataKeys);

    return resultMatch;
  })
  .catch((err) => {
    console.log('fetchData ERROR');
    console.log({ queryObject, dataKeys });
    console.error(err);
    return err;
  });
