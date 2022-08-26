import { getAvgGasPrice } from "../../../src/utils";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const startRegular = await getAvgGasPrice(
        req.body.addresses[0],
        "Regular"
      );
      const startMidgrade = await getAvgGasPrice(
        req.body.addresses[0],
        "Midgrade"
      );
      const startPremium = await getAvgGasPrice(
        req.body.addresses[0],
        "Premium"
      );
      const startDiesel = await getAvgGasPrice(req.body.addresses[0], "Diesel");
      const endRegular = await getAvgGasPrice(req.body.addresses[1], "Regular");
      const endMidgrade = await getAvgGasPrice(
        req.body.addresses[1],
        "Midgrade"
      );
      const endPremium = await getAvgGasPrice(req.body.addresses[1], "Premium");
      const endDiesel = await getAvgGasPrice(req.body.addresses[1], "Diesel");
      res.status(200).json({
        success: true,
        data: {
          startAvg: [
            startRegular.avg,
            startMidgrade.avg,
            startPremium.avg,
            startDiesel.avg,
          ],
          endAvg: [
            endRegular.avg,
            endMidgrade.avg,
            endPremium.avg,
            endDiesel.avg,
          ],
          startMin: [
            startRegular.min,
            startMidgrade.min,
            startPremium.min,
            startDiesel.min,
          ],
          startMax: [
            startRegular.max,
            startRegular.max,
            startRegular.max,
            startRegular.max,
          ],
          endMin: [
            endRegular.min,
            endMidgrade.min,
            endPremium.min,
            endDiesel.min,
          ],
          endMax: [
            endRegular.max,
            endRegular.max,
            endRegular.max,
            endRegular.max,
          ],
        },
      });
    } catch (err) {
      res.status(403).json({ error: "unable to retrieve gas prices" });
    }
  } else {
    res.status(403).json({ error: "error" });
  }
};

export default handler;
