import axios from "axios";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const resp = await axios.post(
      "https://api.openrouteservice.org/v2/directions/driving-car/geojson",
      {
        coordinates: req.body.addresses.map((c) => c.coordinates),
        preference: "fastest",
        units: "mi",
        geometry: true,
        maximum_speed: 100,
      },
      {
        headers: {
          Authorization: process.env.MAPKEY,
        },
      }
    );
    res.status(200).json({ success: true, data: resp.data });
  } else {
    res.status(403).json({ error: "error" });
  }
};

export default handler;
