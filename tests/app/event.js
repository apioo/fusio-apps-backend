'use strict';

describe('Event tests', function() {

  it('List event', function() {
    browser.get('#!/event');

    var events = element.all(by.repeater('event in events'));
    expect(events.count()).toEqual(1);
    expect(events.get(0).getText()).toEqual('foo-event');
  });

  it('Create event', function() {
    browser.get('#!/event');

    var EC = protractor.ExpectedConditions;

    $('.fusio-btn-create').click();

    browser.wait(EC.visibilityOf($('div.modal-body')), 5000);

    element(by.model('event.name')).sendKeys('a-test-event');
    element(by.model('event.description')).sendKeys('Test event');

    $('button.btn-primary').click();

    browser.wait(EC.visibilityOf($('div.alert-success')), 5000);

    expect($('div.alert-success > div').getText()).toEqual('Event successful created');
  });

  it('Update event', function() {
    browser.get('#!/event');

    var EC = protractor.ExpectedConditions;

    $('.fusio-btn-update').click();

    browser.wait(EC.visibilityOf($('div.modal-body')), 5000);

    expect(element(by.model('event.name')).getAttribute('value')).toEqual('a-test-event');

    $('button.btn-primary').click();

    browser.wait(EC.visibilityOf($('div.alert-success')), 5000);

    expect($('div.alert-success > div').getText()).toEqual('Event successful updated');
  });

  it('Delete event', function() {
    browser.get('#!/event');

    var EC = protractor.ExpectedConditions;

    $('.fusio-btn-delete').click();

    browser.wait(EC.visibilityOf($('div.modal-body')), 5000);

    expect(element(by.model('event.name')).getAttribute('value')).toEqual('a-test-event');

    $('button.btn-primary').click();

    browser.wait(EC.visibilityOf($('div.alert-success')), 5000);

    expect($('div.alert-success > div').getText()).toEqual('Event successful deleted');
  });

});
