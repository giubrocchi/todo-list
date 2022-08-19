import { Injectable } from '@angular/core';

type Todo = {
  status: string,
  titulo: string,
  desc: string
}

@Injectable({
  providedIn: 'root'
})
export class ListarService {

  private todo: Todo[] = [
    {
      status: "todo",
      titulo: "Tarefa",
      desc: "Exercicio slide 10"
    },
    {
      status: "doing",
      titulo: "Casa",
      desc: "Limpar quarto"
    },
    {
      status: "doing",
      titulo: "Faculdade",
      desc: "Fazer protótipos"
    },
    {
      status: "done",
      titulo: "Organizar",
      desc: "Limpar a gaveta"
    }
  ];

  constructor() { }

  //0 não adicionou, 1 adicionou
  adicionar(stat: string, tit: string, des: string): number{
    for(let i: number = 0; i < this.todo.length; i++){
      if(this.todo[i].titulo == tit)
        return 0;
    }
    let add: Todo = {
      status: stat,
      titulo: tit,
      desc: des
    }

    this.todo.push(add);
    return 1;
  }

  //0 erro, 1 excluiu
  excluir(tit: string): number{
    for(let i: number = 0; i < this.todo.length; i++){
      if(this.todo[i].titulo == tit){
        this.todo.splice(i, 1);
        return 1;
      }
    }
    return 0;
  }

  //0 erro, 1 editou
  editar(id: string, tit: string, des: string): number{
    for(let i: number = 0; i < this.todo.length; i++){
      if(this.todo[i].titulo == id){
        this.todo[i].titulo = tit;
        this.todo[i].desc = des;
        return 1;
      }
    }
    return 0;
  }

  //0 erro, 1 editou
  mudarStatus(id: string, stat: string): number{
    for(let i: number = 0; i < this.todo.length; i++){
      if(this.todo[i].titulo == id){
        this.todo[i].status = stat;
        return 1;
      }
    }
    return 0;
  }

  getLista(): Todo[]{
    return this.todo;
  }
}
