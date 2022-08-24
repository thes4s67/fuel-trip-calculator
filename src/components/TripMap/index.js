import { Card } from "@mui/material";
import { Map, ZoomControl } from "pigeon-maps";
import { osm } from "pigeon-maps/providers";
import CustomMarker from "../Map/CustomMarker";
import Lines from "../Map/Lines";
import { useSelector } from "react-redux";

const TripMap = () => {
  const path = useSelector((state) => state.mapData.trip.path);
  const addresses = useSelector((state) => state.mapData.suggestions);
  return (
    <Card sx={{ p: 2 }}>
      <Map
        height={274}
        center={
          addresses.start.value
            ? [
                addresses.start.value.coordinates[1],
                addresses.start.value.coordinates[0],
              ]
            : [addresses.default.lat, addresses.default.long]
        }
        zoom={14}
        provider={osm}
      >
        <ZoomControl />
        {addresses.start.value ? (
          <CustomMarker
            anchor={[
              addresses.start.value.coordinates[1],
              addresses.start.value.coordinates[0],
            ]}
            point={"A"}
          />
        ) : null}
        {addresses.destination.value ? (
          <CustomMarker
            anchor={[
              addresses.destination.value.coordinates[1],
              addresses.destination.value.coordinates[0],
            ]}
            point={"B"}
          />
        ) : null}
        <Lines
          coordsArray={
            path.length > 0
              ? path.map((c) => {
                  return [c[1], c[0]];
                })
              : []
          }
        />
      </Map>
    </Card>
  );
};

export default TripMap;
