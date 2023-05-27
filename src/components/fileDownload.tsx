import axios from "axios";
import { at, backUrl } from "../variable/cookie";

function downloadFile(id: number) {
  axios
    .get(`${backUrl}file/${id}/`, {
      headers: {
        Authorization: `Bearer ${at}`,
      },
    })
    .then(res => {
      const file = res.data.file;
      const blob = new Blob([file], { type: "image/png" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = (file.toString() || "").split("/")[1];
      link.setAttribute("type", "application/json");
      //link.click();
      window.open(file);
    });
}
export default downloadFile;
