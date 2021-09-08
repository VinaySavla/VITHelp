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

  async getStatus() {
    try {
      const res = await axios.get('http://localhost:3001/data/statusData/1');
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
  async authUser(Phno) {
    try {
      const res = await axios.get(`http://localhost:3001/data/userData/${Phno}`);
      return res.data.PhoneNumber
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
}
