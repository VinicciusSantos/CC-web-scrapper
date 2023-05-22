/* eslint-disable @angular-eslint/directive-selector */
import {
    Directive,
    ElementRef,
    Output,
    EventEmitter,
    HostListener,
  } from '@angular/core';
  
  @Directive({
    selector: '[clickAway]',
  })
  export class ClickAwayDirective {
    @Output() clickAway = new EventEmitter();
  
    constructor(private elementRef: ElementRef) {}
  
    @HostListener('document:click', ['$event.target'])
    public onClick(targetElement: any): void {
      if (this.clickedInIgnoredElement(targetElement)) return;
      const clickedInside = this.elementRef.nativeElement.contains(targetElement);
      const isElementOpen =
        this.elementRef.nativeElement.classList.value.includes('appearing');
      if (!clickedInside && !isElementOpen) this.clickAway.emit(null);
    }
  
    private clickedInIgnoredElement(targetElement: any) {
      const ignoredTags = ['svg', 'path'];
      return !ignoredTags.every(e => {
        return e !== targetElement.nodeName;
      });
    }
  }