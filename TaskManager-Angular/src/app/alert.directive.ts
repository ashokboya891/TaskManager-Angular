import { Directive, ElementRef, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appAlert]'
})
export class AlertDirective {
  @Input("error") error: string | undefined ;
@HostBinding("title") title:string|undefined;
  constructor(private elementRef: ElementRef)
  {
  }

  ngOnInit() {
    this.elementRef.nativeElement.innerHTML = `
      <div class="alert alert-danger fade show" role="alert" style="transition: transform 0.5s">
        <span>${this.error}</span>
      </div>
    `;
    this.title="Please Try Again"  //when we place cursor anywhere it will show this as 
  }

  @HostListener("mouseenter", ["$event"])
  onMouseEnter(event: any) {
    this.elementRef.nativeElement.querySelector(".alert").style.transform = "scale(1.05)";
  }

  @HostListener("mouseleave", ["$event"])
  onMouseLeave() {
    this.elementRef.nativeElement.querySelector(".alert").style.transform = "scale(1)";
  }
}
