import { getAvgGasPrice } from "../../../src/utils";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const startRegular = await getAvgGasPrice(
        req.body.addresses[0],
        "Regular"
      );
      console.log(1);
      const startMidgrade = await getAvgGasPrice(
        req.body.addresses[0],
        "Midgrade"
      );
      console.log(2);
      const startPremium = await getAvgGasPrice(
        req.body.addresses[0],
        "Premium"
      );
      console.log(3);
      const startDiesel = await getAvgGasPrice(req.body.addresses[0], "Diesel");
      console.log(4);
      const endRegular = await getAvgGasPrice(req.body.addresses[1], "Regular");
      console.log(5);
      const endMidgrade = await getAvgGasPrice(
        req.body.addresses[1],
        "Midgrade"
      );
      console.log(6);
      const endPremium = await getAvgGasPrice(req.body.addresses[1], "Premium");
      console.log(7);
      const endDiesel = await getAvgGasPrice(req.body.addresses[1], "Diesel");
      console.log(8);
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
