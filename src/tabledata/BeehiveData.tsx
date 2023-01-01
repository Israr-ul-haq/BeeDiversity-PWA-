import { AxiosResponse } from "axios";
import { Row } from "jspdf-autotable";
import { Link } from "react-router-dom";
import DeleteItem from "../components/shared/DeleteItem";
import { Content } from "../types/beehive/IBeehives";

export const columns = (
  data: Content[],
  service: (id: string) => Promise<AxiosResponse<any, any>>,
  setLoader: React.Dispatch<React.SetStateAction<boolean>>
) => {
  var x = window.matchMedia("(max-width: 700px)");
  if (x.matches) {
    // If media query matches
    return [
      {
        name: "Sr#",
        cell: (row: Content, index: number) => {
          if (index < 9) {
            return "0" + (index + 1);
          } else {
            return index + 1;
          }
        },
        sortable: true,
        width: "20%",
        maxWidth: "20%",
      },

      {
        name: "Name",
        cell: (row: Content) => (
          <div>
            <p className="datatable_name">{row.name}</p>
            <h5 className="data_table_descr">Description:-</h5>
            <p className="datatable_text">{row.description}</p>
          </div>
        ),
        sortable: true,
        width: "50%",
        maxWidth: "50%",
      },

      {
        name: "Actions",
        button: true,
        cell: (row: Content) => (
          <div>
            <div
              className="table_actions"
              style={{ display: "flex", alignItems: "center", gap: "15px" }}
            >
              <div className="table_icon">
                <Link to={`/beehive/edit/${row.id}`}>
                  <i className="bi bi-pencil-fill "></i>
                </Link>
              </div>
              {/* <div className="table_icon">
                <Link to={`/beehives/view/${row.id}`}>
                  <i className="bi bi-eye-fill "></i>
                </Link>
              </div> */}
              <div className="table_icon">
                <i
                  onClick={() =>
                    DeleteItem(row.id, data, service, row.name, setLoader)
                  }
                  className="bi bi-trash-fill "
                ></i>
              </div>
              <img src="/assets/images/Delete.svg" alt="" />
            </div>
          </div>
        ),
        width: "30%",
        maxWidth: "30%",
      },
    ];
  } else {
    return [
      {
        name: "Sr#",
        cell: (row: Content, index: number) => {
          if (index < 9) {
            return "0" + (index + 1);
          } else {
            return index + 1;
          }
        },
        sortable: true,
        width: "150px",
        maxWidth: "150px",
      },

      {
        name: "Name",
        cell: (row: Content) => row.name,
        sortable: true,
      },

      {
        name: "Description",
        cell: (row: Content) => row.description,
        sortable: true,
      },

      {
        name: "Actions",
        button: true,
        cell: (row: Content) => (
          <div>
            <div
              className="table_actions"
              style={{ display: "flex", alignItems: "center", gap: "15px" }}
            >
              <div className="table_icon">
                <Link to={`/beehive/edit/${row.id}`}>
                  <i className="bi bi-pencil-fill "></i>
                </Link>
              </div>
              {/* <div className="table_icon">
                <Link to={`/beehives/view/${row.id}`}>
                  <i className="bi bi-eye-fill "></i>
                </Link>
              </div> */}
              <div className="table_icon">
                <i
                  onClick={() =>
                    DeleteItem(row.id, data, service, row.name, setLoader)
                  }
                  className="bi bi-trash-fill "
                ></i>
              </div>
              <img src="/assets/images/Delete.svg" alt="" />
            </div>
          </div>
        ),
      },
    ];
  }
};
