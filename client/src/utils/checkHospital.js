import validator from "validator";

const checkHospital = (obj, setError) => {
	let checker = 0;
	const err = {
    username: false,
    password: false,
    name: false,
    region: false,
    ville: false,
    statut: false,
    designation: false,
    email: false,
    phone: false,
	}
  
	Object.keys(obj).map((key) => {
    if (key === "email") {
      if (obj[key] && obj[key] !== '' && obj[key] !== ' ' && !validator.isEmail(obj[key])) {
        err[key] = true;
      }
    }
		else if (!obj[key] && key !== "phone") {
			err[key] = true;
		}
	});
	setError(err);
	Object.keys(err).map((key) => {
	  if (err[key]) {
		checker = 1;
	  }
	});
	return (checker);
}

const checkUpdateHospital = (obj, setError) => {
	let checker = 0;
	const err = {
    username: false,
    name: false,
    region: false,
    ville: false,
    statut: false,
    designation: false,
    email: false,
	}
  
	Object.keys(obj).map((key) => {
    if (key === "email") {
      if (obj[key] && obj[key] !== '' && obj[key] !== ' ' && !validator.isEmail(obj[key])) {
        err[key] = true;
      }
    }
		else if (!obj[key] && key !== "phone" && key !== "password") {
			err[key] = true;
		}
	});
	setError(err);
	Object.keys(err).map((key) => {
	  if (err[key]) {
		checker = 1;
	  }
	});
	return (checker);
}
  
  export {
    checkHospital,
    checkUpdateHospital,
  };