import {Component, output } from "@angular/core";

@Component({
  selector: "mv-search-autocomplete",
  templateUrl: "./search-autocomplete.component.html",
  styleUrls: ["./search-autocomplete.component.scss"]
})
export class SearchAutocompleteComponent {
  search = output<string>()

  searchQuery(searchInp: string = '') {
    this.search.emit(searchInp);
  }
}
