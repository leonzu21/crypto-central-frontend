import { useState, useEffect } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import useSWRInfinite from "swr/infinite";
import WhaleAlertRow from "./whale-alert-row";
import "react-perfect-scrollbar/dist/css/styles.css";
import * as React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import StyledPopper from "../../utils/styled-popper";
import { useTheme } from "@mui/material/styles";
import { VariableSizeList } from "react-window";

import Autocomplete from "@mui/material/Autocomplete";
import DatePicker from "@mui/lab/DatePicker";

import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
  Grid,
  CardHeader,
  Skeleton
} from "@mui/material";

import { GetCurrentDate } from "src/utils/get-current-date";

const fetcher = (url) => fetch(url).then((res) => res.json());

export const WhaleAlertListResults = ({ propSymbol, ...rest }) => {
  const currDate = GetCurrentDate();
  const [date, setDate] = useState(null);
  const [day, setDay] = useState(currDate["day"]);
  const [month, setMonth] = useState(currDate["month"]);
  const [year, setYear] = useState(currDate["year"]);
  const [value, setValue] = useState(Date());
  const [filterBy, setFilterBy] = useState("Day");
  const [symbol, setSymbol] = useState(propSymbol ? propSymbol : "");
  const [symbolValue, setSymbolValue] = useState(
    propSymbol ? propSymbol : null
  );
  const [bySymbol, setBySymbol] = useState(propSymbol ? "BySymbol" : "");
  const [coins, setCoins] = useState(null);
  const [endpoint, setEndpoint] = useState(
    !propSymbol
      ? `findAllByDayOrderByAmountDesc?theDate=${currDate["year"]}-${currDate["month"]}-${currDate["day"]}`
      : `findAllBySymbolByDayOrderByAmountDesc?theDate=${currDate["year"]}-${currDate["month"]}-${currDate["day"]}&theSymbol=${propSymbol}`
  );
  const [alignment, setAlignment] = useState("24h");

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  // 3. Create out useEffect function
  useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/search?locale=en")
      .then((response) => response.json())
      .then((data) => setCoins(data.coins));
  }, []);

  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
    endpoint
      ? (index) =>
          `https://dmc8ptcuv1dn8.cloudfront.net/api/transactions/search/${endpoint}&page=${index}`
      : null,
    fetcher
  );
  // if (!data) return "Loading...";
  // const transactions = data ? [].concat(...data) : [];

  const transactions = data;
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < 6);
  const isRefreshing = isValidating && data && data.length === size;
  if (data) {
    let transactionsDisplay = transactions.map((t) => {
      return t["_embedded"]["transactions"].map((transaction) => {
        return (
          <WhaleAlertRow
            key={transaction.whalealertId}
            transaction={transaction}
          />
        );
      });
    });
  }

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
          {coins ? (
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
          ) : (
            <Box sx={{ "& > img": { mr: 2, flexShrink: 0 } }}>
              <Skeleton animation="wave" />
              <Skeleton animation="wave" />
              <Skeleton animation="wave" />
              <Skeleton animation="wave" />
              <Skeleton animation="wave" />
            </Box>
          )}
        </OuterElementContext.Provider>
      </div>
    );
  });

  return (
    <Card {...rest}>
      <CardHeader title="Biggest Whale Alerts" />
      <Box sx={{ m: 1 }}>
        <Grid container>
          <Grid item xs={8} md={4} sx={{ mb: { xs: 1 } }}>
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
                  setEndpoint(
                    `findAll${bySymbol}ByDayOrderByAmountDesc?theDate=${year}-${month}-${day}${symbol}`
                  );
                  setFilterBy("Day");
                }}
              >
                24h
              </ToggleButton>
              <ToggleButton
                sx={{ pl: { md: 2, xs: 1 }, pr: { md: 2, xs: 1 } }}
                value="30d"
                onClick={() => {
                  setEndpoint(
                    `findAll${bySymbol}ByMonthOrderByAmountDesc?theDate=${year}-${month}${symbol}`
                  );
                  setFilterBy("Month");
                }}
              >
                30d
              </ToggleButton>
              <ToggleButton
                sx={{ pl: { md: 2, xs: 1 }, pr: { md: 2, xs: 1 } }}
                value="1y"
                onClick={() => {
                  setEndpoint(
                    `findAll${bySymbol}ByYearOrderByAmountDesc?theDate=${year}${symbol}`
                  );
                  setFilterBy("Year");
                }}
              >
                1y
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          <Grid item xs={4} md={4}>
            <DatePicker
              label="Choose a date"
              value={value}
              onChange={(newValue) => {
                let calDay = newValue.getDate();
                let calMonth = newValue.getMonth() + 1;
                calMonth = calMonth < 10 ? `0${calMonth}` : `${calMonth}`;
                let calYear = newValue.getFullYear();
                setValue(newValue);
                switch (filterBy) {
                  case "Day":
                    setEndpoint(
                      `findAll${bySymbol}By${filterBy}OrderByAmountDesc?theDate=${calYear}-${calMonth}-${calDay}${symbol}`
                    );
                    break;
                  case "Month":
                    setEndpoint(
                      `findAll${bySymbol}By${filterBy}OrderByAmountDesc?theDate=${calYear}-${calMonth}${symbol}`
                    );
                    break;
                  case "Year":
                    setEndpoint(
                      `findAll${bySymbol}By${filterBy}OrderByAmountDesc?theDate=${calYear}${symbol}`
                    );
                    break;
                  default:
                    setEndpoint(
                      `findAll${bySymbol}By${filterBy}OrderByAmountDesc?theDate=${calYear}-${calMonth}-${calYear}${symbol}`
                    );
                    break;
                }
                calDay = calDay < 10 ? `0${calDay}` : `${calDay}`;
                setDay(calDay);
                setMonth(calMonth);
                setYear(calYear);
              }}
              renderInput={(params) => (
                <TextField
                  size="small"
                  sx={{ width: { md: 300 } }}
                  fontSize="small"
                  {...params}
                />
              )}
            />
          </Grid>
          <Grid item md={4} xs={12}>
            {coins && !propSymbol ? (
              <Autocomplete
                id="virtualize-demo"
                isOptionEqualToValue={(option, value) => option === value}
                size="small"
                sx={{ width: { md: 300 } }}
                disablePortal
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
                  setSymbolValue(newValue ? newValue.symbol.toLowerCase() : "");
                  let symb = newValue
                    ? `&theSymbol=${
                        newValue ? newValue.symbol.toLowerCase() : ""
                      }`
                    : "";
                  let bySymb = newValue ? "BySymbol" : "";
                  setBySymbol(bySymb);
                  setSymbol(symb);
                  switch (filterBy) {
                    case "Day":
                      setEndpoint(
                        `findAll${bySymb}By${filterBy}OrderByAmountDesc?theDate=${year}-${month}-${day}${symb}`
                      );
                      break;
                    case "Month":
                      setEndpoint(
                        `findAll${bySymb}By${filterBy}OrderByAmountDesc?theDate=${year}-${month}${symb}`
                      );
                      break;
                    case "Year":
                      setEndpoint(
                        `findAll${bySymb}By${filterBy}OrderByAmountDesc?theDate=${year}${symb}`
                      );
                      break;
                    default:
                      setEndpoint(
                        `findAll${bySymb}By${filterBy}OrderByAmountDesc?theDate=${year}-${month}-${day}${symb}`
                      );
                      break;
                  }
                }}
              />
            ) : null}
          </Grid>
        </Grid>
      </Box>
      <PerfectScrollbar>
        {data ? (
          <Box>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Timestamp</TableCell>
                  <TableCell>Symbol</TableCell>
                  <TableCell>From</TableCell>
                  <TableCell>To</TableCell>
                  <TableCell>Value</TableCell>
                  <TableCell>USD</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{transactionsDisplay}</TableBody>
            </Table>
          </Box>
        ) : (
          <></>
        )}
      </PerfectScrollbar>

      <div component="div">
        <p>
          <Button
            disabled={isLoadingMore || isReachingEnd}
            onClick={() => setSize(size + 1)}
          >
            {isLoadingMore
              ? "loading..."
              : isReachingEnd
              ? "no more transactions"
              : "load more"}
          </Button>
          <Button
            disabled={isRefreshing}
            onClick={() => {
              mutate();
              setSize(1);
            }}
          >
            {isRefreshing ? "refreshing..." : "refresh"}
          </Button>
          <Button disabled={!size} onClick={() => setSize(0)}>
            clear
          </Button>
        </p>
      </div>
    </Card>
  );
};
