import "./style.scss";
import { Input, TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Autocomplete from "@mui/material/Autocomplete";
import ReactToPrint from "react-to-print";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getNames } from "../../../redux/names";
import defaultImage1 from "../../../Assets/Components/Lineup/image1.png";
import { FiEdit } from "react-icons/fi";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import { CircularProgress } from "@mui/material";

import {
  getPositions,
  getTeam1,
  getTeam2,
  getTeam1Name,
  getTeam2Name,
  getDate,
  getsmallImage1,
  getsmallImage2,
  changeImage,
  getTeam1LHH,
  getTeam2LHH,
  getTeam1RHH,
  getTeam2RHH,
  getTeam1LHP,
  getTeam2LHP,
  getTeam1RHP,
  getTeam2RHP,
  getEstablishmentName,
  getLastPosition,
  getsmallImage3,
} from "../../../redux/lineup";
import {
  TEAM1NAME_CHANGED,
  TEAM2NAME_CHANGED,
  TEAM1_NAMES_CHANGED,
  TEAM2_NAMES_CHANGED,
  TEAM1_LHH_CHANGED,
  TEAM2_LHH_CHANGED,
  TEAM1_RHH_CHANGED,
  TEAM2_RHH_CHANGED,
  TEAM1_LHP_CHANGED,
  TEAM2_LHP_CHANGED,
  TEAM1_RHP_CHANGED,
  TEAM2_RHP_CHANGED,
  ASSIGNED_POSITION_CHANGED_FOR_TEAM1_CHANGED,
  ASSIGNED_POSITION_CHANGED_FOR_TEAM2_CHANGED,
  LAST_POSITIION_CHANGED,
} from "../../../redux/lineup";

import { getConfiguration } from "../../../redux/user";

