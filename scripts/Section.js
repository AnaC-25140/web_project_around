export class Section{
    constructor({items,renderer}, selector){ //
        this.items=items;
        this._renderer=renderer;
        this.container=document.querySelector(selector);
    }
    renderer(){
        this.items.forEach((item) => this._renderer(item));
    }
    //el item es la carta y el renderer la funcion de añadir la carta
    addItem(element){
this.container.prepend(element);
    }
}