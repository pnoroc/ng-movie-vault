import { Component, input, output } from '@angular/core';

@Component({
  selector: 'mv-search-autocomplete',
  templateUrl: './search-autocomplete.component.html',
  styleUrls: ['./search-autocomplete.component.scss'],
})
export class SearchAutocompleteComponent {
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
