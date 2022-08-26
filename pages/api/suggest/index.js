import axios from "axios";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = await axios.get(
      `https://api.openrouteservice.org/geocode/autocomplete?api_key=${process.env.MAPKEY}&text=${req.body.address}&boundary.country=US&focus.point.lon=${req.body.long}&focus.point.lat=${req.body.lat}`
    );
    res.status(200).json({ success: true, data: data.data, idx: req.body.idx });
  } else {
    res.status(403).json({ error: "error" });
  }
};

export default handler;
