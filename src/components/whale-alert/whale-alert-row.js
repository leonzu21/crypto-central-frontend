import { TableCell, TableRow } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

import moment from "moment";

const WhaleAlertRow = ({ transaction, ...rest }) => {
  const isDesktopFormat = useMediaQuery("(min-width:700px)");
  return (
    <TableRow hover>
      {isDesktopFormat ? (
        <TableCell>
          {moment(transaction.timestamp).format("yyyy-MM-DD HH:mm")}
        </TableCell>
      ) : (
        <TableCell>
          {moment(transaction.timestamp).format("dd HH:mm")}
        </TableCell>
      )}
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
