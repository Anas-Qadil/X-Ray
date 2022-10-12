const checkifEmpty = (obj, setError) => {
  let checker = 0;
  const err = {
    patient: false,
    person: false,
    service: false,
    dose: false,
  }

  Object.keys(obj).map((key) => {
    if (!obj[key]) {
      if (key === 'patient') {
        if (!obj["person"])
        {
          err[key] = true;
        }
      } else if (key === 'person') {
        if (!obj["patient"])
          err[key] = true;
      } else {
        err[key] = true;
      }
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

export default checkifEmpty;