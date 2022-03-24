import React from "react";
import { Grid } from "@material-ui/core";
import { SubmitButton } from "components/UI/Buttons/Buttons";
import { SecondaryButton } from "components/UI/Buttons/Buttons";
import { useScreenSize } from "hooks/breakpoints";

const ModalButtons = ({ onSubmit, onClose, submitButtonText, cancelText }) => {
  const { matchesSM } = useScreenSize();
  return (
    <Grid
      item
      container
      direction={matchesSM ? "column" : "row"}
      justifyContent={matchesSM ? "center" : "space-around"}
      style={{
        marginTop: "1em",
        marginBottom: "1em",
      }}
    >
      <Grid item>
        <SecondaryButton onClick={onClose}>
          {cancelText ? cancelText : "Cancel"}
        </SecondaryButton>
      </Grid>
      <Grid item>
        <SubmitButton onClick={onSubmit}>{submitButtonText}</SubmitButton>
      </Grid>
    </Grid>
  );
};

export default ModalButtons;
