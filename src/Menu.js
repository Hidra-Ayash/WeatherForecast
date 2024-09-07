import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import { useState } from "react";
import "./App.css";

export default function Menu({ get }) {
  const [select, setSelect] = useState("None");
  function handelChange(e) {
    let temp = e.target.value;
    setSelect(temp);
    get(temp);
  }

  return (
    <FormControl fullWidth className="cont-style">
      <InputLabel variant="filled" htmlFor="uncontrolled-native">
        City
      </InputLabel>
      <NativeSelect className="op-style" value={select} onChange={handelChange}>
        <option value="None">None</option>
        <option value="Homs">Homs</option>
        <option value="Aleppo">Aleppo</option>
        <option value="Damascus">Damascus</option>
        <option value="Latakia">Latakia</option>
        <option value="Hama">Hama</option>
        <option value="As Suwayda">As Suwayda</option>
      </NativeSelect>
    </FormControl>
  );
}
