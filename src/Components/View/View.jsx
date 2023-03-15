import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
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
      setListData(items);
    }
    getListData();
  }, []);

  const setSortedData = (data) => {
    setListData(data);
  };

  const className = isHidden ? 'view no-show' : 'view';

  return (
    <div className={className}>
      <List listData={listData} setListData={setSortedData} />
    </div>
  );
}

View.propTypes = {
  name: PropTypes.string.isRequired,
};

export default View;
