
## Worker-Javascript

The Worker-Javascript executes the provided Javascript code at the remote worker. The following shows a simple example:

### Example

```javascript
module.exports = function(request, context, connector, response, dispatcher, logger) {

  const connection = connector.getConnection('my_db');

  connection.query('SELECT * FROM app_todo', (err, result) => {
    response.build(200, {}, {
      foo: 'bar',
      result: result
    });
  });

};
```
