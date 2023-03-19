import './FilterNav.css';

export const FilterNav = ({ filterNav }) => {
  const navItems = ['All', 'Speed', 'Dirt', 'Water', 'Air', 'Extraordinary'];

  return (
    <>
      <div className="filterNav">
        <ul>
          <input placeholder='Search...' type="text" />
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
