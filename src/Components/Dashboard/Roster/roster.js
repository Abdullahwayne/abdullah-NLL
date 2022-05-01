import { Input, Typography } from "@mui/material";
import "./style.scss";
import { useSelector, useDispatch } from "react-redux";
import { getNames, NAMES_CHANGED } from "../../../redux/names";
import { useSnackbar } from "notistack";
import axios from "axios";

import {
  getsmallImage1,
  getsmallImage2,
  getEstablishmentName,
  ESTABLISHMENT_NAME_CHANGED,
} from "../../../redux/lineup";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";

import defaultImage1 from "../../../Assets/Components/Lineup/image1.png";
import { getUser } from "../../../redux/user";

const Roster = () => {
  const baseURL = process.env.REACT_APP_BASE_URL;
  const establishmentName = useSelector(getEstablishmentName);
  const assetURL = process.env.REACT_APP_ASSET_URL;
  const names = useSelector(getNames);
  const dispatch = useDispatch();
  const smallImage1 = useSelector(getsmallImage1);
  const smallImage2 = useSelector(getsmallImage2);
  const [position, setPosition] = useState("");
  const [name, setName] = useState("");
  const [change, setChange] = useState(false);
  const loggedUser = useSelector(getUser);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const onChange = (e, key) => {
    dispatch({
      type: NAMES_CHANGED,
      payload: { ...names, [key]: e.target.value },
    });
  };

  const handleChange = (e, key) => {
    dispatch({
      type: key,
      payload: e.target.value,
    });
  };
  useEffect(() => {}, [change]);
  let temp = Object.values(names);
  const handleSave = async () => {
    const saveRoster = await axios.patch(baseURL + "user/" + loggedUser.id, {
      roster: names,
    });
    if (saveRoster.status === 200) {
      enqueueSnackbar("Successfully Saved!", { variant: "success" });
    } else {
      enqueueSnackbar("Something went Wrong!", { variant: "error" });
    }
  };
  const handleAppend = () => {
    console.log("append");
    console.log(name, "<-= name", position, "<==== pos");
    let wow = names;
    temp.splice(position - 1, 0, name);
    console.log(temp);
    // console.log(temp, "<=== temp");
    for (let index = 0; index < Object.keys(names).length; index++) {
      wow = { ...wow, [index]: temp[index] };
    }
    console.log(wow, "<==== wow");
    dispatch({ type: NAMES_CHANGED, payload: wow });
    setChange(!change);
    enqueueSnackbar("Successfully Added!", { variant: "success" });
  };
  const handleDelete = (key, arrayIndex) => {
    console.log(names[key]);
    console.log(arrayIndex);
    let temp = names;
    for (let index = arrayIndex; index < Object.keys(names).length; index++) {
      let element = Object.values(names)[index + 1];
      if (element === undefined) element = "";
      temp[index] = element;
    }
    dispatch({
      type: NAMES_CHANGED,
      payload: temp,
    });
    setChange(!change);
    enqueueSnackbar("Successfully Removed!", { variant: "info" });
  };

  return (
    <div className="rosterMain">
      <div className="roster-adding-member">
        <div className="roster-left-head">
          <Typography>Name</Typography>
          <Input
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="member-name"
            fullWidth
          ></Input>
          <Typography>Position</Typography>
          <Input
            type="number"
            onChange={(e) => {
              setPosition(e.target.value);
            }}
            className="member-position"
          ></Input>
        </div>
        <div className="buttons">
          <button
            className="print-button"
            onClick={() => handleAppend()}
            style={{ width: "150px", margin: "10px" }}
          >
            APPEND
          </button>
          <button
            className="print-button"
            style={{ width: "150px", margin: "10px" }}
            onClick={() => handleSave()}
          >
            SAVE ROSTER
          </button>
        </div>
      </div>
      <div className="roster">
        <div className="roster-header">
          <div className="header-image-box">
            <div className="small-logo-box">
              <img
                src={
                  smallImage1 === "" ||
                  smallImage1 === undefined ||
                  smallImage1 === null
                    ? defaultImage1
                    : assetURL + smallImage1
                }
                alt="small logo 1"
              ></img>
            </div>
            <div
              className="large-logo-box"
              onClick={() =>
                console.log(
                  smallImage1,
                  "<=== image1",
                  smallImage2,
                  "<====image2"
                )
              }
            >
              <Input
                placeholder="Enter Establishment Name"
                value={establishmentName}
                onChange={(e) => {
                  handleChange(e, ESTABLISHMENT_NAME_CHANGED);
                }}
                type="text"
                className="heading-name-roster"
                style={{ textAlign: "center", fontSize: "36px", fontFamily:"Poppins" }}
              />
            </div>
            <div style={{ justifyContent: "right" }} className="small-logo-box">
              <img
                src={
                  smallImage2 === "" ||
                  smallImage2 === undefined ||
                  smallImage2 === null
                    ? defaultImage1
                    : assetURL + smallImage2
                }
                alt="logo 2"
              ></img>
            </div>
          </div>
        </div>
        <div className="roster-heading">
          <h2>Team Roster</h2>
        </div>
        <div className="roster-body">
          {Object.keys(names).map((key, index) => {
            return (
              <div className="name-obj">
                <p className="name-number">{index + 1}</p>
                <Input
                  value={names[key]}
                  onChange={(e) => {
                    onChange(e, key);
                  }}
                  type="text"
                  text={names[key]}
                  style={{ width: "90%", textAlign: "center", fontFamily:"Poppins" }}
                />
                <ClearIcon
                  onClick={() => {
                    handleDelete(key, index);
                  }}
                  style={{ color: "red" }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Roster;
