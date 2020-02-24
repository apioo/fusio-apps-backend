'use strict';

describe('Subscription tests', function() {

  it('List subscription', function() {
    browser.get('#!/subscription');

    var events = element.all(by.repeater('subscription in subscriptions'));
    expect(events.count()).toEqual(2);
    expect(events.get(0).getText()).toEqual('http://www.fusio-project.org/ping');
    expect(events.get(1).getText()).toEqual('http://www.fusio-project.org/ping');
  });

  it('Create subscription', function() {
    browser.get('#!/subscription');

    var EC = protractor.ExpectedConditions;

    $('a.btn-primary').click();

    browser.wait(EC.visibilityOf($('div.modal-body')), 5000);

    var eventOptions = element.all(by.options('event.id as event.name for event in events'));
    eventOptions.get(1).click();

    var userOptions = element.all(by.options('user.id as user.name for user in users'));
    userOptions.get(1).click();

    element(by.model('subscription.endpoint')).sendKeys('http://localhost');

    $('button.btn-primary').click();

    browser.wait(EC.visibilityOf($('div.alert-success')), 5000);

    expect($('div.alert-success > div').getText()).toEqual('Subscription successful created');
  });

  it('Update subscription', function() {
    browser.get('#!/subscription');

    var EC = protractor.ExpectedConditions;

    element.all(by.css('div.fusio-options a:nth-child(1)')).first().click();

    browser.wait(EC.visibilityOf($('div.modal-body')), 5000);

    expect(element(by.model('subscription.endpoint')).getAttribute('value')).toEqual('http://localhost');

    $('button.btn-primary').click();

    browser.wait(EC.visibilityOf($('div.alert-success')), 5000);

    expect($('div.alert-success > div').getText()).toEqual('Subscription successful updated');
  });

  it('Delete subscription', function() {
    browser.get('#!/subscription');

    var EC = protractor.ExpectedConditions;

    element.all(by.css('div.fusio-options a:nth-child(2)')).first().click();

    browser.wait(EC.visibilityOf($('div.modal-body')), 5000);

    expect(element(by.model('subscription.endpoint')).getAttribute('value')).toEqual('http://localhost');

    $('button.btn-primary').click();

    browser.wait(EC.visibilityOf($('div.alert-success')), 5000);

    expect($('div.alert-success > div').getText()).toEqual('Subscription successful deleted');
  });

});
