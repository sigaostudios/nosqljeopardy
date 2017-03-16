import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { SEARCH } from './MOCK_SEARCH';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SearchService {
  private searchKey: string = "E0F403E6B9C1174623A0E98D43D00052";
  private searchBaseUrl: string = "https://cs-sqlsaturday-search.search.windows.net/indexes/jeopardy/docs?api-version=2016-09-01";

  constructor(private http: Http) { }

  getSearchResults(searchString: string, airDateStart: Date, airDateEnd: Date, showJeopardy: boolean, showDoubleJeopardy: boolean, showFinalJeopardy: boolean): any {
    var searchUrl = this.buildSearchUrl(searchString, airDateStart, airDateEnd, showJeopardy, showDoubleJeopardy, showFinalJeopardy);
    let headers = new Headers();
    this.addAuthorizationHeader(headers);
    return this.http.get(searchUrl, {
      headers: headers
    })
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  private buildSearchUrl(searchString: string, airDateStart: Date, airDateEnd: Date, showJeopardy: boolean, showDoubleJeopardy: boolean, showFinalJeopardy: boolean): string {
    console.log(this.formatDate(airDateStart));
    
    var searchFilter = "&search=" + searchString + "&facet=Round&facet=Category";
    var airDateFilter = "AirDate ge " + this.formatDate(airDateStart) + " and AirDate le " + this.formatDate(airDateEnd);
    //add airDateFilter
    searchFilter = searchFilter + "&$filter=" + airDateFilter + " and ("+ this.formatRoundFilter(showJeopardy, showDoubleJeopardy, showFinalJeopardy) +")";
    console.log(this.searchBaseUrl + searchFilter);
    return this.searchBaseUrl + encodeURI(searchFilter);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
  private addAuthorizationHeader(headers: Headers) {
    headers.append('api-key', this.searchKey);
  }
  private formatDate(date: Date): string {
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var monthStr: string;
    var dayStr: string;

    if (month < 10)
      monthStr = "0" + month.toString();
    else
      monthStr = month.toString();

    if (day < 10)
      dayStr = "0" + day.toString();
    else
      dayStr = day.toString();

    return date.getFullYear().toString() + "-" + monthStr + "-" + dayStr + "T00:00:00-08:00";
  }
  private formatRoundFilter(showJeopardy: boolean, showDoubleJeopardy: boolean, showFinalJeopardy: boolean) {
    var roundFilter = "";
    if (showJeopardy)
      roundFilter = "Round eq 'Jeopardy!'";

    if (showDoubleJeopardy)
      if (showJeopardy)
        roundFilter = roundFilter + " or Round eq 'Double Jeopardy!'";
      else
        roundFilter = "Round eq 'Double Jeopardy!'";

    if (showFinalJeopardy)
      if(showJeopardy || showDoubleJeopardy)
        roundFilter = roundFilter + " or Round eq 'Final Jeopardy!'";
      else
        roundFilter = "Round eq 'Final Jeopardy!'";

    return roundFilter;
  }


}
