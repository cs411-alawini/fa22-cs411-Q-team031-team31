def stringify(v):
    if v is None:
        return "null"
    elif isinstance(v, str):
        return f"'{v}'"
    elif isinstance(v, (int, float)):
        return str(v)
    else:
        raise Exception(f"Unexpected type: {type(v)}")
