import { TableCell, TableRow } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from '@mui/material';


import moment from "moment";

const WhaleAlertRow = ({ transaction, ...rest }) => {
  const theme = useTheme();
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
          color: transaction.fromOwner ? theme.palette.primary.main : theme.palette.secondary.main,
        }}
      >
        {transaction.fromOwner ? transaction.fromOwner : "wallet"}
      </TableCell>
      <TableCell
        style={{
          color: transaction.toOwner ? theme.palette.primary.main : theme.palette.secondary.main,
        }}
      >
        {transaction.toOwner ? transaction.toOwner : "wallet"}
      </TableCell>
      <TableCell>{transaction.amount.toLocaleString()}</TableCell>
      <TableCell>{`$${transaction.amountUsd.toLocaleString()}`}</TableCell>
    </TableRow>
  );
};

export default WhaleAlertRow;
