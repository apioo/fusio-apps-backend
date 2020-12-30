
## Schema

The schema defines the format of the request and response data. It uses the 
[TypeSchema] specification. The following example shows a simple object.

### Example

    {
      "definitions": {
        "Student": {
          "type": "object",
          "properties": {
            "firstName": {
              "type": "string"
            },
            "lastName": {
              "type": "string"
            },
            "age": {
              "type": "integer"
            }
          }
        }
      },
      "$ref": "Student"
    }


[TypeSchema]: https://typeschema.org/
