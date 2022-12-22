from django.core.exceptions import ValidationError

ErrorMessage = 'It must not contain numbers or an underscore.'


def characters_validator(value):
    for element in value:
        if element.isdigit() and element == '_':
            raise ValidationError(ErrorMessage)
