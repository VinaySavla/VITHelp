import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor() { }

  async raiseCase(data) {
    const headers = {
      "Content-Type":"Application/Json"
    }
    try {
      const res = await axios.post('http://localhost:3001/data/caseData/',data,{headers})
      .then(res=>console.log(res));
    } catch(error) {
      console.log(error);
      
    }
  }

  async getStatus(id) {
    try {
      const res = await axios.get(`http://localhost:3001/data/statusData/${id}`);
      return res.data;
    } catch(error) {
      console.log(error);
      
    }
  }
  async getCases() {
    try {
      const res = await axios.get(`http://localhost:3001/data/caseData/`);
      return res.data;
    } catch(error) {
      console.log(error);
      
    }
  }
  async getCase(id) {
    try {
      const res = await axios.get(`http://localhost:3001/data/caseData/${id}`);
      return res.data;
    } catch(error) {
      console.log(error);
      
    }
  
  }
  async getUserCase(id) {
    try {
      const res = await axios.get(`http://localhost:3001/data/userCaseData/${id}`);
      return res.data;
    } catch(error) {
      console.log(error);
      
    }
  }

  async closeCase(id) {
    try {
      const res = await axios.put(`http://localhost:3001/data/caseData/${id}`);
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
      const res = await axios.post('http://localhost:3001/data/statusData/',data,{headers})
      .then(res=>console.log(res));
    } catch(error) {
      console.log(error);
      
    }
  }
  async getUser(PhoneNumber) {
    try {
      const res = await axios.get(`http://localhost:3001/data/userData/${PhoneNumber}`);
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
      const res = await axios.post('http://localhost:3001/data/userData/',data,{headers})
      .then(res=>console.log(res));
    } catch(error) {
      console.log(error);
      
    }
  }

  async updateUser(data, id) {
    const headers = {
      "Content-Type":"Application/Json"
    }
    try {
      const res = await axios.put(`http://localhost:3001/data/userData/${id}`,data,{headers})
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
      const res = await axios.post('http://localhost:3001/data/phoneOtp/',data,{headers})
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
      const res = await axios.get(`http://localhost:3001/data/phoneOtp/${PhoneNumber}`,data)
      return res.data
    } catch(error) {
      console.log(error);
      
    }
  }
}
