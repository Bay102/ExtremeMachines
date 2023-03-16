import './FilterNav.css'

export const FilterNav = () => {
   
const navItems = ['All', 'Speed','Dirt','Water', 'Air', 'Extraordinary'];

   return (
      <>
         <div className="filterNav">
            <ul>
            {navItems.map((item, index) => (
               <li key={index}>{item}</li>
            ))}
            </ul>
         </div>
      </>
   )
}