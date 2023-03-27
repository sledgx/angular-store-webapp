import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]',
  exportAs: 'appDropdownRef'
})
export class DropdownDirective {
  private wasInside = false;

  @HostBinding('class.show') isOpen = false;

  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
    this.wasInside = true;
  }

  @HostListener('document:click') clickout() {
    if (!this.wasInside) {
      this.isOpen = false;
    }
    this.wasInside = false;
  }
}
