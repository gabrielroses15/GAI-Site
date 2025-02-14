import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent {
  apiMessage: string = '';

  constructor(private router: Router) {}

  confirmarExclusao() {
    const token = localStorage.getItem('token');

    if (token) {
      fetch('http://127.0.0.1:5000/deletarUsuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token }),
        mode: 'cors'
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Erro na requisição.');
          }
        })
        .then(data => {
          if (data.hasOwnProperty('message')) {
            this.apiMessage = data.message;
          } else {
            this.apiMessage = 'Usuário deletado com sucesso!';
          }
          localStorage.clear()
        })
        .catch(error => {
          console.error('Erro ao enviar os dados:', error.message);
          this.apiMessage = 'Erro ao processar a requisição. Tente novamente.';
        });
    } else {
      console.error('Token não encontrado.');
      this.apiMessage = 'Token não encontrado.';
    }
  }

  voltarPagina() {
    window.history.back();
  }
}
