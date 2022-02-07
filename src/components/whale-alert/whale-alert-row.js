import { Box, TableCell, TableRow, Typography } from "@mui/material";

import moment from "moment";

const WhaleAlertRow = ({ transaction, ...rest }) => {
  return (
    <TableRow hover>
      <TableCell>{moment(transaction.timestamp).format("dd HH:mm")}</TableCell>
      <TableCell>{transaction.symbol}</TableCell>
      <TableCell
        style={{
          color: transaction.fromOwner ? "#E65100" : "black",
        }}
      >
        {transaction.fromOwner ? transaction.fromOwner : "wallet"}
      </TableCell>
      <TableCell
        style={{
          color: transaction.toOwner ? "#E65100" : "black",
        }}
      >
        {transaction.toOwner ? transaction.toOwner : "wallet"}
      </TableCell>
      <TableCell>{transaction.amount.toLocaleString()}</TableCell>
      <TableCell>{transaction.amountUsd.toLocaleString()}</TableCell>
    </TableRow>
  );
};

export default WhaleAlertRow;
