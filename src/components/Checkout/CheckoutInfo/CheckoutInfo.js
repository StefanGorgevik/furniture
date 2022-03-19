import { Grid, Typography } from "@material-ui/core";
import React from "react";
import useStyles from "./styles";

const CheckoutInfo = ({ totalPrice, cartItemsInfo }) => {
  const classes = useStyles();

  return (
    <Grid
      item
      container
      className={classes.checkoutInfo}
      justifyContent="space-between"
    >
      <Grid item container alignItems="flex-start" justifyContent="flex-end">
        <ul className={classes.list}>
          {cartItemsInfo.map((item, i) => (
            <li className={classes.listItem} key={i}>
              <Typography variant="caption" color="secondary">
                {item.name}
              </Typography>
              <Typography variant="caption" color="secondary">
                -
              </Typography>
              <Typography
                variant="subtitle2"
                color="secondary"
                style={{ fontSize: "1.5rem" }}
              >
                €{item.price}
              </Typography>
            </li>
          ))}
        </ul>
      </Grid>
      <Grid item container justifyContent="flex-end" alignItems="flex-end">
        <Grid item>
          <Typography
            variant="caption"
            color="primary"
            style={{
              textTransform: "uppercase",
              marginRight: "1em",
            }}
            align="right"
          >
            Final price:
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="caption" color="secondary" align="right">
            {totalPrice}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CheckoutInfo;
