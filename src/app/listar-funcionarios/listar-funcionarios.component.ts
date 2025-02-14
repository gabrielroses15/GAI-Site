import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: 'app-listar-funcionarios',
  templateUrl: './listar-funcionarios.component.html',
  styleUrls: ['./listar-funcionarios.component.css']
})
export class ListarFuncionariosComponent implements OnInit {
  tokenValid: boolean = false;
  funcionarios = [];

  constructor(private http: HttpClient, private router: Router) { }

  async ngOnInit(): Promise<void> {
    await this.validar_token();
    if (this.tokenValid){
      await this.listar_funcionarios();
      for (let i = 0; i < this.funcionarios.length; i++) {
        if (this.funcionarios[i][7] == localStorage.getItem("token")){
          this.funcionarios.splice(i, 1);
          break;
        }
      }
    }else{
      this.router.navigate(['/']);
    }
  }

  async validar_token(): Promise<void> {
    const formData = {
      token: localStorage.getItem("token")
    };
    try {
      const data = await this.http.post<any>('http://127.0.0.1:5000/verificar_token', formData).toPromise();
      if (!data.message) {
        this.router.navigate(['/']);
      } else {
        this.tokenValid = true;
      }
    } catch (error) {
      this.router.navigate(['/']);
    }
  }

  async listar_funcionarios(): Promise<void> {
    const formData = {
      token: localStorage.getItem("token")
    };
    try {
      const data = await this.http.post<any>('http://127.0.0.1:5000/listar_funcionarios', formData).toPromise();
      if (!data.message) {
        this.router.navigate(['/']);
      } else {
        this.funcionarios = data.message;
      }
    } catch (error) {
      this.router.navigate(['/']);
    }
  }

  resetarSenha(token: string) {
    alert(token);
  }

  removerFuncionario(token: string) {
    const formData = {
      token: token
    };
    this.http.post<any>('http://127.0.0.1:5000/deletarUsuario', formData).subscribe(
      async data => {
        if (data.message) {
          await this.listar_funcionarios();
          for (let i = 0; i < this.funcionarios.length; i++) {
            if (this.funcionarios[i][7] == localStorage.getItem("token")) {
              this.funcionarios.splice(i, 1);
              break;
            }
          }
        }
      },
      error => {
        this.router.navigate(['/']);
      }
    );
  }

  protected readonly console = console;
}
