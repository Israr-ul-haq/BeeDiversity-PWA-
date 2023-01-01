import { useEffect } from "react";
import utitlities from "../utilities/utilities";
import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Content } from "../types/beehive/IBeehives";
import BeehiveService from "../services/BeehiveService";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
import moment from "moment";
import DeleteItem from "../components/shared/DeleteItem";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

function Home() {
  window.onload = function () {
    var tblFruits: any = document.querySelectorAll("#check_box");
    debugger;
    var chks: any = tblFruits.getElementsByTagName("INPUT");
    for (var i = 0; i < chks.length; i++) {
      chks[i].onclick = function () {
        for (var i = 0; i < chks.length; i++) {
          if (chks[i] != this && this.checked) {
            chks[i].checked = false;
          }
        }
      };
    }
  };
  const [data1, setdata1] = useState<Content[]>([]);

  const [latestTemp, setLatestTemp] = useState({
    humidity: { internal: 0, external: 0 },
    temperature: { internal: 0, external: 0 },
  });

  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(true);
  const [labels, setLabel] = useState([]);
  const [houseId, setHouseId] = useState("");
  const [value, setValue] = useState();
  const [externalTempValue, setExternalTempValue] = useState();
  const [externalHumidityValue, setExternalHumidtyValue] = useState();
  const [value1, setValue1] = useState();
  const [valueWeight, setValueWeight] = useState();
  const [valuePressure, setValuePressure] = useState();

  const dataTemp = {
    labels,
    datasets: [
      {
        label: "Temperature",
        data: value,

        borderColor: "#F7A103",
        backgroundColor: "#F7A103",
        yAxisID: "y",
      },
    ],
  };
  const dataExtTemp = {
    labels,
    datasets: [
      {
        label: "Temperature",
        data: externalTempValue,
        borderColor: "#83C6E2",
        backgroundColor: "#83C6E2",
        yAxisID: "y",
      },
    ],
  };

  const dataHumidity = {
    labels,
    datasets: [
      {
        label: "Humidity",
        data: value1,

        borderColor: "#F7A103",
        backgroundColor: "#F7A103",
        yAxisID: "y",
      },
    ],
  };
  const dataExtHumidity = {
    labels,
    datasets: [
      {
        label: "Humidity",
        data: externalHumidityValue,

        borderColor: "#83C6E2",
        backgroundColor: "#83C6E2",
        yAxisID: "y",
      },
    ],
  };

  const dataWeight = {
    labels,
    datasets: [
      {
        label: "Weight",
        data: valueWeight,

        borderColor: "#F7A103",
        backgroundColor: "#F7A103",
        yAxisID: "y",
      },
    ],
  };
  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
      },
    },
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  const dataPressure = {
    labels,
    datasets: [
      {
        label: "Pressure",
        data: valuePressure,

        borderColor: "#F7A103",
        backgroundColor: "#F7A103",
        yAxisID: "y",
      },
    ],
  };
  useEffect(() => {
    getData(1000);

    utitlities.cardExtender();
  }, []);

  const getData = async (page: number) => {
    setLoader(true);
    const response = await BeehiveService.get(page);
    console.log(response);
    setdata1(response.data.content);
    setLoader(false);
  };
  const getStats = async (e: any) => {
    setLoading(true);
    setHouseId(e.target.value);
    const response = await BeehiveService.getStats(e.target.value);
    console.log(response);
    const reverselabel = response.data.content.reverse();
    let labels: any = reverselabel.map((item: any) => {
      return moment(item.timestamp).format("LL");
    });
    let dashboardChartData: any = reverselabel.map((item: any) => {
      return item.temperature.internal;
    });
    let dashboardChartDataExternal: any = reverselabel.map((item: any) => {
      return item.temperature?.external;
    });
    let dashboardChartData1: any = reverselabel.map((item: any) => {
      return item.humidity?.internal;
    });
    let dashboardChartDataHumidExtern: any = reverselabel.map((item: any) => {
      return item.humidity?.external;
    });
    debugger;
    let lastElement = response.data.content[reverselabel.length - 1];
    setLatestTemp(lastElement);
    setLabel(labels);
    setExternalTempValue(dashboardChartDataExternal);
    setValue(dashboardChartData);
    setValue1(dashboardChartData1);
    setExternalHumidtyValue(dashboardChartDataHumidExtern);
    setLoading(false);
  };
  function handleMousePos(e: any) {
    var mouseClickWidth = e.clientX;
    if (mouseClickWidth >= 270) {
      document.getElementById("menu-main")?.classList.remove("show");
      document.getElementById("menu-main")?.classList.remove("visible");
    }
  }

  document.addEventListener("click", handleMousePos);

  const getStats1 = async (e: any) => {
    debugger;
    setLoading(true);
    let newDate: any = new Date();
    let finalDate: any = Math.floor(newDate.getTime() / 1000);
    let endate: any = finalDate - Number(e.target.value);
    let lastDate: any = moment(endate * 1000).format("YYYY-MM-DD hh:mm");

    const response = await BeehiveService.getStatsHourly(
      houseId,
      "1500",
      lastDate
    );
    const reverselabel = response.data.content.reverse();
    let labels: any = reverselabel.map((item: any) => {
      return moment(item.timestamp).format("LL");
    });
    let dashboardChartData: any = reverselabel.map((item: any) => {
      return item.temperature?.internal;
    });
    let dashboardChartData1: any = reverselabel.map((item: any) => {
      return item.humidity?.internal;
    });
    let dashboardChartDataHumidExtern: any = reverselabel.map((item: any) => {
      return item.humidity?.external;
    });
    let dashboardChartDataExternal: any = reverselabel.map((item: any) => {
      return item.temperature?.external;
    });
    let lastElement = response.data.content[reverselabel.length - 1];
    setLatestTemp(lastElement);
    setLabel(labels);
    setExternalTempValue(dashboardChartDataExternal);
    setExternalHumidtyValue(dashboardChartDataHumidExtern);
    setValue(dashboardChartData);
    setValue1(dashboardChartData1);
    setLoading(false);
  };

  var x = window.matchMedia("(max-width: 500px)");

  return (
    <>
      {loader ? (
        <div
          className="loader_section loader_res_margin"
          style={{ marginTop: "18%" }}
        >
          <div className="loader loader_color2 loader2_size loader_before "></div>
        </div>
      ) : (
        <div className="page-content header-clear-medium">
          <div>
            <div className="row">
              <div className="col-lg-3 col-6">
                <div className="card  cardStyle_res">
                  <div className="card-body text-center">
                    {x.matches ? (
                      <p className="input_label">INT.TEMP</p>
                    ) : (
                      <p className="input_label">INTERNAL TEMPERATURE</p>
                    )}

                    <p
                      className="input_label"
                      style={{ color: "#F7A103", fontSize: "20px" }}
                    >
                      {latestTemp?.temperature?.internal
                        ? latestTemp?.temperature?.internal + "℃"
                        : "--"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-6">
                <div className="card cardStyle_res1">
                  <div className="card-body text-center">
                    {x.matches ? (
                      <p className="input_label">INT.HUM</p>
                    ) : (
                      <p className="input_label">INTERNAL HUMIDITY</p>
                    )}
                    <p
                      className="input_label"
                      style={{ color: "#F7A103", fontSize: "20px" }}
                    >
                      {latestTemp?.humidity?.internal
                        ? latestTemp?.humidity?.internal + "%"
                        : "--"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-6">
                <div className="card cardStyle_res">
                  <div className="card-body text-center">
                    {x.matches ? (
                      <p className="input_label">EXT.TEMP</p>
                    ) : (
                      <p className="input_label">EXTERNAL TEMPERATURE</p>
                    )}
                    <p
                      className="input_label"
                      style={{ color: "#83C6E2", fontSize: "20px" }}
                    >
                      {latestTemp?.temperature?.external
                        ? latestTemp?.temperature?.external + "℃"
                        : "--"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-6">
                <div className="card cardStyle_res1">
                  <div className="card-body text-center">
                    {x.matches ? (
                      <p className="input_label">EXT.HUM</p>
                    ) : (
                      <p className="input_label">EXTERNAL HUMIDITY</p>
                    )}
                    <p
                      className="input_label"
                      style={{ color: "#83C6E2", fontSize: "20px" }}
                    >
                      {latestTemp?.humidity?.external
                        ? latestTemp?.humidity?.external + "%"
                        : "--"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-2 col-6">
              <div className="card cardStyle_res">
                <div className="card-body text-center check_box_input">
                  <input
                    type="radio"
                    value="3600"
                    name="hourly"
                    onChange={(e) => getStats1(e)}
                  />{" "}
                  <p className="hour_stat">an hour</p>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-6">
              <div className="card cardStyle_res1">
                <div className="card-body text-center check_box_input">
                  <input
                    type="radio"
                    value="21600"
                    name="hourly"
                    onChange={(e) => getStats1(e)}
                  />
                  <p className="hour_stat">6 hours</p>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-6">
              <div className="card cardStyle_res">
                <div className="card-body text-center check_box_input">
                  <input
                    type="radio"
                    value="86400"
                    name="hourly"
                    onChange={(e) => getStats1(e)}
                  />
                  <p className="hour_stat">a day</p>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-6">
              <div className="card cardStyle_res1">
                <div className="card-body text-center check_box_input">
                  <input
                    type="radio"
                    value="604800"
                    name="hourly"
                    onChange={(e) => getStats1(e)}
                  />
                  <p className="hour_stat">7 days</p>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-6">
              <div className="card cardStyle_res">
                <div className="card-body text-center check_box_input">
                  {" "}
                  <input
                    type="radio"
                    value="2592000"
                    name="hourly"
                    onChange={(e) => getStats1(e)}
                  />
                  <p className="hour_stat">a month</p>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-6">
              <div className="card cardStyle_res1">
                <div className="card-body text-center check_box_input">
                  {" "}
                  <input
                    type="radio"
                    value="31536000"
                    name="hourly"
                    onChange={(e) => getStats1(e)}
                  />
                  <p className="hour_stat">a year</p>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-6 text-center drop_padding ">
              <label className="input_label">Houses</label>
              <select
                className="inputField mxWidth100 "
                onChange={(e) => getStats(e)}
              >
                <option selected value="0">
                  Select
                </option>
                {data1?.map((item) => {
                  return (
                    <>
                      <option value={item.id}>{item.name}</option>
                    </>
                  );
                })}
              </select>
            </div>
          </div>
          {/* <Tabs>
            <TabList className="graphsTabs">
              <Tab>Temperature</Tab>
              <Tab>Weight</Tab>
            </TabList>

            <TabPanel> */}
          <div className="card card-style">
            <div className="card-body text-center">
              <div className="row">
                <div className="col-lg-10 col-md-6 graph_temp_stats">
                  <p style={{ color: "#F7A103" }} className="graph_fonts">
                    --Internal Temperature{" "}
                    <span style={{ color: "#000" }}>
                      --Environment Temperature
                    </span>
                  </p>
                </div>
              </div>
              <div style={{ height: "400px" }}>
                {loading ? (
                  <div className="loader_section loader_graph_margin">
                    <div className="loader loader_color3 loader2_size loader_before "></div>
                  </div>
                ) : (
                  <Line options={options} data={dataTemp} />
                )}
              </div>
            </div>
          </div>
          <div className="card card-style">
            <div className="card-body text-center">
              <div className="col-lg-12 col-md-6 graph_temp_stats">
                <p style={{ color: "#F7A103" }} className="graph_fonts">
                  <span style={{ color: "#83C6E2" }}>
                    --External Temperature
                  </span>
                  <span style={{ color: "#000" }}>
                    --Environment Temperature
                  </span>
                </p>
              </div>
              <div style={{ height: "400px" }}>
                {loading ? (
                  <div className="loader_section loader_graph_margin">
                    <div className="loader loader_color3 loader2_size loader_before "></div>
                  </div>
                ) : (
                  <Line options={options} data={dataExtTemp} />
                )}
              </div>
            </div>
          </div>

          <div className="card card-style">
            <div className="card-body text-center">
              <div className="col-lg-12 col-md-6 graph_temp_stats">
                <p style={{ color: "#F7A103" }} className="graph_fonts">
                  --Internal Humidity{" "}
                  <span style={{ color: "#000" }}>--Environment Humidity</span>
                </p>
              </div>
              <div style={{ height: "400px" }}>
                {loading ? (
                  <div className="loader_section loader_graph_margin">
                    <div className="loader loader_color3 loader2_size loader_before "></div>
                  </div>
                ) : (
                  <Line options={options} data={dataHumidity} />
                )}
              </div>
            </div>
          </div>
          <div className="card card-style">
            <div className="card-body text-center">
              <div className="col-lg-12 col-md-6 graph_temp_stats">
                <p style={{ color: "#F7A103" }} className="graph_fonts">
                  <span style={{ color: "#83C6E2" }}>--External Humidity</span>
                  <span style={{ color: "#000" }}>--Environment Humidity</span>
                </p>
              </div>
              <div style={{ height: "400px" }}>
                {loading ? (
                  <div className="loader_section loader_graph_margin">
                    <div className="loader loader_color3 loader2_size loader_before "></div>
                  </div>
                ) : (
                  <Line options={options} data={dataExtHumidity} />
                )}
              </div>
            </div>
          </div>
          {/* </TabPanel>
            <TabPanel> */}
          <div className="card card-style">
            <div className="card-body text-center">
              <div className="row">
                <div className="col-lg-10 col-md-6 graph_temp_stats">
                  <p style={{ color: "#F7A103" }} className="graph_fonts">
                    --Weight{" "}
                    {/* <span style={{ color: "#83C6E2" }}>
                          --External Weight
                        </span> */}
                    <span style={{ color: "#000" }}>--Environment Weight</span>
                  </p>
                </div>
              </div>
              <div style={{ height: "400px" }}>
                {loading ? (
                  <div className="loader_section loader_graph_margin">
                    <div className="loader loader_color3 loader2_size loader_before "></div>
                  </div>
                ) : (
                  <Line options={options} data={dataWeight} />
                )}
              </div>
            </div>
          </div>

          <div className="card card-style">
            <div className="card-body text-center">
              <div className="col-lg-12 col-md-6 graph_temp_stats">
                <p style={{ color: "#F7A103" }} className="graph_fonts">
                  --Pressure{" "}
                  {/* <span style={{ color: "#83C6E2" }}>
                        --External Pressure
                      </span> */}
                  <span style={{ color: "#000" }}>--Environment Pressure</span>
                </p>
              </div>
              <div style={{ height: "400px" }}>
                {loading ? (
                  <div className="loader_section loader_graph_margin">
                    <div className="loader loader_color3 loader2_size loader_before "></div>
                  </div>
                ) : (
                  <Line options={options} data={dataPressure} />
                )}
              </div>
            </div>
          </div>
          {/* </TabPanel>
          </Tabs> */}
        </div>
      )}
    </>
  );
}

export default Home;
