import { BrowserRouter, Route, Routes } from "react-router-dom";
import SmartPrediction from "components/SmartPrediction/SmartPrediction";
import History from "components/SmartPrediction/tabs/History/History";
import Notifications from "components/SmartPrediction/tabs/Notifications/Notifications";
import Settings from "components/SmartPrediction/tabs/Settings/Settings";
import VibrationChart from "components/SmartPrediction/tabs/Monitoring/Monitoring";

const Routing = () => (
  <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SmartPrediction />} >
          <Route path="/" element={<VibrationChart />} />
          <Route path="/history" element={<History />} />
          <Route
            path="/notifications"
            element={<Notifications />}
          />
          <Route path="/settings" element={<Settings />} />
          </Route>
      </Routes>
    </BrowserRouter>
  </>
);

export default Routing;
