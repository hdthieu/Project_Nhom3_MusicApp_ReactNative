import React from 'react';

// Lưu trữ IP ở một nơi dễ dàng thay đổi
// const IP_ADDRESS = 'http://192.168.1.12:3000'; 
// const IP_ADDRESS = 'http://localhost:3000';
 const IP_ADDRESS = 'http://192.168.1.12:3000'; //ip của phó lủ
//const IP_ADDRESS = 'http://192.168.1.4:3000';

const IPConfig = () => {
  return {
    baseUrl: IP_ADDRESS, // Cung cấp URL cho các yêu cầu
  };
};

export default IPConfig;
