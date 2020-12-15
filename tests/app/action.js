'use strict';

describe('Action tests', function() {

  it('List action', function() {
    browser.get('#!/action');

    var actions = element.all(by.repeater('row in actions'));
    expect(actions.count()).toEqual(4);
    expect(actions.get(0).getText()).toEqual('Inspect-Action');
    expect(actions.get(1).getText()).toEqual('Sql-Table');
    expect(actions.get(2).getText()).toEqual('Util-Static-Response');
    expect(actions.get(3).getText()).toEqual('Welcome');
  });

  it('Create action', function() {
    browser.get('#!/action');

    var EC = protractor.ExpectedConditions;

    $('.fusio-btn-create').click();

    browser.wait(EC.visibilityOf($('div.modal-body')), 5000);

    element(by.model('action.name')).sendKeys('test-action');

    var actionOptions = element.all(by.options('action.class as action.name for action in actions'));
    expect(actionOptions.get(0).getText()).toEqual('File-Processor');
    expect(actionOptions.get(1).getText()).toEqual('GraphQL-Processor');
    expect(actionOptions.get(2).getText()).toEqual('HTTP-Processor');
    expect(actionOptions.get(3).getText()).toEqual('PHP-Processor');
    expect(actionOptions.get(4).getText()).toEqual('PHP-Sandbox');
    expect(actionOptions.get(5).getText()).toEqual('SMTP-Send');
    expect(actionOptions.get(6).getText()).toEqual('SQL-Select-All');
    expect(actionOptions.get(7).getText()).toEqual('SQL-Select-Row');
    expect(actionOptions.get(8).getText()).toEqual('SQL-Insert');
    expect(actionOptions.get(9).getText()).toEqual('SQL-Update');
    expect(actionOptions.get(10).getText()).toEqual('SQL-Delete');
    expect(actionOptions.get(11).getText()).toEqual('SQL-Query-All');
    expect(actionOptions.get(12).getText()).toEqual('SQL-Query-Row');
    expect(actionOptions.get(13).getText()).toEqual('Util-Static-Response');
    expect(actionOptions.get(14).getText()).toEqual('Util-A/B-Test');
    expect(actionOptions.get(15).getText()).toEqual('Util-Cache');
    expect(actionOptions.get(16).getText()).toEqual('Util-JSON-Patch');

    actionOptions.get(13).click();

    browser.wait(EC.visibilityOf($('#config-statusCode')), 5000);
    browser.wait(EC.visibilityOf($('.ace_editor')), 5000);
    browser.actions().doubleClick($('div.ace_content')).perform();

    element(by.cssContainingText('#config-statusCode option', 'OK')).click();
    element(by.css('textarea.ace_text-input')).sendKeys('{"foo": "bar"}');

    $('button.btn-primary').click();

    browser.wait(EC.visibilityOf($('div.alert-success')), 5000);

    expect($('div.alert-success > div').getText()).toEqual('Action successful created');
  });

  it('Update action', function() {
    browser.get('#!/action');

    var EC = protractor.ExpectedConditions;

    $('.fusio-btn-update').click();

    browser.wait(EC.visibilityOf($('div.modal-body')), 5000);

    expect(element(by.model('action.name')).getAttribute('value')).toEqual('test-action');
    expect(element(by.model('action.class')).getAttribute('value')).toEqual('Fusio\\Adapter\\Util\\Action\\UtilStaticResponse');

    browser.wait(EC.visibilityOf($('#config-statusCode')), 5000);

    expect(element(by.model('config.statusCode')).getAttribute('value')).toEqual('200');

    $('button.btn-primary').click();

    browser.wait(EC.visibilityOf($('div.alert-success')), 5000);

    expect($('div.alert-success > div').getText()).toEqual('Action successful updated');
  });

  it('Delete action', function() {
    browser.get('#!/action');

    var EC = protractor.ExpectedConditions;

    $('.fusio-btn-delete').click();

    browser.wait(EC.visibilityOf($('div.modal-body')), 5000);

    expect(element(by.model('action.name')).getAttribute('value')).toEqual('test-action');

    $('button.btn-primary').click();

    browser.wait(EC.visibilityOf($('div.alert-success')), 5000);

    expect($('div.alert-success > div').getText()).toEqual('Action successful deleted');
  });

  it('Create action routes', function() {
    browser.get('#!/action');

    var EC = protractor.ExpectedConditions;

    $('.fusio-btn-create').click();

    browser.wait(EC.visibilityOf($('div.modal-body')), 5000);

    element(by.model('action.name')).sendKeys('app-action');

    var actionOptions = element.all(by.options('action.class as action.name for action in actions'));
    actionOptions.get(6).click();

    browser.wait(EC.visibilityOf($('#config-connection')), 5000);

    element(by.cssContainingText('#config-connection option', 'System')).click();
    element(by.css('#config-table')).sendKeys('app_news');

    $('button.btn-primary').click();

    browser.wait(EC.visibilityOf($('div.alert-success')), 5000);

    expect($('div.alert-success > div').getText()).toEqual('Action successful created');
  });

});
