
## Worker-PHP

The Worker-PHP executes the provided PHP code at the remote worker. More
information about the worker at: https://github.com/apioo/fusio-worker-php

### Example

```php
<?php

use Fusio\Worker\Connector;
use Fusio\Worker\Dispatcher;
use Fusio\Worker\Generated\Context;
use Fusio\Worker\Generated\Request;
use Fusio\Worker\Logger;
use Fusio\Worker\ResponseBuilder;

return function(Request $request, Context $context, Connector $connector, ResponseBuilder $response, Dispatcher $dispatcher, Logger $logger) {
    $connection = $connector->getConnection('my_db');
    
    $result = $connection->fetchAllAssociative('SELECT * FROM app_todo');
    
    return $response->build(200, [], [
        'foo' => 'bar',
        'result' => $result,
    ]);
};
```
