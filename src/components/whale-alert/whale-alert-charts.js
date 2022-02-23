import DatePicker from "@mui/lab/DatePicker";
import { useState, useEffect } from "react";
import { GetCurrentDate } from "src/utils/get-current-date";
import useSWR from "swr";

import {
  Box,
  Card,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
  Grid,
  Divider,
  Chip,
  Autocomplete,
  CardHeader,
} from "@mui/material";

import ToFromChart from "./whale-alert-charts/to-from-chart";
import TotalChart from "./whale-alert-charts/total-chart";
import DifferenceChart from "./whale-alert-charts/difference-chart";

const fetcher = (url) => fetch(url).then((res) => res.json());

export const WhaleAlertCharts = ({ propSymbol, ...rest }) => {
  const currDate = GetCurrentDate();
  const [day, setDay] = useState(currDate["day"]);
  const [month, setMonth] = useState(currDate["month"]);
  const [year, setYear] = useState(currDate["year"]);
  const [value, setValue] = useState(Date());
  const [filterBy, setFilterBy] = useState("dai");
  const [symbol, setSymbol] = useState(propSymbol ? propSymbol : "");
  const [symbolValue, setSymbolValue] = useState(
    propSymbol ? propSymbol : null
  );
  const [coins, setCoins] = useState(null);
  const [endpoint, setEndpoint] = useState(
    `dailyChart?theDate=${currDate["year"]}-${currDate["month"]}-${currDate["day"]}`
  );
  const [alignment, setAlignment] = useState("24h");

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  // 3. Create out useEffect function
  useEffect(() => {
    fetch("https://dmc8ptcuv1dn8.cloudfront.net/api/symbols/all")
      .then((response) => response.json())
      // 4. Setting *dogImage* to the image url that we received from the response above
      .then((data) => setCoins(data));
  }, []);

  const { data, error } = useSWR(
    `https://dmc8ptcuv1dn8.cloudfront.net/api/whales/${endpoint}`,
    fetcher
  );

  return (
    <Card {...rest}>
      <CardHeader title="Whale Alerts Chart" />
      <Box sx={{ m: 1 }}>
        <Grid container>
          <Grid item md={4} xs={8} sx={{ mb: { xs: 1 } }}>
            <ToggleButtonGroup
              size="small"
              value={alignment}
              exclusive
              onChange={handleAlignment}
              aria-label="text alignment"
            >
              <ToggleButton
                sx={{ pl: { md: 2, xs: 1 }, pr: { md: 2, xs: 1 } }}
                value="24h"
                onClick={() => {
                  setFilterBy("dai");
                  setEndpoint(
                    `dailyChart?theDate=${year}-${month}-${day}${symbol}`
                  );
                }}
              >
                24h
              </ToggleButton>
              <ToggleButton
                sx={{ pl: { md: 2, xs: 1 }, pr: { md: 2, xs: 1 } }}
                value="30d"
                onClick={() => {
                  setFilterBy("month");
                  setEndpoint(`monthlyChart?theDate=${year}-${month}${symbol}`);
                }}
              >
                30d
              </ToggleButton>
              <ToggleButton
                sx={{ pl: { md: 2, xs: 1 }, pr: { md: 2, xs: 1 } }}
                value="1y"
                onClick={() => {
                  setFilterBy("year");
                  setEndpoint(`yearlyChart?theDate=${year}${symbol}`);
                }}
              >
                1y
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          <Grid item md={4} xs={4}>
            <DatePicker
              label="Choose a date"
              value={value}
              onChange={(newValue) => {
                let calDay = newValue.getDate();
                let calMonth = newValue.getMonth() + 1;
                calMonth = calMonth < 10 ? `0${calMonth}` : `${calMonth}`;
                calDay = calDay < 10 ? `0${calDay}` : `${calDay}`;
                let calYear = newValue.getFullYear();
                switch (filterBy) {
                  case "dai":
                    setEndpoint(
                      `${filterBy}lyChart?theDate=${calYear}-${calMonth}-${calDay}${symbol}`
                    );
                    break;
                  case "month":
                    setEndpoint(
                      `${filterBy}lyChart?theDate=${calYear}-${calMonth}${symbol}`
                    );
                    break;
                  case "year":
                    setEndpoint(
                      `${filterBy}lyChart?theDate=${calYear}${symbol}`
                    );
                    break;
                  default:
                    setEndpoint(
                      `findAllBy${filterBy}OrderByAmountDesc?theDate=${calYear}-${calMonth}-${calYear}${symbol}`
                    );
                    break;
                }
                setValue(newValue);
                setDay(calDay);
                setMonth(calMonth);
                setYear(calYear);
              }}
              renderInput={(params) => (
                <TextField
                  size="small"
                  fullWidth
                  fontSize="small"
                  sx={{ width: { md: 300 } }}
                  {...params}
                />
              )}
            />
          </Grid>
          <Grid item md={4} xs={12}>
            {coins ? (
              <Autocomplete
                isOptionEqualToValue={(option, value) => option.label === value}
                size="small"
                disablePortal
                id="combo-box-demo"
                value={symbolValue}
                options={coins}
                sx={{ width: { md: 300 } }}
                onInputChange={(event, newValue) => {
                  setSymbolValue(newValue);
                  let symb = newValue ? `&theSymbol=${newValue}` : "";
                  setSymbol(symb);
                  switch (filterBy) {
                    case "dai":
                      setEndpoint(
                        `${filterBy}lyChart?theDate=${year}-${month}-${day}${symb}`
                      );
                      break;
                    case "month":
                      setEndpoint(
                        `${filterBy}lyChart?theDate=${year}-${month}${symb}`
                      );
                      break;
                    case "year":
                      setEndpoint(`${filterBy}lyChart?theDate=${year}${symb}`);
                      break;
                    default:
                      setEndpoint(
                        `findAllBy${filterBy}OrderByAmountDesc?theDate=${calYear}-${calMonth}-${calYear}`
                      );
                      break;
                  }
                }}
                renderInput={(params) => <TextField {...params} label="All" />}
              />
            ) : null}
          </Grid>
        </Grid>
      </Box>
      {data ? (
        <Grid container justifyContent="center" alignItems="center">
          <Grid item md={11} xs={12}>
            <ToFromChart data={data} filterBy={filterBy} />
          </Grid>
          <Grid item xs={12}>
            <Divider size="medium" sx={{ m: 2 }}>
              <Chip size="medium" label="Total and Difference" />
            </Divider>
          </Grid>
          <Grid item md={6} xs={12}>
            <TotalChart data={data} filterBy={filterBy} />
          </Grid>
          <Grid item md={6} xs={12}>
            <DifferenceChart data={data} filterBy={filterBy} />
          </Grid>
        </Grid>
      ) : null}
    </Card>
  );
};
