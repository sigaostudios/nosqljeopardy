import { NoSqlJeopardyClientPage } from './app.po';

describe('no-sql-jeopardy-client App', function() {
  let page: NoSqlJeopardyClientPage;

  beforeEach(() => {
    page = new NoSqlJeopardyClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
