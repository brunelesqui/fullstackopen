import Item from './Item.jsx'
import Country from './Country.jsx'

const List = ({list, handleClickShowButton}) => { 
	if (list.length == 1) {
		return (
			<Country 
				country={list[0]}
			/>
		)
	} else {
		return (
			<ul>
				{
					list.map((country, i)=>
						<Item 
							key={i} 
							countryname={country.name.common}
							handleClick={()=>handleClickShowButton(i)}
						/>
					)
				}
			</ul>
		)
	}
}

export default List