import { Component, input, output } from '@angular/core';

let nextId = 0;

@Component({
  selector: 'mv-search-field',
  templateUrl: './search-field.component.html',
})
export class SearchFieldComponent {
  /** Unique per instance, so several search fields never share an id. */
  protected readonly inputId = `mv-search-field-${nextId++}`;

  /** Current search term, so the field shows it again when the page is re-created. */
  query = input('');

  /** Fired on "Search" click or Enter. */
  submitted = output<string>();

  /** Fired when the field becomes empty (text deleted or native clear button). */
  cleared = output<void>();

  submit(value: string): void {
    this.submitted.emit(value);
  }

  onInput(value: string): void {
    if (!value.trim()) {
      this.cleared.emit();
    }
  }
}
