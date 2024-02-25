import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import MD3Button from "@mui/material-next/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmationModal from "./ConfirmationModal";

const Amount = ({
  data,
  price,
  setPrice,
  share,
  setShare,
  selectedSecurityType,
  setSelectedSecurityType,
  selected,
  setSelected,
}) => {
  const [symbolOptions, setSymbolOptions] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const handleBuyClick = () => {
    if (!selectedSecurityType || !share) {
      toast.error("Please fill out the required values");
    } else if (!selected) {
      toast.error("Select Market type!");
    } else {
      setModalOpen(true);
    }
  };

  useEffect(() => {
    if (data && data["05. price"]) {
      setPrice(parseFloat(data["05. price"]));
    }
    if (data && data["01. symbol"]) {
      setSymbolOptions([data["01. symbol"]]);
    }
  }, [data]);

  const formattedPrice = price?.toFixed(2);
  const final = formattedPrice * share;
  const finalFormatted = final?.toFixed(2);

  return (
    <div>
      <Box>
        <Card
          sx={{
            minWidth: 275,
            display: "flex",
            flexDirection: "column",
            marginTop: "15px",
            backgroundColor: "#333", // Dark background color
            color: "#fff", // Light text color
            "@media (min-width:600px)": {
              flexDirection: "row", // Switch to row layout for screens larger than 600px
            },
          }}
        >
          <CardContent>
            <Typography variant="h5" component="div" sx={{ mb: 1.5 }}>
              {selectedSecurityType}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="white">
              {selectedSecurityType
                ? selectedSecurityType
                : "Select security type"}
            </Typography>
          </CardContent>

          <Divider
            orientation="vertical"
            flexItem
            sx={{
              marginLeft: "180px",
              marginRight: "auto",
              borderWidth: "2px",
              borderColor: "#555",
              height: "70px",
              marginTop: "auto",
              marginBottom: "auto",
              animation: "blink 2s infinite",
            }}
          />

          <CardContent sx={{ marginLeft: "auto" }}>
            <Typography variant="h3" component="div" sx={{ mt: 1.5 }}>
              {selectedSecurityType
                ? `$ ${formattedPrice !== null ? formattedPrice : "-"}`
                : "$ - -"}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <Box sx={{ margin: "30px" }}>
        <Typography
          sx={{ mt: "2px" }}
          color="#807f7d"
          variant="subtitle1"
          gutterBottom
        >
          Estimated Trading amount:
        </Typography>
        {selectedSecurityType && (
          <Typography
            sx={{ mt: "2px" }}
            color="white"
            variant="subtitle1"
            gutterBottom
          >
            Buy {share ? share : "Shares"} X {formattedPrice} {symbolOptions} ={" "}
            {finalFormatted}
          </Typography>
        )}
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <MD3Button variant={"filled"} onClick={handleBuyClick}>
          Buy
        </MD3Button>
      </Box>

      <ConfirmationModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={() => {
          toast.success("Purchase successful!");
          setShare("");
          setSelected("");
          setSelectedSecurityType("");
          setModalOpen(false);
        }}
        onDecline={() => setModalOpen(false)}
        selected={selected}
        price={formattedPrice}
        share={share}
        security={selectedSecurityType}
      />
      <style>
        {`
          @keyframes blink {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Amount;
