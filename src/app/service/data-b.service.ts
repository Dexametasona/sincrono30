import { Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { addDoc } from '@firebase/firestore';
import { Observable } from 'rxjs';

export interface User{
  id?:string
  name:string,
  apell:string,
  email:string,
  website:string
}
@Injectable({
  providedIn: 'root'
})
export class DataBService {

  constructor(private firestore:Firestore) { }

  addUser(newUser:User){
    const dataRef=collection(this.firestore, 'UserList')
    return addDoc(dataRef,newUser)
  }
  
  getUsers():Observable<User[]>{
    const dataref=collection(this.firestore, 'UserList')
    return collectionData(dataref, {idField:'id'}) as Observable<User[]> 
  }
  
  
}
