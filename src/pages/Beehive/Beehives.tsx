import BeehiveService from "../../services/BeehiveService";
import { Content } from "../../types/beehive/IBeehive";
import utitlities from "../../utilities/utilities";
import { useEffect, useState } from "react";
import Datatable from "../../components/shared/Datatable";

import { columns } from "../../tabledata/BeehiveData";
import { Link } from "react-router-dom";
function Beehives() {
  const [data, setdata] = useState<Content[]>([]);
  const [filteredPdfData, setFilteredPdfData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [loader, setLoader] = useState(true);

  // const filterPdfData = (data) => {
  //   const filteredData = data.map((elt) => {
  //     return [elt.title, elt.description];
  //   });
  //   setFilteredPdfData(filteredData);
  // };

  useEffect(() => {
    getData(1000);
    utitlities.cardExtender();
  }, [loader]);

  const getData = async (page: number) => {
    setLoading(true);
    const response = await BeehiveService.get(page);
    console.log(response);

    setdata(response.data.content);
    setLoading(false);
  };

  return (
    <div>
      <div className="page-content header-clear-medium ">
        <div className="beehive_data">
          <div className=" m-3">
            <Link
              to="/home"
              className="icon icon-xs bg-theme rounded-s color-theme"
            >
              <i className="bi bi-caret-left-fill"></i>
            </Link>
          </div>

          <Link to={"/beehive/add"}>
            <div
              className="d-flex justify-content-end"
              style={{
                margin: "0px 15px 30px 15px",
              }}
            >
              <a className="text-right btn btn-l gradient-highlight mb-2">
                Add Beehouse
              </a>
            </div>
          </Link>
        </div>
        <div className="card card-style">
          <div className="content">
            <h1 className="font-700 pb-0">Beehouses</h1>
          </div>
          <div className="header_main_section">
            <Datatable
              columns={columns(data, BeehiveService.deleteSomething, setLoader)}
              //   totalRows={totalRows}
              //   handlePerRowsChange={handlePerRowsChange}
              //   handlePageChange={handlePageChange}
              incomingData={data}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Beehives;
