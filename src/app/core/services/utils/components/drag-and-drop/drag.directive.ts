import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[libDrag]'
})
export class DragDirective {

  @HostBinding("style.background") private background = "#eee";

  constructor() { }

  @HostListener("dragover", ["$event"])
  public onDragOver(event: DragEvent){
    event.preventDefault();
    event.stopPropagation();
    this.background = "#999";
  }

  @HostListener("dragleave",["$event"])
  public onDragLeave(event:DragEvent){
    event.preventDefault();
    event.stopPropagation();
    this.background = "#eee";
  }

  @HostListener("drop",["$event"])
  public onDrop(event:DragEvent){
    event.preventDefault();
    event.stopPropagation();
    this.background = "#eee";


  }

}
