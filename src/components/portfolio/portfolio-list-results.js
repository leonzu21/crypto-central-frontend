import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import NextLink from "next/link";
import DatePicker from "@mui/lab/DatePicker";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Avatar,
  Box,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  TextField,
  TableContainer,
  Paper,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";

import { portfolioTransactionService, alertService } from "src/services";

import moment from "moment";

import { getHalId } from "src/utils/get_hal_id";

export const PortfolioListResults = (props) => {
  const [open, setOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogText, setDialogText] = useState("");
  const [dialogContent, setDialogContent] = useState("");
  const [isAddMode, setIsAddMode] = useState(true);
  const [transactionId, setTransactionId] = useState(null);
  const [total2binance, setTotal2binance] = useState(0);

  const router = useRouter();

  // form validation rules
  const validationSchema = Yup.object().shape({
    coinAmount: Yup.number().required("Amount is required"),
    buyPrice:
      dialogContent == "cointransaction"
        ? Yup.number().required("Buy Price is required")
        : null,
    symbol:
      dialogContent == "cointransaction"
        ? Yup.string().required("Coin Symbol is required")
        : null,
    timestamp: Yup.date().required("Date is required"),
    // confidenceLevel: Yup.string()
    //   .required("Confidence is required"),
  });
  let formOptions = {
    resolver: yupResolver(validationSchema),
  };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, setValue, formState, control } =
    useForm(formOptions);
  const { errors } = formState;

  function onSubmit(data) {
    return isAddMode
      ? createPortfolioTransaction(data, props.userSession.session.accessToken)
      : updatePortfolioTransaction(
          transactionId,
          data,
          props.userSession.session.accessToken
        );
  }

  function createPortfolioTransaction(data, token) {
    return portfolioTransactionService
      .create(data, token)
      .then(() => {
        props.submitForm();
      })
      .then(() => {
        alertService.success("Transaction added", {
          keepAfterRouteChange: true,
        });
        router.push("./portfolio");
      })
      .catch(alertService.error)
      .then(setOpen(false))
      .then(reset);
  }

  function updatePortfolioTransaction(id, data, token) {
    return portfolioTransactionService
      .update(id, data, token)
      .then(() => {
        props.submitForm();
      })
      .then(() => {
        alertService.success("Project updated", { keepAfterRouteChange: true });
        router.push("./portfolio");
      })
      .catch(alertService.error)
      .then(setOpen(false))
      .then(reset);
  }

  function handleDelete(transactionId) {
    return portfolioTransactionService
      .delete(transactionId, props.userSession.session.accessToken)
      .then(() => {
        props.submitForm();
      })
      .then(() => {
        alertService.success("Transaction deleted", {
          keepAfterRouteChange: true,
        });
        router.push("./portfolio");
      })
      .catch(alertService.error);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  let extraFields = null;
  if (dialogContent == "cointransaction") {
    extraFields = (
      <>
        <Grid item lg={6} md={6} xs={12}>
          <TextField
            autoComplete="off"
            fullWidth
            // autoFocus
            InputLabelProps={{ shrink: true }}
            label="Symbol"
            type="text"
            name="symbol"
            {...register("symbol")}
            variant="standard"
            margin="dense"
          />
          <span style={{ color: "red" }}>{errors.symbol?.message}</span>
        </Grid>
        <Grid item lg={6} md={6} xs={12}>
          <TextField
            autoComplete="off"
            fullWidth
            //   autoFocus
            InputLabelProps={{ shrink: true }}
            label="Buy Price ($)"
            type="number"
            name="buyPrice"
            inputProps={{ step: "0.000001", lang: "en-US" }}
            {...register("buyPrice")}
            variant="standard"
            margin="dense"
          />
          <span style={{ color: "red" }}>{errors.buyPrice?.message}</span>
        </Grid>
      </>
    );
  }
  return (
    <Grid container spacing={3}>
      <Grid item lg={4} md={6} xs={12}>
        <Box>
          <Typography sx={{ m: 1 }} variant="h5">
            Fiat 2 Binance
          </Typography>
          <Card>
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Amount ($)</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.transactions.map((transaction) => {
                    if (transaction.type == "fiat2binance")
                      return (
                        <TableRow hover key={getHalId(transaction)}>
                          <TableCell>
                            {moment(transaction.timestamp).format("yyyy-MM-DD")}
                          </TableCell>
                          <TableCell>
                            {transaction.coinAmount.toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <IconButton
                              size="small"
                              onClick={() =>
                                handleDelete(getHalId(transaction))
                              }
                            >
                              <DeleteIcon fontSize="small" color="error" />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={() => {
                                setDialogTitle("Fiat to Binance");
                                setDialogText(
                                  "Add new Fiat2Binance transaction."
                                );
                                setDialogContent("fiat2binance");
                                setIsAddMode(false);
                                setTransactionId(getHalId(transaction));
                                handleClickOpen();
                                setValue("coinAmount", transaction.coinAmount);
                                setValue("timestamp", transaction.timestamp);
                              }}
                            >
                              <EditIcon fontSize="small" color="secondary" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                  })}
                  <TableRow>
                    <TableCell colSpan={1}>Total</TableCell>
                    <TableCell>{props.totalBinance.toLocaleString()}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Button
              onClick={() => {
                setDialogTitle("Fiat to Binance");
                setDialogText("Add new Fiat2Binance transaction.");
                setDialogContent("fiat2binance");
                setIsAddMode(true);
                setTransactionId(null);
                handleClickOpen();
              }}
            >
              Add new
            </Button>
          </Card>
        </Box>
      </Grid>

      <Grid item lg={8} md={6} xs={12}>
        <Box>
          <Typography sx={{ m: 1 }} variant="h5">
            Coin Transactions
          </Typography>
          <Card>
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Coin</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Buy Price ($)</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.transactions.map((transaction) => {
                    if (transaction.type == "cointransaction")
                      return (
                        <TableRow hover key={getHalId(transaction)}>
                          <TableCell>
                            {moment(transaction.timestamp).format("yyyy-MM-DD")}
                          </TableCell>
                          <TableCell>{transaction.symbol}</TableCell>
                          <TableCell>
                            {transaction.coinAmount.toLocaleString()}
                          </TableCell>
                          <TableCell>
                            {transaction.buyPrice.toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <IconButton
                              size="small"
                              onClick={() =>
                                handleDelete(getHalId(transaction))
                              }
                            >
                              <DeleteIcon fontSize="small" color="error" />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={() => {
                                setDialogTitle("Coin Transaction");
                                setDialogText("Add new coin transaction.");
                                setDialogContent("cointransaction");
                                setIsAddMode(false);
                                setTransactionId(getHalId(transaction));
                                handleClickOpen();
                                setValue("coinAmount", transaction.coinAmount);
                                setValue("timestamp", transaction.timestamp);
                                setValue("buyPrice", transaction.buyPrice);
                                setValue("symbol", transaction.symbol);
                              }}
                            >
                              <EditIcon fontSize="small" color="secondary" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <Button
              onClick={() => {
                setDialogTitle("Coin Transaction");
                setDialogText("Add new coin transaction.");
                setDialogContent("cointransaction");
                setIsAddMode(true);
                setTransactionId(null);
                handleClickOpen();
              }}
            >
              Add new
            </Button>
          </Card>
        </Box>
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogContent>
            <DialogContentText>{dialogText}</DialogContentText>
            <input
              type="hidden"
              {...register("portfolio_id")}
              value={getHalId(props.portfolio)}
            />
            <input type="hidden" {...register("type")} value={dialogContent} />
            <Grid container spacing={3}>
              {extraFields}
              <Grid item md={6} xs={12}>
                <TextField
                  autoComplete="off"
                  fullWidth
                  //   autoFocus
                  InputLabelProps={{ shrink: true }}
                  label="Amount"
                  type="number"
                  name="coinAmount"
                  inputProps={{ step: "0.000001", lang: "en-US" }}
                  {...register("coinAmount")}
                  variant="standard"
                  margin="dense"
                />
                <span style={{ color: "red" }}>
                  {errors.coinAmount?.message}
                </span>
              </Grid>
              <Grid item md={6} xs={12}>
                <Controller
                  control={control}
                  name="timestamp"
                  {...register("timestamp")}
                  defaultValue={null}
                  ref={null}
                  margin="dense"
                  render={({ field: { onChange, value } }) => (
                    <DatePicker
                      label="Timestamp"
                      name="timestamp"
                      value={value}
                      onChange={onChange}
                      renderInput={(params) => (
                        <TextField
                          margin="dense"
                          InputLabelProps={{ shrink: true }}
                          variant="standard"
                          fullWidth
                          {...params}
                        />
                      )}
                    />
                  )}
                />
                <span style={{ color: "red" }}>
                  {errors.timestamp?.message}
                </span>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              type="submit"
              disabled={formState.isSubmitting}
              //   onClick={handleClose}
            >
              {isAddMode ? "Add" : "Save"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Grid>
  );
};
