import { useState } from 'react';
import logo from '../images/IMG_3589.PNG';
import './FilterNav.css';

export const FilterNav = ({
  filterNavCategory,
  mainState,
  updateUserSearch,
  handleUserSearch,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    updateUserSearch(e.target.value);
    handleUserSearch(e.target.value);
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
              <button value={item} onClick={() => filterNavCategory(item)}>
                {item}
              </button>
            </li>
          ))}
        </ul>
        {/* <img src={logo}  width='125px' alt="" /> */}
      </div>
    </>
  );
};
