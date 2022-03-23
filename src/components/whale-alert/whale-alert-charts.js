import * as React from "react";
import DatePicker from "@mui/lab/DatePicker";
import { useState, useEffect } from "react";
import { GetCurrentDate } from "src/components/utils/get-current-date";
import useSWR from "swr";
import StyledPopper from "../utils/styled-popper";

import {
  Box,
  Card,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
  Grid,
  Divider,
  Chip,
  CardHeader,
  Skeleton,
} from "@mui/material";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { VariableSizeList } from "react-window";

import Autocomplete from "@mui/material/Autocomplete";

import ToFromChart from "./whale-alert-charts/to-from-chart";
import TotalChart from "./whale-alert-charts/total-chart";
import DifferenceChart from "./whale-alert-charts/difference-chart";

const fetcher = (url) => fetch(url).then((res) => res.json());

export const WhaleAlertCharts = ({ propSymbol, coins, ...rest }) => {
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
  // const [coins, setCoins] = useState([]);
  const [endpoint, setEndpoint] = useState(
    !propSymbol
      ? `dailyChart?theDate=${currDate["year"]}-${currDate["month"]}-${currDate["day"]}`
      : `dailyChart?theDate=${currDate["year"]}-${currDate["month"]}-${currDate["day"]}&theSymbol=${propSymbol}`
  );
  const [alignment, setAlignment] = useState("24h");

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  // 3. Create out useEffect function
  // useEffect(() => {
  //   fetch("https://api.coingecko.com/api/v3/search?locale=en")
  //     .then((response) => response.json())
  //     .then((data) => setCoins(data.coins));
  // }, []);

  const { data, error } = useSWR(
    `https://dmc8ptcuv1dn8.cloudfront.net/api/whales/${endpoint}`,
    fetcher
  );

  //////////////////////////////~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~///////////////////////////////////////
  const LISTBOX_PADDING = 8; // px

  function renderRow(props) {
    const { data, index, style } = props;
    const dataSet = data[index];
    const inlineStyle = {
      ...style,
      top: style.top + LISTBOX_PADDING,
    };

    // if (dataSet.hasOwnProperty("group")) {
    //   return (
    //     <ListSubheader key={dataSet.key} component="div" style={inlineStyle}>
    //       {dataSet.group}
    //     </ListSubheader>
    //   );
    // }
    return (
      <Box
        component="li"
        sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
        {...dataSet[0]}
        style={inlineStyle}
      >
        <img
          loading="lazy"
          width="20"
          src={`${dataSet[1].thumb}`}
          srcSet={`${dataSet[1].thumb} 2x`}
          alt=""
        />
        {dataSet[1].name} ({dataSet[1].symbol}) #{dataSet[1].market_cap_rank}
      </Box>
    );
  }

  const OuterElementContext = React.createContext({});

  const OuterElementType = React.forwardRef((props, ref) => {
    const outerProps = React.useContext(OuterElementContext);
    return <div ref={ref} {...props} {...outerProps} />;
  });

  function useResetCache(data) {
    const ref = React.useRef(null);
    React.useEffect(() => {
      if (ref.current != null) {
        ref.current.resetAfterIndex(0, true);
      }
    }, [data]);
    return ref;
  }

  // Adapter for react-window
  const ListboxComponent = React.forwardRef(function ListboxComponent(
    props,
    ref
  ) {
    const { children, ...other } = props;
    const itemData = [];
    children.forEach((item) => {
      itemData.push(item);
      itemData.push(...(item.children || []));
    });

    const theme = useTheme();
    const smUp = useMediaQuery(theme.breakpoints.up("sm"), {
      noSsr: true,
    });

    const itemCount = itemData.length;
    const itemSize = smUp ? 36 : 48;

    const getChildSize = (child) => {
      if (child.hasOwnProperty("group")) {
        return 48;
      }

      return itemSize;
    };

    const getHeight = () => {
      if (itemCount > 8) {
        return 8 * itemSize;
      }
      return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
    };

    const gridRef = useResetCache(itemCount);

    return (
      <div ref={ref}>
        <OuterElementContext.Provider value={other}>
          <VariableSizeList
            itemData={itemData}
            height={getHeight() + 2 * LISTBOX_PADDING}
            width="100%"
            ref={gridRef}
            outerElementType={OuterElementType}
            innerElementType="ul"
            itemSize={(index) => getChildSize(itemData[index])}
            overscanCount={5}
            itemCount={itemCount}
          >
            {renderRow}
          </VariableSizeList>
        </OuterElementContext.Provider>
      </div>
    );
  });

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
            {!propSymbol ? (
              coins ? (
                <Autocomplete
                  id="virtualize-demo"
                  isOptionEqualToValue={(option, value) => option === value}
                  size="small"
                  sx={{ width: { md: 300 } }}
                  PopperComponent={StyledPopper}
                  ListboxComponent={ListboxComponent}
                  getOptionLabel={(option) => option.name}
                  options={coins}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="All"
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: "off", // disable autocomplete and autofill
                      }}
                    />
                  )}
                  renderOption={(props, option) => [props, option]}
                  onChange={(event, newValue) => {
                    setSymbolValue(
                      newValue ? newValue.symbol.toLowerCase() : ""
                    );
                    let symb = newValue
                      ? `&theSymbol=${
                          newValue ? newValue.symbol.toLowerCase() : ""
                        }`
                      : "";
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
                        setEndpoint(
                          `${filterBy}lyChart?theDate=${year}${symb}`
                        );
                        break;
                      default:
                        setEndpoint(
                          `findAllBy${filterBy}OrderByAmountDesc?theDate=${calYear}-${calMonth}-${calYear}`
                        );
                        break;
                    }
                  }}
                />
              ) : (
                <Skeleton sx={{ width: { md: 300 } }} animation="wave" />
              )
            ) : null}
          </Grid>
        </Grid>
      </Box>
      {data ? (
        <Grid container justifyContent="center" alignItems="center">
          <Grid item md={12} xs={12}>
            <ToFromChart data={data} filterBy={filterBy} symbol={symbol} />
          </Grid>
          <Grid item xs={12}>
            <Divider size="medium" sx={{ m: 2 }}>
              <Chip size="medium" label="Total and Difference" />
            </Divider>
          </Grid>
          <Grid item md={6} xs={12}>
            <TotalChart data={data} filterBy={filterBy} symbol={symbol} />
          </Grid>
          <Grid item md={6} xs={12}>
            <DifferenceChart data={data} filterBy={filterBy} symbol={symbol} />
          </Grid>
        </Grid>
      ) : null}
    </Card>
  );
};
