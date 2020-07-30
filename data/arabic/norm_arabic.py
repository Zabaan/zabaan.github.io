import re


def normalization(input_str):
    """
    Normalize Arabic unicode characters
    """

    mapping = {
        # PERSIAN CHARACTERS TO ARABIC / -HARAKAT
        'ک': 'ك',
        'ی': 'ي',
        '[ࣰًࣱٌࣲٍَُِّْٰۡ]': '',
        # WESTERN DIGITS TO ARABIC
        '1': '١',
        '2': '٢',
        '3': '٣',
        '4': '٤',
        '5': '٥',
        '6': '٦',
        '7': '٧',
        '8': '٨',
        '9': '٩',
        '0': '٠',
        # PERSIAN TO ARABIC
        '۱': '١',
        '۲': '٢',
        '۳': '٣',
        '۴': '٤',
        '۵': '٥',
        '۶': '٦',
        '۷': '٧',
        '۸': '٨',
        '۹': '٩',
        '۰': '٠'
    }

    return _batch_replace(mapping, input_str)


def _batch_replace(mapping, text):
    """
    Internal function for replace all mapping keys for a input string
    """
    for k, v in mapping.items():
        text = re.sub(k, v, text)
    return text
