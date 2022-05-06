import "./configuration.scss";
import { Input, TextField } from "@mui/material";

import { useSelector, useDispatch } from "react-redux";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import DateAdapter from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

import Typography from "@mui/material/Typography";

import { useSnackbar } from "notistack";
import { Switch } from "@mui/material";

import { getDate, DATE_CHANGED, changeImage } from "../../../redux/lineup";
import { getConfiguration, CONFIGURATION_CHANGED } from "../../../redux/user";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";

import { TwitterPicker } from "react-color";

import {} from "../../../redux/lineup";
import { LAST_POSITIION_CHANGED } from "../../../redux/lineup";

const Configuration = () => {
  const currentDate = useSelector(getDate);
  const dispatch = useDispatch();
  const configuration = useSelector(getConfiguration);
  const { enqueueSnackbar } = useSnackbar();
  const handleDateChange = (date) => {
    try {
      dispatch({
        type: DATE_CHANGED,
        payload: date,
      });
    } catch (e) {
      console.log(e);
    }
    console.log(currentDate, "<======= changed date");
    enqueueSnackbar(`The Date Successfully Changed to ${date}`, {
      variant: "success",
    });
  };
  const modalRow = {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    // border: "1px solid red",
    alignItems: "center",
  };
  const modalBox = {
    width: "50%",
    // border: "1px solid blue",
  };
  const boxDivider = {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };
  const handleBlankSheetChange = (e) => {
    console.log(configuration, "<======= configuration");
    if (configuration && configuration.enableEmptySheet === true) {
      enqueueSnackbar("Empty Sheet Successfully Disabled", {
        variant: "success",
      });
    } else {
      enqueueSnackbar("Empty Sheet Successfully Enabled", {
        variant: "success",
      });
    }
    configuration && configuration.enableEmptySheet === true
      ? dispatch({
          type: CONFIGURATION_CHANGED,
          payload: { ...configuration, enableEmptySheet: false },
        })
      : dispatch({
          type: CONFIGURATION_CHANGED,
          payload: { ...configuration, enableEmptySheet: true },
        });
  };

  const handleConfigurationPropertyChange = (property, value) => {
    dispatch({
      type: CONFIGURATION_CHANGED,
      payload: { ...configuration, [property]: value },
    });
    enqueueSnackbar(`The ${property} Successfully Changed in to ${value}`, {
      variant: "success",
    });
  };


  const style = {
    padding: "10px",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    height: "90%",
    bgcolor: "background.paper",
    boxShadow: 24,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    overflowY: "scroll",
    boxSizing: "border-box",
    gap: "10px",
    maxWidth: "550px",
  };

  const handleConfigChange = (value, field) => {
    dispatch({
      type: CONFIGURATION_CHANGED,
      payload: { ...configuration, [field]: value },
    });
  };

  const handleColorChange = (color, type) => {
    switch (type) {
      case "header":
        dispatch({
          type: CONFIGURATION_CHANGED,
          payload: { ...configuration, headerColor: color.hex },
        });
        break;
      case "number":
        dispatch({
          type: CONFIGURATION_CHANGED,
          payload: { ...configuration, numberColor: color.hex },
        });
        break;
      case "cellbox":
        dispatch({
          type: CONFIGURATION_CHANGED,
          payload: { ...configuration, cellboxColor: color.hex },
        });
        break;
      case "cellboxText":
        dispatch({
          type: CONFIGURATION_CHANGED,
          payload: { ...configuration, cellboxTextColor: color.hex },
        });
        break;
      default:
        break;
    }
    enqueueSnackbar(
      `Color Successfully Changed to : ${color.hex} in  ${type} `,
      {
        sx: {
          "& .SnackbarContent-root": {
            color: "grey",
            backgroundColor: color.hex,
            //width: 600
          },
        },
      }
    );
    console.log(configuration, "<==== complete config");
  };

  const handleSwitchChange = (e) => {
    configuration && configuration.enableLogo === true
      ? dispatch({
          type: CONFIGURATION_CHANGED,
          payload: { ...configuration, enableLogo: false },
        })
      : dispatch({
          type: CONFIGURATION_CHANGED,
          payload: { ...configuration, enableLogo: true },
        });
  };
  const handeFileChange = (e, dispatchEvent) => {
    try {
      dispatch(changeImage({ image: e.target.files[0], type: dispatchEvent }));
      enqueueSnackbar("Image Successfully Uploaded!", { variant: "success" });
    } catch (err) {}
  };
  return (
    <div className="configuration-main">
      <div sx={style} className="config-page-start">
        <div style={modalRow}>
          <h2
            onClick={() => {
              console.log(configuration);
            }}
          >
            PROJECT SETTINGS
          </h2>
        </div>
        <div style={modalRow}>
          <h3>Set Date & Set Blanksheet</h3>
        </div>
        <div style={modalRow} className="config-name-date">
          <div style={modalBox} className="config-date-componenet">
            <LocalizationProvider dateAdapter={DateAdapter}>
              <DesktopDatePicker
                // label="Choose Date"
                // inputFormat="MM/dd/yyyy"
                value={currentDate}
                onChange={(e) => {
                  try {
                    handleDateChange(e._d);
                  } catch (error) {
                    console.log(error);
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    inputFormat="MM/dd/yyyy"
                    variant="standard"
                    value={currentDate}
                    disabled={true}
                    {...params}
                  />
                )}
              />
            </LocalizationProvider>
          </div>
          <div style={modalBox} className="config-heading-blanksheet">
            <div style={boxDivider} className="config-blanksheet">
              <Typography style={{ width: "50%" }}>
                Enable Blanksheet:
              </Typography>
              <Switch
                style={{ width: "70" }}
                checked={configuration.enableEmptySheet}
                onChange={(e) => {
                  handleBlankSheetChange(e);
                }}
              />
            </div>
          </div>
        </div>
        <h3 className="config-set-color">Set Colors</h3>
        <div style={modalRow} className="config-colors-one">
          <div style={modalBox} className="color-pik">
            <div className="config-color-one">
              <Typography style={{ padding: "17px" }}>Cell:</Typography>
              <TwitterPicker
                triangle="hide"
                width="170px"
                onChange={(color, e) => {
                  console.log(color, "<=== color");
                  console.log(e, "<=== e");
                  handleColorChange(color, "cellbox");
                }}
              />
            </div>
          </div>
          <div style={modalBox} className="color-pik">
            <div className="config-color-one">
              <Typography style={{ padding: "17px" }}>Text:</Typography>
              <TwitterPicker
                triangle="hide"
                width="170px"
                onChange={(color, e) => {
                  console.log(color, "<=== color");
                  console.log(e, "<=== e");
                  handleColorChange(color, "cellboxText");
                }}
              />
            </div>
          </div>
        </div>
        <div style={modalRow} className="config-colors-two">
          <div style={modalBox} className="color-pik">
            <div className="config-color-one">
              <Typography style={{ padding: "5px" }}>Heading:</Typography>
              <TwitterPicker
                triangle="hide"
                width="170px"
                onChange={(color, e) => {
                  console.log(color, "<=== color");
                  console.log(e, "<=== e");
                  handleColorChange(color, "header");
                }}
              />
            </div>
          </div>
          <div style={modalBox} className="color-pik">
            <div className="config-color-one">
              <Typography style={{ padding: "5px" }}>Number:</Typography>
              <TwitterPicker
                triangle="hide"
                width="170px"
                onChange={(color, e) => {
                  console.log(color, "<=== color");
                  console.log(e, "<=== e");
                  handleColorChange(color, "number");
                }}
              />
            </div>
          </div>
        </div>
        <div className="config-three-function">
          <div className="config-left-content">
            <div style={{ width: "100%" }}>
              <h3 style={{ display: "flex", justifyContent: "center" }}>
                INSERT LEFT SIDE LOGO
              </h3>
              <div style={modalRow}>
                {/* <Typography>Choose left Image:</Typography> */}
                <label htmlFor="contained-button-file">
                  <Input
                    style={{ display: "none" }}
                    accept="image/*"
                    id="contained-button-file"
                    single
                    type="file"
                    onChange={(e) => handeFileChange(e, "image1")}
                    className="small-logo1-input"
                  />
                  <Button variant="contained" component="span" className="print-button"
                    style={{ width: "100px", margin: "10px",color:"#FFFFFF" }}
                  >
                    Upload
                  </Button>
                </label>
              </div>
            </div>
            <div style={modalRow}>
              <h3>SET LEFT SIDE LOGO</h3>
            </div>
            <div style={modalRow}>
              <Typography style={{ margin: "10px" }}> Size</Typography>
            </div>
            <div style={modalRow} className="config-button">
              <div size="large" style={{ margin: "10px" }}>
                <Button
                  onClick={(e) => {
                    handleConfigurationPropertyChange("leftLogoSize", 20);
                  }}
                  className="print-button"
                  style={{ width: "100px", margin: "10px" ,  color:"#ffffff"}}
                >
                  SMALL
                </Button>
                <Button
                  onClick={(e) => {
                    handleConfigurationPropertyChange("leftLogoSize", 30);
                  }}
                  className="print-button"
                  style={{ width: "100px", margin: "10px", color:"#ffffff",  }}
                >
                  MEDIUM
                </Button>
                <Button
                  onClick={(e) => {
                    handleConfigurationPropertyChange("leftLogoSize", 50);
                  }}
                  className="print-button"
                  style={{ width: "100px", margin: "10px",  color:"#ffffff" }}
                >
                  Large
                </Button>
              </div>
            </div>
            <div style={modalRow}>
              <Typography style={{ margin: "10px" }}>Position</Typography>
            </div>
            <div style={modalRow}>
              <div size="large">
                <Button
                  onClick={(e) => {
                    handleConfigurationPropertyChange(
                      "leftLogoPosition",
                      "left"
                    );
                  }}
                  className="print-button"
                  style={{ width: "100px", margin: "10px" ,  color:"#ffffff"}}
                >
                  LEFT
                </Button>
                <Button
                  onClick={(e) => {
                    handleConfigurationPropertyChange(
                      "leftLogoPosition",
                      "center"
                    );
                  }}
                  className="print-button"
                  style={{ width: "100px", margin: "10px",  color:"#ffffff" }}
                >
                  CENTER
                </Button>
                <Button
                  onClick={(e) => {
                    handleConfigurationPropertyChange(
                      "leftLogoPosition",
                      "right"
                    );
                  }}
                  className="print-button"
                  style={{ width: "100px", margin: "10px",  color:"#ffffff" }}
                >
                  RIGHT
                </Button>
              </div>
            </div>
          </div>

          <div style={modalRow} className="config-middle-content">
            <div>
              <h3>INSERT MIDDLE CONTENT </h3>
            </div>

            <div style={modalRow}>
              <div className="logo-enabler">
                <Typography>Enable Image:</Typography>
                <Switch
                  // checked={configuration.enablelogo}
                  checked={configuration.enableLogo}
                  onChange={(e) => {
                    console.log("onChange");
                    handleSwitchChange(e);
                  }}
                />
              </div>
            </div>
            {configuration.enableLogo ? (
              <div style={{ width: "100%" }}>
                <div style={modalRow}>
                  {/* <Typography style={{ margin: "10px" }}>
                    Choose Middle Image:
                  </Typography> */}
                  <label htmlFor="contained-button-file2">
                    <Input
                      style={{ display: "none" }}
                      accept="image/*"
                      id="contained-button-file2"
                      single
                      type="file"
                      onChange={(e) => handeFileChange(e, "image3")}
                      className="small-logo1-input"
                    />
                    <Button variant="contained" component="span"
                    
                    className="print-button"
                    style={{ width: "100px", margin: "10px" ,  color:"#ffffff"}}
                    >
                      Upload
                    </Button>
                  </label>
                </div>
               
                <div style={modalRow} className="config-image-size">
                  <Typography style={{ margin: "10px" }}>
                    Set Image Size
                  </Typography>
                </div>
                <div style={modalRow}>
                  <div size="large">
                    <Button
                      onClick={(e) => {
                        handleConfigurationPropertyChange(
                          "centerLogoSize",
                          100
                        );
                      }}
                      className="print-button"
                      style={{ width: "100px", margin: "10px", color:"#ffffff" }}
                    >
                      SMALL
                    </Button>
                    <Button
                      onClick={(e) => {
                        handleConfigurationPropertyChange(
                          "centerLogoSize",
                          150
                        );
                      }}
                      className="print-button"
                      style={{ width: "100px", margin: "10px", color:"#ffffff" }}
                    >
                      MEDIUM
                    </Button>
                    <Button
                      onClick={(e) => {
                        handleConfigurationPropertyChange(
                          "centerLogoSize",
                          200
                        );
                      }}
                      className="print-button"
                      style={{ width: "100px", margin: "10px", color:"#ffffff" }}
                    >
                      Large
                    </Button>
                  </div>
                </div>
                <div style={modalRow} className="config-mid-image-pos">
                  <Typography style={{ margin: "10px" }}>
                    Set Image Position
                  </Typography>
                </div>
                <div style={modalRow} className="config-button">
                  <div size="large">
                    <Button
                      onClick={(e) => {
                        handleConfigurationPropertyChange(
                          "textAlignment",
                          "left"
                        );
                      }}
                      className="print-button"
                      style={{ width: "100px", margin: "10px" , color:"#ffffff"}}
                    >
                      LEFT
                    </Button>
                    <Button
                      onClick={(e) => {
                        handleConfigurationPropertyChange(
                          "textAlignment",
                          "center"
                        );
                      }}
                      className="print-button"
                      style={{ width: "100px", margin: "10px", color:"#ffffff" }}
                    >
                      CENTER
                    </Button>
                    <Button
                      onClick={(e) => {
                        handleConfigurationPropertyChange(
                          "textAlignment",
                          "right"
                        );
                      }}
                      className="print-button"
                      style={{ width: "100px", margin: "10px" , color:"#ffffff"}}
                    >
                      RIGHT
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ width: "100%" }}>
                <div style={modalRow}>
                  <h3 style={{paddingTop : "24px"}}>SET MIDDLE SIDE LOGO</h3>
                </div>
               
                <div style={modalRow} className="config-mid-heading">
                  <Typography style={{ margin: "20px" }}>Text Size:</Typography>
                </div>
                <div style={modalRow}>
                  <div size="medium">
                    <Button
                      onClick={(e) => {
                        handleConfigurationPropertyChange("fontSize", "22px");
                      }}
                      className="print-button"
                      style={{ width: "100px", margin: "10px", color:"#ffffff" }}
                    >
                      Small
                    </Button>
                    <Button
                      onClick={(e) => {
                        handleConfigurationPropertyChange("fontSize", "32px");
                      }}
                      className="print-button"
                      style={{ width: "100px", margin: "10px", color:"#ffffff" }}
                    >
                      Medium
                    </Button>
                    <Button
                      onClick={(e) => {
                        handleConfigurationPropertyChange("fontSize", "55px");
                      }}
                      className="print-button"
                      style={{ width: "100px", margin: "10px", color:"#ffffff" }}
                    >
                      Large
                    </Button>
                  </div>
                </div>
                <div style={modalRow} className="config-text-set">
                  <Typography style={{ margin: "10px" }}>
                    Text Position:
                  </Typography>
                </div>
                <div style={modalRow} className="middle-buttons">
                  <div size="large">
                    <Button
                      onClick={(e) => {
                        handleConfigurationPropertyChange(
                          "textAlignment",
                          "left"
                        );
                      }}
                      className="print-button"
                      style={{ width: "100px", margin: "10px", color:"#ffffff" }}
                    >
                      LEFT
                    </Button>
                    <Button
                      onClick={(e) => {
                        handleConfigurationPropertyChange(
                          "textAlignment",
                          "center"
                        );
                      }}
                      className="print-button"
                      style={{ width: "100px", margin: "10px", color:"#ffffff" }}
                    >
                      CENTER
                    </Button>
                    <Button
                      onClick={(e) => {
                        handleConfigurationPropertyChange(
                          "textAlignment",
                          "right"
                        );
                      }}
                      className="print-button"
                      style={{ width: "100px", margin: "10px", color:"#ffffff" }}
                    >
                      RIGHT
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="config-right-content">
            <div style={{ width: "100%" }}>
              <h3 style={{ display: "flex", justifyContent: "center" }}>
                INSERT RIGHT SIDE LOGO
              </h3>
              <div style={modalRow}>
                {/* <Typography style={{ margin: "10px" }}>
                  Choose right Image:
                </Typography> */}
                <label htmlFor="contained-button-file-1">
                  <Input
                    style={{ display: "none" }}
                    accept="image/*"
                    id="contained-button-file-1"
                    single
                    type="file"
                    onChange={(e) => handeFileChange(e, "image2")}
                    className="small-logo2-input"
                  />
                  <Button variant="contained" component="span"
                   className="print-button"
                   style={{ width: "100px", margin: "10px", color:"#ffffff" }}
                  
                  >
                    Upload
                  </Button>
                </label>
              </div>
            </div>

            <div style={modalRow}>
              <h3>SET RIGHT SIDE LOGO</h3>
            </div>
            <div style={modalRow}>
              <Typography style={{ margin: "10px", }}> Size</Typography>
            </div>
            <div style={modalRow}>
              <div size="large">
                <Button
                  onClick={(e) => {
                    handleConfigurationPropertyChange("rightLogoSize", 20);
                  }}
                  className="print-button"
                  style={{ width: "100px", margin: "10px", color:"#ffffff" }}
                >
                  SMALL
                </Button>
                <Button
                  onClick={(e) => {
                    handleConfigurationPropertyChange("rightLogoSize", 30);
                  }}
                  className="print-button"
                  style={{ width: "100px", margin: "10px", color:"#ffffff" }}
                >
                  Medium
                </Button>
                <Button
                  onClick={(e) => {
                    handleConfigurationPropertyChange("rightLogoSize", 50);
                  }}
                  className="print-button"
                  style={{ width: "100px", margin: "10px", color:"#ffffff" }}
                >
                  Large
                </Button>
              </div>
            </div>

            <div style={modalRow} className="config-position">
              <Typography style={{ margin: "7px" }}>Position</Typography>
            </div>
            <div style={modalRow}>
              <div size="large">
                <Button
                  onClick={(e) => {
                    handleConfigurationPropertyChange(
                      "rightLogoPosition",
                      "left"
                    );
                  }}
                  className="print-button"
                  style={{ width: "100px", margin: "10px" , color:"#ffffff"}}
                >
                  LEFT
                </Button>
                <Button
                  onClick={(e) => {
                    handleConfigurationPropertyChange(
                      "rightLogoPosition",
                      "center"
                    );
                  }}
                  className="print-button"
                  style={{ width: "100px", margin: "10px", color:"#ffffff" }}
                >
                  CENTER
                </Button>
                <Button
                  onClick={(e) => {
                    handleConfigurationPropertyChange(
                      "rightLogoPosition",
                      "right"
                    );
                  }}
                  className="print-button"
                  style={{ width: "100px", margin: "10px", color:"#ffffff" }}
                >
                  RIGHT
                </Button>
              </div>
              {/* <div className="button-group"
              style={{width : "100%", display:"flex", justifyContent:"space-between"}}
              >
              <div style={{width : "32%", }}
                  
              
              >left</div>
              <div style={{width : "32%", }}>center</div>
              <div style={{width : "32%", }}>Right</div>

                
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Configuration;
