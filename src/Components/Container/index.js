import React, { useState } from "react";
import SettingsButton from "../SettingsButton";
import axios from "axios";
import UserSettings from "./UserSettings";
import { nodeURL } from "../../globalConstants";

export default function SimpleContainer(props) {
  const [userSettings, setUserSettings] = useState(null);
  function getSetting() {
    let token = localStorage.getItem("token");

    axios
      .post(
        `${nodeURL}/home/getsettings`,
        {},
        {
          headers: {
            Authorization: `Basic ${token}`,
          },
        }
      )
      .then((data) => {
        setUserSettings(data.data.settings);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <div className="Container">
        <div className="containerLeft">
          <SettingsButton getSetting={() => getSetting()}></SettingsButton>
        </div>
        <div className="containerRight">
          {userSettings ? <UserSettings userSettings={userSettings} /> : null}
        </div>
      </div>
    </>
  );
}
