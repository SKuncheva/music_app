from django.core.exceptions import ValidationError

ERROR_NAME_MSG = 'The name must contain only letters'


def validate_name_contains_only_letters(value):
    for el in value:
        if not el.isalpha():
            raise ValidationError(ERROR_NAME_MSG)
