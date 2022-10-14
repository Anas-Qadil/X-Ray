import validator from 'validator';

const validatePersonData = (personData, error, setError) => {
  const errorObject = {
    username: false,
    password: false,
    firstName: false,
    lastName: false,
    cin: false,
    gender: false,
    birthDate: false,
    age: false,
    address: false,
    phone: false,
    email: false,
    secteur: false,
    fonction: false,
    type: false,
    company: false,
    hospital: false,
    poids: false,
  }

  if (personData.email) {
    if (!validator.isEmail(personData.email)) 
      errorObject.email = true;
  }
  if (!personData.poids) 
    errorObject.poids = true;
  if (!personData.firstName) 
    errorObject.firstName = true;
  if (!personData.lastName) 
    errorObject.lastName = true;
  if (!personData.cin)
    errorObject.cin = true;
  if (!personData.username)
    errorObject.username = true;
  if (!personData.password)
    errorObject.password = true;
  if (!personData.gender)
    errorObject.gender = true;
  if (!personData.birthDate)
    errorObject.birthDate = true;
  else {
    const age = new Date().getFullYear() - new Date(personData.birthDate).getFullYear();
    if (age < 1)
      errorObject.birthDate = true;
  }
  if (!personData.age)
    errorObject.age = true;
  if (!personData.address)
    errorObject.address = true;
  if (!personData.phone)
    errorObject.phone = true;
  if (!personData.secteur)
    errorObject.secteur = true;
  if (!personData.fonction)
    errorObject.fonction = true;
  if (!personData.type)
    errorObject.type = true;
  if (personData.type === "technical" && ( !personData.company || validator.isEmpty(personData.company) ))
    errorObject.company = true;
  if (personData.type === "medical" && ( !personData.hospital ||  validator.isEmpty(personData.hospital)))
    errorObject.hospital = true;
  setError(errorObject);
  let checker = 1;
  for (let key in errorObject) {
    if (errorObject[key] === true) {
      console.log(errorObject[key]);
      checker = 0;
      break;
    }
  }
  return checker;
}

export default validatePersonData;