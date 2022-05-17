import "./umpireLineup.scss";
import { Input, Typography } from "@mui/material";
import ReactToPrint from "react-to-print";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getNames } from "../../../redux/names";
import { getConfiguration } from "../../../redux/user";
import defaultImage1 from "../../../Assets/Components/Lineup/image1.png";
import CircularProgress from "@mui/material/CircularProgress";

// import Roster from "../Roster/roster";
import {
  getTeam1,
  getDate,
  getsmallImage1,
  getsmallImage2,
  getCoachName,
  getEstablishmentName,
  getsmallImage3,
  getLastPosition,
} from "../../../redux/lineup";
import { COACH_NAME_CHANGED } from "../../../redux/lineup";

const UmpireLineup = (props) => {
  const [date, setDate] = useState("");
  const assetURL = process.env.REACT_APP_ASSET_URL;
  let editImageIcon = useRef(null);
  const dispatch = useDispatch();
  const names = useSelector(getNames);
  const team1 = useSelector(getTeam1);
  // const team2 = useSelector(getTeam2);
  const currentDate = useSelector(getDate);
  const smallImage1 = useSelector(getsmallImage1);
  const smallImage2 = useSelector(getsmallImage2);
  const smallImage3 = useSelector(getsmallImage3);
  const coachName = useSelector(getCoachName);
  const establishmentName = useSelector(getEstablishmentName);

  const configuration = useSelector(getConfiguration);
  // const [configuration.enableEmptySheet, setconfiguration.enableEmptySheet] = useState(configuration.enableconfiguration.enableEmptySheet);

  const lastPosition = useSelector(getLastPosition);
  const [circulatLoader, setCircularLoader] = useState(false);
  let myref = useRef();

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

  const onChange = (e) => {
    dispatch({
      type: COACH_NAME_CHANGED,
      payload: e.target.value,
    });
  };
  useEffect(() => {
    stringyfyDate();
  }, [currentDate]);

  return (
    <div
      onClick={() => {
        console.log(myref);
      }}
      className="wow"
    >
      <div className="print-button-div">
        {circulatLoader ? (
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
            className="react-print"
            content={() => {
              setCircularLoader(true);
              return myref;
            }}
          />
        )}
      </div>
      <div style={{ border: `3px solid black` }} className="umpire-lineup-main">
        <div className="umpire-lineup">
          <div className="umpire-header">
            <div className="umpire-header-box">
              <div
                className="umpire-small-logo-box"
                style={{
                  justifyContent: "center",
                  alignItems: configuration.leftLogoPosition,
                }}
              >
                <img
                  onMouseEnter={() => {
                    console.log("on");
                    console.log(editImageIcon.current, "<<====");
                    // editImageIcon.current.display = "block";
                  }}
                  src={
                    smallImage1 === "" ||
                    smallImage1 === undefined ||
                    smallImage1 === null
                      ? defaultImage1
                      : assetURL + smallImage1
                  }
                  alt="Logo 1"
                  style={{
                    width: configuration.leftLogoSize * 1.5,
                    height: configuration.leftLogoSize,
                  }}
                ></img>
              </div>
              <div
                style={{
                  fontSize: configuration.fontSize,
                  overflow: "hidden",
                  justifyContent: "center",
                  alignItems: configuration.textAlignment,
                  width: configuration.centerLogoSize * 6,
                }}
                className="umpire-large-logo-box"
                onClick={() => {
                  console.log(team1);
                }}
              >
                {configuration.enableLogo ? (
                  <img
                    style={{
                      overflow: "hidden",
                      width: configuration.centerLogoSize * 2,
                      // height: configuration.centerLogoSize,
                      height: "100%",
                    }}
                    src={
                      smallImage3 === "" ||
                      smallImage3 === undefined ||
                      smallImage3 === null
                        ? defaultImage1
                        : assetURL + smallImage3
                    }
                    alt="Logo 1"
                    className="img-ump"
                  ></img>
                ) : (
                  <p
                    style={{
                      margin: "0px",
                      color: configuration.headerColor,
                      overflow: "hidden",
                      fontSize: configuration.fontSize - "30px",
                      fontFamily: "Poppins",
                    }}
                    className="p-logo"
                  >
                    {establishmentName}
                  </p>
                )}
              </div>
              <div
                style={{
                  justifyContent: "center",
                  alignItems: configuration.rightLogoPosition,
                }}
                className="umpire-small-logo-box"
              >
                <img
                  style={{
                    width: configuration.rightLogoSize * 1.5,
                    height: configuration.rightLogoSize,
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
          <div className="header-timer-box">
            <p className="date-heading">{date}</p>
          </div>
          <div className="umpire-body">
            <div
              style={{ backgroundColor: configuration.cellboxTextColor }}
              className="team-body-heading"
            >
              <div
                className="left-side"
                style={{ backgroundColor: configuration.cellboxColor }}
              >
                <h2
                  className="heading-one"
                  style={{
                    color: configuration.cellboxTextColor,
                    fontFamily: "Poppins",
                    paddingLeft: "20px",
                  }}
                >
                  ORIGINAL LINEUP
                </h2>
                <h2
                  style={{
                    marginRight: "10%",
                    color: configuration.cellboxTextColor,
                    fontFamily: "Poppins",
                    paddingLeft: "0px",
                  }}
                  className="heading-two"
                >
                  POS.
                </h2>
              </div>
              <div
                className="right-side"
                style={{
                  backgroundColor: configuration.cellboxColor,
                  color: configuration.cellboxTextColor,
                }}
              >
                <h2
                  className="heading-three"
                  style={{
                    color: configuration.cellboxTextColor,
                    fontFamily: "Poppins",
                  }}
                >
                  CHANGES
                </h2>
              </div>
            </div>
            {/* team1 */}
            <div className="team-divison">
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
                        borderBottom: `1px solid `,
                      }}
                      className="player-box"
                    >
                      <div className="player-number">
                        <p style={{ color: configuration.numberColor }}>
                          {index === 9 ? lastPosition : index + 1}
                        </p>
                      </div>
                      <div className="player-detail-box">
                        {/* player 1 */}
                        <div className="player-detail-row">
                          <div
                            className="player-name"
                            style={{
                              display:
                                team1[index].playerOne === "" ||
                                team1[index].playerOne === undefined ||
                                team1[index].playerOne === null
                                  ? "none"
                                  : "block",
                            }}
                          >
                            <Typography style={{ fontFamily: "Poppins" }}>
                              {configuration.enableEmptySheet ? (
                                " "
                              ) : team1[index].playerOne === "" ? (
                                <p
                                  style={{
                                    color: "#F5F5F5",
                                    fontFamily: "Poppins",
                                  }}
                                >
                                  none
                                </p>
                              ) : (
                                team1[index].playerOne
                              )}
                            </Typography>
                          </div>
                          <div
                            className="player-position"
                            // style={{ color: configuration.cellboxTextColor }}
                          >
                            <Typography style={{ fontFamily: "Poppins" }}>
                              {configuration.enableEmptySheet
                                ? " "
                                : team1[index].playerOnePosition === ""
                                ? " "
                                : team1[index].playerOnePosition}
                            </Typography>
                          </div>
                        </div>
                        {/* player 2 */}
                        {configuration.enableEmptySheet ? (
                          <div
                            style={{ borderTop: "1px solid" }}
                            className="player-detail-row"
                          ></div>
                        ) : null}
                        <div
                          style={{
                            display:
                              configuration.enableEmptySheet === true ||
                              team1[index].playerTwo === "" ||
                              team1[index].playerTwo === " " ||
                              team1[index].playerTwo === undefined ||
                              team1[index].playerTwo === null
                                ? "none"
                                : "flex",
                            borderTop:
                              team1[index].playerOne === "" ||
                              team1[index].playerOne === " " ||
                              team1[index].playerOne === undefined ||
                              team1[index].playerOne === null
                                ? "none"
                                : "1px solid",
                            fontFamily: "Poppins",
                          }}
                          className="player-detail-row"
                        >
                          <div
                            className="player-name"
                            // style={{ color: configuration.cellboxTextColor }}
                          >
                            <Typography style={{ fontFamily: "Poppins" }}>
                              {configuration.enableEmptySheet ? (
                                ""
                              ) : team1[index].playerTwo === "" ? (
                                <p
                                  style={{
                                    color: "#F5F5F5",
                                    fontFamily: "Poppins",
                                  }}
                                >
                                  {" "}
                                  none
                                </p>
                              ) : (
                                team1[index].playerTwo
                              )}
                            </Typography>
                          </div>
                          <div className="player-position">
                            <Typography style={{ fontFamily: "Poppins" }}>
                              {configuration.enableEmptySheet
                                ? " "
                                : team1[index].playerTwoPosition}
                            </Typography>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* team2 */}
              <div className="team-selection">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => {
                  return (
                    <div
                      style={{
                        borderBottom: `1px solid `,
                      }}
                      className="player-box"
                    >
                      {/* <div className="player-number">
                        <p style={{ color: configuration.numberColor }}>
                          {index === 9 ? lastPosition : index + 1}
                        </p>
                      </div> */}
                      <div className="player-detail-box">
                        <div className="player-detail-row">
                          <div
                            className="player-name"
                            style={{ color: configuration.cellboxTextColor }}
                          >
                            {/* <Typography>{team2[index].playerOne}</Typography> */}
                          </div>
                          <div
                            className="player-position"
                            style={{ color: configuration.cellboxTextColor }}
                          >
                            <Typography>
                              {/* {team2[index].playerOnePosition} */}
                            </Typography>
                          </div>
                        </div>
                        <div
                          style={{
                            borderTop: `1px solid `,
                          }}
                          className="player-detail-row"
                        >
                          <div
                            className="player-name"
                            style={{ color: configuration.cellboxTextColor }}
                          >
                            {/* <Typography>{team2[index].playerTwo}</Typography> */}
                          </div>
                          <div
                            className="player-position"
                            style={{ color: configuration.cellboxTextColor }}
                          >
                            <Typography>
                              {/* {team2[index].playerTwoPosition} */}
                            </Typography>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="umpireLineup-roster-body">
            <div
              style={{
                backgroundColor: configuration.cellboxColor,
                color: configuration.cellboxTextColor,
                fontFamily: "Poppins",
              }}
              className="umpire-lineup-roster-header"
            >
              <h2>ROSTER</h2>
            </div>
            <div className="roster-body-main">
              {Object.keys(names).map((key, index) => {
                return (
                  <div
                    className="body-item"
                    // style={{ color: configuration.cellboxTextColor }}
                  >
                    <Typography style={{ fontFamily: "Poppins" }}>
                      {names[key]}
                    </Typography>
                  </div>
                );
              })}
            </div>
            <div
              className="coach-box"
              // style={{ color: configuration.cellboxTextColor }}
            >
              <p className="coach-name" style={{ fontFamily: "Poppins" }}>
                Head Coach:
              </p>
              <Input
                style={{
                  fontWeight: "bolder",
                  fontFamily: "Poppins",

                  // color: configuration.cellboxTextColor,
                }}
                disableUnderline
                value={coachName}
                onChange={(e) => {
                  onChange(e);
                }}
                placeholder="Coach Name"
                type="text"
                // style={{ width: "90%" }}
              />
            </div>
          </div>
        </div>
      </div>
      {/* PRINT LAYOUT */}
      <div style={{ display: "none" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: "5px",
          }}
          ref={(el) => (myref = el)}
        >
          {/* ############################################################################################################################################################################################################################################################################################## */}
          {[0, 1, 2].map((item) => {
            return (
              <div
                style={{
                  width: "33%",
                  border: `3px solid `,
                }}
                className="umpire-lineup-main"
              >
                <div className="umpire-lineup">
                  <div className="umpire-header">
                    <div className="umpire-header-box">
                      <div
                        className="umpire-small-logo-box"
                        style={{ width: "10%" }}
                      >
                        <img
                          onMouseEnter={() => {
                            console.log("on");
                            console.log(editImageIcon.current, "<<====");
                            // editImageIcon.current.display = "block";
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
                          justifyContent: "center",
                          alignItems: configuration.textAlignment,
                          fontSize: configuration.fontSize,
                          overflow: "hidden",

                          width: "100%",
                        }}
                        className="umpire-large-logo-box"
                        onClick={() =>
                          console.log(
                            smallImage1,
                            "<=== image1",
                            smallImage2,
                            "<====image2"
                          )
                        }
                      >
                        {configuration.enableLogo ? (
                          <img
                            style={{ width: "80%", height: "100%" }}
                            src={
                              smallImage3 === "" ||
                              smallImage3 === undefined ||
                              smallImage3 === null
                                ? defaultImage1
                                : assetURL + smallImage3
                            }
                            alt="Logo 1"
                          ></img>
                        ) : (
                          <p
                            style={{
                              height: "40%",
                              width: "70%",
                              fontSize: "22px",
                              flexWrap: "wrap",
                              margin: "0px",
                              color: configuration.headerColor,
                              fontFamily: "Poppins",
                            }}
                          >
                            {establishmentName}
                          </p>
                        )}
                      </div>
                      <div
                        style={{ justifyContent: "flex-end" }}
                        className="umpire-small-logo-box"
                      >
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
                  <div className="header-timer-box">
                    <p style={{ fontSize: "16px" }}>{date}</p>
                  </div>
                  <div className="umpire-body">
                    <div
                      style={{
                        backgroundColor: configuration.cellboxTextColor,
                      }}
                      className="team-body-heading"
                    >
                      <div
                        className="left-side"
                        style={{
                          backgroundColor: configuration.cellboxTextColor,
                        }}
                      >
                        <h2 style={{ fontSize: "12px", fontFamily: "Poppins" }}>
                          ORIGINAL LINEUP
                        </h2>
                        <h2
                          style={{
                            marginRight: "10%",
                            fontSize: "16px",
                            fontFamily: "Poppins",
                          }}
                        >
                          POS.
                        </h2>
                      </div>
                      <div className="right-side">
                        <h2 style={{ fontSize: "16px", fontFamily: "Poppins" }}>
                          CHANGES
                        </h2>
                      </div>
                    </div>
                    {/* team1 */}
                    <div className="team-divison">
                      <div
                        className="team-selection"
                        style={{
                          borderRight: `1px solid `,
                        }}
                        u
                      >
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => {
                          return (
                            <div
                              style={{
                                borderBottom: `1px solid `,
                                height: "40px",
                              }}
                              className="player-box"
                            >
                              <div className="player-number">
                                <p
                                  style={{
                                    color: configuration.numberColor,
                                    fontSize: "32px",
                                  }}
                                >
                                  {index === 9 ? lastPosition : index + 1}
                                </p>
                              </div>
                              <div className="player-detail-box">
                                <div className="player-detail-row">
                                  <div
                                    className="player-name"
                                    style={{
                                      display:
                                        team1[index].playerOne === "" ||
                                        team1[index].playerOne === undefined ||
                                        team1[index].playerOne === null
                                          ? "none"
                                          : "block",
                                    }}
                                  >
                                    <Typography
                                      style={{
                                        fontSize: "12px",
                                        fontFamily: "Poppins",
                                      }}
                                    >
                                      {configuration.enableEmptySheet
                                        ? " "
                                        : team1[index].playerOne}
                                    </Typography>
                                  </div>
                                  <div className="player-position">
                                    <Typography
                                      style={{
                                        fontSize: "12px",
                                        fontFamily: "Poppins",
                                      }}
                                    >
                                      {configuration.enableEmptySheet
                                        ? " "
                                        : team1[index].playerOnePosition}
                                    </Typography>
                                  </div>
                                </div>
                                {configuration.enableEmptySheet ? (
                                  <div
                                    style={{ borderTop: "1px solid" }}
                                    className="player-detail-row"
                                  ></div>
                                ) : null}
                                <div
                                  style={{
                                    display:
                                      configuration.enableEmptySheet === true ||
                                      team1[index].playerTwo === "" ||
                                      team1[index].playerTwo === " " ||
                                      team1[index].playerTwo === undefined ||
                                      team1[index].playerTwo === null
                                        ? "none"
                                        : "flex",
                                    borderTop:
                                      team1[index].playerOne === "" ||
                                      team1[index].playerOne === " " ||
                                      team1[index].playerOne === undefined ||
                                      team1[index].playerOne === null
                                        ? "none"
                                        : "1px solid",
                                    fontFamily: "Poppins",
                                  }}
                                  className="player-detail-row"
                                >
                                  <div
                                    className="player-name"
                                    // style={{
                                    //   color: configuration.cellboxTextColor,
                                    // }}
                                  >
                                    <Typography
                                      style={{
                                        fontSize: "12px",
                                        fontFamily: "Poppins",
                                      }}
                                    >
                                      {configuration.enableEmptySheet
                                        ? " "
                                        : team1[index].playerTwo}
                                    </Typography>
                                  </div>
                                  <div className="player-position">
                                    <Typography
                                      style={{
                                        fontSize: "12px",
                                        fontFamily: "Poppins",
                                      }}
                                    >
                                      {configuration.enableEmptySheet
                                        ? " "
                                        : team1[index].playerTwoPosition}
                                    </Typography>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      {/* team2 */}
                      <div className="team-selection">
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => {
                          return (
                            <div
                              style={{
                                borderBottom: `1px solid`,
                                height: "40px",
                              }}
                              className="player-box"
                            >
                              {/* <div className="player-number">
                                <p
                                  style={{
                                    color: configuration.numberColor,
                                    fontSize: "32px",
                                  }}
                                >
                                  {index === 9 ? lastPosition : index + 1}
                                </p>
                              </div> */}
                              <div className="player-detail-box">
                                <div className="player-detail-row">
                                  <div
                                    className="player-name"
                                    style={{
                                      color: "#ffffff",
                                    }}
                                  >
                                    <Typography>"aaaaa"</Typography>
                                  </div>
                                  <div
                                    className="player-position"
                                    style={{
                                      color: "#ffffff",
                                    }}
                                  >
                                    <Typography
                                      style={{
                                        fontSize: "12px",
                                        fontFamily: "Poppins",
                                      }}
                                    >
                                      {/* {team2[index].playerOnePosition} */}
                                    </Typography>
                                  </div>
                                </div>
                                <div
                                  style={{
                                    borderTop: `1px solid`,
                                  }}
                                  className="player-detail-row"
                                >
                                  <div
                                    className="player-name"
                                    style={{
                                      color: "#ffffff",
                                    }}
                                  >
                                    <Typography>"aaaaaa"</Typography>
                                  </div>
                                  <div
                                    className="player-position"
                                    style={{
                                      color: configuration.cellboxTextColor,
                                    }}
                                  >
                                    <Typography>
                                      {/* {team2[index].playerTwoPosition} */}
                                    </Typography>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="umpireLineup-roster-body">
                    <div
                      style={{
                        backgroundColor: configuration.cellboxTextColor,
                      }}
                      className="umpire-lineup-roster-header"
                    >
                      <h2
                        style={{
                          fontSize: "16px",
                          margin: "0px",
                          padding: "0px",
                          fontFamily: "Poppins",
                        }}
                      >
                        ROSTER
                      </h2>
                    </div>
                    <div
                      style={{
                        rowGap: "0px",
                        gap: "0px",
                        columnGap: "0px",
                        maxHeight: "200px",
                        width: "110%",
                        fontFamily: "Poppins",
                      }}
                      className="roster-body-main"
                    >
                      {Object.keys(names).map((key, index) => {
                        return (
                          <div
                            style={{
                              fontSize: "2px",
                              width: "80px",
                              rowGap: "2px",
                            }}
                            className="body-item"
                          >
                            <Typography
                              style={{ fontSize: "8px", fontFamily: "Poppins" }}
                            >
                              {names[key]}
                            </Typography>
                          </div>
                        );
                      })}
                    </div>
                    <div className="coach-box">
                      <p
                        style={{
                          fontSize: "12px",
                          color: configuration.cellboxTextColor,
                          fontFamily: "Poppins",
                        }}
                        className="coach-name"
                      >
                        Head Coach:
                      </p>
                      <Input
                        style={{
                          fontSize: "12px",
                          fontWeight: "bolder",
                          fontFamily: "Poppins",
                        }}
                        disableUnderline
                        value={configuration.enableEmptySheet ? " " : coachName}
                        onChange={(e) => {
                          onChange(e);
                        }}
                        placeholder="Coach Name"
                        type="text"
                        // style={{ width: "90%" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UmpireLineup;
