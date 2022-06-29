import React, { useState, useEffect } from "react";

const apiCall = {
  event: "bts:subscribe",
  data: { channel: "order_book_btcusd" },
};
function BtsSocket() {
  const [bids, setBids] = useState([0]);

  useEffect(() => {
    const ws = new WebSocket("wss://ws.bitstamp.net");
    ws.onopen = (event) => {
      ws.send(JSON.stringify(apiCall));
    };
    ws.onmessage = function (event) {
      // console.log(event);
      const json = JSON.parse(event.data);
      // console.log(json);
      try {
        if (json.event === "data") {
          setBids(json.data.bids.slice(0, 5));
        }
      } catch (err) {
        console.log(err);
      }
    };
    //clean up function
    return () => ws.close();
  }, []);
  const firstBids = bids.map((item, index) => (
    <div key={index}>
      <span> 第{index + 1}筆交易紀錄</span>
      <p> {item}</p>
    </div>
  ));

  return (
    <>
      <div>
        {firstBids}
        {/* <Link to="./chat">Chat</Link> */}
      </div>
    </>
  );
}
export default BtsSocket;
