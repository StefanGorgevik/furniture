import React, { useState, useEffect, useCallback } from "react";

import { connect } from "react-redux";
import { IS_USER_LOGGED } from "store/auth/authTypes";

function Authenticator({ children, dispatch }) {
  const [loading, setLoading] = useState(false);

  const handleAuthCheck = useCallback(() => {
    dispatch({ type: IS_USER_LOGGED });
    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    handleAuthCheck();
  }, [handleAuthCheck]);

  return (
    <div style={{ width: "100%", height: " 100%" }}>{!loading && children}</div>
  );
}

export default connect(null)(Authenticator);
