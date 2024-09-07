/* eslint-disable jsx-a11y/alt-text */
import "./App.css";
// import Test from "./Test";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import NavBar from "./NavBar";
import Fotter from "./Fotter";
//Material UI Component
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
// import WbSunnyIcon from "@mui/icons-material/WbSunny";
import Button from "@mui/material/Button";
//External Files
import axios from "axios";
import moment from "moment";
import { useTranslation } from "react-i18next";

//to import arabic format
import "moment/min/locales";
//React Hooks
import { useEffect, useState } from "react";

//----------------------------------
const theme = createTheme({
  typography: ["RubicBold", "RubicMd", "RubicReg"],
});
//declare the cleanUp variable
let cancelAxios = null;

function App() {
  const { t, i18n } = useTranslation();
  //State The Lat and Lon
  const [data, setData] = useState({
    lat: "34.8021",
    lon: "38.9968",
    city: "Damascus",
  });
  //State Temperature
  const [temp, setTemp] = useState(27);
  //State Description
  const [des, setDes] = useState({ description: "shower rain", icon: "10d" });
  //State Max & Min Temp
  const [minMax, setMinmax] = useState({ minTemp: 24, maxTemp: 27 });
  //state Moment
  const [mom, setMom] = useState("الجمعة ٦ سبتمبر ٢٠٢٤ ١٣:١٦");
  //change Language Effect And Handel Function and State
  moment.locale("ar");

  const [lanLocale, setLangLocale] = useState("ar");
  useEffect(() => {
    i18n.changeLanguage("ar");
  }, []);

  function handelLanguageClick() {
    if (lanLocale === "ar") {
      i18n.changeLanguage("en");
      setLangLocale("en");
      moment.locale("en");
    } else if (lanLocale === "en") {
      i18n.changeLanguage("ar");
      setLangLocale("ar");
      moment.locale("ar");
    }
    setMom(moment().format("LLLL"));
  }
  //---------------------------------------
  //function Of Data Of Menu
  function handelMenuSelect(e) {
    if (e === "Homs") {
      setData({ ...data, lat: "34.72682", lon: "36.72339", city: "Homs" });
    } else if (e === "Damascus") {
      setData({ ...data, lat: "33.5102", lon: "36.29128", city: "Damascus" });
    } else if (e === "Aleppo") {
      setData({ ...data, lat: "36.20124", lon: "37.16117", city: "Aleppo" });
    } else if (e === "Latakia") {
      setData({ ...data, lat: "35.53168", lon: "35.79011", city: "Latakia" });
    } else if (e === "Hama") {
      setData({ ...data, lat: "35.13179", lon: "36.75783", city: "Hama" });
    } else if (e === "As Suwayda") {
      setData({
        ...data,
        lat: "32.70896",
        lon: "36.56951",
        city: "As Suwayda",
      });
    }
  }
  //======================================
  useEffect(() => {
    console.log("Api Request");
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${data.lat}&lon=${data.lon}&appid=7e353ab532d9eefd3eafac6243e387e6`,
        {
          cancelToken: new axios.CancelToken((c) => {
            cancelAxios = c;
          }),
        }
      )
      .then((res) => {
        console.log(res.data);
        let resTemp = Math.round(res.data.main.temp - 272.15);
        let resDes = res.data.weather[0].description;
        let resMin = Math.round(res.data.main.temp_min - 272.15);
        let resMax = Math.round(res.data.main.temp_max - 272.15);
        let resIcon = res.data.weather[0].icon;
        let date = moment().format("LLLL");
        setMom(date);
        setDes({ ...des, description: resDes, icon: resIcon });
        setMinmax({ ...minMax, minTemp: resMin, maxTemp: resMax });
        setTemp(resTemp);
      })
      .catch((err) => {
        console.log("Error Api Request", err);
      });
    return () => {
      console.log("cancel");
      cancelAxios();
    };
  }, [data]);

  return (
    <>
      <div className="App">
        <NavBar getSelected={handelMenuSelect} />

        <ThemeProvider theme={theme}>
          <Container
            style={{
              fontFamily: "RubicReg",
            }}
            maxWidth="sm"
          >
            {/*  Container  */}

            <div
              style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              {/* Card */}
              <div
                style={{
                  // backgroundColor: "#283593",

                  color: "white",
                  borderRadius: "15px",
                  boxShadow: "0px 7px 11px rgba(0,0,0,0.5)",
                  padding: "10px",
                  width: "100%",
                }}
                className="card"
                dir={lanLocale === "ar" ? "rtl" : "ltr"}
              >
                {/* Content */}
                <div>
                  {/* City & Time */}
                  <div
                    dir={lanLocale === "ar" ? "rtl" : "ltr"}
                    style={{
                      display: "flex",
                      justifyContent: "start",
                      alignItems: "end",
                    }}
                  >
                    <Typography variant="h4" style={{ marginRight: "20px" }}>
                      {t(data.city)}
                    </Typography>
                    <Typography
                      variant="h6"
                      style={{ marginRight: "20px", fontSize: "15px" }}
                    >
                      {mom}
                    </Typography>
                  </div>
                  {/* ==City & Time */}
                  <hr />
                  {/* Container of Degree and Icons */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    {/* Degree & Description */}
                    <div>
                      {/* Temp */}
                      <Typography variant="h2" textAlign="right">
                        {temp}°C
                      </Typography>

                      <Typography
                        style={{
                          display: "flex",
                          justifyContent: "start",
                        }}
                        variant="h6"
                      >
                        {t(des.description)}
                      </Typography>
                      {/* Min & MAX */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <h5>
                          {t("Min")}: {minMax.minTemp}
                        </h5>
                        <h5 style={{ marginRight: "5px", marginLeft: "5px" }}>
                          |
                        </h5>
                        <h5>
                          {t("Max")}: {minMax.maxTemp}
                        </h5>
                      </div>
                      {/*==Min & MAX ==*/}
                    </div>
                    {/*== Temp== */}

                    {/* ==Degree & Description ==*/}
                    <img
                      className="img-icon"
                      style={{ width: "200px" }}
                      src={`https://openweathermap.org/img/wn/${des.icon}@2x.png`}
                    />
                  </div>
                  {/*== Container of Degree and Icons== */}
                </div>

                {/* Content */}
              </div>
              {/* ==Card== */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "start",
                  width: "100%",
                }}
              >
                <Button
                  style={{ color: "white", marginTop: "20px" }}
                  variant="text"
                  onClick={handelLanguageClick}
                >
                  {lanLocale === "ar" ? "إنجليزي" : "Arabic"}
                </Button>
              </div>
            </div>
            {/*== Container== */}
          </Container>
        </ThemeProvider>
        <Fotter />
      </div>
    </>
  );
}

export default App;
