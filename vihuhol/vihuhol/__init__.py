#!/usr/bin/env python3
import os
import json
import vk_api


MODULE_PATH = os.path.dirname(os.path.realpath(__file__)) + '/'


def open_rules():
    with open(MODULE_PATH + 'rules.json') as f:
        return json.load(f)


def apply_rules(text, rules):
    was_replaced = False
    for rule in rules:
        for key in rule['keys']:
            for i in range(256):
                index = text.find(key)
                if index != -1:
                    text = text[:index] + rule['replace_with'] + text[index + len(key):]
                    was_replaced = True
                else:
                    break
    return { 'was_replaced': was_replaced, 'text': text }


def test():
    service_key = ''
    permissions = vk_api.VkUserPermissions.OFFLINE | vk_api.VkUserPermissions.GROUPS | vk_api.VkUserPermissions.STATS
    vk_session = vk_api.VkApi(
        login='',
        password='',
        scope=permissions,
        app_id=6947738,
        api_version='5.95',
        client_secret=service_key)
    vk_session.auth(token_only=True)
    vk = vk_session.get_api()

    from_id = -33339790
    to_id = -95186485

    res = vk.wall.get(owner_id=from_id, count=1)
    print(res['items'][0]['text'])


if '__main__' == __name__:
    pass