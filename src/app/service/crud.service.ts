import { Injectable } from '@angular/core';



import { HttpClient, HttpHeaders } from '@angular/common/http';



import { Observable } from 'rxjs';



@Injectable({



  providedIn: 'root'



})



export class CrudService {



  phnData: any;



  voluntData: any;



  distressData: any;



  constructor(public http: HttpClient) { }

  //add phone number



  public addPhnno(phnData) {



    return this.http.post('http://covithelp.16mb.com/phn_no.php', phnData).subscribe((res: Response) => {



    });



  }

  //add volunteer data



  public addVolunteer(voluntData) {



    return this.http.post('http://covithelp.16mb.com/volunteer.php', voluntData).subscribe((res: Response) => {



    });



  }  //add distressed data



  public addDistressed(distressData) {



    return this.http.post('http://covithelp.16mb.com/distressed.php', distressData).subscribe((res: Response) => {



    });



  }



}
