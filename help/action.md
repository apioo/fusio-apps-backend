
## Action

The action contains the logic to handle the request and produce a response. Each
action is based on a class and can have specific parameters. Fusio contains 
already some actions for common tasks i.e. to execute database operations or 
push data to a message queue.

### Async

It is possible to execute an action in async mode which means that the action
directly returns a 202 accepted response and the request gets executed later on
at the background. To enable the async feature you need to setup a cronjob,
please take a look at the cronjob section for installation instructions.

### Development

To develop a custom action you need to create a class which implements the
interface `Fusio\Engine\ActionInterface`. Then you can add this class to the
`provider.php` file. Thus it is possible to select this action at the backend.
Please take a look at the `src/` folder for more examples.
