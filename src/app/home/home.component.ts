import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  ver_funcionarios: boolean = false;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    // @ts-ignore
    this.verfuncionarios(localStorage.getItem("token"))
  }

  logout(){
    localStorage.clear()
  }

  verfuncionarios(token: string): void{
    const formData = {
      token: token,
      ver: true
    };
    this.http.post<any>('http://127.0.0.1:5000/registro', formData)
      .subscribe(
        data => {
          if (data.message) {
            alert("b")
            alert(data.message)
            this.ver_funcionarios = data.message;
          }
        },error => {
          this.ver_funcionarios = false;
        }
      );
    this.ver_funcionarios = false;
  }

  protected readonly localStorage = localStorage;
}
