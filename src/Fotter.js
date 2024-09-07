import React from "react";
import "./App.css";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FacebookIcon from "@mui/icons-material/Facebook";
import IconButton from "@mui/material/IconButton";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
export default function Fotter() {
  return (
    <>
      <div className="cont-footer">
        <Grid container spacing={2} columns={16}>
          <Grid className="typBody" item xs={8}>
            <div className="typBody">
              <Typography
                style={{ fontFamily: " RubicMd" }}
                variant="body1"
                gutterBottom
                className="font-typ"
              >
                <span style={{ color: "#f44336" }}>The Climate of Syria:</span>{" "}
                Syria has a diverse climate. The coastal areas enjoy a
                Mediterranean climate with mild, wet winters and hot, dry
                summers. Inland regions experience a more arid climate with very
                hot summers and cold winters. The mountainous areas receive more
                rain and have cooler temperatures.
              </Typography>
            </div>
          </Grid>
          <Grid item xs={8}>
            <div className="typBody2">
              <img
                alt="map of syria"
                title="map of syria"
                style={{ borderRadius: "10px" }}
                src="https://th.bing.com/th/id/OIP.TVfoiFcGyNYwjWeDkkb8LQEsD4?rs=1&pid=ImgDetMain"
              />
            </div>
          </Grid>
        </Grid>
      </div>
      <div className="footer">
        <div className="footer-icon">
          <IconButton href="https://www.facebook.com/hidra.king.56">
            <FacebookIcon />
          </IconButton>
          <IconButton href="https://www.linkedin.com/in/hidra-ayash-6196142aa/">
            <LinkedInIcon />
          </IconButton>
          <IconButton href="https://github.com/Hidra-Ayash">
            <GitHubIcon />
          </IconButton>
        </div>
        <h6>
          Copyright 2024|2025 © . All Right is Reversed by Engineer Hidra ayash
        </h6>
      </div>{" "}
    </>
  );
}
