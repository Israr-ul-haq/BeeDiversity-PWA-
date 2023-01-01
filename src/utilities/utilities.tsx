import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestHeaders,
} from "axios";
import localStorageService from "../services/LocalStorageService";
import { Content } from "../types/authentication/IUser";
const axiosConfig = axios.create({
  baseURL: "https://server-test.beediversity.it",
  headers: {
    "Content-type": "application/json",
  },
});

axiosConfig.interceptors.request.use(function (
  config: AxiosRequestConfig<AxiosRequestHeaders>
) {
  const token: Content = JSON.parse(
    localStorageService.getItem("BeeHiveUserData")!
  );
  if (token) {
    config.headers = {
      "x-authorization": token.authorization.key,
    };
  }

  return config;
});

const cards = document.getElementsByClassName(
  "card"
) as HTMLCollectionOf<HTMLElement>;
function card_extender() {
  for (let i = 0; i < cards.length; i++) {
    if (cards[i].getAttribute("data-card-height") === "cover") {
      if (window.matchMedia("(display-mode: fullscreen)").matches) {
        var windowHeight = window.outerHeight;
      }
      if (!window.matchMedia("(display-mode: fullscreen)").matches) {
        var windowHeight = window.innerHeight;
      }
      var coverHeight = windowHeight! + "px";
    }
    if (cards[i].hasAttribute("data-card-height")) {
      var getHeight = cards[i].getAttribute("data-card-height");
      cards[i].style.height = getHeight + "px";
      if (getHeight === "cover") {
        var totalHeight = getHeight;
        cards[i].style.height = coverHeight!;
      }
    }
  }

  document.querySelector(".offcanvas-backdrop")?.remove();
}
if (cards.length) {
  card_extender();
  window.addEventListener("resize", card_extender);
}

let utitlities: {
  axios: AxiosInstance;
  cardExtender: () => void;
};

utitlities = {
  axios: axiosConfig,
  cardExtender: card_extender,
};

export default utitlities;
