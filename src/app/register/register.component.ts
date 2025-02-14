import {Component} from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent{
  errorMessage: string = '';
  successMessage: string = '';
  apiMessage: string = '';

  constructor(private http: HttpClient) { }

  onSubmit(form: NgForm) {
    const ccElement = document.getElementById('cc') as HTMLSelectElement | null;
    const cc = ccElement ? ccElement.value : null;

    const formData = {
      nome: form.value.name,
      cpf: form.value.cpf,
      cc: cc,
      admissao: form.value.admissao,
      token: localStorage.getItem("token")
    };

    this.http.post<any>('http://127.0.0.1:5000/registro', formData)
      .subscribe(
        data => {
          if (data.message) {
            this.apiMessage = data.message;
            this.successMessage = '';
            this.errorMessage = '';
          } else {
            this.successMessage = 'Requisição enviada com sucesso!';
            this.apiMessage = ''
            this.errorMessage = '';
          }
        },
        error => {
          console.error('Erro ao enviar os dados:', error);
          this.errorMessage = 'Erro ao processar a requisição. Tente novamente.';
          this.successMessage = '';
          this.apiMessage = ''
        }
      );
  }

}
