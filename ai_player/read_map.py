import json

with open('../data/westeros.json') as json_data:
    d = json.load(json_data)
    print(d)