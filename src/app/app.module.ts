import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { ChatComponent } from './chat/chat.component';
import { ConversaComponent } from './conversa/conversa.component';
import { ListarFuncionariosComponent } from './listar-funcionarios/listar-funcionarios.component';
import { VerificacaoComponent } from './verificacao/verificacao.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HomeComponent,
    LoginComponent,
    DeleteUserComponent,
    ChatComponent,
    ConversaComponent,
    ListarFuncionariosComponent,
    VerificacaoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
