"use client";
import OneSignal from "react-onesignal";
import logo from "./logo.svg";
import "./App.css";
import { api } from "./services/axios";

function App() {
  // OneSignal initialization
  // const subscribeToOneSignal = () => {
  //   // Ensure this code runs only on the client side
  //   if (typeof window !== "undefined") {
  //     OneSignal.init({
  //       appId: "ee27e749-e300-4965-b13c-6512fada7e83",
  //       // You can add other initialization options here
  //       notifyButton: {
  //         enable: true,
  //       },
  //       // Uncomment the below line to run on localhost. See: https://documentation.onesignal.com/docs/local-testing
  //       // allowLocalhostAsSecureOrigin: true
  //     });
  //   }
  // };

  // nodejs initizalition
  const subscribeToNodejsExpress = async () => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("service-worker.js")
        .then(async (serviceWorker) => {
          let subscription = await serviceWorker.pushManager.getSubscription();
          if (!subscription) {
            const publicKeyResponse = await api.get("/push/publicKey");
            subscription = await serviceWorker.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: publicKeyResponse.data,
            });
          }
          // await api.post("/push/subscribe", {
          //   subscription,
          // });
          console.log(subscription);
          await api.post("/push/sendNotification", {
            subscription,
          });
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    } else {
      console.error("Service Workers are not supported in this browser.");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {/* <button
          onClick={() => {
            subscribeToOneSignal();
          }}
        >
          nodejs
        </button> */}
        <button
          onClick={() => {
            subscribeToNodejsExpress();
          }}
        >
          nodeJS
        </button>
      </header>
    </div>
  );
}

export default App;
