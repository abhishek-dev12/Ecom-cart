import React, { useState } from 'react';
import Button from './Button';
import FilterSideNav from './FilterSideNav';

interface FilterProps {
  onApplyFilters: (filters: { price?: string; category?: string }) => void;
}

const Filter: React.FC<FilterProps> = ({ onApplyFilters }) => {
  const [showSideNav, setShowSideNav] = useState(false);

  const handleFilterClick = () => {
    setShowSideNav(true);
  };

  return (
    <div className='flex justify-between p-4'>
      <p>Filter</p>
      <div className='flex gap-4'>
        <Button BtnName={'Price'} onClick={handleFilterClick} />
        <Button BtnName={'Categories'} onClick={handleFilterClick} />
      </div>
      <FilterSideNav
        isOpen={showSideNav}
        onClose={() => setShowSideNav(false)}
        onApply={onApplyFilters}
      />
    </div>
  );
};

export default Filter;
