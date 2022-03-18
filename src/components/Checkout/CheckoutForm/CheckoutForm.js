import React, { useState } from "react";
import { Input } from "components/UI/Inputs/Inputs";
import ModalButtons from "components/UI/Modal/ModalButtons/ModalButtons";
import { setActionStatus } from "store/ui/uiActions";
import { validateCheckoutForm } from "utils/validators";
import { Grid, Typography } from "@material-ui/core";

const CheckoutForm = ({ onSubmit, onClose, onOrderSuccess }) => {
  const [userInput, setUserInput] = useState({
    cardName: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
  });
  const [errors, setError] = useState({
    cardName: false,
    cardNumber: false,
    expiryMonth: false,
    expiryYear: false,
    cvv: false,
  });

  const saveValue = (e, id) => {
    setUserInput((prevState) => {
      return { ...prevState, [id]: e.target.value };
    });
  };

  const submitHandler = () => {
    const valData = validateCheckoutForm(userInput);
    setError(valData.allErrors);
    if (valData.errorCount === 0) {
      onClose();
      onOrderSuccess();
    } else {
      setActionStatus("error", "Please check the form for errors!");
    }
  };

  return (
    <Grid item container style={{ width: "40em", marginLeft: "1em" }}>
      <Grid item>
        <Typography variant="h4" color="primary">
          Payment Details
        </Typography>
      </Grid>
      <form onSubmit={submitHandler}>
        <Grid item container>
          <Grid item>
            <Input
              label="Name on Card"
              type="text"
              id="cardName"
              value={userInput.cardName}
              onChange={(e) => saveValue(e, "cardName")}
              error={errors.cardName.length > 0}
              helperText={errors.cardName}
            />
          </Grid>

          <Grid item>
            <Input
              label="Card Number"
              type="text"
              id="cardNumber"
              value={userInput.cardNumber}
              onChange={(e) => saveValue(e, "cardNumber")}
              error={errors.cardNumber.length > 0}
              helperText={errors.cardNumber}
            />
          </Grid>

          <Grid item container spacing={5}>
            <Grid item>
              <Input
                label="Expiry month"
                type="number"
                id="expiryMonth"
                value={userInput.expiryMonth}
                onChange={(e) => saveValue(e, "expiryMonth")}
                error={errors.expiryMonth.length > 0}
                helperText={errors.expiryMonth}
                width="15em"
              />
            </Grid>

            <Grid item>
              <Input
                label="Expiry year"
                type="number"
                id="expiryYear"
                value={userInput.expiryYear}
                onChange={(e) => saveValue(e, "expiryYear")}
                error={errors.expiryYear.length > 0}
                helperText={errors.expiryYear}
                width="15em"
              />
            </Grid>

            <Grid item>
              <Input
                label="CCV"
                type="number"
                id="cvv"
                value={userInput.cvv}
                onChange={(e) => saveValue(e, "cvv")}
                error={errors.cvv.length > 0}
                helperText={errors.cvv}
                width="5em"
              />
            </Grid>
          </Grid>

          <ModalButtons
            onSubmit={submitHandler}
            onClose={onClose}
            submitButtonText="Order"
          />
        </Grid>
      </form>
    </Grid>
  );
};

export default CheckoutForm;
