# Generated by Django 4.1.5 on 2023-02-18 02:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("workspace", "0003_alter_workspace_hashed_value"),
    ]

    operations = [
        migrations.AlterField(
            model_name="workspace",
            name="hashed_value",
            field=models.CharField(db_index=True, max_length=10, unique=True),
        ),
    ]
