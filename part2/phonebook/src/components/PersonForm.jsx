const PersonForm = ({submit, mameValue, nameHandleChange, numberValue, numberHandleChange}) => {
	return (
		<form onSubmit={submit}>
	        <div>
	          Name: 
	          <input 
	            value={mameValue}
	            onChange={nameHandleChange}
	          />
	          <br />
	          Number: 
	          <input 
	            value={numberValue}
	            onChange={numberHandleChange}
	          />
	        </div>
	        <div>
	          <button 
	            type="submit"
	          >
	            add
	          </button>
	        </div>
      	</form>
	)
}

export default PersonForm