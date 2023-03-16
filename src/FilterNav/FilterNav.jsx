import './FilterNav.css';

export const FilterNav = ({filterNav}) => {
  const navItems = ['All', 'Speed', 'Dirt', 'Water', 'Air', 'Extraordinary'];

   // const filterNav = (value) => {
   //    const filteredItems = mainState.storeItems.filter((items) => {
   //       return items.category[0].name === value
   //    })
      
   // }

  return (
    <>
      <div className="filterNav">
        <ul>
          {navItems.map((item, index) => (
            <li key={index}>
              {' '}
              <button value={item} onClick={() => filterNav(item)}>{item}</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
