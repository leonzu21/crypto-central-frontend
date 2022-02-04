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
} from "@mui/material";

import ToFromChart from "./whale-alert-charts/to-from-chart";
import TotalChart from "./whale-alert-charts/total-chart";
import DifferenceChart from "./whale-alert-charts/difference-chart";

const fetcher = (url) => fetch(url).then((res) => res.json());

export const WhaleAlertCharts = ({ ...rest }) => {
  const currDate = GetCurrentDate();
  const [day, setDay] = useState(currDate["day"]);
  const [month, setMonth] = useState(currDate["month"]);
  const [year, setYear] = useState(currDate["year"]);
  const [value, setValue] = useState(Date());
  const [filterBy, setFilterBy] = useState("dai");
  const [endpoint, setEndpoint] = useState(
    `dailyChart?theDate=${currDate["year"]}-${currDate["month"]}-${currDate["day"]}`
  );

  const { data, error } = useSWR(
    `https://dmc8ptcuv1dn8.cloudfront.net/api/whales/${endpoint}`,
    fetcher
  );

  return (
    <Card {...rest}>
      <Box sx={{ m: 1 }}>
        <Grid container>
          <Grid item xs={8} md={8}>
            <ButtonGroup size="small" color="primary" aria-label="small group">
              <Button
                onClick={() => {
                  setFilterBy("dai");
                  setEndpoint(`dailyChart?theDate=${year}-${month}-${day}`);
                }}
              >
                1 Day
              </Button>
              <Button
                onClick={() => {
                  setFilterBy("month");
                  setEndpoint(`monthlyChart?theDate=${year}-${month}`);
                }}
              >
                1 Month
              </Button>
              <Button
                onClick={() => {
                  setFilterBy("year");
                  setEndpoint(`yearlyChart?theDate=${year}`);
                }}
              >
                1 Year
              </Button>
            </ButtonGroup>
          </Grid>
          <Grid item xs={4} md={4}>
            <DatePicker
              label="Choose a date"
              value={value}
              onChange={(newValue) => {
                console.log("salut");
                let calDay = newValue.getDate();
                let calMonth = newValue.getMonth() + 1;
                calMonth = calMonth < 10 ? `0${calMonth}` : `${calMonth}`;
                calDay = calDay < 10 ? `0${calDay}` : `${calDay}`;
                let calYear = newValue.getFullYear();
                switch (filterBy) {
                  case "dai":
                    setEndpoint(
                      `${filterBy}lyChart?theDate=${calYear}-${calMonth}-${calDay}`
                    );
                    break;
                  case "month":
                    setEndpoint(
                      `${filterBy}lyChart?theDate=${calYear}-${calMonth}`
                    );
                    break;
                  case "year":
                    setEndpoint(`${filterBy}lyChart?theDate=${calYear}`);
                    break;
                  default:
                    setEndpoint(
                      `findAllBy${filterBy}OrderByAmountDesc?theDate=${calYear}-${calMonth}-${calYear}`
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
        <Grid xs={12}>
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
