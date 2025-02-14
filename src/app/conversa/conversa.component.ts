import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-conversa',
  templateUrl: './conversa.component.html',
  styleUrls: ['./conversa.component.css']
})
export class ConversaComponent implements OnInit {
  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const tituloDoChatAcessado = params['titulo'];
      this.acessarChat(tituloDoChatAcessado)
      this.tituloChat = tituloDoChatAcessado
    });
  }

  tituloChat: string = "";
  mensagens: string[] = [];
  emissores: string[] = [];
  strPrompt: string = '';
  apiMessage: string = "";

  excluirMensagem(titulo:any, index:number){
    const formData = {
      token: localStorage.getItem("token"),
      titulo: titulo,
      indexDaPergunta: index
    };

    this.http.post<any>('http://127.0.0.1:5000/apagar-mensagem', formData).subscribe();
  }

  acessarChat(titulo: any) {
    const formData = {
      token: localStorage.getItem("token"),
      titulo: titulo
    };

    this.http.post<any>('http://127.0.0.1:5000/acessarChat', formData).subscribe(data => {
      if (data.message) {
        this.apiMessage = data.message;
        setTimeout(() => {
          this.apiMessage = '';
        }, 2000);
      }

      if (Array.isArray(data.mensagens) && Array.isArray(data.emissores)) {
        this.mensagens = data.mensagens;
        this.emissores = data.emissores;
      } else {
        this.mensagens = [];
        this.emissores = [];
      }

      if (this.mensagens.length === 0) {
        this.mensagens = [];
        this.emissores = [];
      }
    });
  }

  enviarMensagem() {
    if (this.strPrompt.trim() !== '') {

      const formData = {
        prompt: this.strPrompt,
        titulo: this.tituloChat,
        token: localStorage.getItem("token")
      };
      this.http.post<any>('http://127.0.0.1:5000/perguntar', formData).subscribe(data => {
        if (data.message) {
          this.apiMessage = data.message
        }
        if (data.mensagens && data.emissores) {
          this.mensagens = data.mensagens
          this.emissores = data.emissores
        }
      });

      this.strPrompt = ''; // Limpa o valor da mensagem escrita.
    }
  }
}
