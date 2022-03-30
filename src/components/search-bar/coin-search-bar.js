import * as React from "react";
import StyledPopper from "../utils/styled-popper";
import NextLink from "next/link";

import { Box, TextField, Typography } from "@mui/material";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { VariableSizeList } from "react-window";

import Autocomplete from "@mui/material/Autocomplete";
import SearchIcon from "@mui/icons-material/Search";

const CoinSearchBar = ({ coins, ...rest }) => {
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
      <NextLink href={`/coins/${dataSet[1].id}`} passHref>
        <a>
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
            <Typography color="secondary" variant="subtitle1">
              {dataSet[1].name} ({dataSet[1].symbol}) #
              {dataSet[1].market_cap_rank}
            </Typography>
          </Box>
        </a>
      </NextLink>
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
    <Autocomplete
      id="virtualize-demo"
      isOptionEqualToValue={(option, value) => option === value}
      size="small"
      freeSolo
      sx={{ width: { md: 300, xs: 300 } }}
      PopperComponent={StyledPopper}
      ListboxComponent={ListboxComponent}
      getOptionLabel={(option) => option.name}
      options={coins}
      renderInput={(params) => (
        <TextField
          {...params}
          label={
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <SearchIcon fontSize="small" />
              <span>Search...</span>
            </div>
          }
          inputProps={{
            ...params.inputProps,
            autoComplete: "off", // disable autocomplete and autofill
          }}
        />
      )}
      renderOption={(props, option) => [props, option]}
    />
  );
};

export default CoinSearchBar;
