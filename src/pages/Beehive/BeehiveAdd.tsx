import { ChangeEvent, SyntheticEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import BeehiveService from "../../services/BeehiveService";
import constants from "../../constants/constants";
function BeehiveAdd() {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [data, setdata] = useState({
    name: "",
    description: "",
    ownerId: JSON.parse(localStorage.getItem("BeeHiveUserData")!)?.user?.id,
  });

  function handleInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setdata({ ...data, [name]: value });
  }
  async function submit(event: SyntheticEvent) {
    event.preventDefault();
    setLoader(true);
    let response = await BeehiveService.save(data);
    if (response.status === 200) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Beehive Added",
        showConfirmButton: true,
        timer: 5000,
      });
      setLoader(false);
      setTimeout(() => {
        navigate("/beehives");
      }, 0);
    }

    if (response.status !== 200) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "An error has occured. Please try again!",
        showConfirmButton: true,
        timer: 5000,
      });
      setLoader(false);
    }
    setLoader(false);
  }
  return (
    <div className="page-content header-clear-medium">
      <div
        className="card  bg-23 mb-3  "
        data-card-height="60"
        style={{ background: "none", border: "none" }}
      >
        <div className=" m-3">
          <Link
            to="/beehives"
            className="icon icon-xs bg-theme rounded-s color-theme"
          >
            <i className="bi bi-caret-left-fill"></i>
          </Link>
        </div>
      </div>
      <div className="card card-style">
        <div className="content">
          <h6 className="font-700 mb-n1 color-highlight">Add Beehouse</h6>
          <h1 className="pb-2">Beehives</h1>

          <form
            onSubmit={submit}
            className="demo-animation needs-validation m-0"
          >
            <div className="form-custom form-label form-icon mb-3">
              <i className="bi bi-person-circle font-14"></i>
              <input
                type="text"
                className="form-control rounded-xs"
                id="c1"
                placeholder="Enter Name"
                pattern="[A-Za-z ]{1,32}"
                required
                name="name"
                onChange={handleInputChange}
              />
              <label htmlFor="c1" className="color-theme">
                Enter Name
              </label>

              <span>(required)</span>
            </div>

            <div className="form-custom form-label form-icon mb-3">
              <i className="bi bi-pencil-fill font-12"></i>
              <textarea
                className="form-control rounded-xs"
                placeholder="Enter Description"
                required
                name="description"
                id="c7"
                onChange={handleInputChange}
              ></textarea>
              <label htmlFor="c7" className="color-theme">
                Enter Description
              </label>
              <span>(required)</span>
            </div>

            <button
              className="btn btn-full bg-blue-dark rounded-xs text-uppercase font-700 w-100 btn-s mt-4"
              type="submit"
            >
              {loader ? (
                <div className="loader_section">
                  <div className="loader loader_color1 loader2"></div>
                </div>
              ) : (
                "Submit form"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BeehiveAdd;
