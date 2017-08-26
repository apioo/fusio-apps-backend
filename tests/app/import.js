'use strict';

describe('Import tests', function() {

  it('List import', function() {
    browser.get('#!/import');

    var EC = protractor.ExpectedConditions;
    var openapi = JSON.stringify(getOpenAPI());

    element(by.css('textarea.ace_text-input')).sendKeys(openapi);

    $('a.btn-primary').click();

    browser.wait(EC.visibilityOf($('div.modal-body')), 50000);

    var routes = element.all(by.repeater('route in data.routes'));
    expect(routes.count()).toEqual(2);
    expect(routes.get(0).getText()).toEqual('/pets');
    expect(routes.get(1).getText()).toEqual('/pets/:petId');

    var schemas = element.all(by.repeater('schem in data.schema'));
    expect(schemas.count()).toEqual(3);
    expect(schemas.get(0).getText()).toEqual('pets-listPets-GET-query');
    expect(schemas.get(1).getText()).toEqual('pets-listPets-GET-200-response');
    expect(schemas.get(2).getText()).toEqual('pets-_petId_-showPetById-GET-200-response');

    // click route details
    /*
    routes.get(0).$('a').click();

    var modal = $('div.modal-body').all().get(1);

    browser.wait(EC.visibilityOf(modal), 5000);

    expect(element(by.model('route.path')).getAttribute('value')).toEqual('/bar/foo');

    expect(element.all(by.model('method.active')).get(0).getAttribute('value')).toEqual('on');
    expect(element.all(by.model('method.public')).get(0).getAttribute('value')).toEqual('on');
    expect(element.all(by.model('method.response')).get(0).getAttribute('value')).toEqual('${schema.bar-foo-GET-response}');
    expect(element.all(by.model('method.action')).get(0).getAttribute('value')).toEqual('${action.Welcome}');

    var tabs = element.all(by.repeater('method in version.methods'));
    tabs.get(1).click();

    expect(element.all(by.model('method.active')).get(1).getAttribute('value')).toEqual('on');
    expect(element.all(by.model('method.public')).get(1).getAttribute('value')).toEqual('on');
    expect(element.all(by.model('method.request')).get(1).getAttribute('value')).toEqual('${schema.bar-foo-POST-request}');
    expect(element.all(by.model('method.response')).get(1).getAttribute('value')).toEqual('${schema.Passthru}');
    expect(element.all(by.model('method.action')).get(1).getAttribute('value')).toEqual('${action.Welcome}');

    // close
    modal.$('button').click();

    // click schema details
    schemas.get(0).$('a').click();

    var modal = $('div.modal-body').all().get(1);

    browser.wait(EC.visibilityOf(modal), 5000);

    expect(element(by.model('schema.name')).getAttribute('value')).toEqual('bar-foo-GET-response');

    // close
    modal.$('button').click();
    */

    // import data
    $('button.btn-primary').click();

    browser.wait(EC.visibilityOf($('div.alert-success')), 5000);

    expect($('div.alert-success > div').getText()).toEqual('You have successfully imported the provided data');

  });

  function getOpenAPI() {
    return {
      "openapi": "3.0.0",
      "info": {
        "version": "1.0.0",
        "title": "Swagger Petstore",
        "license": {
          "name": "MIT"
        }
      },
      "servers": [
        {
          "url": "http://petstore.swagger.io/v1"
        }
      ],
      "paths": {
        "/pets": {
          "get": {
            "summary": "List all pets",
            "operationId": "listPets",
            "tags": [
              "pets"
            ],
            "parameters": [
              {
                "name": "limit",
                "in": "query",
                "description": "How many items to return at one time (max 100)",
                "required": false,
                "schema": {
                  "type": "integer",
                  "format": "int32"
                }
              }
            ],
            "responses": {
              "200": {
                "description": "An paged array of pets",
                "headers": {
                  "x-next": {
                    "description": "A link to the next page of responses",
                    "schema": {
                      "type": "string"
                    }
                  }
                },
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/Pets"
                    }
                  }
                }
              },
              "default": {
                "description": "unexpected error",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/Error"
                    }
                  }
                }
              }
            }
          },
          "post": {
            "summary": "Create a pet",
            "operationId": "createPets",
            "tags": [
              "pets"
            ],
            "responses": {
              "201": {
                "description": "Null response"
              },
              "default": {
                "description": "unexpected error",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/Error"
                    }
                  }
                }
              }
            }
          }
        },
        "/pets/{petId}": {
          "get": {
            "summary": "Info for a specific pet",
            "operationId": "showPetById",
            "tags": [
              "pets"
            ],
            "parameters": [
              {
                "name": "petId",
                "in": "path",
                "required": true,
                "description": "The id of the pet to retrieve",
                "schema": {
                  "type": "string"
                }
              }
            ],
            "responses": {
              "200": {
                "description": "Expected response to a valid request",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/Pets"
                    }
                  }
                }
              },
              "default": {
                "description": "unexpected error",
                "content": {
                  "application/json": {
                    "schema": {
                      "$ref": "#/components/schemas/Error"
                    }
                  }
                }
              }
            }
          }
        }
      },
      "components": {
        "schemas": {
          "Pet": {
            "required": [
              "id",
              "name"
            ],
            "properties": {
              "id": {
                "type": "integer",
                "format": "int64"
              },
              "name": {
                "type": "string"
              },
              "tag": {
                "type": "string"
              }
            }
          },
          "Pets": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/Pet"
            }
          },
          "Error": {
            "required": [
              "code",
              "message"
            ],
            "properties": {
              "code": {
                "type": "integer",
                "format": "int32"
              },
              "message": {
                "type": "string"
              }
            }
          }
        }
      }
    }
  }

});
