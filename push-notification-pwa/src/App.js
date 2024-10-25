"use client";
import OneSignal from "react-onesignal";
import logo from "./logo.svg";
import "./App.css";
import { api } from "./services/axios";

function App() {
  // nodejs initizalition
  const subscribeToNodejsExpress = async () => {
    if ("serviceWorker" in navigator) {
      try {
        const serviceWorker = await navigator.serviceWorker.register(
          "service-worker.js"
        );
        let subscription = await serviceWorker.pushManager.getSubscription();

        if (!subscription) {
          const publicKeyResponse = await api.get("/push/publicKey");
          console.log("Public Key:", publicKeyResponse.data);

          subscription = await serviceWorker.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: publicKeyResponse.data,
          });
        }

        console.log("Subscription object:", subscription);

        const response = await api.post("/push/sendNotification", {
          subscription,
        });
        console.log("Notification response:", response.data);
      } catch (error) {
        console.error("Error during subscription or notification:", error);
      }
    } else {
      console.error("Service Workers are not supported in this browser.");
    }
  };

  // const subscribeToNodejsExpress = async () => {
  //   if ("serviceWorker" in navigator) {
  //     navigator.serviceWorker
  //       .register("service-worker.js")
  //       .then(async (serviceWorker) => {
  //         let subscription = await serviceWorker.pushManager.getSubscription();
  //         if (!subscription) {
  //           const publicKeyResponse = await api.get("/push/publicKey");
  //           subscription = await serviceWorker.pushManager.subscribe({
  //             userVisibleOnly: true,
  //             applicationServerKey: publicKeyResponse.data,
  //           });
  //         }
  //         // await api.post("/push/subscribe", {
  //         //   subscription,
  //         // });
  //         console.log(subscription);
  //         await api.post("/push/sendNotification", {
  //           subscription,
  //         });
  //       })
  //       .catch((error) => {
  //         console.error("Service Worker registration failed:", error);
  //       });
  //   } else {
  //     console.error("Service Workers are not supported in this browser.");
  //   }
  // };

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
