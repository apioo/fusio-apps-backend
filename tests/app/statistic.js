'use strict';

describe('Statistic tests', function() {

  it('List statistic', function() {
    browser.get('#!/statistic');

    var routes = element.all(by.options('statistic.value as statistic.name for statistic in statistics'));
    expect(routes.count()).toEqual(9);
    expect(routes.get(0).getText()).toEqual('Errors per route');
    expect(routes.get(1).getText()).toEqual('Incoming requests');
    expect(routes.get(2).getText()).toEqual('Incoming transactions');
    expect(routes.get(3).getText()).toEqual('Issued tokens');
    expect(routes.get(4).getText()).toEqual('Most used apps');
    expect(routes.get(5).getText()).toEqual('Most used routes');
    expect(routes.get(6).getText()).toEqual('Time average');
    expect(routes.get(7).getText()).toEqual('Time per route');
    expect(routes.get(8).getText()).toEqual('Used points');

    for (var i = 0; i <= 8; i++) {
      routes.get(i).click();
      browser.waitForAngular();
    }
  });

});
