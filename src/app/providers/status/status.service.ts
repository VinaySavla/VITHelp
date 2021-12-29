import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      // baseURL: "http://localhost:3001/",
      baseURL: "http://3.6.32.110:3001/",
      timeout: 2 * 60 * 1000,
      headers: {},
    });
  }

  async raiseCase(data) {
    const headers = {
      "Content-Type":"Application/Json"
    }
    try {
      const res = await this.axiosInstance.post('/data/caseData/',data,{headers});
      return res.data;
    } catch(error) {
      console.log(error);
      
    }
  }

  async getStatus(id) {
    try {
      const res = await this.axiosInstance.get(`/data/statusData/${id}`);
      return res.data;
    } catch(error) {
      console.log(error);
      
    }
  }
  async getCases() {
    try {
      const res = await this.axiosInstance.get(`/data/caseData/`);
      return res.data;
    } catch(error) {
      console.log(error);
      
    }
  }
  async getCase(id) {
    try {
      const res = await this.axiosInstance.get(`/data/caseData/${id}`);
      return res.data;
    } catch(error) {
      console.log(error);
      
    }
  
  }
  async getUserCase(id) {
    try {
      const res = await this.axiosInstance.get(`/data/userCaseData/${id}`);
      return res.data;
    } catch(error) {
      console.log(error);
      
    }
  }

  async closeCase(id) {
    try {
      const res = await this.axiosInstance.put(`/data/caseData/${id}`);
      return res.data;
    } catch(error) {
      console.log(error);
      
    }
  }

  async sendStatus(data) {
    const headers = {
      "Content-Type":"Application/Json"
    }
    try {
      const res = await this.axiosInstance.post('/data/statusData/',data,{headers});
      return res.data;
    } catch(error) {
      console.log(error);
      
    }
  }
  async getUser(PhoneNumber) {
    try {
      const res = await this.axiosInstance.get(`/data/userData/${PhoneNumber}`);
      return res.data
    } catch(error) {
      console.log(error);
      
    }
  }
  async userData(data) {
    const headers = {
      "Content-Type":"Application/Json"
    }
    try {
      const res = await this.axiosInstance.post('/data/userData/',data,{headers});
      return res.data;
    } catch(error) {
      console.log(error);
      
    }
  }

  async history(userId) {
    try {
      const res = await this.axiosInstance.get(`/data/history/${userId}`);
      return res.data;
    } catch(error) {
      console.log(error);
    }
  }

  async notifications(userId) {
    try {
      const res = await this.axiosInstance.get(`/data/nearbyCases`,{
        params: {
          userID: userId
        }
        });
      return res.data;
    } catch(error) {
      console.log(error);
    }
  }

  async closedCases(userId) {
    try {
      const res = await this.axiosInstance.get(`/data/closedCase/${userId}`);
      return res.data;
    } catch(error) {
      console.log(error);
    }
  }

  async updateUser(data, id) {
    const headers = {
      "Content-Type":"Application/Json"
    }
    try {
      const res = await this.axiosInstance.put(`/data/userData/${id}`,data,{headers});
      return res.data;
    } catch(error) {
      console.log(error);
      
    }
  }

  async sendOtp(phoneNumber) {
    try {
      const res = await this.axiosInstance.get("/otp/send", {
        params: {
          phoneNumber: phoneNumber
        }
      });
      return res.data;
    } catch(error) {
      console.log(error);
    }
  }

  async resendOtp(phoneNumber) {
    try {
      const res = await this.axiosInstance.get("/otp/resend",{
        params: {
          phoneNumber: phoneNumber
        }
      });
      return res.data;
    } catch(error) {
      console.log(error);
      
    }
  }

  async verifyOtp(phoneNumber, otp) {
    try {
      const res = await this.axiosInstance.get("/otp/verify",{
        params: {
          phoneNumber: phoneNumber,
          otp: otp,
        }
      });
      return res.data;
    } catch(error) {
      console.log(error);
      
    }
  }
}
