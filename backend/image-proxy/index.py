import urllib.request
import base64
import json


def handler(event: dict, context) -> dict:
    """Прокси для загрузки картинок с CDN в base64 (обход CORS)."""
    cors = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    }

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors, 'body': ''}

    params = event.get('queryStringParameters') or {}
    url = params.get('url', '')

    if not url or not url.startswith('https://cdn.poehali.dev/'):
        return {'statusCode': 400, 'headers': cors, 'body': json.dumps({'error': 'invalid url'})}

    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=15) as resp:
        data = resp.read()
        b64 = base64.b64encode(data).decode('utf-8')

    return {
        'statusCode': 200,
        'headers': {**cors, 'Content-Type': 'application/json'},
        'body': json.dumps({'b64': b64}),
    }
