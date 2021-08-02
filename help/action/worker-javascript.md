
## Worker-Javascript

The Worker-Java executes the provided Javascript code at the remote worker. More
information about the worker at: https://github.com/apioo/fusio-worker-javascript

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
