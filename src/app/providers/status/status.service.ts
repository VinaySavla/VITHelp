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
      baseURL: "http://65.2.142.67:3001/",
      timeout: 2 * 60 * 1000,
      headers: {},
    });
  }

  async raiseCase(data) {
    const headers = {
      "Content-Type":"Application/Json"
    }
    try {
      const res = await this.axiosInstance.post('/data/caseData/',data,{headers})
      .then(res=>console.log(res));
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
      const res = await this.axiosInstance.post('/data/statusData/',data,{headers})
      .then(res=>console.log(res));
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

  async updateUser(data, id) {
    const headers = {
      "Content-Type":"Application/Json"
    }
    try {
      const res = await this.axiosInstance.put(`/data/userData/${id}`,data,{headers})
      .then(res=>console.log(res));
    } catch(error) {
      console.log(error);
      
    }
  }

  async requestOtp(data) {
    const headers = {
      "Content-Type":"Application/Json"
    }
    try {
      const res = await this.axiosInstance.post('/data/phoneOtp/',data,{headers})
      .then(res=>console.log(res));
    } catch(error) {
      console.log(error);
      
    }
  }
  async verifyOtp(data,PhoneNumber) {
    const headers = {
      "Content-Type":"Application/Json"
    }
    try {
      const res = await this.axiosInstance.get(`/data/phoneOtp/${PhoneNumber}`,data)
      return res.data
    } catch(error) {
      console.log(error);
      
    }
  }
}
