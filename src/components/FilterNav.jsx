
export const FilterNav = ({mainState}) => {
   
   const storeCatagories = mainState.storeItems.filter((item) => {
     return item.category[0]
   })
   // console.log(storeCatagories);

  
   return (
      <>
      </>
   )
}