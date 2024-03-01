import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email:string =""
  password:string=""

  constructor(private toaster:ToastrService,private api:AdminService, private router:Router){
    
  }

  login(){
    // admin logic login

    if(this.email && this.password){
      // this.toaster.success("proceed to call api")
      this.api.getAdminDetails().subscribe({
        next:(res:any)=>{
          console.log(res);
          const {email,password}=res
          if(email == this.email && password == this.password){
            this.toaster.success("Login Successfull")
            sessionStorage.setItem("adminDetails",JSON.stringify(res))
            this.email =""
            this.password =""
            // nvigate
          this.router.navigateByUrl("/dashboard")

          }else{
            this.toaster.error("Invalid Email/Password");
          }
          
        },
        error:(reason:any)=>{
          this.toaster.error(reason.message);
        }
      })

    }else{
      this.toaster.info("form fill chey first")
    }

  }

}
