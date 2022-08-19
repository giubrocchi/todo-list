import { Component, OnInit } from '@angular/core';
import { ListarService } from '../../services/listar.service';

type Todo = {
  status: string,
  titulo: string,
  desc: string
}

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  lista: Todo[] = [];
  todo: Todo[] = [];
  doing: Todo[] = [];
  done: Todo[] = [];
  erro: string = '';
  editar: boolean = false;
  editTit: string = '';
  editDesc: string = '';

  constructor(private servLista: ListarService) {
    this.atualizar();
  }

  ngOnInit(): void {
  }

  adicionar(tit: string, des: string): void{
    let retorno: number = this.servLista.adicionar("todo", tit, des);
    if(retorno == 0){
      this.erro = "erroAdicionar";
      return;
    }
    this.atualizar();
  }

  mudarStatus(id: string, status: string): void{
    let retorno: number = this.servLista.mudarStatus(id, status);
    if(retorno == 0){
      this.erro = "erroStatus";
      return;
    }
    this.atualizar();
  }

  edit(id: string, tit: string, des: string): void{
    let retorno: number = this.servLista.editar(id, tit, des);
    if(retorno == 0){
      this.erro = "erroEdit";
      return;
    }
    this.editar = false;
    this.atualizar();
  }

  habilitarEdit(titulo: string, desc: string): void{
    this.editTit = titulo;
    this.editDesc = desc;
    this.editar = true;
  }

  deletar(titulo: string): void{
    let retorno: number = this.servLista.excluir(titulo);
    if(retorno == 0){
      this.erro = "erroExc";
      return;
    }
    this.atualizar();
  }

  private atualizar(): void{
    this.lista = [];
    this.todo = [];
    this.doing = [];
    this.done = [];
    this.lista = this.servLista.getLista();
    for(let i: number = 0; i < this.lista.length; i++){
      if(this.lista[i].status == "todo")
        this.todo.push(this.lista[i]);
      else if(this.lista[i].status == "doing")
        this.doing.push(this.lista[i]);
      else
        this.done.push(this.lista[i]);
    }
  }

}
