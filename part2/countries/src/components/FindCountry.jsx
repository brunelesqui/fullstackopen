const FindCountry = ({submit, countryName, handleCountryNameChange}) => {
	return (
		<form onSubmit={submit}>
			<div>
				Country name:
				<input
					value={countryName}
					onChange={handleCountryNameChange}
				/>
			</div>
		</form>
	)
}

export default FindCountry