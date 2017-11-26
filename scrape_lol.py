"""
Scrapes loldb API and builds links and nodes for graph visualization

The visualization is a co-occurence graph of recommended items 

node format:
    nodes: [
        { id: <ITEM_NAME>, group: 0, count: <COUNT>}
    ]

* group will need to be added in by hand *

links format:
    links: [
        { source: <ITEM_NAME>, target: <ITEM_NAME>, value: <CO-OCCUR-COUNT> }
    ]
"""
import requests
import json
from itertools import combinations


API_HOST = 'http://loldbapi.appspot.com/api/'
REMOVED_ITEMS = ['Health Potion', 'Boot of Speed',
                 'Ruby Crystal', 'Sapphire Crystal']
#    'Health Potion', 'Ruby Crystal', 'Sapphire Crystal',
#    'Cloth Armor', 'Long Sword', 'Warding Totem (Trinket)',
#    'Corrupting Potion', "Doran's Ring", "Doran's Blade",
#    "Doran's Shield", 'Boots of Speed', "Sorcerer's Shoes",
#    'Ninja Tabi']

print('Getting champs...')
champs = json.loads(requests.get(API_HOST + 'champs').content)['result']
print('Getting items...')
items = json.loads(requests.get(API_HOST + 'items').content)['result']

print('Building item map...')
item_map = {
    i['id']: {
        'image': i['image'],
        'name': i['name']
    } for i in items if 'name' in i and d['name'] not in REMOVED_ITEMS
}

print('Building champion items map...')
champ_item_map = {}
item_count_map = {i['name']: 0 for i in item_map.values()}
for c in champs:
    final_items = []
    itm_names = set()
    for block in c['recommended'][0]['blocks']:
        for itm in filter(lambda x: x['id'] in item_map, block['items']):
            full_itm = item_map[itm['id']]
            if full_itm['name'] not in itm_names:
                final_items.append(full_itm)
                itm_names.add(full_itm['name'])
                item_count_map[full_itm['name']] += 1
    champ_item_map[c['name']] = final_items

nodes = [
    {
        'id': i['name'],
        'group': 0,
        'count': item_count_map[i['name']],
        'url': i['image']
    } for i in item_map.values()
]

print('Building links...')
# keep map to keep co-occurence count
links = {}
for champ_item_list in champ_item_map.values():
    for src, tgt in combinations(champ_item_list, 2):
        srcnm = src['name']
        tgtnm = tgt['name']
        key = '%s,%s' % (srcnm, tgtnm)
        if key in links:
            links[key]['value'] += 1
        else:
            links[key] = {'source': srcnm, 'target': tgtnm, 'value': 1}

# only want list of the actual links
links = list(links.values())

graph = {'nodes': nodes, 'links': links}

print('Dumping to file...')
with open('loldata.json', 'w') as f:
    f.write(json.dumps(graph))
