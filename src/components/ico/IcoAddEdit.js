import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import NextLink from "next/link";
import DatePicker from "@mui/lab/DatePicker";
import React from "react";
import { getHalId } from "src/utils/get_hal_id";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Typography,
  Slider,
  iconButtonClasses,
  CircularProgress,
} from "@mui/material";
// import { Link } from 'components';
import { icoService, alertService } from "src/services";

const IcoAddEdit = (props) => {
  const ico = props.ico ? props.ico : null;
  const isAddMode = !ico;
  const router = useRouter();

  // form validation rules
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    // birthday: Yup.string().required("Birthday is required"),
    // confidenceLevel: Yup.string()
    //   .required("Confidence is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // set default form values if user passed in props
  if (!isAddMode) {
    const { ...defaultValues } = ico;
    formOptions.defaultValues = defaultValues;
  }

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState, control } =
    useForm(formOptions);
  const { errors } = formState;

  function onSubmit(data) {
    if (data.birthday) {
      data.birthday =
        data.birthday.length == 10
          ? data.birthday
          : data.birthday.toISOString().slice(0, 10);
    }
    return isAddMode ? createIco(data) : updateIco(getHalId(ico), data);
  }

  const handleRegistration = (data) => alert(JSON.stringify(data));

  function createIco(data) {
    return icoService
      .create(data)
      .then(() => {
        alertService.success("Project added", { keepAfterRouteChange: true });
        router.push(".");
      })
      .catch(alertService.error);
  }

  function updateIco(id, data) {
    return icoService
      .update(id, data)
      .then(() => {
        alertService.success("Project updated", { keepAfterRouteChange: true });
        router.push("..");
      })
      .catch(alertService.error);
  }

  return (
    <>
      <Grid
        container
        spacing={0}
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "80vh", marginBottom: 15, marginTop: 15 }}
      >
        <Grid item md={8} xs={12}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card>
              <CardHeader
                subheader="The information can be edited"
                title={isAddMode ? "Add Project" : "Edit Project"}
              />
              <Divider />
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item md={6} xs={12}>
                    <TextField
                      inputProps={{
                        autoComplete: "off",
                        form: {
                          autoComplete: "off",
                        },
                      }}
                      InputLabelProps={{ shrink: true }}
                      name="name"
                      type="text"
                      {...register("name")}
                      fullWidth
                      label="Name"
                      variant="outlined"
                    />
                    <span style={{ color: "red" }}>{errors.name?.message}</span>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Controller
                      control={control}
                      name="birthday"
                      {...register("birthday")}
                      defaultValue={null}
                      ref={null}
                      render={({ field: { onChange, value } }) => (
                        <DatePicker
                          label="Birthday"
                          name="birthday"
                          value={value}
                          onChange={onChange}
                          renderInput={(params) => (
                            <TextField fullWidth {...params} />
                          )}
                        />
                      )}
                    />

                    <span style={{ color: "red" }}>
                      {errors.birthday?.message}
                    </span>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      autoComplete="off"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      label="Price($)"
                      type="number"
                      name="price"
                      inputProps={{ step: "0.000001", lang: "en-US" }}
                      {...register("price")}
                      variant="outlined"
                    />
                    <span style={{ color: "red" }}>
                      {errors.price?.message}
                    </span>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      autoComplete="off"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      label="Tokens for Sale"
                      name="tokensSale"
                      type="number"
                      inputProps={{ lang: "en-US" }}
                      {...register("tokensSale")}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      autoComplete="off"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      label="Where to Buy"
                      name="buyOn"
                      {...register("buyOn")}
                      type="text"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      autoComplete="off"
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      label="Soft Cap"
                      name="softCap"
                      {...register("softCap")}
                      type="text"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      autoComplete="off"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      label="% of Total Supply"
                      name="centTotal"
                      type="text"
                      {...register("centTotal")}
                      variant="outlined"
                    ></TextField>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      autoComplete="off"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      label="Fundraising Goal($)"
                      name="fundGoal"
                      {...register("fundGoal")}
                      type="number"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      autoComplete="off"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      label="Blockchain"
                      name="blockchain"
                      {...register("blockchain")}
                      type="text"
                      variant="outlined"
                    ></TextField>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      autoComplete="off"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      label="Personal Cap"
                      name="personalCap"
                      type="text"
                      {...register("personalCap")}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      autoComplete="off"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      label="Access"
                      name="access"
                      type="text"
                      {...register("access")}
                      variant="outlined"
                    ></TextField>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      autoComplete="off"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      label="Whitepaper"
                      name="whitepaper"
                      type="text"
                      {...register("whitepaper")}
                      variant="outlined"
                    ></TextField>
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <Typography gutterBottom>Confidence</Typography>
                    <Controller
                      control={control}
                      name="confidenceLevel"
                      {...register("confidenceLevel")}
                      ref={null}
                      defaultValue={5}
                      render={({ field: { onChange, value } }) => (
                        <Slider
                          name="confidenceLevel"
                          aria-label="Confidence"
                          value={value}
                          onChange={onChange}
                          valueLabelDisplay="auto"
                          {...register("confidenceLevel")}
                          step={1}
                          marks
                          min={0}
                          max={10}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      autoComplete="off"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      label="Website"
                      name="website"
                      type="text"
                      {...register("website")}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      autoComplete="off"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      label="Contract"
                      name="contract"
                      type="text"
                      {...register("contract")}
                      variant="outlined"
                    ></TextField>
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <TextField
                      autoComplete="off"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      multiline
                      maxRows={10}
                      label="Description"
                      name="description"
                      {...register("description")}
                      type="text"
                      variant="outlined"
                    ></TextField>
                    <span style={{ color: "red" }}>
                      {errors.description?.message}
                    </span>
                  </Grid>
                </Grid>
              </CardContent>
              <Divider />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  p: 1,
                }}
              >
                <NextLink href={`/icos`}>
                  <Button
                    sx={{ p: 0 }}
                    size="small"
                    color="warning"
                    variant="contained"
                    sx={{ mr: 1 }}
                  >
                    Cancel
                  </Button>
                </NextLink>
                <Button
                  onClick={() => reset(formOptions.defaultValues)}
                  type="button"
                  disabled={formState.isSubmitting}
                  color="secondary"
                  variant="contained"
                  sx={{ mr: 1 }}
                >
                  Reset
                </Button>
                <Button
                  type="submit"
                  disabled={formState.isSubmitting}
                  color="primary"
                  variant="contained"
                  sx={{ mr: 1 }}
                >
                  {formState.isSubmitting && (
                    <CircularProgress
                      size="small"
                      color="error"
                      sx={{ p: 1 }}
                    />
                  )}
                  Save
                </Button>
              </Box>
            </Card>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default IcoAddEdit;
