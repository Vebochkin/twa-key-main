import React from "react";

import Button from "../../components/Button/Button";

import style from "./Vpn.module.scss";

import "@dotlottie/player-component";
import lottie from "lottie-web";

import { ReactComponent as IconKey } from "../../img/IconKey.svg";

let params = new URLSearchParams(window.location.search);

let is = false;

const Vpn = () => {
  const [platform, setPlatform] = React.useState("");
  const [isError, setIsError] = React.useState(false);
  const [user, setUser] = React.useState({});
  const [] = React.useState("dark");
  const [isPopupVisible] = React.useState(false);


  const Popup = () => (
    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', zIndex: 100 }}>
      <p>✳️ Внимание! Чтобы VPN заработал, не забудьте вернуться обратно из Play Market / Установщика и нажать: «Завершить настройку»</p>
    </div>
  );



  React.useEffect(() => {
    setPlatform(getPlatform());
    console.log(platform);

    getUser();

    setTimeout(function () {
      document
        .getElementById("videoContainer")
        .scrollIntoView("videoContainer");
    }, 4000);

    if (!is) {
      is = true;
      import("../../img/duck_web_app.json")
        .then((module) => {
          const animationData = module.default;
          lottie.loadAnimation({
            container: document.getElementById("duck_web_appIcon"),
            renderer: "svg",
            loop: true,
            autoplay: true,
            animationData,
          });
        })
        .catch((error) => {
          console.error("Error loading animation:", error);
        });

      import("../../img/error_sub.json")
        .then((module) => {
          const animationData = module.default;
          lottie.loadAnimation({
            container: document.getElementById("duckIconError"),
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

    console.log(userAgent);

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

    console.log(platform);

    return platform;
  }

  async function getUser() {
    console.log('USER');
    let data = {
      subscribe_url: params.get("link"),
      botname: params.get("username_bot")
    }
    setUser(data);

    if (data.subscribe_url === 'false' || data.subscribe_url === 'None' || data.subscribe_url === 'expired' || data.subscribe_url === null) {
      setIsError(true);
    }

    console.log(data);
  }

  function looked() {
    document
      .getElementById("button1")
      .classList.remove(`${style.button1Item_add}`);
    document
      .getElementById("button1")
      .classList.add(
        ["Windows", "Mac"].includes(platform)
          ? style.button1Item_removePC
          : style.button1Item_remove
      );
    document
      .getElementById("button2")
      .classList.remove(`${style.button2Item_remove}`);
    document
      .getElementById("button2")
      .classList.add(`${style.button2Item_add}`);
    document
      .getElementById("count1")
      .classList.add(`${style.listCountCompleted}`);
  }

  function looked2() {
    document
      .getElementById("count2")
      .classList.add(`${style.listCountCompleted}`);
  }

  function generateRandomString() {
    var characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    var result = "";
    for (var i = 0; i < 8; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  }

  return (
    <>
      {isError ? (
        <div className={style.containerErrorContent}>
          <div className={style.headerErrorContainer}>
            <div className={style.illustrationHeaderContainer}>
              {/*<div id="duckIconError" />*/}
              <dotlottie-player
                src="https://lottie.host/379f977c-b430-4ca9-bbd6-1d1283edc358/a6NB2f9Feh.json"
                background="transparent"
                speed="1"
                loop
                autoplay
              />
            </div>
            <div className={style.contentHeaderErrorContainer}>
              <div className={style.titleErrorHeader}>Ошибка</div>
              <div className={style.subtitleErrorHeader}>
                {user.botname ? (
                  <>
                    Кажется у Вас <br></br>закончилась подписка
                  </>
                ) : (
                  <>
                    Кажется что-то пошло не так
                  </>
                )}
              </div>
            </div>
          </div>
          {user.botname && (
            <div className={style.buttonContainerFixed}>
              <Button
                appearance="accent"
                stretched
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = `https://t.me/${user.botname}?start=buy_sub`;
                  link.target = "_blank";
                  link.click();
                }}
              >
                Продлить подписку
              </Button>
            </div>
          )}
        </div>
      ) : (
        <>
          {isPopupVisible && <Popup />}
          {["Windows", "Mac", "iOS", "Android"].includes(platform) && (
            <div className={style.appContainer}>
              <div
                className={
                  ["iOS", "Android"].includes(platform)
                    ? style.lineContainer
                    : style.lineContainerPC
                }
              >
                <div className={style.handContainer}>👋</div>
                <div className={style.lineItem}>
                  {/*Пункт №1*/}
                  <div
                    className={
                      ["iOS", "Android"].includes(platform)
                        ? style.listItem
                        : style.listItemPC
                    }
                  >
                    <div className={style.countContainer}>
                      <div id="count1" className={style.listCount}>
                        1
                      </div>
                    </div>
                    <div className={style.countContainer}>
                      <div id="count2" className={style.listCount}>
                        2
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={style.containerHeaderContent}>
                <div className={style.headerContainer}>
                  <div className={style.headerBackground} />
                  <div className={style.contentHeaderContainer}>
                    <div className={style.illustrationHeaderContainer}>
                      {/*<div id="duck_web_appIcon" />*/}
                      <dotlottie-player
                        src="https://lottie.host/593eee10-cc8d-47a3-bd0a-4daca838e964/gJAoc0La0G.json"
                        background="transparent"
                        speed="1"
                        loop
                        autoplay
                      />
                    </div>
                    <div className={style.titleHeader}>
                      Давайте <br></br>настроим VPN
                    </div>
                    <div className={style.subtitleHeader}>
                      Для начала посмотрите <br></br>короткую видео-инструкцию
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div
                  className={style.containerVideoContent}
                  id="videoContainer"
                >
                  <div className={style.textVideo}>
                    Вам необходимо ознакомиться <br></br>с видео-инструкцией ⤵️
                  </div>
                  <div
                    className={
                      ["Windows", "Mac"].includes(platform)
                        ? style.videoContainerPC
                        : style.videoContainer
                    }
                  >
                    <iframe
                      className={style.video}
                      src={
                        (platform === "Android" &&
                          "https://www.youtube.com/embed/YZ33k9vSaCM") ||
                        (platform === "iOS" &&
                          "https://www.youtube.com/embed/7iY7KBUFj4I") ||
                        (platform === "Mac" &&
                          "https://www.youtube.com/embed/K190LfttlCo") ||
                        (platform === "Windows" &&
                          "https://www.youtube.com/embed/MNWqgl1U8Gs")
                      }
                      title="НАСТРОЙКА VPN НА IPhone"
                      frameborder="0"
                      allow="accelerometer; fullscreen; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    />
                  </div>
                  <div className={style.footerVideo}>
                    На видео выше показан процесс <br></br>настройки VPN
                  </div>
                </div>
                <div
                  className={
                    ["Windows", "Mac"].includes(platform)
                      ? style.buttonContainerPC
                      : style.buttonContainer
                  }
                >
                  <div
                    className={
                      ["Windows", "Mac"].includes(platform)
                        ? style.button1Item_addPC
                        : style.button1Item_add
                    }
                    id="button1"
                  >
                    <Button
                      size="compact"
                      appearance="positive"
                      stretched
                      onClick={() => looked()}
                    >
                      Я посмотрел(а)
                    </Button>
                  </div>
                  <div className={style.button2Item_remove} id="button2">
                    {["Windows"].includes(platform) && (
                      <div className={style.keyContainer}>
                        <div className={style.keyIcon}>
                          <IconKey />
                        </div>
                        <div className={style.keyTextContainer}>
                          Ключ доступа:
                          <div className={style.keyText}>
                            vless://{generateRandomString()}...
                          </div>
                        </div>
                      </div>
                    )}
                    <div className={style.buttonGroupContainer}>
                      {["Android", "iOS", "Mac"].includes(platform) ? (
                        <Button
                          appearance="accent"
                          stretched
                          onClick={() => {
                            const link = document.createElement("a");
                            window.Telegram.WebApp.showPopup(
                              {
                                message: platform === "Android" ? "✳️ Внимание! Чтобы VPN заработал, не забудьте вернуться обратно из Play Market / Установщика и нажать: «Завершить настройку»" : "✳️ Внимание! Чтобы VPN заработал, не забудьте вернуться обратно из App Store и нажать: «Завершить настройку»",
                                buttons: [{ type: "default", text: "Я понял(а)" }],
                              },
                              (e) => {
                                link.href = platform === "Android" ? "https://play.google.com/store/apps/details?id=com.v2ray.ang" : (platform === "Mac" ? "https://apps.apple.com/ru/app/sing-box/id6451272673" : "https://apps.apple.com/ru/app/streisand/id6450534064");
                                link.target = "_blank";
                                link.click();
                              }
                            );
                          }}
                        >
                          Установить приложение
                        </Button>
                      ) : (
                        <Button
                          appearance="accent"
                          stretched
                          onClick={() => {
                            navigator.clipboard.writeText(user.subscribe_url);
                          }}
                        >
                          Скопировать ключ
                        </Button>
                      )}
                      {["Android"].includes(platform) && (
                        <Button
                          mode="secondary"
                          onClick={() => {
                            const link = document.createElement("a");
                            link.href = "https://getv2rayng.com/en/";
                            link.target = "_blank";
                            link.click();
                          }}
                        >
                          .apk
                        </Button>
                      )}
                    </div>
                    {["Android", "iOS"].includes(platform) && (
                      <Button
                        appearance="positive"
                        stretched
                        onClick={() => {
                          const link = document.createElement("a");
                          link.href =
                            platform === "Android"
                              ? " v2rayng://install-sub?url=" +
                                user.subscribe_url +
                                "&name=%D0%92%D0%B0%D1%88%D0%B0%20%D0%BF%D0%BE%D0%B4%D0%BF%D0%B8%D1%81%D0%BA%D0%B0"
                              : "streisand://import/" + user.subscribe_url + "#Доступные страны:";
                          console.log(
                            platform === "Android"
                              ? " v2rayng://install-sub?url=" +
                                user.subscribe_url +
                                "&name=%D0%92%D0%B0%D1%88%D0%B0%20%D0%BF%D0%BE%D0%B4%D0%BF%D0%B8%D1%81%D0%BA%D0%B0"
                              : "streisand://import/" + user.subscribe_url + "#Доступные страны:"
                          );
                          link.target = "_blank";
                          link.click();
                          looked2();
                        }}
                      >
                        {platform === "Android" && "Завершить настройку"}
                        {platform === "iOS" && "Завершить настройку"}
                      </Button>
                    )}

                    {["Mac", "Windows"].includes(platform) && (
                      <Button
                        appearance="positive"
                        stretched
                        onClick={() => {
                          const link = document.createElement("a");
                          link.href =
                            platform === "Windows"
                              ? "https://github.com/hiddify/hiddify-next/releases/latest/download/Hiddify-Windows-Setup-x64.exe"
                              : "sing-box://import-remote-profile?url=" + user.subscribe_url + "#%D0%92%D0%B0%D1%88%D0%B0%20%D0%BF%D0%BE%D0%B4%D0%BF%D0%B8%D1%81%D0%BA%D0%B0";
                          link.target = "_blank";
                          link.click();
                          looked2();
                        }}
                      >
                        {platform === "Mac" && "Завершить настройку"}
                        {platform === "Windows" && "Установить приложение"}
                      </Button>
                    )}

                  </div>
                </div>
              </div>
            </div>
          )}
          {["Linux"].includes(platform) && (
            <div className={style.containerErrorContent}>
              <div className={style.headerErrorContainer}>
                <div className={style.illustrationHeaderContainer}>
                  <div id="duckIconError" />
                  <dotlottie-player
                    src="https://lottie.host/379f977c-b430-4ca9-bbd6-1d1283edc358/a6NB2f9Feh.json"
                    background="transparent"
                    speed="1"
                    loop
                    autoplay
                  />
                </div>
                <div className={style.contentHeaderErrorContainer}>
                  <div className={style.titleErrorHeader}>Ошибка</div>
                  <div className={style.subtitleErrorHeader}>
                    Данная функция <br></br>находится в разработке
                  </div>
                </div>
              </div>
              <div className={style.buttonContainerFixed}>
                <Button appearance="accent" stretched>
                  Вернуться назад
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Vpn;
