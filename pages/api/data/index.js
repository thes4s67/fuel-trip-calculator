import { selectQuery } from "../../../src/database";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const type = req.body.type;
    let data;
    switch (type) {
      case "years":
        data = await selectQuery(`select * from years`);
        res.status(200).json({
          success: true,
          type: "year",
          data: data.map((c) => {
            return {
              value: c.year,
            };
          }),
        });
        break;
      case "makes":
        data = await selectQuery(`select * from makes where year = $1`, [
          req.body.year,
        ]);
        res.status(200).json({
          success: true,
          type: "makes",
          data: data.map((c) => {
            return {
              value: c.make,
            };
          }),
        });
        break;
      case "models":
        data = await selectQuery(
          `select * from models where year = $1 and make = $2`,
          [req.body.year, req.body.make]
        );
        res.status(200).json({
          success: true,
          type: "models",
          data: data.map((c) => {
            return {
              value: c.model,
            };
          }),
        });
        break;
      case "trims":
        data = await selectQuery(
          `select * from trims where year = $1 and make = $2 and model = $3`,
          [req.body.year, req.body.make, req.body.model]
        );
        res.status(200).json({
          success: true,
          type: "trims",
          data: data.map((c) => {
            return {
              value: c.trim,
            };
          }),
        });
        break;
      case "sData":
        data = await selectQuery(
          `select year, make, model, trim, city08, highway08, comb08, fuel_type, fuel_tank_size, thumbnail from model_specs where year = $1 and make = $2 and model = $3 and trim = $4;`,
          [req.body.year, req.body.make, req.body.model, req.body.trim]
        );
        res.status(200).json({
          success: true,
          type: "sData",
          data: data[0],
        });
        break;
      default:
        res.status(200).json({ success: true, data: null });
        break;
    }
  } else {
    res.status(403).json({ error: "error" });
  }
};

export default handler;
