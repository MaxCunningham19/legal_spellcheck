# Generated by Django 4.1.5 on 2023-03-02 14:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_block_block_order'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='block',
            unique_together={('block_document', 'block_order')},
        ),
    ]