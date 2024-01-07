import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { LIST_FILTERS_STRING, MENU_STRING } from '../../constants/STRINGS';
import Input from '../Input';
import Button from '../Button';
import Icon from '../Icon';
import Modal from '../Modal';

function ListFilters({
  setFilterValue, setSearchValue, searchValue, filterValue, view,
}) {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = (closeEvent) => {
    if (closeEvent && closeEvent.value) setFilterValue(closeEvent.value);
    setShowModal(false);
  };

  const modalData = {
    type: LIST_FILTERS_STRING,
    filterValue,
    view,
    closeModal: handleCloseModal,
    hideHeader: true,
    modifier: 's',
  };

  return (
    <div className="list-filters row a-c gap-5 h-3 w-f pad-5">
      <Input
        type="search"
        modifier="h-2"
        value={searchValue}
        id="search-value"
        name="search-value"
        onChange={({ target: { value } }) => setSearchValue(value)}
      />
      <Button
        modifier="h-2 w-2 icon"
        disabled={view === MENU_STRING}
        fakeDisabled={!filterValue}
        onClick={() => setShowModal(true)}
      >
        <Icon iconName="filter" />
      </Button>
      {/* <Input
        type="select"
        modifier="list-filter-by"
        value={filterValue}
        id="filter-value"
        name="filter-value"
        onChange={({ target: { value } }) => setFilterValue(value)}
        placeholder="All"
        enableDefaultSelect
        selectOptions={filterOptions}
      /> */}
      {/* <Input
          type="select"
          modifier="list-sort-by"
          value={listSort}
          id="filter-value"
          name="filter-value"
          label="Sort by:"
          onChange={({ target: { value } }) => setListSort(value)}
          selectOptions={sortOptions}
        /> */}
      {showModal && <Modal closeModal={handleCloseModal} modalData={modalData} />}
    </div>
  );
}

ListFilters.propTypes = {
  view: PropTypes.string.isRequired,
  setFilterValue: PropTypes.func.isRequired,
  setSearchValue: PropTypes.func.isRequired,
  searchValue: PropTypes.string.isRequired,
  filterValue: PropTypes.string.isRequired,
};

export default ListFilters;
