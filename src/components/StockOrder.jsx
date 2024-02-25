import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  Icon,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { tokens } from "../theme";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Linebar from "../utils/Linebar";
import ConfirmationModal from "./ConfirmationModal";
import Topbar from "../constants/Topbar";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import LimitModal from "./LimitModal";

const StockOrder = ({ data }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const globalQuoteData = data["Global Quote"];

  const [selectedChip, setSelectedChip] = useState(null);
  const [numberOfShares, setNumberOfShares] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenLimit, setModalOpenLimit] = useState(false);
  const [sharesError, setSharesError] = useState(false);
  const [securityError, setSecurityError] = useState(false);
  const [chipError, setChipError] = useState(false);
  const [limitChipError, setLimitChipError] = useState(false);
  const [security, setSecurity] = useState(globalQuoteData["01. symbol"] || "");
  const [limit, setLimit] = useState(0);

  if (!data || !data["Global Quote"]) {
    return <div>No data available.</div>;
  }

  if (!globalQuoteData["01. symbol"]) {
    return <div>Symbol data not available.</div>;
  }

  const cardData = {
    title: globalQuoteData["01. symbol"],
    subtitle: globalQuoteData["01. symbol"],
    price: globalQuoteData["05. price"],
    change: parseFloat(globalQuoteData["09. change"]),
  };

  const isPositiveChange = cardData?.change > 0;

  const handleInput = (event) => {
    const inputShares = event.target.value.replace(/[^0-9]/g, "");
    setNumberOfShares(inputShares);
    setSharesError(false);
  };

  const handleInputSecurity = (event) => {
    const inputSecurity = event.target.value;
    setSecurity(inputSecurity);
    if (security != globalQuoteData["01. symbol"]) {
      setSecurityError(true);
    }
    setSharesError(false);
  };

  console.log(securityError);

  const handleChipClick = (chipLabel) => {
    setSelectedChip(chipLabel === selectedChip ? null : chipLabel);
    setChipError(false);
    if (chipLabel === "Limit") {
      setModalOpenLimit(true);
    }
  };

  const handleBuyClick = () => {
    if (!numberOfShares) {
      setSharesError(true);
    }

    if (!selectedChip) {
      setChipError(true);
    }

    if (sharesError || chipError || securityError) {
      return;
    }
    if (!selectedChip || !numberOfShares) {
      return;
    }

    if (selectedChip === "Limit" && limit < finalFormatted) {
      setLimitChipError(true);
      return;
    }

    setModalOpen(true);
  };

  const finalFormatted = (cardData?.price * numberOfShares).toFixed(2) || "";

  console.log(limit);

  return (
    <div>
      <Topbar title="Stock Order" className="fixed top-0 left-0 right-0" />
      <Box sx={{ mt: 8 }}>
        <Box>
          <TextField
            label="Security"
            type="text"
            onInput={handleInputSecurity}
            variant="outlined"
            value={security}
            error={securityError}
            // selected
            // error={sharesError}
            sx={{
              width: "100%",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor:
                    theme.palette.mode === "light" ? "black" : colors.grey[400],
                },
                "&:hover fieldset": {
                  borderColor:
                    theme.palette.mode === "light" ? "black" : colors.grey[600],
                },
              },
              color:
                theme.palette.mode === "light" ? "black" : colors.grey[400],
            }}
          />
        </Box>
        <Box
          sx={{ mt: "10px" }}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gap="10px"
        >
          <TextField
            label="Shares"
            type="number"
            onInput={handleInput}
            value={numberOfShares}
            variant="outlined"
            error={sharesError}
            // selected
            // InputLabelProps={{ style: { color: colors.white[100] } }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor:
                    theme.palette.mode === "light" ? "black" : colors.grey[400],
                },
                "&:hover fieldset": {
                  borderColor:
                    theme.palette.mode === "light" ? "black" : colors.grey[600],
                },
              },
              color:
                theme.palette.mode === "light" ? "black" : colors.grey[400],
            }}
          />
          <Chip
            label="Market"
            variant={selectedChip === "Market" ? "outlined" : "filled"}
            onClick={() => handleChipClick("Market")}
            sx={{
              borderColor: chipError
                ? theme.palette.error.main
                : theme.palette.mode === "light"
                ? "black"
                : colors.grey[400],
              color: chipError
                ? theme.palette.error.main
                : theme.palette.mode === "light"
                ? "black"
                : colors.grey[400],
              "& .MuiChip-label": {
                color: chipError ? "#ff0000" : "#aa9bcc",
              },
            }}
            error={chipError}
          />

          <Chip
            label="Limit"
            variant={selectedChip === "Limit" ? "outlined" : "filled"}
            onClick={() => handleChipClick("Limit")}
            sx={{
              borderColor: chipError
                ? theme.palette.error.main
                : theme.palette.mode === "light"
                ? "black"
                : colors.grey[400],
              color: chipError
                ? theme.palette.error.main
                : theme.palette.mode === "light"
                ? "black"
                : colors.grey[400],
              "& .MuiChip-label": {
                color: chipError || limitChipError ? "#ff0000" : "#aa9bcc",
              },
            }}
            error={chipError}
          />
          <Chip
            label="Stop"
            variant={selectedChip === "Stop" ? "outlined" : "filled"}
            onClick={() => handleChipClick("Stop")}
            sx={{
              borderColor: chipError
                ? theme.palette.error.main
                : theme.palette.mode === "light"
                ? "black"
                : colors.grey[400],
              color: chipError
                ? theme.palette.error.main
                : theme.palette.mode === "light"
                ? "black"
                : colors.grey[400],
              "& .MuiChip-label": {
                color: chipError ? "#ff0000" : "#aa9bcc",
              },
            }}
            error={chipError}
          />
        </Box>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mt: 3, mb: 3 }}
        >
          <Card
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: theme.palette.mode === "light" ? 4 : 8,
              width: "100%",
              // backgroundColor: colors.grey[400],
              backgroundColor: "#332d32",
            }}
          >
            <CardContent>
              <Typography
                variant="h2"
                component="div"
                color={colors.white[100]}
              >
                {cardData?.title}
              </Typography>
              <Typography variant="h4" color={colors.white[100]}>
                {cardData?.subtitle}
              </Typography>
            </CardContent>
            <Box sx={{ display: "flex", alignItems: "center", padding: 2 }}>
              <Typography
                variant="h2"
                component="div"
                color={colors.white[100]}
              >
                $ {Number(cardData?.price)?.toFixed(0)}
              </Typography>
              <Icon>
                {isPositiveChange ? (
                  <ArrowUpwardIcon style={{ color: "green" }} />
                ) : (
                  <ArrowDownwardIcon style={{ color: "red" }} />
                )}
              </Icon>
              <Typography
                variant="body2"
                color={isPositiveChange ? "green" : "red"}
              >
                {cardData?.change} %
              </Typography>
            </Box>
          </Card>
        </Box>
        <Container>
          <Box
            sx={{ mt: "10px" }}
            display="flex"
            justifyContent="space-between"
            flexDirection="column"
          >
            <Typography
              sx={{
                color: colors.grey[400],
              }}
              variant="subtitle1"
              gutterBottom
            >
              Estimated Trading amount:
            </Typography>
            <Box
              display="flex"
              justifyContent="space-between"
              flexDirection="column"
              gap="10px"
            >
              <Typography
                sx={{ color: colors.white[100] }}
                color="white"
                variant="subtitle1"
                gutterBottom
              >
                Buy {numberOfShares ? numberOfShares : "Shares"} X $
                {cardData?.price} {cardData?.title}= {finalFormatted}
              </Typography>
            </Box>
          </Box>
        </Container>

        <Box
          display="flex"
          justifyContent="space-between"
          flexDirection="column"
          gap="10px"
          sx={{ mt: 10 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={8}></Grid>
            <Grid itme xs={4}>
              <Button
                variant="contained"
                onClick={handleBuyClick}
                sx={{
                  width: "100%",
                  borderRadius: "20px",
                  backgroundColor: "#684fa5",
                }}
              >
                Buy {cardData?.title}{" "}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <ConfirmationModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={() => {
          setNumberOfShares("");
          setSelectedChip("");
          setModalOpen(false);
          navigate("/order");
        }}
        onDecline={() => setModalOpen(false)}
        selected={selectedChip}
        price={finalFormatted}
        share={numberOfShares}
        security={cardData?.title}
      />
      {selectedChip == "Limit" && (
        <LimitModal
          open={modalOpenLimit}
          onClose={() => setModalOpenLimit(false)}
          onConfirm={() => {
            setLimit("");
            setModalOpenLimit(false);
          }}
          limit={limit}
          setLimit={setLimit}
          onDecline={() => {
            setModalOpenLimit(false);
            setSelectedChip("");
          }}
        />
      )}
    </div>
  );
};

export default StockOrder;
