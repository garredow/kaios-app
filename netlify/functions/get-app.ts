import { Handler } from '@netlify/functions';
import fetch from 'node-fetch';

const handler: Handler = async (event, context) => {
  return fetch(
    `https://marketingappsearch.kaiostech.com/v1.0/apps?query=${event.queryStringParameters?.bundleId}`,
    {
      headers: {
        accept: '*/*',
        'accept-language': 'en-US,en;q=0.9,la;q=0.8',
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="100", "Google Chrome";v="100"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'x-api-key': 'ePYFhjsJYp8DxtZFFqx1r88tRC96hSAv3MHvb9jv',
      },
      referrer: 'https://www.kaiostech.com/',
      referrerPolicy: 'strict-origin-when-cross-origin',
      body: null,
      method: 'GET',
    }
  )
    .then((response) => response.json())
    .then((data: any) => ({
      statusCode: 200,
      body: JSON.stringify(data.data[0]),
    }))
    .catch((error) => ({ statusCode: 422, body: String(error) }));
};

export { handler };
