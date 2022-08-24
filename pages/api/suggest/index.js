import axios from "axios";

const handler = async (req, res) => {
  console.log(req.body.long, req.body.lat, req.body.address, "suggest body");
  if (req.method === "POST") {
    const data = await axios.get(
      `https://api.openrouteservice.org/geocode/autocomplete?api_key=${process.env.MAPKEY}&text=${req.body.address}&boundary.country=US&focus.point.lon=-118.2529&focus.point.lat=34.0485`
    );
    res.status(200).json({ success: true, data: data.data, idx: req.body.idx });
  } else {
    console.log("error happens");
    res.status(403).json({ error: "error" });
  }
};

export default handler;
