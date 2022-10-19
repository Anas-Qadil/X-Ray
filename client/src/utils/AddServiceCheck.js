const checkAddService = (obj, setError) => {
	let checker = 0;
	const err = {
    name: false,
    equipment: false,
    examen: false,
    protocol: false,
    hospital: false,
	}
  
	Object.keys(obj).map((key) => {
	 if (!obj[key]) 
		err[key] = true;
	});
	setError(err);
	Object.keys(err).map((key) => {
	  if (err[key]) {
	  	checker = 1;
	  }
	});
	return (checker);
}

export default checkAddService;