#!/usr/bin/env python3
import re
import json


print('.creates dictionary.')
raw = []
dic = []
with open('bible.txt', 'r', encoding='utf8') as f:
    for line_i, line in enumerate(f):
        if line_i % 500 == 0:
            print('  ' + str(line_i) + ' of ???')
        if line[0].isdigit():
            for i in range(len(line)):
                if not line[i].isdigit():
                    break;
            s = re.sub('[^0-9a-zA-Zа-яА-Я]+', ' ', line[i:]).lower().split(' ')
            s = list(filter(None, s))
            r = []
            for w in s:
                for i in range(len(dic)):
                    if w == dic[i]:
                        r.append(i)
                        break
                r.append(len(dic))
                dic.append(w)
            raw.append(r)

print('.creates chain.')
chain = [{ 'next': [], 'amount': 0 }] * len(dic)
begins_with = []
for line_i, line in enumerate(raw):
    if line_i % 500 == 0:
        print('  ' + str(line_i) + ' of ' + str(len(raw)))
    if not any(line[0] == e for e in begins_with):
        begins_with.append(line[0])
    for i, word in enumerate(line):
        next_index = line[i + 1] if i + 1 < len(line) else None
        found = False
        for e in chain[word]['next']:
            if e[0] == next_index:
                e[1] += 1
                found = True
                break
        if not found:
            chain[word]['next'].append([next_index, 1])
        chain[word]['amount'] += 1

print('.saves to file.')
j = { 'dictionary': dic, 'chain': chain, 'begins_with': begins_with }
with open('output.json', 'w') as f:
    json.dump(j, f)
