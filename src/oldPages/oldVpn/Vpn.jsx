import { params } from "../oldHome/Home";
import { paramsDefault } from "../oldHome/Home";

import React, { useRef } from "react";

import Button from "../../components/Button/Button";

import style from "./Vpn.module.scss";

import lottie from "lottie-web";

import { ReactComponent as IconKey } from "../../img/IconKey.svg";
import { ReactComponent as IconCopy } from "../../img/IconCopy.svg";

import { NavLink } from "react-router-dom";
import axios from "axios";

let is = false;

const paramsVpn = params;
const paramsVpnDefault = paramsDefault;
// window.location.search = paramsDefault;

const Vpn = () => {
  const [platform, setPlatform] = React.useState("");
  // const params = new URLSearchParams(window.location.search);
  const os = ["Windows", "Linux", "Mac", "iOS", "Android"];
  let key = params.get("key");
  const navLinkRef = useRef(null);

  const [isVisibleOne, setIsVisibleOne] = React.useState(false);
  const [isVisibleTwo, setIsVisibleTwo] = React.useState(false);
  const [isVisibleThree, setIsVisibleThree] = React.useState(false);
  const [setT, t] = React.useState("");
  const [user, setUser] = React.useState({});
  const [isError, setIsError] = React.useState(false);
  const username_bot = params.get("username_bot");

  React.useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    const { data } = await axios.post(
      "https://api.dipy.digital/api/get/user",
      {
        username: paramsVpn.get("username"),
      },
      {
        headers: {
          Authorization: "7f49280f247287a3574ce51a8bdaaa1c",
        },
      }
    );
    setUser(data);

    if (data.status !== "active") {
      setIsError(true);
    }

    console.log(data);
  }

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

    return platform;
  }

  function copy() {
    navigator.clipboard
      .writeText(key)
      .then(() => {
        // Получилось!
        setIsVisibleOne(true);
        /*window.Telegram.WebApp.showPopup({
          message: "Успешно скопировано",
          buttons: [{type: "ok"}]
        });*/
        console.log("Ключ успешно скопирован в буфер обмена");
      })
      .catch((err) => {
        console.log("Произошла ошибка при копировании ключа", err);
      });
  }

  const backButtonClicked = async () => {
    window.Telegram.WebApp.BackButton.hide();
    const element = document.getElementById("test");
    if (element) {
      element.click();
    }
  };

  React.useEffect(() => {
    {
      /*setTimeout(function () {
      document
        .getElementById("button1")
        .classList.remove(`${style.button1ItemAndroidAndIOS_add}`);
      document
        .getElementById("button1")
        .classList.add(`${style.button1ItemAndroidAndIOS_remove}`);
      document
        .getElementById("button2")
        .classList.remove(`${style.button2ItemAndroidAndIOS_remove}`);
      document
        .getElementById("button2")
        .classList.add(`${style.button2ItemAndroidAndIOS_add}`);
    }, 7000);*/
    }

    setTimeout(function () {
      document
        .getElementById("videoContainer")
        .scrollIntoView("videoContainer");
    }, 5000);

    //window.Telegram.WebApp.BackButton.show();
    //window.Telegram.WebApp.onEvent("backButtonClicked", backButtonClicked);

    setPlatform(getPlatform());
    //t('sdfkk');
    console.log(platform);
    //console.log(os.find(v=>navigator.appVersion.indexOf(v) >= 0));

    if (os.find((v) => navigator.appVersion.indexOf(v) >= 0) === "Mac") {
      const encodedUrl = encodeURIComponent(key);
      key = "streisand://import/" + encodedUrl;
    } else if (
      os.find((v) => navigator.appVersion.indexOf(v) >= 0) === "Linux"
    ) {
      console.log("KEY IN IF");
      //key = "v2rayng://install-config?url=" + encodeURIComponent(key);
      console.log(key);
    } else if (
      os.find((v) => navigator.appVersion.indexOf(v) >= 0) === "Windows"
    ) {
      const encodedUrl = encodeURIComponent(key);
      key = encodedUrl;
    }
    // t(true);

    console.log("KEY USEEFFECT: " + key);

    //console.log(os.find((v) => navigator.appVersion.indexOf(v) >= 0));

    if (!is) {
      is = true;
      import("../../img/duck.json")
        .then((module) => {
          const animationData = module.default;
          const container = document.getElementById("duckIcon");
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

      import("../../img/duck_web_app.json")
        .then((module) => {
          const animationData = module.default;
          const container = document.getElementById("duck_web_appIcon");
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

      import("../../img/hand.json")
        .then((module) => {
          const animationData = module.default;
          const container = document.getElementById("hand");
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

  function openLink(url, type, isButton, isAppStore) {
    const link = document.createElement("a");

    if (isAppStore) {
      window.Telegram.WebApp.showPopup(
        {
          message:
            "✳️ Внимание! Чтобы VPN заработал, не забудьте вернуться обратно из App Store и нажать: «Завершить настройку»",
          buttons: [{ type: "default", text: "Я понял(а)" }],
        },
        (e) => {
          link.href = url;
          link.target = "_blank";
          link.click();
        }
      );
      return;
    }

    if (type === "mac") {
      console.log("KEY IN FUNCTION: " + url);
      link.href = "streisand://import/" + url;
    } else {
      link.href = url;
    }
    link.target = "_blank";
    link.click();
    console.log(123213);
    switch (type) {
      case "windows":
        setIsVisibleTwo(true);
        setIsVisibleThree(true);
        break;
      case "mac":
        console.log(123213);
        setIsVisibleOne(true);
        setIsVisibleTwo(true);
        if (isButton) {
          setIsVisibleThree(true);
        }
        break;
      case "android":
        setIsVisibleOne(true);
        setIsVisibleTwo(true);
        break;
    }
  }

  function sendStat() {
    axios.post("https://franchise.feen.cloud", {
      user_id: params.get("user_id"),
      type: "download_app",
    });
  }

  function sendStatFinish() {
    axios.post("https://franchise.feen.cloud", {
      user_id: params.get("user_id"),
      type: "click_finish",
    });
  }

  function looked() {
    document
      .getElementById("button1")
      .classList.remove(`${style.button1ItemAndroidAndIOS_add}`);
    document
      .getElementById("button1")
      .classList.add(`${style.button1ItemAndroidAndIOS_remove}`);
    document
      .getElementById("button2")
      .classList.remove(`${style.button2ItemAndroidAndIOS_remove}`);
    document
      .getElementById("button2")
      .classList.add(`${style.button2ItemAndroidAndIOS_add}`);
    document
      .getElementById("count1")
      .classList.add(`${style.listCountCompleted}`);
  }

  return (
    <div
      className={
        platform === "Windows"
          ? style.contentContainerWin
          : style.contentContainer
      }
    >
      <NavLink id="test" to="/" style={{ display: "none" }} />
      {["Android", "iOS"].includes(platform) ? (
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
            <div className={style.contentAndroidAndIOSContainer}>
              <div className={style.lineAndroidAndIOSContainer}>
                <div className={style.lineItemAndroidAndIOSContainer}>
                  <div className={style.handContainer}>
                    <div id="hand" />
                  </div>
                  <div className={style.lineItemAndroidAndIOS}>
                    {/*Пункт №1*/}
                    <div className={style.listItemAndroidAndIOS}>
                      <div className={style.countContainer}>
                        <div id="count1" className={style.listCount}>
                          1
                        </div>
                      </div>
                      <div className={style.countContainer}>
                        <div
                          className={
                            isVisibleOne
                              ? style.listCountCompleted
                              : style.listCount
                          }
                        >
                          2
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={style.headerAndroidAndIOSContainer}>
                  <div className={style.headerAndroidAndIOSBackground} />
                  <div className={style.contentHeaderAndroidAndIOSContainer}>
                    <div className={style.titleAndroidAndIOS}>
                      Давайте<br></br>настроим VPN
                    </div>
                    <div className={style.input_wrapper}>
                      <span className={style.placeholder}></span>
                    </div>
                    <div
                      className={style.topIllustrationrAndroidAndIOSContainer}
                    >
                      <div id="duck_web_appIcon"></div>
                    </div>
                  </div>
                </div>
                <div
                  className={style.videoContentAndroidAndIOSContainer}
                  id="videoContainer"
                >
                  <div className={style.textVideoAndroidAndIOS}>
                    Вам необходимо ознакомиться с <br></br>видео-инструкцией ⤵️
                  </div>
                  <div className={style.videoAndroidAndIOSContainer}>
                    {/*<video
                  poster={Poster}
                  controls
                  src={
                    (platform === "Android" && VideoAndroid) ||
                    (platform === "iOS" && VideoIOS)
                  }
                  className={style.videoAndroidAndIOS}
                />*/}
                    <iframe
                      className={style.videoAndroidAndIOS}
                      src="https://www.youtube.com/embed/xEBDL6GJY20"
                      title="Настройка HitVPN на iPhone #vpn #hitvpn"
                      frameborder="0"
                      allow="accelerometer; fullscreen; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    />
                  </div>
                  <div className={style.footerVideoAndroidAndIOS}>
                    На видео выше показан процесс <br></br>настройки VPN
                  </div>
                </div>
              </div>
              <div className={style.buttonAndroidAndIOSContainer}>
                <div
                  className={style.button1ItemAndroidAndIOS_add}
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
                {["Android"].includes(platform) && (
                  <div
                    className={style.button2ItemAndroidAndIOS_remove}
                    id="button2"
                  >
                    <div className={style.buttonGroupContainerAndroidAndIOS}>
                      <Button
                        appearance="accent"
                        stretched
                        onClick={() => {
                          const link = document.createElement("a");
                          link.href =
                            "https://play.google.com/store/apps/details?id=com.v2ray.ang";
                          link.target = "_blank";
                          link.click();
                        }}
                      >
                        Установить приложение
                      </Button>
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
                    </div>
                    <Button
                      appearance="positive"
                      stretched
                      onClick={() => {
                        const link = document.createElement("a");
                        link.href =
                          "v2rayng://install-sub?name=" + user.subscribe_url;
                        link.target = "_blank";
                        link.click();
                      }}
                    >
                      Завершить настройку
                    </Button>
                  </div>
                )}
                {["iOS"].includes(platform) && (
                  <div
                    className={style.button2ItemAndroidAndIOS_remove}
                    id="button2"
                  >
                    <Button
                      appearance="accent"
                      stretched
                      onClick={() => {
                        const link = document.createElement("a");
                        link.href =
                          "https://apps.apple.com/ru/app/v2raytun/id6476628951";
                        link.target = "_blank";
                        link.click();
                      }}
                    >
                      Установить приложение
                    </Button>
                    <Button
                      appearance="positive"
                      stretched
                      onClick={() => {
                        const link = document.createElement("a");
                        link.href = "v2rayTun://import/" + user.subscribe_url;
                        console.log(
                          "link.href = v2rayTun://import/" + user.subscribe_url
                        );
                        link.target = "_blank";
                        link.click();
                      }}
                    >
                      Завершить настройку
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      ) : (
        <div>
          <div
            className={
              platform === "Windows" ? style.contentWin : style.content
            }
          >
            <div className={style.topIllustrationContainer}>
              {["Mac", "Windows"].includes(platform) ? (
                <div id="duckIcon" />
              ) : (
                <div id="duckIconError" />
              )}
            </div>
            {["Mac", "Windows", "Linux"].includes(platform) ? (
              <div className={style.title}>Давайте настроим VPN</div>
            ) : (
              <div>
                <div className={style.title}>Ошибка</div>
                <div className={style.subTitle}>
                  Данная функция находится в разработке
                </div>
              </div>
            )}
            {["Mac", "Windows"].includes(platform) ? (
              <>
                <div
                  className={
                    platform === "Windows"
                      ? style.keyContainerWin
                      : style.keyContainer
                  }
                >
                  <div className={style.iconKeyContainer}>
                    <IconKey />
                  </div>
                  <div className={style.key}>{key}</div>
                  <div
                    className={style.iconCopyContainer}
                    onClick={() => copy()}
                  >
                    <IconCopy />
                  </div>
                </div>
                <div className={style.listContainer}>
                  {/*Пункт №1*/}
                  <div className={style.listItem}>
                    <div className={style.countContainer}>
                      {/*Пунктир*/}
                      <div className={style.lineContainer}>
                        <div className={style.lineTop} />
                        <div className={style.lineCenter} />
                        <div className={style.lineBottom} />
                      </div>
                      <div
                        className={
                          isVisibleOne
                            ? style.listCountCompleted
                            : style.listCount
                        }
                      >
                        1
                      </div>
                    </div>
                    {["Mac"].includes(platform) && (
                      <div className={style.listText}>
                        <div
                          className={style.textLink}
                          onClick={() => {
                            openLink(
                              "https://apps.apple.com/us/app/streisand/id6450534064",
                              "mac",
                              "",
                              true
                            );
                            sendStat();
                          }}
                        >
                          Установите приложение,
                        </div>
                        но не открывайте его
                      </div>
                    )}
                    {["Windows"].includes(platform) && (
                      <div className={style.listText}>
                        Скопируйте
                        <div className={style.textKey}>ключ,</div>
                        что находится выше
                      </div>
                    )}
                  </div>
                  {/*Пункт №2*/}
                  <div className={style.listItem}>
                    <div className={style.countContainer}>
                      {/*Пунктир*/}
                      <div
                        className={
                          platform === "Windows"
                            ? style.lineContainerWin
                            : style.lineContainer
                        }
                      >
                        <div
                          className={
                            platform === "Windows"
                              ? style.lineTopWin
                              : style.lineTop
                          }
                        />
                        <div
                          className={
                            platform === "Windows"
                              ? style.lineCenterWin
                              : style.lineCenter
                          }
                        />
                        <div
                          className={
                            platform === "Windows"
                              ? style.lineBottomWin
                              : style.lineBottom
                          }
                        />
                      </div>
                      <div
                        className={
                          isVisibleTwo
                            ? style.listCountCompleted
                            : style.listCount
                        }
                      >
                        2
                      </div>
                    </div>
                    {["Mac"].includes(platform) && (
                      <div className={style.listText}>
                        Вернитесь из
                        <div
                          className={style.textLink}
                          onClick={() =>
                            openLink(
                              "https://apps.apple.com/us/app/streisand/id6450534064",
                              "mac",
                              "",
                              true
                            )
                          }
                        >
                          App Store
                        </div>
                        обратно на эту страницу
                      </div>
                    )}
                    {["Windows"].includes(platform) && (
                      <div className={style.listText}>
                        Установите и откройте
                        <div
                          className={style.textLink}
                          onClick={() => {
                            openLink(
                              "https://github.com/hiddify/hiddify-next/releases/latest/download/hiddify-windows-x64-setup.zip",
                              "windows"
                            );
                            sendStat();
                          }}
                        >
                          программу Hiddify
                        </div>
                      </div>
                    )}
                  </div>
                  {/*Пункт №3*/}
                  <div className={style.listItem}>
                    <div
                      className={
                        isVisibleThree
                          ? style.listCountCompleted
                          : style.listCount
                      }
                    >
                      3
                    </div>
                    {["Mac"].includes(platform) && (
                      <div className={style.listText}>
                        Нажмите на кнопку
                        <div className={style.textPositive}>
                          Завершить настройку
                        </div>
                      </div>
                    )}
                    {["Windows"].includes(platform) && (
                      <div className={style.listText}>
                        <div>Нажмите на кнопку</div>
                        <div>Новый профиль →</div>
                        <div>Добавить из буфера</div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className={style.blockNone} />
            )}
          </div>
          <div
            className={platform === "Windows" && style.buttonContainerFixedWin}
          >
            <div className={style.buttonContainerFixed}>
              {["Mac", "Windows"].includes(platform) ? (
                <>
                  {["Mac"].includes(platform) && (
                    <div className={style.buttonContainer}>
                      <Button
                        mode="outline"
                        stretched
                        onClick={() => {
                          window.Telegram.WebApp.showPopup(
                            {
                              message:
                                "✳️ Внимание! Чтобы VPN заработал, не забудьте вернуться обратно из App Store и нажать: «Завершить настройку»",
                              buttons: [
                                { type: "default", text: "Я понял(а)" },
                              ],
                            },
                            (e) => {
                              try {
                                sendStatFinish();
                                // window.location.href = config.APPLE_APP;
                                const link = document.createElement("a");
                                link.href =
                                  "https://apps.apple.com/us/app/streisand/id6450534064";
                                link.target = "_blank";
                                link.click();
                                setIsVisibleOne(true);
                                setIsVisibleTwo(true);
                              } catch (e) {
                                console.log(e);
                              }
                            }
                          );
                        }}
                      >
                        Установить приложение
                      </Button>
                      <Button
                        appearance="positive"
                        stretched
                        onClick={() => {
                          console.log("KEY: " + key);
                          openLink(key, "mac", true);
                          sendStatFinish();
                        }}
                      >
                        Завершить настройку
                      </Button>
                    </div>
                  )}
                  {["Linux"].includes(platform) && (
                    <div className={style.buttonContainer}>
                      <Button
                        mode="outline"
                        stretched
                        onClick={() =>
                          openLink(
                            "https://github.com/2dust/v2rayNG/releases/download/1.8.12/v2rayNG_1.8.12.apk",
                            "android"
                          )
                        }
                      >
                        Установить приложение
                      </Button>
                      <Button
                        appearance="positive"
                        stretched
                        onClick={() => {
                          sendStatFinish();
                          // key = "v2rayng://install-config?url=" + encodeURIComponent(key);
                          console.log("windowlocationkey: " + key);
                          const link = document.createElement("a");
                          link.href =
                            "v2rayng://install-config?url=" +
                            encodeURIComponent(key);
                          link.target = "_blank";
                          link.click();
                          setIsVisibleOne(true);
                          setIsVisibleTwo(true);
                          setIsVisibleThree(true);
                          /*setIsVisibleOne(true);
                      setIsVisibleTwo(true);
                      console.log('windowlocationkey: ' + key);
                      window.location.href = key;
                      setIsVisibleThree(true);
                      // openLink(key, 'android')*/
                        }}
                      >
                        Завершить настройку
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <div className={style.buttonContainer}>
                  <Button appearance="accent" stretched>
                    Вернуться назад
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vpn;
export { paramsVpn };
export { paramsVpnDefault };
