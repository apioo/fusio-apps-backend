'use strict';

describe('Audit tests', function() {

  it('List audit', function() {
    browser.get('#/audit');

    var EC = protractor.ExpectedConditions;

    // set filter settings
    $('a.btn-primary').click();

    browser.wait(EC.visibilityOf($('div.modal-body')), 5000);

    element(by.model('filter.from')).clear().sendKeys('2015-06-01');
    element(by.model('filter.to')).clear().sendKeys('2015-06-30');

    $('button.btn-primary').click();

    var audits = element.all(by.repeater('audit in audits').column('audit.event'));
    expect(audits.count()).toEqual(1);
    expect(audits.get(0).getText()).toMatch('app.update');
  });

  it('Detail audit', function() {
    browser.get('#/audit');

    var EC = protractor.ExpectedConditions;

    // set filter settings
    $('a.btn-primary').click();

    browser.wait(EC.visibilityOf($('div.modal-body')), 5000);

    element(by.model('filter.from')).clear().sendKeys('2015-06-01');
    element(by.model('filter.to')).clear().sendKeys('2015-06-30');

    $('button.btn-primary').click();

    element.all(by.css('div.fusio-options > a')).get(0).click();

    browser.wait(EC.visibilityOf($('div.modal-body')), 5000);

    expect(element(by.model('audit.app.name')).getText()).toEqual('');
    expect(element(by.model('audit.user.name')).getText()).toEqual('');
    expect(element(by.model('audit.refId')).getText()).toEqual('');
    expect(element(by.model('audit.event')).getText()).toEqual('');
    expect(element(by.model('audit.ip')).getText()).toEqual('');
    expect(element(by.model('audit.message')).getText()).toEqual('');

    $('button.btn-default').click();
  });

});
