import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{
  apiMessage: string = '';
  userData: any[] = [];
  newMessage:boolean = false;
  conteudoConversa: any[] = [[], []];

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    const storedData = localStorage.getItem('userData');
    const token = localStorage.getItem('token');

    if (token !== "" && storedData) {
      this.userData = JSON.parse(storedData);

      if (Array.isArray(this.userData) && this.userData.length > 0) {
        this.newMessage = false;
      } else {
        this.newMessage = true;
      }
    } else {
      this.router.navigate(['/login']);
    }
  }


  deletarChat(titulo:string){
    const formData = {
      token: localStorage.getItem("token"),
      titulo: titulo
    };
    this.http.post<any>('http://127.0.0.1:5000/deletarChat', formData).subscribe(data => {
      if (data.message){
        this.apiMessage = data.message;
        if (data.message == "Chat deletado com sucesso!"){
          const index = this.userData.indexOf(titulo);
          if (index !== -1) {
            this.userData.splice(index, 1);
            localStorage.setItem("userData", JSON.stringify(this.userData));
          }
        }
        setTimeout(() => {
          this.apiMessage = '';
        }, 2000);
        // @ts-ignore
        let storedData = JSON.parse(localStorage.getItem("userData"));
        // @ts-ignore
        storedData = storedData.filter(chat => chat !== titulo);
        localStorage.setItem("userData", JSON.stringify(storedData));
        const index = this.userData.findIndex(chat => chat === titulo);
        if (index !== -1) {
          this.userData.splice(index, 1); // Remove o elemento do array
          localStorage.setItem("userData", JSON.stringify(this.userData)); // Atualiza o localStorage
        }
      }
      if (data.user_data){
        if (data.user_data.length === 0){
          this.newMessage = true;
          this.apiMessage = ""
        }
      }
    });
  }

  criarChat() {
    const formData = {
      token: localStorage.getItem("token")
    };
    this.http.post<any>('http://127.0.0.1:5000/criarChat', formData).subscribe(data => {
      this.apiMessage = data.message;
      setTimeout(() => {
        this.apiMessage = '';
      }, 2000);
      console.log(data)
      if (data.user_data){
        this.userData = data.user_data;
        localStorage.setItem("userData", JSON.stringify(data.user_data));
      }
      this.newMessage = false;
    });
  }

  alterarTitulo(tituloAtual: string, novoTitulo: any){
    const formData = {
      tokenDoChat: localStorage.getItem("token"),
      tituloAntigoDoChat: tituloAtual,
      novoTitulo: novoTitulo,
      token: localStorage.getItem("token")
    };

    this.http.post<any>('http://127.0.0.1:5000/alterarTitulo', formData).subscribe(data => {
      if (data[1]?.user_data){
        this.userData = data[1].user_data;
        localStorage.setItem("userData", data[1].user_data);
      }else{
        console.log(data)
        console.log(data.user_data)
        alert("CHEGADO OIA O CONSOLE")
      }
    });
  }

  protected readonly alert = alert;
  protected readonly prompt = prompt;
  protected readonly encodeURIComponent = encodeURIComponent;
}
