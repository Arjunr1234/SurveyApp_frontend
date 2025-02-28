import { axiosInstance } from "../api/axiosInstance";




export const signupService = async (name, email, phone, password) => {
      try {
          
          const response = await axiosInstance.post('/api/auth/signup', {name, email, phone, password});
          return response.data
        
      } catch (error) {
           console.log("Error :", error);
           throw error
      }
}

export const signInService = async (email, password) => {
     try {
          const response = await axiosInstance.post('/api/auth/signin', {email, password});
          return response.data;
        
     } catch (error) {
        console.log("Error in Service: ", error);
        throw error
     }
}

export const formService = async(data) => {
     try {
          console.log("Data; ", data)
          const response = await axiosInstance.post('/api/auth/submit', data);
          return response.data
     } catch (error) {
          console.log("Error in Service: ", error);
          throw error
     }
}

export const fetchFormDataService = async() => {
     try {
          const response = await axiosInstance.get('/api/auth/submissions');
          return response.data
          
     } catch (error) {
          console.log("Error in fetchFormData: ", error);
          throw error
     }
}

export const userLogoutService = async() => {
   try {
      const response = await axiosInstance.get('/api/auth/logout');
      response.data
     
   } catch (error) {
       console.log("userLogoutService: ", error);
       throw error
   }
}