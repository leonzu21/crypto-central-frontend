import DatePicker from "@mui/lab/DatePicker";
import { useState, useEffect } from "react";
import { GetCurrentDate } from "src/utils/get-current-date";
import useSWR from "swr";

import {
  Box,
  Card,
  Button,
  ButtonGroup,
  TextField,
  Grid,
  Divider,
  Chip,
  Autocomplete,
} from "@mui/material";

import ToFromChart from "./whale-alert-charts/to-from-chart";
import TotalChart from "./whale-alert-charts/total-chart";
import DifferenceChart from "./whale-alert-charts/difference-chart";

const fetcher = (url) => fetch(url).then((res) => res.json());

const updateUrl = () => {
  setEndpoint(``);
};

export const WhaleAlertCharts = ({ ...rest }) => {
  const currDate = GetCurrentDate();
  const [day, setDay] = useState(currDate["day"]);
  const [month, setMonth] = useState(currDate["month"]);
  const [year, setYear] = useState(currDate["year"]);
  const [value, setValue] = useState(Date());
  const [filterBy, setFilterBy] = useState("dai");
  const [symbol, setSymbol] = useState('');
  const [symbolValue, setSymbolValue] = useState(null);
  const [coins, setCoins] = useState(null);
  const [endpoint, setEndpoint] = useState(
    `dailyChart?theDate=${currDate["year"]}-${currDate["month"]}-${currDate["day"]}`
  );

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
      <Box sx={{ m: 1 }}>
        <Grid container>
          <Grid item xs={4}>
            <ButtonGroup size="small" color="primary" aria-label="small group">
              <Button
                onClick={() => {
                  setFilterBy("dai");
                  setEndpoint(
                    `dailyChart?theDate=${year}-${month}-${day}${symbol}`
                  );
                }}
              >
                1 Day
              </Button>
              <Button
                onClick={() => {
                  setFilterBy("month");
                  setEndpoint(`monthlyChart?theDate=${year}-${month}${symbol}`);
                }}
              >
                1 Month
              </Button>
              <Button
                onClick={() => {
                  setFilterBy("year");
                  setEndpoint(`yearlyChart?theDate=${year}${symbol}`);
                }}
              >
                1 Year
              </Button>
            </ButtonGroup>
          </Grid>
          <Grid item xs={4}>
            {coins ? (
              <Autocomplete
                size="small"
                disablePortal
                id="combo-box-demo"
                value={symbolValue}
                options={coins}
                sx={{ width: 300 }}
                onInputChange={(event, newValue) => {
                  setSymbolValue(newValue);
                  let symb = newValue ? `&theSymbol=${newValue}` : '';
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
                renderInput={(params) => (
                  <TextField {...params} label="Symbol" />
                )}
              />
            ) : null}
          </Grid>
          <Grid item xs={4} md={4}>
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
                <TextField size="small" fontSize="small" {...params} />
              )}
            />
          </Grid>
        </Grid>
      </Box>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={11}>
          <ToFromChart data={data} />
        </Grid>
        <Grid item xs={12}>
          <Divider size="medium" sx={{ m: 2 }}>
            <Chip size="medium" label="Total and Difference" />
          </Divider>
        </Grid>
        <Grid item xs={6}>
          <TotalChart data={data} />
        </Grid>
        <Grid item xs={6}>
          <DifferenceChart data={data} />
        </Grid>
      </Grid>
    </Card>
  );
};
