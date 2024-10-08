import logo from './logo.svg';
import './App.css';
import { api } from './services/axios';

const handlePushNotification = async () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
      .then(async serviceWorker => {
        let subscription = await serviceWorker.pushManager.getSubscription();

        if (!subscription) {
          const publicKeyResponse = await api.get('/push/publicKey');

          subscription = await serviceWorker.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: publicKeyResponse.data
          });
        }

        await api.post('/push/subscribe', {
          subscription,
        })

        await api.post('/push/sendNotification', {
          subscription,
        })
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error);
      });
  } else {
    console.error('Service Workers are not supported in this browser.');
  }
}



function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={() => {
            handlePushNotification();
        }}>teste</button>
      </header>
    </div>
  );
}

export default App;
