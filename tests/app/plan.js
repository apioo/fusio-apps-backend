'use strict';

describe('Plan tests', function() {

  it('List plan', function() {
    browser.get('#!/plan');

    var plans = element.all(by.repeater('plan in plans'));
    expect(plans.count()).toEqual(2);
    expect(plans.get(0).getText()).toEqual('Plan A $39.99 500 1 Month');
    expect(plans.get(1).getText()).toEqual('Plan B $49.99 1000');
  });

  it('Create plan', function() {
    browser.get('#!/plan');

    var EC = protractor.ExpectedConditions;

    $('a.btn-primary').click();

    browser.wait(EC.visibilityOf($('div.modal-body')), 5000);

    element(by.model('plan.name')).sendKeys('a-test-plan');
    element(by.model('plan.description')).sendKeys('Test plan');
    element(by.model('plan.price')).sendKeys('59.99');
    element(by.model('plan.points')).sendKeys('2000');

    $('button.btn-primary').click();

    browser.wait(EC.visibilityOf($('div.alert-success')), 5000);

    expect($('div.alert-success > div').getText()).toEqual('Plan successful created');
  });

  it('Update plan', function() {
    browser.get('#!/plan');

    var EC = protractor.ExpectedConditions;

    element.all(by.css('div.fusio-options a:nth-child(1)')).first().click();

    browser.wait(EC.visibilityOf($('div.modal-body')), 5000);

    expect(element(by.model('plan.name')).getAttribute('value')).toEqual('Test plan');

    $('button.btn-primary').click();

    browser.wait(EC.visibilityOf($('div.alert-success')), 5000);

    expect($('div.alert-success > div').getText()).toEqual('Plan successful updated');
  });

  it('Delete plan', function() {
    browser.get('#!/plan');

    var EC = protractor.ExpectedConditions;

    element.all(by.css('div.fusio-options a:nth-child(2)')).first().click();

    browser.wait(EC.visibilityOf($('div.modal-body')), 5000);

    expect(element(by.model('plan.name')).getAttribute('value')).toEqual('Test plan');

    $('button.btn-primary').click();

    browser.wait(EC.visibilityOf($('div.alert-success')), 5000);

    expect($('div.alert-success > div').getText()).toEqual('Plan successful deleted');
  });

});
