import validator from "validator";

const checkCompany = (obj, setError) => {
	let checker = 0;
	const err = {
    username: false,
    password: false,
    region: false,
    ville: false,
    designation: false,
    email: false,
    phone: false,
	}
  
	Object.keys(obj).map((key) => {
    if (key === "email") {
      if (obj[key] && obj[key] !== '' && obj[key] !== ' ' && !validator.isEmail(obj[key])) {
        err[key] = true;
      }
    } else if (!obj[key]) {
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
  
const checkUpdateCompany = (obj, setError) => {
	let checker = 0;
	const err = {
    username: false,
    password: false,
    region: false,
    ville: false,
    designation: false,
    email: false,
    phone: false,
	}
  
	Object.keys(obj).map((key) => {
    if (key === "email") {
      if (obj[key] && obj[key] !== '' && obj[key] !== ' ' && !validator.isEmail(obj[key])) {
        err[key] = true;
      }
    } else if (!obj[key] && key !== "password" && key !== "phone") {
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
    checkCompany,
    checkUpdateCompany
  }