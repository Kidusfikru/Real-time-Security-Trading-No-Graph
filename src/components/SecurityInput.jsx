import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import MD3Button from "@mui/material-next/Button";

const SecurityInput = ({
  data,
  selected,
  setSelected,
  share,
  setShare,
  selectedSecurityType,
  setSelectedSecurityType,
}) => {
  const [symbolOptions, setSymbolOptions] = useState([]);

  useEffect(() => {
    if (data && data["01. symbol"]) {
      setSymbolOptions([data["01. symbol"]]);
    }
  }, [data]);

  const handleTradeTypeChange = (tradeType) => {
    setSelected(tradeType);
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <InputLabel id="security-label" sx={{ color: "white" }}>
              Security
            </InputLabel>
            <Select
              labelId="security-label"
              id="security-select"
              value={selectedSecurityType}
              label="Security"
              onChange={(e) => setSelectedSecurityType(e.target.value)}
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                color: "white",
                width: "100%",
              }}
            >
              {symbolOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={5}>
            <TextField
              required
              id="outlined-basic"
              label="Shares"
              variant="outlined"
              value={share}
              color="primary"
              focused
              InputLabelProps={{
                style: {
                  color: "lightgrey",
                },
              }}
              InputProps={{
                style: {
                  color: "white",
                  backgroundColor: "black",
                },
              }}
              onChange={(e) => {
                setShare(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={2.3}>
            <MD3Button
              variant={selected === "Market" ? "outlined" : "filled"}
              sx={{ color: "white" }}
              onClick={() => handleTradeTypeChange("Market")}
            >
              Market
            </MD3Button>
          </Grid>
          <Grid item xs={2.3}>
            <MD3Button
              variant={selected === "Limit" ? "outlined" : "filled"}
              sx={{ color: "white" }}
              onClick={() => handleTradeTypeChange("Limit")}
            >
              Limit
            </MD3Button>
          </Grid>
          <Grid item xs={2.3}>
            <MD3Button
              variant={selected === "Stop" ? "outlined" : "filled"}
              sx={{ color: "white" }}
              onClick={() => handleTradeTypeChange("Stop")}
            >
              Stop
            </MD3Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default SecurityInput;
