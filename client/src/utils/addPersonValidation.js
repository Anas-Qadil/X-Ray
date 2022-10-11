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

  if (!validator.isEmail(personData.email)) 
    errorObject.email = true;
  if (validator.isEmpty(personData.poids)) 
    errorObject.poids = true;
  if (validator.isEmpty(personData.firstName)) 
    errorObject.firstName = true;
  if (validator.isEmpty(personData.lastName)) 
    errorObject.lastName = true;
  if (validator.isEmpty(personData.cin))
    errorObject.cin = true;
  if (validator.isEmpty(personData.username))
    errorObject.username = true;
  if (validator.isEmpty(personData.password))
    errorObject.password = true;
  if (validator.isEmpty(personData.gender))
    errorObject.gender = true;
  if (validator.isEmpty(personData.birthDate))
    errorObject.birthDate = true;
  if (!personData.age)
    errorObject.age = true;
  if (validator.isEmpty(personData.address))
    errorObject.address = true;
  if (validator.isEmpty(personData.phone))
    errorObject.phone = true;
  if (validator.isEmpty(personData.secteur))
    errorObject.secteur = true;
  if (validator.isEmpty(personData.fonction))
    errorObject.fonction = true;
  if (validator.isEmpty(personData.type))
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