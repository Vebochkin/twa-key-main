import { paramsVpnDefault } from "../oldVpn/Vpn";
import { paramsVpn } from "../oldVpn/Vpn";

import React, { useState } from "react";

import Button from "../../components/Button/Button";

import lottie from "lottie-web";

import style from "./Home.module.scss";

import { NavLink } from "react-router-dom";

import axios from "axios";

let is = false;

let params = new URLSearchParams(window.location.search);
let paramsDefault = window.location.search;
console.log(paramsDefault);

const Home = () => {
  const expire_time = params.get("expire_time");
  const username_bot = params.get("username_bot");
  const tg_bot = params.get("tg_bot");
  const [platform, setPlatform] = React.useState("");
  const os = ["Windows", "Linux", "Mac", "iOS", "Android"]; // add your OS values
  const [isError, setIsError] = useState(false);
  const [user, setUser] = useState({});

  React.useEffect(() => {
    try {
      console.log("getPlatfrom: " + getPlatform());
      setPlatform(getPlatform());
      getUser();
      console.log("PLATFORM: " + platform);
      if (getPlatform() === "iOS" || getPlatform() === "Android") {
        const element = document.getElementById("test");
        if (element) {
          element.click();
        }
      }
      if (paramsVpn) {
        params = paramsVpn;
        window.history.pushState(null, null, "?" + params);
      }
    } catch (e) {
      console.log(e);
    }

    /*if (Number(expire_time) * 1000 < Date.now()) {
      setIsError(true);
    }*/
    // setPlatform(os.find((v) => navigator.appVersion.indexOf(v) >= 0));
    //console.log(os.find(v=>navigator.appVersion.indexOf(v) >= 0));

    console.log(platform);

    if (!is) {
      is = true;
      import("../../img/error_sub.json")
        .then((module) => {
          const animationData = module.default;
          const container = document.getElementById("duckIconError");
          lottie.loadAnimation({
            container,
            renderer: "svg",
            loop: true,
            autoplay: true,
            animationData,
          });
        })
        .catch((error) => {
          console.error("Error loading animation:", error);
        });
    }
  }, []);

  function getPlatform() {
    let platform = "Unknown";
    let userAgent = window.navigator.userAgent;

    if (userAgent.match(/Windows/i)) {
      platform = "Windows";
    } else if (userAgent.match(/iOS|iPhone|iPad|iPod/i)) {
      platform = "iOS";
    } else if (userAgent.match(/Mac/i)) {
      platform = "Mac";
    } else if (userAgent.match(/Android/i)) {
      platform = "Android";
    } else if (userAgent.match(/Linux/i)) {
      platform = "Linux";
    }

    return platform;
  }

  async function getUser() {
    const { data } = await axios.post(
      "https://api.dipy.digital/api/get/user",
      {
        username: params.get("username"),
      },
      {
        headers: {
          Authorization: "7f49280f247287a3574ce51a8bdaaa1c",
        },
      }
    );

    console.log(data.status);

    if (data.status !== "active") {
      setIsError(true);
    }
    setUser(data);
  }

  function openLink(url) {
    /* const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.click();*/
    window.location.href = url;
  }

  function sendStat() {
    axios.post("https://api.feen.cloud/web/sendStat", {
      user_id: params.get("user_id"),
      type: "click",
    });
  }

  return (
    <>
      <NavLink id="test" to="/vpn" style={{ display: "none" }} />
      <>
        {isError ? (
          <div className={style.contentErrorContainer}>
            <div className={style.topIllustrationContainer}>
              <div id="duckIconError" />
            </div>
            <div>
              <div className={style.title}>Ошибка</div>
              <div className={style.subTitle}>
                Кажется у Вас закончилась подписка
              </div>
            </div>
            <div className={style.buttonContainerFixed}>
              <div className={style.buttonContainer}>
                <Button
                  appearance="accent"
                  stretched
                  onClick={() =>
                    openLink(`https://t.me/${username_bot}?start=buy_sub`)
                  }
                >
                  Продлить подписку
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className={style.contentContainer}>
            <div className={style.videoAndroidAndIOSContainer}>
              <iframe
                className={style.videoAndroidAndIOS}
                src={"https://www.youtube.com/embed/xEBDL6GJY20"}
                title="Настройка HitVPN на iPhone #vpn #hitvpn"
                frameborder="0"
                allow="accelerometer; fullscreen; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              />
            </div>
            <div className={style.title}>Добро пожаловать в {tg_bot}</div>
            <div className={style.subTitle}>
              На видео выше показан процесс настройки VPN
            </div>
            <div className={style.buttonContainerFixed}>
              <div className={style.buttonContainer}>
                <NavLink to="/vpn">
                  <Button
                    appearance="positive"
                    stretched
                    onClick={() => sendStat()}
                  >
                    Пропустить
                  </Button>
                </NavLink>
              </div>
            </div>
          </div>
        )}
      </>
    </>
  );
};

export default Home;
export { params };
export { paramsDefault };
