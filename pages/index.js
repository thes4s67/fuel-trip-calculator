import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Container,
  Grid,
  Box,
  Tabs,
  Tab,
  styled,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import _ from "lodash";
import {
  getOptionMakes,
  getOptionModels,
  getOptionTrims,
  getSelectionData,
} from "../src/store/slices/mapDataSlice";
import { baseUrl } from "../src/utils/API";
import TripMap from "../src/components/TripMap";
import Directions from "../src/components/Directions";
import VehicleSelector from "../src/components/VehicleSelector";

import AddressSelector from "../src/components/AddressSelector";
import Loading from "../src/components/Loading";
import Footer from "../src/components/Footer";
import Logo from "../src/components/Logo";
import TripDetails from "../src/components/TripDetails";

const TabsContainerWrapper = styled(Box)(
  ({ theme }) => `
      padding: 0 ${theme.spacing(8)};
      position: relative;
      bottom: -1px;

      .MuiTabs-root {
        height: 44px;
        min-height: 44px;
      }

      .MuiTabs-scrollableX {
        overflow-x: auto !important;
      }

      .MuiTabs-indicator {
          min-height: 4px;
          height: 4px;
          box-shadow: none;
          bottom: -4px;
          background: none;
          border: 0;

          &:after {
            position: absolute;
            left: 50%;
            width: 28px;
            content: ' ';
            margin-left: -14px;
            background: ${theme.colors.primary.main};
            border-radius: inherit;
            height: 100%;
          }
      }

      .MuiTab-root {
          &.MuiButtonBase-root {
              height: 44px;
              min-height: 44px;
              background: ${theme.colors.alpha.white[50]};
              border: 1px solid ${theme.colors.alpha.black[10]};
              border-bottom: 0;
              position: relative;
              margin-right: ${theme.spacing(1)};
              font-size: ${theme.typography.pxToRem(14)};
              color: ${theme.colors.alpha.black[80]};
              border-bottom-left-radius: 0;
              border-bottom-right-radius: 0;

              .MuiTouchRipple-root {
                opacity: .1;
              }

              &:after {
                position: absolute;
                left: 0;
                right: 0;
                width: 100%;
                bottom: 0;
                height: 1px;
                content: '';
                background: ${theme.colors.alpha.black[10]};
              }

              &:hover {
                color: ${theme.colors.alpha.black[100]};
              }
          }

          &.Mui-selected {
              color: ${theme.colors.alpha.black[100]};
              background: ${theme.colors.alpha.white[100]};
              border-bottom-color: ${theme.colors.alpha.white[100]};

              &:after {
                height: 0;
              }
          }
      }
  `
);

const Home = ({ data, ipData }) => {
  const selection = useSelector((state) => state.mapData.selection);
  const tripData = useSelector((state) => state.mapData.trip);
  const suggestions = useSelector((state) => state.mapData.suggestions);

  const fuelData = useSelector((state) => state.mapData.fuelData);
  const loading = useSelector((state) => state.mapData.loading);

  const [currTab, setCurrTab] = useState("overview");
  const dispatch = useDispatch();
  useEffect(() => {
    //Get Makes
    if (
      selection.year.value !== null &&
      !selection.make.disabled &&
      selection.model.disabled
    ) {
      dispatch(getOptionMakes({ type: "makes", year: selection.year.value }));
    }
    //Get Models
    if (
      selection.make.value !== null &&
      !selection.model.disabled &&
      selection.trim.disabled
    ) {
      dispatch(
        getOptionModels({
          type: "models",
          year: selection.year.value,
          make: selection.make.value,
        })
      );
    }
    //Get Trims
    if (selection.model.value !== null && !selection.trim.disabled) {
      dispatch(
        getOptionTrims({
          type: "trims",
          year: selection.year.value,
          make: selection.make.value,
          model: selection.model.value,
        })
      );
    }
    //Once trim is selected
    if (selection.trim.value !== null) {
      dispatch(
        getSelectionData({
          type: "sData",
          year: selection.year.value,
          make: selection.make.value,
          model: selection.model.value,
          trim: selection.trim.value,
        })
      );
    }
  }, [selection]);

  const tabs = [
    { value: "overview", label: "Overview" },
    { value: "directions", label: "Directions" },
  ];

  const handleTabChange = (_event, value) => {
    setCurrTab(value);
  };

  return (
    <Container sx={{ mt: 7, mb: 5 }}>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Logo />
        </Grid>
        <Grid item xs={12}>
          <VehicleSelector yearOptions={data} />
        </Grid>
        <Grid item xs={12} md={5}>
          <AddressSelector ipData={ipData} />
        </Grid>
        <Grid item xs={12} md={7}>
          <Box sx={{ justifyContent: "center" }}>
            <TripMap ipData={ipData} />
          </Box>
        </Grid>
        {loading ? (
          <Grid item xs={12}>
            <Loading />
          </Grid>
        ) : null}
        {fuelData.startAvg.length && !loading > 0 ? (
          <>
            <Grid item xs={12}>
              <TabsContainerWrapper>
                <Tabs value={currTab} onChange={handleTabChange}>
                  {tabs.map((tab) => (
                    <Tab key={tab.value} label={tab.label} value={tab.value} />
                  ))}
                </Tabs>
              </TabsContainerWrapper>
              <Card
                variant="outlined"
                sx={{
                  mx: 4,
                  p: currTab == "overview" ? 4 : 0,
                }}
              >
                <CardContent>
                  {currTab === "overview" ? (
                    <TripDetails />
                  ) : (
                    <Directions
                      directions={tripData.directions}
                      price={fuelData.startAvg[2]}
                      combined={23}
                    />
                  )}
                </CardContent>
              </Card>
            </Grid>
          </>
        ) : null}
      </Grid>
      <Footer />
    </Container>
  );
};
export default Home;

export const getServerSideProps = async (context) => {
  const res = await axios.post(`${baseUrl}/api/data`, {
    type: "years",
  });
  const { data } = await res.data;
  const ipRes = await axios.get(`https://www.iplocate.io/api/lookup/`);
  const ipData = await ipRes.data;
  return {
    props: { data, ipData },
  };
};
