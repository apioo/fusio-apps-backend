
## Worker-PHP

The Worker-PHP executes the provided PHP code at the remote worker. The following shows a simple example:

### Example

```php
<?php

return function($request, $context, $connector, $response, $dispatcher, $logger) {
    $connection = $connector->getConnection('my_db');
    
    $result = $connection->fetchAllAssociative('SELECT * FROM app_todo');
    
    return $response->build(200, [], [
        'foo' => 'bar',
        'result' => $result,
    ]);
};
```
