#### DRF SImple jwt에서 error

`django.db.migrations.exceptions.InconsistentMigrationHistory: Migration admin.0001_initial is applied before its dependency user_custom.0001_initial on database 'default'.` 이라는 에러

이게 migration 에러인데, 원래 대로라면 `python manage.py makemigration user_custom` 을 한 후에 `python manage.py migrate` 를 하고 `python manage.py runserver` 를 하면 되는데, 에러가 난 것.

