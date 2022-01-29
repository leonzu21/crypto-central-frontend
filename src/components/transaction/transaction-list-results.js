import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { format } from "date-fns";
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
  Typography,
} from "@mui/material";
import { getInitials } from "../../utils/get-initials";

export const TransactionListResults = ({ transactions, ...rest }) => {
  const [selectedTransactionIds, setSelectedTransactionIds] = useState([]);
  const [limit, setLimit] = useState(100);
  const [page, setPage] = useState(0);

  console.log(transactions);

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
                <TableCell>Timestamp</TableCell>
                <TableCell>Symbol</TableCell>
                <TableCell>From</TableCell>
                <TableCell>To</TableCell>
                <TableCell>Value</TableCell>
                <TableCell>USD</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.slice(0, limit).map((transaction) => {
                console.log(transaction.id);
                return (
                  <TableRow
                    hover
                    key={transaction.id}
                    selected={selectedTransactionIds.indexOf(transaction.id) !== -1}
                  >
                    <TableCell>{transaction.timestamp}</TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        <Avatar src={transaction.avatarUrl} sx={{ mr: 2 }}>
                          {getInitials(transaction.symbol)}
                        </Avatar>
                        <Typography color="textPrimary" variant="body1">
                          {transaction.symbol}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell
                      style={{
                        color: transaction.fromOwner ? "green" : "black",
                      }}
                    >
                      {transaction.fromOwner ? transaction.fromOwner : "unknown"}
                    </TableCell>
                    <TableCell
                      style={{
                        color: transaction.toOwner ? "green" : "black",
                      }}
                    >
                      {transaction.toOwner ? transaction.toOwner : "unknown"}
                    </TableCell>
                    <TableCell>{transaction.amount.toLocaleString()}</TableCell>
                    <TableCell>{transaction.amountUsd.toLocaleString()}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={transactions.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[100, 250, 500]}
      />
    </Card>
  );
};

TransactionListResults.propTypes = {
  transactions: PropTypes.array.isRequired,
};
