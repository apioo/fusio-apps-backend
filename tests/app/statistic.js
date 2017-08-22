'use strict';

describe('Statistic tests', function() {

  it('List statistic', function() {
    browser.get('#/statistic');

    var routes = element.all(by.options('statistic.value as statistic.name for statistic in statistics'));
    expect(routes.count()).toEqual(7);
    expect(routes.get(0).getText()).toEqual('Incoming requests');
    expect(routes.get(1).getText()).toEqual('Most used routes');
    expect(routes.get(2).getText()).toEqual('Most used apps');
    expect(routes.get(3).getText()).toEqual('Errors per route');
    expect(routes.get(4).getText()).toEqual('Issued tokens');
    expect(routes.get(5).getText()).toEqual('Time average');
    expect(routes.get(6).getText()).toEqual('Time per route');

    for (var i = 0; i <= 6; i++) {
      routes.get(i).click();
      browser.waitForAngular();
    }
  });

});
