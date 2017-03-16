import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchResults = { value: [] };
  searchString = "";
  airDateStart = new Date(1990, 0, 1);
  airDateEnd = new Date();
  jeopardy = true;
  doubleJeopardy = true;
  finalJeopardy = true;
  columns = [
    { name: "Show Number", prop: "ShowNumber" },
    { name: "Air Date", prop: "AirDate" },
    { name: "Round", prop: "Round" },
    { name: "Category", prop: "Category" },
    { name: "Value", prop: "Value" },
    { name: "Question", prop: "Question" },
    { name: "Answer", prop: "Answer" }

  ]

  constructor(private searchService: SearchService) {
    this.configureGridOptions();
  }

  ngOnInit() {
    this.getSearchResults();
  }

  getSearchResults(): void {
    this.searchService.getSearchResults(this.searchString, this.airDateStart, this.airDateEnd, this.jeopardy, this.doubleJeopardy, this.finalJeopardy).then(results => {
      this.searchResults = results;

    });
  }


  private configureGridOptions() {
    // this.gridOptions = {};
    // this.gridOptions.enableSorting = true;
    // this.gridOptions.enableColResize = true;
    // this.gridOptions.rowData = this.searchResults.value;
    // this.gridOptions.columnDefs = [
    //   {
    //     headerName: "Show Number",
    //     field: "ShowNumber",
    //     width: 100
    //   },
    //   {
    //     headerName: "Air Date",
    //     field: "AirDate",
    //     width: 100
    //   },
    //   {
    //     headerName: "Round",
    //     field: "Round",
    //     width: 100
    //   },
    //   {
    //     headerName: "Category",
    //     field: "Category",
    //     width: 100
    //   },
    //   {
    //     headerName: "Value",
    //     field: "Value",
    //     width: 50
    //   },
    //   {
    //     headerName: "Question",
    //     field: "Question",
    //     width: 450
    //   },
    //   {
    //     headerName: "Answer",
    //     field: "Answer",
    //     width: 200
    //   }
    // ];
  }
}
