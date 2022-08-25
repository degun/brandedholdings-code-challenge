// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // const { lat, lon, part } = req.query;
    const data = await fetch(`https://api.weatherapi.com/v1/current.json?key=4ac4a4c96095414cadd134840222408&q=London&aqi=no&key=${process.env.API_KEY}`)
    .then((response) => response.text())
    .then(result => JSON.parse(result).data);

    res.status(200).json({ data });
  }
