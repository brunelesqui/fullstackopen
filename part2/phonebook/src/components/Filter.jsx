const Filter = ({value, handleChange}) => {
	return (
		<form>
        	<div>
          		Filter shown with:
          		<input
            		value={value}
            		onChange={handleChange}
          		/>
        	</div>
     	</form>
	)
}

export default Filter