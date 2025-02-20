import { RNSerialport } from "@fugood/react-native-usb-serialport";
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
const Page = () => {
  const [deviceList, setDeviceList] = useState([]);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await RNSerialport.getDeviceList();
        if (!response.status) {
          console.log(
            "Error from getDeviceList()",
            response.errorCode,
            response.errorMessage
          );
          return;
        }
        setDeviceList(response.devices);
      } catch (error) {
        console.error("Error fetching device list:", error);
      }
    };

    fetchDevices();
  }, []);

  return (
    <View>
      <Text>ホーム</Text>
      {deviceList.length > 0 ? (
        deviceList.map((device, index) => (
          <Text key={index}>{device.deviceName}</Text>
        ))
      ) : (
        <Text>デバイスが見つかりません</Text>
      )}
    </View>
  );
};

export default Page;
