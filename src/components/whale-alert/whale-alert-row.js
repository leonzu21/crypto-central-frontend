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
    Button,
    ButtonGroup,
  } from "@mui/material";

const WhaleAlertRow = ({ transaction, ...rest }) => {
  return (
    <TableRow hover>
      <TableCell>{transaction.timestamp}</TableCell>
      <TableCell>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
          }}
        >
          <Typography color="textPrimary" variant="body1">
            {transaction.symbol}
          </Typography>
        </Box>
      </TableCell>
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
