import { useState } from 'react';
import './FilterNav.css';

export const FilterNav = ({ filterNav, mainState, updateUserSearch, handleUserSearch }) => {

  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    updateUserSearch(e.target.value)
    handleUserSearch(e.target.value)
  };

  const navItems = ['All', 'Speed', 'Dirt', 'Water', 'Air', 'Extraordinary'];

  return (
    <>
      <div className="filterNav">
        <ul>
          <input
            placeholder="Search..."
            type="text"
            value={searchQuery}
            onChange={(e) => handleInputChange(e)}
          />
          {navItems.map((item, index) => (
            <li key={index}>
              {' '}
              <button value={item} onClick={() => filterNav(item)}>
                {item}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
