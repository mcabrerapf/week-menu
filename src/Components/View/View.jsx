import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { sortBy } from '../helpers';
import './View.css';
import List from '../List';
import { serviceHandler } from '../../Services';
import { useMainContext, MainContext } from '../../Context';
import { GET_ALL_STRING } from '../../constants';

function View({
  name,
}) {
  const { view } = useMainContext(MainContext);
  const [listData, setListData] = useState([]);
  const isHidden = view !== name;

  useEffect(() => {
    async function getListData() {
      const items = await serviceHandler(GET_ALL_STRING)(name);
      if (!items) return;
      const sortedItems = sortBy(items, 'name', 'alphabetical');
      setListData(sortedItems);
    }
    getListData();
  }, []);

  const setSortedData = (data) => {
    const sortedItems = sortBy(data, 'name', 'alphabetical');
    setListData(sortedItems);
  };

  const hasData = listData && !!listData.length;

  return (
    <div className="view" style={{ display: isHidden ? 'none' : 'flex' }}>
      {hasData && <List listData={listData} setListData={setSortedData} />}
    </div>
  );
}

View.propTypes = {
  name: PropTypes.string.isRequired,
};

export default View;
