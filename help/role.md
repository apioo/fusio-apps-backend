
## Role

In general a role represents the role of a user and every user is assigned to
a specific role. If you create a new user the assigned scopes from the role are
copied to the user. This means also if you change the assigned scopes at the
role later on this has only an effect for new created user. To change the
assigned scopes for existing users you need to modify the user directly.

Besides the scopes every role has also an assigned category. A user sees and
creates only resources under this specific category. By default you can simply
use the "default" category.
