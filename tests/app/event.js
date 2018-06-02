'use strict';

describe('Event tests', function() {

  it('List event', function() {
    browser.get('#!/event');

    var routes = element.all(by.repeater('event in events'));
    expect(routes.count()).toEqual(5);
    expect(routes.get(0).getText()).toEqual('bar');
    expect(routes.get(1).getText()).toEqual('foo');
    expect(routes.get(2).getText()).toEqual('authorization');
    expect(routes.get(3).getText()).toEqual('consumer');
    expect(routes.get(4).getText()).toEqual('backend');
  });

  it('Create event', function() {
    browser.get('#!/event');

    var EC = protractor.ExpectedConditions;

    $('a.btn-primary').click();

    browser.wait(EC.visibilityOf($('div.modal-body')), 5000);

    element(by.model('event.name')).sendKeys('test-event');
    element(by.model('event.description')).sendKeys('Test event');

    $('button.btn-primary').click();

    browser.wait(EC.visibilityOf($('div.alert-success')), 5000);

    expect($('div.alert-success > div').getText()).toEqual('Event successful created');
  });

  it('Update event', function() {
    browser.get('#!/event');

    var EC = protractor.ExpectedConditions;

    element.all(by.css('div.fusio-options a:nth-child(1)')).first().click();

    browser.wait(EC.visibilityOf($('div.modal-body')), 5000);

    expect(element(by.model('event.name')).getAttribute('value')).toEqual('test-event');

    var routes = element.all(by.model('route.allowedMethods.get'));

    expect(routes.get(0).getAttribute('checked')).toBeTruthy();
    expect(routes.get(1).getAttribute('checked')).toBeTruthy();

    $('button.btn-primary').click();

    browser.wait(EC.visibilityOf($('div.alert-success')), 5000);

    expect($('div.alert-success > div').getText()).toEqual('Event successful updated');
  });

  it('Delete event', function() {
    browser.get('#!/event');

    var EC = protractor.ExpectedConditions;

    element.all(by.css('div.fusio-options a:nth-child(2)')).first().click();

    browser.wait(EC.visibilityOf($('div.modal-body')), 5000);

    expect(element(by.model('event.name')).getAttribute('value')).toEqual('test-event');

    $('button.btn-primary').click();

    browser.wait(EC.visibilityOf($('div.alert-success')), 5000);

    expect($('div.alert-success > div').getText()).toEqual('Event successful deleted');
  });

});
