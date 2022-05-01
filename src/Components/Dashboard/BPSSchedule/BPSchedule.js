import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./BPSchedule.scss";
import ReactToPrint from "react-to-print";
import defaultImage1 from "../../../Assets/Components/Lineup/image1.png";
import { FormControl, Select, MenuItem, Input } from "@mui/material";
import {
  getDate,
  getsmallImage1,
  getsmallImage2,
  getEstablishmentName,
  getsmallImage3,
} from "../../../redux/lineup";
import { getConfiguration } from "../../../redux/user";
import { CircularProgress } from "@mui/material";
import {
  BLOCK_ONE_CHANGED,
  BLOCK_FOUR_CHANGED,
  BLOCK_THREE_CHANGED,
  BLOCK_TWO_CHANGED,
} from "../../../redux/BPSchedule.redux";
import { getNames } from "../../../redux/names";
import { getBlocks } from "../../../redux/BPSchedule.redux";
const BPSchedule = () => {
  const dispatch = useDispatch();
  const [circulatLoader, setCircularLoader] = useState(false);
  const assetURL = process.env.REACT_APP_ASSET_URL;
  let myref = useRef();
  const [date, setDate] = useState("");
  const smallImage1 = useSelector(getsmallImage1);
  const smallImage2 = useSelector(getsmallImage2);
  const smallImage3 = useSelector(getsmallImage3);
  const establishmentName = useSelector(getEstablishmentName);
  const currentDate = useSelector(getDate);
  const roster = useSelector(getNames);
  const blocks = useSelector(getBlocks);
  const configuration = useSelector(getConfiguration);
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

  const handleTextFieldChange = (e, blockNumber, field, hitterIndex = null) => {
    console.log(blockNumber, "<=== block number");
    console.log(blocks.blockOne, "<======= complete Block");
    let temp = "";
    let type = "";
    switch (blockNumber) {
      case 1:
        type = BLOCK_ONE_CHANGED;
        temp = "blockOne";
        break;
      case 2:
        temp = "blockTwo";
        type = BLOCK_TWO_CHANGED;
        break;
      case 3:
        temp = "blockThree";
        type = BLOCK_THREE_CHANGED;
        break;
      case 4:
        temp = "blockFour";
        type = BLOCK_FOUR_CHANGED;
        break;
      default:
        break;
    }
    let wow = {};
    console.log(field, "<==== field");
    wow = e.target.value;
    if (field === "hitters") {
      console.log(blocks[temp].hitters, "<==========================amazing");
      wow = blocks[temp].hitters.map((hitter, index) => {
        console.log(index, "current Index");
        console.log(hitterIndex, "<======= hitter");
        console.log(e.target.value, "<============ value");
        if (index === hitterIndex) {
          console.log("found");
          return e.target.value;
        }
        return hitter;
      });
    }
    console.log(
      { ...blocks[temp], [field]: wow },
      "<============ final payload"
    );
    dispatch({
      type: type,
      payload: { ...blocks[temp], [field]: wow },
    });
  };

  useEffect(() => {
    stringyfyDate();
  }, []);
  console.log(blocks, "<blockssssssssssssssssssssssssssssssss");
  return (
    <div className="BPSchedule-main">
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
            content={() => {
              setCircularLoader(true);
              return myref;
            }}
          />
        )}
      </div>
      <div
        ref={(el) => (myref = el)}
        style={{ border: `3px solid` }}
        className="BPShedule-body"
      >
        <div className="BP-header">
          <div
            className="small-logo-box"
            style={{
              justifyContent: "center",
              alignItems: configuration.leftLogoPosition,
            }}
          >
            <img
              onMouseEnter={() => {
                console.log("on");
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
              justifyContent: "center",
              alignItems: configuration.textAlignment,
              color: configuration.headerColor,
              overflow: "hidden",
            }}
            className="large-logo-box"
          >
            {configuration.enableLogo ? (
              <img
                src={
                  smallImage3 === "" ||
                  smallImage3 === undefined ||
                  smallImage3 === null
                    ? defaultImage1
                    : assetURL + smallImage3
                }
                style={{
                  width: configuration.centerLogoSize * 3,
                  height: configuration.centerLogoSize,
                }}
                alt="Logo 1"
                className="img-bps"
              ></img>
            ) : (
              <p style={{ margin: "0px", fontSize: configuration.fontSize -"20px" }}>
                {establishmentName}
              </p>
            )}
          </div>
          <div
            className="small-logo-box"
            style={{
              justifyContent: "center",
              alignItems: configuration.rightLogoPosition,
            }}
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
              style={{
                width: configuration.rightLogoSize * 1.5,
                height: configuration.rightLogoSize,
              }}
            ></img>
          </div>
        </div>
        <div className="BP-Scehdule-Timebox">{date}</div>
        <div
          style={{
            backgroundColor: configuration.cellboxColor,
            color: configuration.cellboxTextColor,
          }}
          className="BP-heading"
        >
          Battling Practice Schedule
        </div>
        <div className="BP-body">
          {Object.keys(blocks).map((block, boxIndex) => {
            return (
              <div
                style={{
                  border: `1px solid `,
                }}
                className="BP-box"
              >
                <div
                  style={{
                    backgroundColor: configuration.cellboxColor,
                    color: configuration.cellboxTextColor,
                  }}
                  className="box-heading"
                >
                  GROUP {boxIndex % 2 === 0 ? 1 : 2}
                </div>
                <div className="box-content">
                  <div
                    style={{
                      borderBottom: `1px solid `,
                    }}
                    className="box-row"
                  >
                    <div
                      style={{
                        borderRight: `1px solid `,
                      }}
                      className="row-left-side"
                    >
                      TIME:
                    </div>
                    <div className="row-right-side">
                      <Input
                        value={blocks[block].startTime}
                        onChange={(e) =>
                          handleTextFieldChange(e, boxIndex + 1, "startTime")
                        }
                        inputProps={{ style: { textAlign: "center" } }}
                        disableUnderline
                        placeholder="enter time"
                        style={{
                          height: "100%",
                          width: "45%",
                          textAlign: "center",
                          padding: "0px",
                          fontSize: "24px",
                          fontFamily: "Poppins",
                          borderRight: `1px solid `,
                        }}
                      />
                      <span>-</span>
                      <Input
                        value={blocks[block].endTime}
                        onChange={(e) =>
                          handleTextFieldChange(e, boxIndex + 1, "endTime")
                        }
                        placeholder="enter time"
                        inputProps={{ style: { textAlign: "center" } }}
                        disableUnderline
                        style={{
                          width: "45%",
                          textAlign: "center",
                          padding: "0px",
                          fontSize: "24px",
                          fontFamily: "Poppins",
                          borderLeft: `1px solid `,
                        }}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      borderBottom: `1px solid `,
                    }}
                    className="box-row"
                  >
                    <div
                      style={{
                        borderRight: `1px solid `,
                      }}
                      className="row-left-side"
                    >
                      BP PITCHER:
                    </div>
                    <div className="row-right-side">
                      <Input
                        value={blocks[block].pitcher}
                        inputProps={{ style: { textAlign: "center" } }}
                        disableUnderline
                        placeholder="ENTER COACH NAME"
                        onChange={(e) =>
                          handleTextFieldChange(e, boxIndex + 1, "pitcher")
                        }
                        style={{
                          textAlign: "center",
                          padding: "0px",
                          fontSize: "24px",
                          fontFamily: "Poppins",
                        }}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      borderBottom: `1px solid `,
                    }}
                    className="box-row"
                  >
                    <div
                      style={{
                        borderRight: `1px solid `,
                      }}
                      className="row-left-side"
                    >
                      FUNGO:
                    </div>
                    <div className="row-right-side">
                      <Input
                        value={blocks[block].fungo}
                        inputProps={{ style: { textAlign: "center" } }}
                        disableUnderline
                        placeholder="ENTER COACH NAME"
                        onChange={(e) =>
                          handleTextFieldChange(e, boxIndex + 1, "fungo")
                        }
                        style={{
                          textAlign: "center",
                          padding: "0px",
                          fontSize: "24px",
                          fontFamily: "Poppins",
                        }}
                      />
                    </div>
                  </div>
                  <div className="box-row">
                    <div
                      style={{
                        borderRight: `1px solid `,
                      }}
                      className="row-left-side"
                    >
                      BUCKET:
                    </div>
                    <div className="row-right-side">
                      <Input
                        value={blocks[block].bucket}
                        inputProps={{ style: { textAlign: "center" } }}
                        disableUnderline
                        placeholder="ENTER COACH NAME"
                        style={{
                          textAlign: "center",
                          padding: "0px",
                          fontSize: "24px",
                          fontFamily: "Poppins",
                        }}
                        onChange={(e) =>
                          handleTextFieldChange(e, boxIndex + 1, "bucket")
                        }
                      />
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    backgroundColor: configuration.cellboxColor,
                    color: configuration.cellboxTextColor,
                  }}
                  className="box-heading"
                >
                  HITTERS
                </div>
                {[0, 1, 2, 3, 4, 5].map((item, index) => {
                  return (
                    <div className="box-row">
                      <FormControl
                        style={{
                          width: "100%",
                          textAlign: "center",
                          padding: "0px",
                        }}
                        variant="standard"
                      >
                        <Select
                          IconComponent="span"
                          value={blocks[block].hitters[index]}
                          className="player-name-input"
                          onChange={(e) =>
                            handleTextFieldChange(
                              e,
                              boxIndex + 1,
                              "hitters",
                              index
                            )
                          }
                        >
                          {Object.keys(roster).map((key, index) => {
                            return (
                              <MenuItem value={index + 1 + " " + roster[key]}>
                                {index + 1 + " " + roster[key]}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BPSchedule;
