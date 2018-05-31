
## Event

Fusio contains an event system where it is possible to define events. Consumers
of the API can then subscribe to such events. Inside an action it is possible to
trigger such events which then sends an HTTP request to every subscribed consumer.
