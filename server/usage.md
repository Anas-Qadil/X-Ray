# How to use this api

# -------------------------- Company/societe routes --------------------------
	#Route: [POST] /api/sign-up/company
      #requirement
        Nothing for now
      #Expected Data:
        {
          region,          // required
          ville,           // required
          designation,     // required
          phone,           // required
          email,
          company,         // required | this is company id who creted the person           
        }
      #Received Data
      {
        data: {
          user,            // userinfo
          company          // company/societe info
        }
      }

  # Route: [GET] /api/get-current-company
        #requirement
          - user should be logged in 
          - user role should be company
        #Expected Data:
          nothing
        #Received Data
          {
            data,          // company data
          }

  # Route: [GET] /api/company/get-services
        #requirement
          - user should be logged in 
          - user role should be company
        #Expected Data:
          nothing
        #Received Data
          {
            data,          // all services
          }

  # Route: [GET] /api/company/get-doses
        #requirement
          - user should be logged in 
          - user role should be company
        #Expected Data:
          nothing
        #Received Data
          {
            data,          // all doses which are services
          }
    
  # Route: [GET] /api/company/:id/persons
        # Requirement
          - user should be logged in 
          - user role should be company
        #Expected Data:
          company Id
        #Received Data
          {
            data,          // all persons working for company Id
          }

  # Route: [GET] /api/company/:id/persons/:id
        # Requirement
          - user should be logged in 
          - user role should be company
        #Expected Data:
          company Id
          person Id
        #Received Data
          {
            data,          // person data who work work for company Id
          }

  # Route: [DELETE] /api/person/:username
        #requirement
          - user should be logged in 
          - user role should be company
        #Expected Data:
          person username
        #Received Data
          nothing
  
  # Route: [POST] /api/filter/patient
        #requirement
          - user should be logged in 
          - user role should be company or hospital
        #Expected Data:
          {
            filter          // filter is an object contains which filed u want to filter with #see model patient to see patient filed and the name of the filter data should match name of field in model
          }
        #Received Data
          {
            data            // filtred data
          }

  # Route: [POST] /api/filter/service
        #requirement
          - user should be logged in 
          - user role should be company or hospital
        #Expected Data:
          {
            filter          // filter is an object contains which field u want to filter with #see model service to see service fields and the name of the filter data should match name of field in model
          }
        #Received Data
          {
            data            // filtred data
          }

  # Route: [POST] /api/filter/person
        #requirement
          - user should be logged in 
          - user role should be company or hospital
        #Expected Data:
          {
            filter          // filter is an object contains which field u want to filter with #see model person to see person fields and the name of the filter data should match name of field in model
          }
        #Received Data
          {
            data            // filtred data
          }

  # Route: [POST] /api/filter/hospital
        #requirement
          - user should be logged in 
          - user role should be company or hospital
        #Expected Data:
          {
            filter          // filter is an object contains which field u want to filter with #see model hospital to see hospital fields and the name of the filter data should match name of field in model
          }
        #Received Data
          {
            data            // filtred data
          }

# -------------------------- hospital routes --------------------------
  # Route: [GET] /api/get-all-hospitals
        #requirement
          - user should be logged in 
          - user role should be hospital
        #Expected Data:
          nothing
        #Received Data
          {
            data            // all hospital data
          }

  # Route: [GET] /api/hospital/:id/services
        #requirement
          - user should be logged in 
          - user role should be hospital
        #Expected Data:
          {
            id      // hospital id as params
          }
        #Received Data
          {
            data            // all services this hospital has done
          }

  # Route: [GET] /api/hospital/:id/doses
        #requirement
          - user should be logged in 
          - user role should be hospital
        #Expected Data:
          {
            id     // hospital id as params
          }
        #Received Data
          {
            data            // all doses this hospital has done
          }

  # Route: [GET] /api/hospital/:id/patients
        #requirement
          - user should be logged in 
          - user role should be hospital
        #Expected Data:
          {
            id     // hospital id as params
          }
        #Received Data
          {
            data            // all patients this hospital has done
          }

  # Route: [GET] /api/get-hospital/:id
        #requirement
          - user should be logged in 
          - user role should be hospital
        #Expected Data:
          {
            id            // hospital id as params
          }
        #Received Data
          {
            data            // data of hospital id
          }

# -------------------------- authentication routes --------------------------
  # Route: [GET] /api/login
        #requirement
          nothing
        #Expected Data:
          {
            username,
            password
          }
        #Received Data
          {
            token            
            user
          }