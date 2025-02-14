import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import {DeleteUserComponent} from "./delete-user/delete-user.component";
import {ChatComponent} from "./chat/chat.component";
import {ConversaComponent} from "./conversa/conversa.component";
import {ListarFuncionariosComponent} from "./listar-funcionarios/listar-funcionarios.component";
import {VerificacaoComponent} from "./verificacao/verificacao.component";

const routes: Routes = [
  { path: 'registro', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'deleteUser', component: DeleteUserComponent},
  { path: 'chats', component: ChatComponent},
  { path: 'conversa/:titulo', component: ConversaComponent},
  { path: 'funcionarios', component: ListarFuncionariosComponent},
  { path: 'zohoverify/verifyforzoho.html', component: VerificacaoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
