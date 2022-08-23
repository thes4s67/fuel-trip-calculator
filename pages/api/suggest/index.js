import axios from "axios";

const handler = async (req, res) => {
  if (req.method === "POST") {
    console.log("suggest hits", req.body);
    const data = await axios.get(
      `https://api.openrouteservice.org/geocode/autocomplete?api_key=${process.env.MAPKEY}&text=${req.body.address}&boundary.country=US`
    );
    res.status(200).json({ success: true, data: data.data, idx: req.body.idx });
  } else {
    res.status(403).json({ error: "error" });
  }
};

export default handler;
