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
};

export default WhaleAlertRow;
