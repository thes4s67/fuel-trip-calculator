import axios from "axios";
import _ from "lodash";
import moment from "moment";

export const getAdjMPG = (city, highway, cityPercent) => {
  return city * cityPercent + highway * (1 - cityPercent);
};
export const formatDuration = (duration) => {
  const d = moment.duration(duration, "seconds");
  const hh =
    d._data.days > 0 ? d._data.days * 24 + d_.data.hours : d._data.hours;
  return `${hh} hours, ${d._data.minutes} minutes`;
};

export const getFuelCost = (distance, combined, avg, fuelData, fuelType) => {
  return ((Math.round(distance) / combined) * avg).toFixed(2);
};

export const getPumpCount = (tankStart, tankSize, distance, mpg) => {
  const gals = distance / mpg;
  let refuel = 0;
  if (tankStart > 0) refuel = gals / (tankStart * tankSize);
  else refuel = gals / tankSize + 1;
  return refuel > 1
    ? `you can expect to pump fuel at least ${Math.round(refuel)} ${
        Math.round(refuel) > 1 ? "times" : "time"
      } during your trip`
    : "you likely won't have to pump fuel during your trip.";
};

export const getFuelText = (type) => {
  if (type === "Regular")
    return "regular (87 octane or better) unleaded gasoline";
  else if (type === "Midgrade")
    return "midgrade (89 octane or better) unleaded gasoline";
  else if (type.includes("Premium"))
    return "premium (91 octane or better) unleaded gasoline";
  else if (type === "Diesel") return "diesel";
  else return 2;
};
export const getFuelType = (type) => {
  //1 = regular, 2 = midgrade, 3 = premium, 4 disel
  if (type === "Regular") return 1;
  else if (type === "Midgrade") return 2;
  else if (type.includes("Premium")) return 3;
  else if (type === "Diesel") return 4;
  else return 2;
};

const getCorrd = (coord, type) => {
  if (type === "minLat") return coord - 0.04;
  if (type === "minLng") return coord - 0.16;
  if (type === "maxLat") return coord + 0.04;
  if (type === "maxLng") return coord + 0.16;
};

export const getAvgGasPrice = async (coords, type) => {
  //corrds in long/lat format
  const gasResp = await axios.get("https://www.gasbuddy.com/");
  //TODO: appears you don't need the cookie?
  const cookies = gasResp.headers["set-cookie"];
  var data = `{"fuelTypeId":"${getFuelType(type)}","minLat":${getCorrd(
    coords.coordinates[1],
    "minLat"
  )},"maxLat":${getCorrd(coords.coordinates[1], "maxLat")},"minLng":${getCorrd(
    coords.coordinates[0],
    "minLng"
  )},"maxLng":${getCorrd(
    coords.coordinates[0],
    "maxLng"
  )},"width":1903,"height":600}`;

  var config = {
    method: "post",
    url: "https://www.gasbuddy.com/gaspricemap/map",
    headers: {
      "sec-ch-ua":
        '"Chromium";v="104", " Not A;Brand";v="99", "Google Chrome";v="104"',
      "sec-ch-ua-mobile": "?0",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36",
      "sec-ch-ua-arch": '"x86"',
      "sec-ch-device-memory": "8",
      "Content-Type": "application/json; charset=UTF-8",
      Accept: "*/*",
      "X-Requested-With": "XMLHttpRequest",
      "sec-ch-ua-full-version-list":
        '"Chromium";v="104.0.5112.81", " Not A;Brand";v="99.0.0.0", "Google Chrome";v="104.0.5112.81"',
      "sec-ch-ua-model": "",
      "sec-ch-ua-platform": '"Windows"',
      "Sec-Fetch-Site": "same-origin",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Dest": "empty",
      dnt: "1",
      "sec-gpc": "1",
      host: "www.gasbuddy.com",
      // Cookie:
      //   "datadome=KH3bWL-80vpkVp8Pv35RVAQPcC0.AxJg9f9zhRpwkUu6KPFpk3oOMemSu0OV2h1jTlKObsU~7AmWjXfCa1xRsAFWVUFm3REbIcD~lFhxqA.L74PVoj.XqcwTuLMXyxi; ASP.NET_SessionId=eev5mkanyezv43m3lklkdxrr",
    },
    data: data,
  };

  const resp = await axios(config);
  const combined = [
    ...resp.data.primaryStations,
    ...resp.data.secondaryStations,
  ];

  const filtered = combined.filter((c) => c.price !== "--");
  const sumGas = _.sumBy(filtered, (c) => Number(c.price));

  return {
    avg: sumGas / filtered.length,
    min: Math.min(
      ...filtered.map((c) => {
        return Number(c.price);
      })
    ),
    max: Math.max(
      ...filtered.map((c) => {
        return Number(c.price);
      })
    ),
  };
};
