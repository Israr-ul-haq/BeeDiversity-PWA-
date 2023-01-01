import { AxiosResponse } from "axios";
import Swal from "sweetalert2";
import { Content } from "../../types/beehive/IBeehives";

const DeleteItem = async (
  id: Content["id"],
  data: Content[],
  service: (id: string) => Promise<AxiosResponse<any, any>>,
  title: string,
  setLoader: React.Dispatch<React.SetStateAction<boolean>>
) => {
  Swal.fire({
    title: "Are you sure, you want to delete " + title + "?",
    text: "This action can’t be undone",
    showCancelButton: true,
    confirmButtonText: `Delete`,
    reverseButtons: true,
  }).then(async (result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      setLoader(true);
      let removeIndex = data
        .map((item) => {
          return item.id;
        })
        .indexOf(id);
      data.splice(removeIndex, 1);
      const response = await service(id);
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: title + " deleted!",
        });
        setLoader(false);
      }

      if (response.status !== 200) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
        setLoader(false);
      }
    } else if (result.isDenied) {
      Swal.fire("Changes are not saved", "", "info");
      setLoader(false);
    }
  });
};

export default DeleteItem;
