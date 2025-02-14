import {Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  errorMessage: string = '';
  successMessage: string = '';
  apiMessage: string = '';
  userData: any[] = [];

  ngOnInit() {
    if (localStorage.getItem("userData") != null) {
      // @ts-ignore
      this.userData = JSON.parse(localStorage.getItem("userData"));
    }
  }

  constructor(private http: HttpClient, private router: Router) { }

  onSubmit(form: NgForm) {
    const ccElement = document.getElementById('cc') as HTMLSelectElement | null;
    const cc = ccElement ? ccElement.value : null;

    const formData = {
      nome: form.value.name,
      cpf: form.value.cpf,
      cc: cc,
      token: localStorage.getItem("token"),
      login: form.value.login,
      senha: form.value.senha
    };

    this.http.post<any>('http://127.0.0.1:5000/login', formData)
      .subscribe(
        data => {
          if (data.message) {
            if (data.message == "Dados não encontrados."){
              localStorage.setItem("userData", "[]")
              this.router.navigate(['/'])
            }else{
              this.apiMessage = data.message;
              setTimeout(() => {
                this.apiMessage = '';
              }, 2000);
            }
          }
          if (data.user_data) {
            this.userData = data.user_data;
            localStorage.setItem("userData", JSON.stringify(data.user_data));
            this.router.navigate(['/'])
          }
          if (data.user_token){
            localStorage.setItem("token", data.user_token)
            this.router.navigate(['/'])
          }
        },
        error => {
          this.errorMessage = 'Erro ao processar a requisição. Tente novamente.';
          setTimeout(() => {
            this.errorMessage = '';
          }, 2000);
        }
      );
  }

  protected readonly alert = alert;
  protected readonly localStorage = localStorage;
}
