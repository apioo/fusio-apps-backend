
## Category

A category allows you to divide your API into different sections. I.e. the
internal Fusio backend API has also many Actions and Schemas registered but you
dont see them if you login at the backend. This is because they are all
registered under the category "backend".

Every role is assigned to a specific category. A user can then only see and
create resources for this specific category. By default every user is assigned
to the "default" category.

This allows you also to split up your API development into different parts. I.e.
you could create a category "Reporting" and "Order" and every developer can
work independent on each category.
