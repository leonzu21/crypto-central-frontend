import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { getInitials } from '../../utils/get-initials';

export const CoinListResults = ({ coins, ...rest }) => {
  const [selectedCoinIds, setSelectedCoinIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  console.log(coins);

  const handleSelectAll = (event) => {
    let newSelectedCoinIds;

    if (event.target.checked) {
      newSelectedCoinIds = coins.map((coin) => coin.id);
    } else {
      newSelectedCoinIds = [];
    }

    setSelectedCoinIds(newSelectedCoinIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCoinIds.indexOf(id);
    let newSelectedCoinIds = [];

    if (selectedIndex === -1) {
      newSelectedCoinIds = newSelectedCoinIds.concat(selectedCoinIds, id);
    } else if (selectedIndex === 0) {
      newSelectedCoinIds = newSelectedCoinIds.concat(selectedCoinIds.slice(1));
    } else if (selectedIndex === selectedCoinIds.length - 1) {
      newSelectedCoinIds = newSelectedCoinIds.concat(selectedCoinIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCoinIds = newSelectedCoinIds.concat(
        selectedCoinIds.slice(0, selectedIndex),
        selectedCoinIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCoinIds(newSelectedCoinIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCoinIds.length === coins.length}
                    color="primary"
                    indeterminate={
                      selectedCoinIds.length > 0
                      && selectedCoinIds.length < coins.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Symbol
                </TableCell>
                <TableCell>
                  Contract
                </TableCell>
                <TableCell>
                  $ Value
                </TableCell>
                {/* <TableCell>
                  Registration date
                </TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {coins.slice(0, limit).map((coin) => (
                <TableRow
                  hover
                  key={coin.id}
                  selected={selectedCoinIds.indexOf(coin.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCoinIds.indexOf(coin.id) !== -1}
                      onChange={(event) => handleSelectOne(event, coin.id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Avatar
                        src={coin.avatarUrl}
                        sx={{ mr: 2 }}
                      >
                        {getInitials(coin.name)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {coin.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {coin.symbol}
                  </TableCell>
                  <TableCell>
                    {coin.contract}
                  </TableCell>
                  <TableCell>
                    {coin.value}
                  </TableCell>
                  {/* <TableCell>
                    {format(coin.createdAt, 'dd/MM/yyyy')}
                  </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={coins.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

CoinListResults.propTypes = {
  coins: PropTypes.array.isRequired
};