const DugOutLineup = () => {
  const assetURL = process.env.REACT_APP_ASSET_URL;
  const sixArray = [0, 1, 2, 3, 4, 5];
  const [date, setDate] = useState("");
  const [circularLoader, setCircularLoader] = useState(false);
  let myComponent = useRef();
  let smallImageLogo1Ref = useRef(null);
  let smallImageLogo2Ref = useRef(null);
  let editImageIcon = useRef(null);
  const dispatch = useDispatch();
  const names = useSelector(getNames);
  const team1 = useSelector(getTeam1);
  const team2 = useSelector(getTeam2);
  const team1Name = useSelector(getTeam1Name);
  const team2Name = useSelector(getTeam2Name);
  const currentDate = useSelector(getDate);
  const smallImage1 = useSelector(getsmallImage1);
  const smallImage2 = useSelector(getsmallImage2);
  const smallImage3 = useSelector(getsmallImage3);

  const team1LHH = useSelector(getTeam1LHH);
  const team2LHH = useSelector(getTeam2LHH);
  const team1RHH = useSelector(getTeam1RHH);
  const team2RHH = useSelector(getTeam2RHH);
  const team1LHP = useSelector(getTeam1LHP);
  const team2LHP = useSelector(getTeam2LHP);
  const team1RHP = useSelector(getTeam1RHP);
  const team2RHP = useSelector(getTeam2RHP);
  const positions = useSelector(getPositions);
  const establishmentName = useSelector(getEstablishmentName);
  const configuration = useSelector(getConfiguration);
  const [showEditImage, setShowEditImage] = useState(false);
  const lastPosition = useSelector(getLastPosition);

  const handleChangeImage1Ref = (e) => {
    smallImageLogo1Ref.current.click();
  };
  const stringyfyDate = () => {
    var date = new Date(currentDate);
    var weekday = date.getDay();
    console.log(weekday, "<=== ");
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var year = date.getFullYear();
    switch (month) {
      case 1:
        month = "January";
        break;
      case 2:
        month = "February";
        break;
      case 3:
        month = "March";
        break;
      case 4:
        month = "April";
        break;
      case 5:
        month = "May";
        break;
      case 6:
        month = "June";
        break;
      case 7:
        month = "July";
        break;
      case 8:
        month = "August";
        break;
      case 9:
        month = "September";
        break;
      case 10:
        month = "October";
        break;
      case 11:
        month = "November";
        break;
      case 12:
        month = "December";
        break;
      default:
        break;
    }
    switch (weekday) {
      case 1:
        weekday = "Monday";
        break;
      case 2:
        weekday = "Tuesday";
        break;
      case 3:
        weekday = "Wednesday";
        break;
      case 4:
        weekday = "Thursday";
        break;
      case 5:
        weekday = "Friday";
        break;
      case 6:
        weekday = "Saturday";
        break;
      case 7:
        weekday = "Sunday";
        break;
      default:
        break;
    }
    setDate(weekday + " " + day + " " + month + " " + year);
  };

  useEffect(() => {
    stringyfyDate();
  });
  const handleChange = (e, type) => {
    dispatch({
      type: type,
      payload: e.target.value,
    });
  };
  const handleChangeImage2Ref = (e) => {
    console.log(smallImageLogo2Ref);
    smallImageLogo2Ref.current.click();
  };

  const handeFileChange = (e, dispatchEvent) => {
    try {
      dispatch(changeImage({ image: e.target.files[0], type: dispatchEvent }));
    } catch (err) {}
  };

  const handleSelectChange = (
    e,
    currentIndex = null,
    action = null,
    player = null
  ) => {
    console.log(
      e,
      "<=== value",
      currentIndex,
      "<=== action",
      action,
      "<=== player",
      player,
      "<=== player one or two"
    );
    switch (action) {
      case TEAM1_NAMES_CHANGED:
        let team1Update = team1.map((item, index) => {
          if (index === currentIndex) {
            if (player === "one")
              return {
                playerOne: e,
                playerPosition: team1[index].playerOnePosition,
                playerTwo: team1[index].playerTwo,
                playerTwoPosition: team1[index].playerTwoPosition,
              };
            if (player === "two")
              return {
                playerOne: team1[index].playerOne,
                playerPosition: team1[index].playerPosition,
                playerTwo: e,
                playerTwoPosition: team1[index].playerTwoPosition,
              };
          }
          return item;
        });
        dispatch({
          type: TEAM1_NAMES_CHANGED,
          payload: team1Update,
        });
        break;
      case TEAM2_NAMES_CHANGED:
        let team2Update = team2.map((item, index) => {
          if (index === currentIndex) {
            if (player === "one")
              return {
                playerOne: e,
                playerPosition: team2[index].playerOnePosition,
                playerTwo: team2[index].playerTwo,
                platerTwoPosition: team2[index].playerTwoPosition,
              };
            if (player === "two")
              return {
                playerOne: team2[index].playerOne,
                playerPosition: team2[index].playerPosition,
                playerTwo: e,
                playerTwoPosition: team2[index].playerTwoPosition,
              };
          }
          return item;
        });
        dispatch({
          type: TEAM2_NAMES_CHANGED,
          payload: team2Update,
        });
        break;
      case ASSIGNED_POSITION_CHANGED_FOR_TEAM1_CHANGED:
        let team1UpdatePosition = team1.map((item, index) => {
          if (index === currentIndex) {
            if (player === "one")
              return {
                playerOne: team1[index].playerOne,
                playerOnePosition: e.target.value,
                playerTwoPosition: team1[index].playerTwoPosition,
                playerTwo: team1[index].playerTwo,
              };
            if (player === "two")
              return {
                playerOne: team1[index].playerOne,
                playerOnePosition: team1[index].playerOnePosition,
                playerTwoPosition: e.target.value,
                playerTwo: team1[index].playerTwo,
              };
          }
          return item;
        });
        dispatch({
          type: TEAM1_NAMES_CHANGED,
          payload: team1UpdatePosition,
        });
        break;
      case ASSIGNED_POSITION_CHANGED_FOR_TEAM2_CHANGED:
        console.log("changePosition2 executed");
        let team2UpdatePosition = team2.map((item, index) => {
          if (index === currentIndex) {
            if (player === "one")
              return {
                playerOne: team2[index].playerOne,
                playerOnePosition: e.target.value,
                playerTwoPosition: team2[index].playerTwoPosition,
                playerTwo: team2[index].playerTwo,
              };
            if (player === "two")
              return {
                playerOne: team2[index].playerOne,
                playerOnePosition: team2[index].playerOnePosition,
                playerTwoPosition: e.target.value,
                playerTwo: team2[index].playerTwo,
              };
          }
          return item;
        });
        dispatch({
          type: TEAM2_NAMES_CHANGED,
          payload: team2UpdatePosition,
        });
        break;
      case TEAM1_LHH_CHANGED:
        console.log("TEAM1_LHH_CHANGED executed");
        console.log(team1LHH);
        let team1_LHH_Update = team1LHH.map((item, index) => {
          if (index === currentIndex) {
            console.log("found");
            return e;
          }
          return item;
        });
        console.log(team1_LHH_Update, "<============== amazing");
        dispatch({
          type: TEAM1_LHH_CHANGED,
          payload: team1_LHH_Update,
        });
        break;
      case TEAM2_LHH_CHANGED:
        console.log("TEAM2_LHH_CHANGED executed");
        console.log(team2LHH);
        let team2_LHH_Update = team2LHH.map((item, index) => {
          if (index === currentIndex) {
            return e;
          }
          return item;
        });
        dispatch({
          type: TEAM2_LHH_CHANGED,
          payload: team2_LHH_Update,
        });
        break;
      case TEAM1_RHH_CHANGED:
        console.log("TEAM1_RHH_CHANGED executed");
        console.log(team1RHH);
        let team1_RHH_Update = team1RHH.map((item, index) => {
          if (index === currentIndex) {
            return e;
          }
          return item;
        });
        dispatch({
          type: TEAM1_RHH_CHANGED,
          payload: team1_RHH_Update,
        });
        break;
      case TEAM2_RHH_CHANGED:
        console.log("TEAM2_RHH_CHANGED executed");
        console.log(team2RHH);
        let team2_RHH_Update = team2RHH.map((item, index) => {
          if (index === currentIndex) {
            return e;
          }
          return item;
        });
        dispatch({
          type: TEAM2_RHH_CHANGED,
          payload: team2_RHH_Update,
        });
        break;
      case TEAM1_LHP_CHANGED:
        console.log("TEAM2_LHP_CHANGED executed");
        console.log(team1LHP);
        let team1_LHP_Update = team1LHP.map((item, index) => {
          if (index === currentIndex) {
            return e;
          }
          return item;
        });
        dispatch({
          type: TEAM1_LHP_CHANGED,
          payload: team1_LHP_Update,
        });
        break;
      case TEAM2_LHP_CHANGED:
        console.log("TEAM2_LHP_CHANGED executed");
        console.log(team2LHP);
        let team2_LHP_Update = team2LHP.map((item, index) => {
          if (index === currentIndex) {
            return e;
          }
          return item;
        });
        dispatch({
          type: TEAM2_LHP_CHANGED,
          payload: team2_LHP_Update,
        });
        break;
      case TEAM1_RHP_CHANGED:
        console.log("TEAM1_RHP_CHANGED executed");
        console.log(team1RHP);
        let team1_RHP_Update = team1RHP.map((item, index) => {
          if (index === currentIndex) {
            return e;
          }
          return item;
        });
        dispatch({
          type: TEAM1_RHP_CHANGED,
          payload: team1_RHP_Update,
        });
        break;
      case TEAM2_RHP_CHANGED:
        console.log("TEAM2_RHP_CHANGED executed");
        console.log(team2RHP);
        let team2_RHP_Update = team2RHP.map((item, index) => {
          if (index === currentIndex) {
            return e;
          }
          return item;
        });
        dispatch({
          type: TEAM2_RHP_CHANGED,
          payload: team2_RHP_Update,
        });
        break;
      default:
        break;
    }
  };

  const handleNumberChange = (e) => {
    console.log(e.target.value, "<====== new CHANGE");
    dispatch({
      type: LAST_POSITIION_CHANGED,
      payload: e.target.value,
    });
  };
  useEffect(() => {
    // getImage();
  }, [smallImage1]);

  useEffect(() => {
    console.log("TEAM 1/2 changed");
  }, [team1, team2]);
  useEffect(() => {
    // getImage2();
  }, [smallImage2]);

  return (
    <div className="dugoutMain">
      <div className="print-button-div">
        {circularLoader ? (
          <div style={{ height: "40px", margin: "20px" }}>
            <CircularProgress style={{ color: "#850037" }} />
          </div>
        ) : (
          <ReactToPrint
            removeAfterPrint={true}
            onPrintError={(e) => console.log(e, "<==== my error")}
            trigger={() => <button className="print-button">PREVIEW</button>}
            onAfterPrint={() => {
              setCircularLoader(false);
            }}
            content={() => {
              setCircularLoader(true);
              return myComponent;
            }}
          />
        )}
      </div>
      <div style={{ width: "100%" }} ref={(el) => (myComponent = el)}>
        <div
          style={{
            borderRight: "3px solid black",
            borderTop: "3px solid black",
            borderLeft: "3px solid black",
          }}
          className="dugoutLineup"
        >
          <div className="roster-header">
            <div className="header-image-box">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: configuration.leftLogoPosition,
                }}
                className="small-logo-box"
              >
                <FiEdit
                  onMouseLeave={() => {
                    setShowEditImage(false);
                    console.log("off");
                  }}
                  ref={editImageIcon}
                  onClick={handleChangeImage1Ref}
                  style={{
                    fontSize: "30px",
                    zIndex: "5",
                    color: "white",
                    position: "absolute",
                    display: showEditImage ? "block" : "none",
                  }}
                  onMouseEnter={() => {
                    setShowEditImage(true);
                    console.log("on");
                  }}
                ></FiEdit>
                <input
                  ref={smallImageLogo1Ref}
                  type="file"
                  accept="image/*"
                  className="small-logo1-input"
                  onChange={(e) => handeFileChange(e, "image1")}
                ></input>
                <img
                  style={{
                    width: configuration.leftLogoSize * 1.5,
                    height: configuration.leftLogoSize,
                  }}
                  onMouseEnter={() => {
                    setShowEditImage(true);
                  }}
                  onMouseLeave={() => {
                    setShowEditImage(false);
                  }}
                  src={
                    smallImage1 === "" ||
                    smallImage1 === undefined ||
                    smallImage1 === null
                      ? defaultImage1
                      : assetURL + smallImage1
                  }
                  alt="Logo 1"
                ></img>
              </div>
              <div
                style={{
                  overflow: "hidden",
                  justifyContent: "center",
                  alignItems: configuration.textAlignment,
                  fontSize: configuration.fontSize,
                }}
                className="large-logo-box"
              >
                {configuration.enableLogo ? (
                  <img
                    style={{
                      width: configuration.centerLogoSize * 3,
                      height: configuration.centerLogoSize,
                    }}
                    src={
                      smallImage3 === "" ||
                      smallImage3 === undefined ||
                      smallImage3 === null
                        ? defaultImage1
                        : assetURL + smallImage3
                    }
                    alt="Logo 1"
                    className="img-dug"
                  ></img>
                ) : (
                  <p
                    style={{ margin: "0px", color: configuration.headerColor, fontFamily:"Poppins" }}
                  >
                    {establishmentName}
                  </p>
                )}
              </div>
              <div
                style={{
                  justifyContent: "center",
                  alignItems: configuration.leftLogoPosition,
                }}
                className="small-logo-box"
              >
                <FiEdit
                  onMouseLeave={() => {
                    setShowEditImage(false);
                    console.log("off");
                  }}
                  onMouseEnter={() => {
                    setShowEditImage(true);
                    console.log("on");
                  }}
                  style={{
                    fontSize: "30px",
                    zIndex: "5",
                    color: "white",
                    display: showEditImage ? "block" : "none",
                    position: "absolute",
                  }}
                  onClick={handleChangeImage2Ref}
                ></FiEdit>
                <input
                  ref={smallImageLogo2Ref}
                  type="file"
                  accept="image/*"
                  className="small-logo1-input"
                  onChange={(e) => handeFileChange(e, "image2")}
                ></input>
                <img
                  style={{
                    display: "flex",
                    width: configuration.rightLogoSize * 1.5,
                    height: configuration.rightLogoSize,
                  }}
                  onMouseEnter={() => {
                    setShowEditImage(true);
                    console.log("on");
                  }}
                  onMouseLeave={() => {
                    setShowEditImage(false);
                    console.log("off");
                  }}
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
          <div className="team-div">
            <div className="team-name">
              <Input
                disableUnderline
                placeholder={configuration.enableEmptySheet ? "" : "Team Name"}
                className="team-name-input"
                value={configuration.enableEmptySheet ? "" : team1Name}
                onChange={(e) => handleChange(e, TEAM1NAME_CHANGED)}
                type="text"
                inputProps={{
                  min: 0,
                  style: {
                    textAlign: "center",
                    color: configuration.cellboxTextColor,
                    fontFamily:"Poppins"
                  },
                }}
              />
            </div>
            <div
              onClick={() => {
                // console.log(configuration.imageName);
                console.log(configuration);
                console.log(assetURL + smallImage3, "<=== small image 3 name");
              }}
              className="versus"
            >
              <p style={{fontFamily:"Poppins"}}>VS</p>
            </div>
            <div className="team-name">
              <Input
                disableUnderline
                className="team-name-input"
                value={configuration.enableEmptySheet ? "" : team2Name}
                onChange={(e) => handleChange(e, TEAM2NAME_CHANGED)}
                placeholder={configuration.enableEmptySheet ? "" : "Team Name"}
                type="text"
                // text={names[key]}w
                inputProps={{
                  min: 0,
                  style: {
                    textAlign: "center",
                    color: configuration.cellboxTextColor,
                    fontFamily:"Poppins"
                  },
                }}
              />
            </div>
          </div>
          <div
            style={{
              backgroundColor: configuration.cellboxColor,
              color: configuration.cellboxTextColor,
            }}
            className="header-timer-box"
          >
            <Typography>{date}</Typography>
          </div>
          <div className="dugout-body">
            {/* team1 */}
            <div
              className="team-selection"
              style={{
                borderRight: `1px solid `,
              }}
            >
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => {
                return (
                  <div
                    style={{
                      borderTop: `1px solid `,
                    }}
                    className="player-box"
                  >
                    <div
                      style={{
                        color: configuration.numberColor,
                      }}
                      className="number-box"
                    >
                      {index === 9 ? (
                        <FormControl variant="standard">
                          <Select
                            sx={{
                              "& .MuiSelect-select": {
                                marginLeft: "0px",
                              },
                            }}
                            className="number-box"
                            style={{
                              width: "100%",
                              color: configuration.numberColor,
                              font:"Poppins",
                              fontWeight:"bold",
                              fontSize: lastPosition === "P" ? "55px" : "55px",
                              margin: "0px",
                              padding: "0px",
                              justifyContent: "flex-end",
                              marginLeft: "15px",
                            }}
                            disableUnderline
                            IconComponent="span"
                            value={lastPosition}
                            onChange={handleNumberChange}
                          >
                            <MenuItem value={"FL"}>FL</MenuItem>
                            <MenuItem value={"P"}>P</MenuItem>
                            <MenuItem value={"10"}>10</MenuItem>
                          </Select>
                        </FormControl>
                      ) : (
                        <p style={{ margin: "0px", padding: "0px" }}>
                          {" "}
                          {index + 1}
                        </p>
                      )}
                    </div>
                    <div className="player-detail-box">
                      <div className="player-detail-row">
                        <Autocomplete
                          // className={classes.inputRoot}
                          sx={{
                            "& .MuiAutocomplete-input": {
                              // color: configuration.cellboxTextColor,
                              // textAlign: "center",
                              fontFamily:"Poppins"
                            },
                          }}
                          className="player-name-autocomplete"
                          value={
                            configuration.enableEmptySheet
                              ? " "
                              : team1[index].playerOne
                          }
                          onChange={(event, newValue) => {
                            console.log(newValue, "<==== on change");
                            handleSelectChange(
                              newValue,
                              index,
                              TEAM1_NAMES_CHANGED,
                              "one"
                            );
                          }}
                          onInputChange={(event, newInputValue) => {
                            console.log(newInputValue, "<=== on input change");
                            handleSelectChange(
                              newInputValue,
                              index,
                              TEAM1_NAMES_CHANGED,
                              "one"
                            );
                          }}
                          forcePopupIcon={false}
                          options={Object.values(names)}
                          renderInput={(params) => (
                            <TextField
                              disableUnderline
                              variant="standard"
                              {...params}
                              InputProps={{
                                ...params.InputProps,
                                disableUnderline: true,
                              }}
                            />
                          )}
                        />
                        <FormControl
                          className="player-position-select"
                          variant="standard"
                        >
                          <Select
                            // style={{ color: configuration.cellboxTextColor }}
                            disableUnderline
                            IconComponent="span"
                            className="player-name-input"
                            value={
                              configuration.enableEmptySheet
                                ? ""
                                : team1[index].playerOnePosition
                            }
                            onChange={(e) => {
                              handleSelectChange(
                                e,
                                item,
                                ASSIGNED_POSITION_CHANGED_FOR_TEAM1_CHANGED,
                                "one"
                              );
                            }}
                            style={{fontFamily:"Poppins"}}
                          >
                            <MenuItem value={""}>NONE</MenuItem>
                            {positions.map((key, index) => {
                              return <MenuItem value={key}>{key}</MenuItem>;
                            })}
                          </Select>
                        </FormControl>
                      </div>
                      <div
                        style={{
                          borderTop: `1px solid `,
                        }}
                        className="player-detail-row"
                      >
                        <Autocomplete
                          sx={{
                            "& .MuiAutocomplete-input": {
                              // color: configuration.cellboxTextColor,
                              fontFamily:"Poppins"
                            },
                          }}
                          className="player-name-autocomplete"
                          value={
                            configuration.enableEmptySheet
                              ? ""
                              : team1[index].playerTwo
                          }
                          onChange={(event, newValue) => {
                            console.log(newValue, "<==== on change");
                            handleSelectChange(
                              newValue,
                              index,
                              TEAM1_NAMES_CHANGED,
                              "two"
                            );
                          }}
                          onInputChange={(event, newInputValue) => {
                            console.log(newInputValue, "<=== on input change");

                            handleSelectChange(
                              newInputValue,
                              index,
                              TEAM1_NAMES_CHANGED,
                              "two"
                            );
                          }}
                          forcePopupIcon={false}
                          options={Object.values(names)}
                          renderInput={(params) => (
                            <TextField
                              disableUnderline
                              variant="standard"
                              {...params}
                              InputProps={{
                                ...params.InputProps,
                                disableUnderline: true,
                              }}
                            />
                          )}
                        />
                        <FormControl
                          className="player-position-select"
                          variant="standard"
                        >
                          <Select
                            // style={{ color: configuration.cellboxTextColor }}
                            disableUnderline
                            IconComponent="span"
                            className="player-name-input"
                            value={
                              configuration.enableEmptySheet
                                ? ""
                                : team1[index].playerTwoPosition
                            }
                            onChange={(e) => {
                              handleSelectChange(
                                e,
                                item,
                                ASSIGNED_POSITION_CHANGED_FOR_TEAM1_CHANGED,
                                "two"
                              );
                            }}
                            style={{fontFamily:"Poppins"}}
                          >
                            <MenuItem value={""}>NONE</MenuItem>
                            {positions.map((key, index) => {
                              return <MenuItem value={key}>{key}</MenuItem>;
                            })}
                          </Select>
                        </FormControl>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* team2 */}
            <div
              style={{
                borderRight: `1px solid `,
              }}
              className="team-selection"
            >
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => {
                return (
                  <div
                    style={{
                      borderTop: `1px solid`,
                    }}
                    className="player-box"
                  >
                    {/* <div
                      style={{
                        color: configuration.numberColor,
                      }}
                      className="number-box"
                    >
                      {index === 9 ? (
                        <FormControl variant="standard">
                          <Select
                            className="number-box"
                            style={{
                              width: "100%",
                              color: configuration.numberColor,
                              fontSize: lastPosition === "P" ? "55px" : "55px",
                              justifyContent: "flex-end",
                              marginLeft: "15px",
                            }}
                            disableUnderline
                            IconComponent="span"
                            value={lastPosition}
                            onChange={handleNumberChange}
                          >
                            <MenuItem value={"FL"}>FL</MenuItem>
                            <MenuItem value={"P"}>P</MenuItem>
                            <MenuItem value={"10"}>10</MenuItem>
                          </Select>
                        </FormControl>
                      ) : (
                        <p style={{ margin: "0px", padding: "0px" }}>
                          {" "}
                          {index + 1}
                        </p>
                      )}
                    </div> */}
                    <div className="player-detail-box">
                      <div className="player-detail-row">
                        <Input
                          // style={{ color: configuration.cellboxTextColor }}
                          className="player-name-autocomplete"
                          style={{fontFamily:"Poppins"}}
                          disableUnderline
                          value={
                            configuration.enableEmptySheet
                              ? ""
                              : team2[index].playerOne
                          }
                          onChange={(event) => {
                            handleSelectChange(
                              event.target.value,
                              index,
                              TEAM2_NAMES_CHANGED,
                              "one"
                            );
                          }}
                        ></Input>
                        <FormControl
                          className="player-position-select"
                          variant="standard"
                        >
                          <Select
                            // style={{ color: configuration.cellboxTextColor }}
                            disableUnderline
                            IconComponent="span"
                            className="player-name-input"
                            value={
                              configuration.enableEmptySheet
                                ? ""
                                : team2[index].playerOnePosition
                            }
                            onChange={(e) => {
                              console.log("SELECTED VALUE", e.target.value);
                              handleSelectChange(
                                e,
                                item,
                                ASSIGNED_POSITION_CHANGED_FOR_TEAM2_CHANGED,
                                "one"
                              );

                            }}
                            style={{fontFamily:"Poppins"}}
                          >
                            <MenuItem value="">none</MenuItem>

                            {positions.map((key, index) => {
                              return <MenuItem value={key}>{key}</MenuItem>;
                            })}
                          </Select>
                        </FormControl>
                      </div>
                      <div
                        style={{
                          borderTop: `1px solid `,
                        }}
                        className="player-detail-row"
                      >
                        <Input
                          // style={{ color: configuration.cellboxTextColor }}
                          className="player-name-autocomplete"
                          disableUnderline
                          value={
                            configuration.enableEmptySheet
                              ? ""
                              : team2[index].playerTwo
                          }
                          onChange={(event) => {
                            handleSelectChange(
                              event.target.value,
                              index,
                              TEAM2_NAMES_CHANGED,
                              "two"
                            );
                          }}
                          style={{fontFamily:"Poppins"}}
                        ></Input>
                        <FormControl
                          className="player-position-select"
                          variant="standard"
                        >
                          <Select
                            // style={{ color: configuration.cellboxTextColor }}
                            disableUnderline
                            IconComponent="span"
                            className="player-name-input"
                            value={
                              configuration.enableEmptySheet
                                ? ""
                                : team2[index].playerTwoPosition
                            }
                            onChange={(e) => {
                              handleSelectChange(
                                e,
                                item,
                                ASSIGNED_POSITION_CHANGED_FOR_TEAM2_CHANGED,
                                "two"
                              );
                            }}
                            style={{fontFamily:"Poppins"}}
                          >
                            <MenuItem value={""}>{""}</MenuItem>
                            {positions.map((key, index) => {
                              return <MenuItem value={key}>{key}</MenuItem>;
                            })}
                          </Select>
                        </FormControl>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div
          style={{
            borderBottom: `3px solid`,
            borderLeft: `3px solid `,
            borderRight: `3px solid `,
          }}
          className="main-box"
        >
          <div className="medium-box">
            <div
              style={{
                borderRight: `1px solid `,
              }}
              className="small-box"
            >
              <div
                style={{
                  backgroundColor: configuration.cellboxColor,
                  color: configuration.cellboxTextColor,
                }}
                className="small-box-header"
              >
                <div className="small-heading">LHH</div>
                <div className="big-heading">EXTRAS</div>
                <div className="small-heading">RHH</div>
              </div>
              <div className="small-box-body">
                {/* TEAM 1 LHH */}
                <div
                  style={{
                    borderRight: `1px solid `,
                  }}
                  className="small-box-breaker"
                >
                  {sixArray.map((item, index) => {
                    console.log(team1LHH);
                    return (
                      <div className="small-box-players">
                        <Autocomplete
                          sx={{
                            "& .MuiAutocomplete-input": {
                              // color: configuration.cellboxTextColor,

                              textAlign: "center",
                              fontFamily:"Poppins"
                            },
                          }}
                          style={{
                            width: "100%",
                            borderBottom: index === 5 ? null : `1px solid`,
                            fontFamily:"Poppins"
                          }}
                          value={
                            configuration.enableEmptySheet
                              ? ""
                              : team1LHH[index]
                          }
                          onChange={(event, newValue) => {
                            console.log(newValue, "<==== on change");
                            handleSelectChange(
                              newValue,
                              index,
                              TEAM1_LHH_CHANGED,
                              "two"
                            );
                          }}
                          onInputChange={(event, newInputValue) => {
                            console.log(newInputValue, "<=== on input change");
                            handleSelectChange(
                              newInputValue,
                              index,
                              TEAM1_LHH_CHANGED,
                              "one"
                            );
                          }}
                          forcePopupIcon={false}
                          options={Object.values(names)}
                          className="player-name-input"
                          renderInput={(params) => (
                            <TextField
                              disableUnderline
                              variant="standard"
                              {...params}
                              InputProps={{
                                ...params.InputProps,
                                disableUnderline: true,

                              }}
                              style={{fontFamily:"Poppins"}}
                            />
                          )}
                        />
                      </div>
                    );
                  })}
                </div>
                {/* TEAM 1 RHH */}
                <div className="small-box-breaker">
                  {sixArray.map((item, index) => {
                    return (
                      <div className="small-box-players">
                        <Autocomplete
                          sx={{
                            "& .MuiAutocomplete-input": {
                              // color: configuration.cellboxTextColor,
                              textAlign: "center",
                              fontFamily:"Poppins"
                            },
                          }}
                          style={{
                            width: "100%",
                            borderBottom: index === 5 ? null : `1px solid`,
                          }}
                          value={
                            configuration.enableEmptySheet
                              ? ""
                              : team1RHH[index]
                          }
                          onChange={(event, newValue) => {
                            console.log(newValue, "<==== on change");
                            handleSelectChange(
                              newValue,
                              index,
                              TEAM1_RHH_CHANGED,
                              "one"
                            );
                          }}
                          onInputChange={(event, newInputValue) => {
                            console.log(newInputValue, "<=== on input change");
                            handleSelectChange(
                              newInputValue,
                              index,
                              TEAM1_RHH_CHANGED,
                              "one"
                            );
                          }}
                          forcePopupIcon={false}
                          options={Object.values(names)}
                          className="player-name-input"
                          renderInput={(params) => (
                            <TextField
                              disableUnderline
                              variant="standard"
                              {...params}
                              InputProps={{
                                ...params.InputProps,
                                disableUnderline: true,
                              }}
                            />
                          )}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="small-box">
              <div
                style={{
                  backgroundColor: configuration.cellboxColor,
                  color: configuration.cellboxTextColor,
                }}
                className="small-box-header"
              >
                <div className="small-heading">LHP</div>
                <div className="big-heading">PITCHERS</div>
                <div className="small-heading">RHP</div>
              </div>
              <div className="small-box-body">
                <div
                  style={{
                    borderRight: `1px solid `,
                  }}
                  className="small-box-breaker"
                >
                  {sixArray.map((item, index) => {
                    return (
                      <div className="small-box-players">
                        <Autocomplete
                          sx={{
                            "& .MuiAutocomplete-input": {
                              // color: configuration.cellboxTextColor,
                              textAlign: "center",
                              fontFamily:"Poppins"
                            },
                          }}
                          style={{
                            width: "100%",
                            borderBottom: index === 5 ? null : `1px solid`,
                          }}
                          value={
                            configuration.enableEmptySheet
                              ? ""
                              : team1LHP[index]
                          }
                          onChange={(event, newValue) => {
                            console.log(newValue, "<==== on change");
                            handleSelectChange(
                              newValue,
                              index,
                              TEAM1_LHP_CHANGED,
                              "two"
                            );
                          }}
                          onInputChange={(event, newInputValue) => {
                            console.log(newInputValue, "<=== on input change");
                            handleSelectChange(
                              newInputValue,
                              index,
                              TEAM1_LHP_CHANGED,
                              "one"
                            );
                          }}
                          forcePopupIcon={false}
                          options={Object.values(names)}
                          className="player-name-input"
                          renderInput={(params) => (
                            <TextField
                              disableUnderline
                              variant="standard"
                              {...params}
                              InputProps={{
                                ...params.InputProps,
                                disableUnderline: true,
                              }}
                            />
                          )}
                        />
                      </div>
                    );
                  })}
                </div>
                <div
                  style={{
                    borderRight: `1px solid`,
                  }}
                  className="small-box-breaker"
                >
                  {sixArray.map((item, index) => {
                    return (
                      <div className="small-box-players">
                        <Autocomplete
                          sx={{
                            "& .MuiAutocomplete-input": {
                              // color: configuration.cellboxTextColor,
                              textAlign: "center",
                              fontFamily:"Poppins"
                            },
                          }}
                          style={{
                            width: "100%",
                            borderBottom: index === 5 ? null : `1px solid `,
                          }}
                          value={
                            configuration.enableEmptySheet
                              ? ""
                              : team1RHP[index]
                          }
                          onChange={(event, newValue) => {
                            console.log(newValue, "<==== on change");
                            handleSelectChange(
                              newValue,
                              index,
                              TEAM1_RHP_CHANGED,
                              "one"
                            );
                          }}
                          onInputChange={(event, newInputValue) => {
                            console.log(newInputValue, "<=== on input change");
                            handleSelectChange(
                              newInputValue,
                              index,
                              TEAM1_RHP_CHANGED,
                              "one"
                            );
                          }}
                          forcePopupIcon={false}
                          options={Object.values(names)}
                          className="player-name-input"
                          renderInput={(params) => (
                            <TextField
                              disableUnderline
                              variant="standard"
                              {...params}
                              InputProps={{
                                ...params.InputProps,
                                disableUnderline: true,
                              }}
                            />
                          )}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="medium-box">
            <div className="small-box">
              <div
                style={{
                  backgroundColor: configuration.cellboxColor,
                  color: configuration.cellboxTextColor,
                }}
                className="small-box-header"
              >
                <div className="small-heading">LHH</div>
                <div className="big-heading">EXTRAS</div>
                <div className="small-heading">RHH</div>
              </div>
              <div className="small-box-body">
                {/* TEAM 2 LHH */}
                <div
                  style={{
                    borderRight: `1px solid`,
                  }}
                  className="small-box-breaker"
                >
                  {sixArray.map((item, index) => {
                    return (
                      <div className="small-box-players">
                        <Autocomplete
                          sx={{
                            "& .MuiAutocomplete-input": {
                              // color: configuration.cellboxTextColor,
                              textAlign: "center",
                              fontFamily:"Poppins"
                            },
                          }}
                          style={{
                            width: "100%",
                            borderBottom: index === 5 ? null : `1px solid `,
                          }}
                          value={
                            configuration.enableEmptySheet
                              ? ""
                              : team2LHH[index]
                          }
                          onChange={(event, newValue) => {
                            console.log(newValue, "<==== on change");
                            handleSelectChange(
                              newValue,
                              index,
                              TEAM2_LHH_CHANGED,
                              "two"
                            );
                          }}
                          onInputChange={(event, newInputValue) => {
                            console.log(newInputValue, "<=== on input change");
                            handleSelectChange(
                              newInputValue,
                              index,
                              TEAM2_LHH_CHANGED,
                              "one"
                            );
                          }}
                          forcePopupIcon={false}
                          options={Object.values(names)}
                          className="player-name-input"
                          renderInput={(params) => (
                            <TextField
                              disableUnderline
                              variant="standard"
                              {...params}
                              InputProps={{
                                ...params.InputProps,
                                disableUnderline: true,
                              }}
                            />
                          )}
                        />
                      </div>
                    );
                  })}
                </div>
                {/* TEAM 2 RHH */}
                <div
                  style={{
                    borderRight: `1px solid `,
                  }}
                  className="small-box-breaker"
                >
                  {sixArray.map((item, index) => {
                    return (
                      <div className="small-box-players">
                        <Autocomplete
                          sx={{
                            "& .MuiAutocomplete-input": {
                              color: configuration.cellboxTextColor,
                              textAlign: "center",
                              fontFamily:"Poppins"
                            },
                          }}
                          style={{
                            width: "100%",
                            borderBottom: index === 5 ? null : `1px solid`,
                          }}
                          value={
                            configuration.enableEmptySheet
                              ? ""
                              : team2RHH[index]
                          }
                          onChange={(event, newValue) => {
                            console.log(newValue, "<==== on change");
                            handleSelectChange(
                              newValue,
                              index,
                              TEAM2_RHH_CHANGED,
                              "two"
                            );
                          }}
                          onInputChange={(event, newInputValue) => {
                            console.log(newInputValue, "<=== on input change");
                            handleSelectChange(
                              newInputValue,
                              index,
                              TEAM2_RHH_CHANGED,
                              "two"
                            );
                          }}
                          forcePopupIcon={false}
                          options={Object.values(names)}
                          className="player-name-input"
                          renderInput={(params) => (
                            <TextField
                              disableUnderline
                              variant="standard"
                              {...params}
                              InputProps={{
                                ...params.InputProps,
                                disableUnderline: true,
                              }}
                            />
                          )}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="small-box">
              <div
                style={{
                  backgroundColor: configuration.cellboxColor,
                  color: configuration.cellboxTextColor,
                }}
                className="small-box-header"
              >
                <div className="small-heading">LHP</div>
                <div className="big-heading">PITCHERS</div>
                <div className="small-heading">RHP</div>
              </div>
              <div className="small-box-body">
                <div
                  style={{
                    borderRight: `1px solid `,
                  }}
                  className="small-box-breaker"
                >
                  {sixArray.map((item, index) => {
                    return (
                      <div style={{}} className="small-box-players">
                        <Autocomplete
                          sx={{
                            "& .MuiAutocomplete-input": {
                              // color: configuration.cellboxTextColor,
                              textAlign: "center",
                              fontFamily:"Poppins"
                            },
                          }}
                          style={{
                            width: "100%",
                            borderBottom: index === 5 ? null : `1px solid `,
                          }}
                          value={
                            configuration.enableEmptySheet
                              ? ""
                              : team2LHP[index]
                          }
                          onChange={(event, newValue) => {
                            handleSelectChange(
                              newValue,
                              index,
                              TEAM2_LHP_CHANGED,
                              "two"
                            );
                          }}
                          onInputChange={(event, newInputValue) => {
                            handleSelectChange(
                              newInputValue,
                              index,
                              TEAM2_LHP_CHANGED,
                              "two"
                            );
                          }}
                          forcePopupIcon={false}
                          options={Object.values(names)}
                          className="player-name-input"
                          renderInput={(params) => (
                            <TextField
                              disableUnderline
                              variant="standard"
                              {...params}
                              InputProps={{
                                ...params.InputProps,
                                disableUnderline: true,
                              }}
                            />
                          )}
                        />
                      </div>
                    );
                  })}
                </div>
                <div className="small-box-breaker">
                  {sixArray.map((item, index) => {
                    return (
                      <div className="small-box-players">
                        <Autocomplete
                          sx={{
                            "& .MuiAutocomplete-input": {
                              // color: configuration.cellboxTextColor,
                              textAlign: "center",
                              fontFamily:"Poppins"
                            },
                          }}
                          style={{
                            width: "100%",
                            borderBottom: index === 5 ? null : `1px solid `,
                          }}
                          value={
                            configuration.enableEmptySheet
                              ? ""
                              : team2RHP[index]
                          }
                          onChange={(event, newValue) => {
                            console.log(newValue, "<==== on change");
                            handleSelectChange(
                              newValue,
                              index,
                              TEAM2_RHP_CHANGED,
                              "two"
                            );
                          }}
                          onInputChange={(event, newInputValue) => {
                            console.log(newInputValue, "<=== on input change");
                            handleSelectChange(
                              newInputValue,
                              index,
                              TEAM2_RHP_CHANGED,
                              "two"
                            );
                          }}
                          forcePopupIcon={false}
                          options={Object.values(names)}
                          className="player-name-input"
                          renderInput={(params) => (
                            <TextField
                              disableUnderline
                              variant="standard"
                              {...params}
                              InputProps={{
                                ...params.InputProps,
                                disableUnderline: true,
                              }}
                            />
                          )}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DugOutLineup;
