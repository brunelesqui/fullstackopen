const Item = ({countryname, handleClick}) => {
	return (
		<li>
			{countryname}
			<button
				onClick={handleClick}
			>
				Show
			</button>
		</li>
	)
}

export default Item