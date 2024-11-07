// IPConfig.js
import React from 'react';

// Lưu trữ IP ở một nơi dễ dàng thay đổi
const IP_ADDRESS = 'http://192.168.1.12:3000'; // Địa chỉ IP của bạn

const IPConfig = () => {
  return {
    baseUrl: IP_ADDRESS, // Cung cấp URL cho các yêu cầu
  };
};

export default IPConfig;
