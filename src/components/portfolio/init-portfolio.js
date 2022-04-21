import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import { Button, CircularProgress } from "@mui/material";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { portfolioService, alertService } from "../../services";

const InitPortfolio = (props) => {
  const router = useRouter();

  // form validation rules
  const validationSchema = Yup.object().shape({
    // name: Yup.string().required("Name is required"),
    // description: Yup.string().required("Description is required"),
    // birthday: Yup.string().required("Birthday is required"),
    // confidenceLevel: Yup.string()
    //   .required("Confidence is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState, control } =
    useForm(formOptions);
  const { errors } = formState;

  function onSubmit(data) {
    return createPortfolio(data, props.userSession.session.accessToken);
  }

  function createPortfolio(data, token) {
    return portfolioService
      .create(data, token)
      .then(() => {props.submitForm()})
      .then(() => {
        alertService.success("Portfolio initialized", {
          keepAfterRouteChange: true,
        });
        router.push("./portfolio");
      })
      .catch(alertService.error);
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="hidden"
          {...register("user")}
          value={props.userSession.session.userId}
        />

        <Button
          type="submit"
          disabled={formState.isSubmitting}
          color="primary"
          variant="contained"
          sx={{ mr: 1 }}
        >
          {formState.isSubmitting && (
            <CircularProgress size="small" color="error" sx={{ p: 1 }} />
          )}
          Initialize
        </Button>
      </form>
    </>
  );
};

export default InitPortfolio;
