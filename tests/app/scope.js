'use strict';

describe('Scope tests', function() {

  it('List scope', function() {
    browser.get('#!/scope');

    var routes = element.all(by.repeater('scope in scopes'));
    expect(routes.count()).toEqual(3);
    expect(routes.get(0).getText()).toEqual('bar');
    expect(routes.get(1).getText()).toEqual('foo');
    expect(routes.get(2).getText()).toEqual('default');
  });

  it('Create scope', function() {
    browser.get('#!/scope');

    var EC = protractor.ExpectedConditions;

    $('.fusio-btn-create').click();

    browser.wait(EC.visibilityOf($('div.modal-body')), 5000);

    element(by.model('scope.name')).sendKeys('test-scope');
    element(by.model('scope.description')).sendKeys('Test scope');
    element.all(by.model('route.allowedMethods.get')).click();

    $('button.btn-primary').click();

    browser.wait(EC.visibilityOf($('div.alert-success')), 5000);

    expect($('div.alert-success > div').getText()).toEqual('Scope successful created');
  });

  it('Update scope', function() {
    browser.get('#!/scope');

    var EC = protractor.ExpectedConditions;

    $('.fusio-btn-update').click();

    browser.wait(EC.visibilityOf($('div.modal-body')), 5000);

    expect(element(by.model('scope.name')).getAttribute('value')).toEqual('test-scope');

    var routes = element.all(by.model('route.allowedMethods.get'));

    expect(routes.get(0).getAttribute('checked')).toBeTruthy();
    expect(routes.get(1).getAttribute('checked')).toBeTruthy();

    $('button.btn-primary').click();

    browser.wait(EC.visibilityOf($('div.alert-success')), 5000);

    expect($('div.alert-success > div').getText()).toEqual('Scope successful updated');
  });

  it('Delete scope', function() {
    browser.get('#!/scope');

    var EC = protractor.ExpectedConditions;

    $('.fusio-btn-delete').click();

    browser.wait(EC.visibilityOf($('div.modal-body')), 5000);

    expect(element(by.model('scope.name')).getAttribute('value')).toEqual('test-scope');

    $('button.btn-primary').click();

    browser.wait(EC.visibilityOf($('div.alert-success')), 5000);

    expect($('div.alert-success > div').getText()).toEqual('Scope successful deleted');
  });

});
