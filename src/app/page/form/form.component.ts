import { User } from './../../service/data-b.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataBService } from 'src/app/service/data-b.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  form= new FormGroup({
    name: new FormControl('',[Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
    apell: new FormControl('',[Validators.required, Validators.minLength(2)]),
    email: new FormControl('',[Validators.required, Validators.pattern('^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$')]),
    website: new FormControl('',[Validators.required]),
  });
  alert=false;
  mensaje='Usuario registrado con éxito'
  usuarios:User[]=[]
  mostrar=false
  constructor(private db:DataBService) { }
  consolear(){
    this.db.addUser(this.form.value as User)
    this.alert=true;

    setTimeout(() => {
      this.alert=false;
    }, 2000);
    
    this.form.reset()
  }

  ngOnInit(): void {
    this.db.getUsers().subscribe(res=>{
      console.log(res)
      if(res.length>=3){
        this.usuarios=res.slice(-3, res.length)
      }else this.usuarios=res
    })
  }

}
