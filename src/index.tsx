import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./globals.css";
import App from "./App";
import TransferPage from "./pages/TransferPage";
import DashboardPage from "./pages/DashboardPage";
import AccountsPage from "./pages/AccountsPage";
import SettingsPage from "./pages/SettingsPage";
import { Toaster } from "./components/ui/toaster";
import WelcomePage from "./pages/WelcomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import LocalTransfer from "./pages/LocalTransfer";
import AboutPage from "./pages/AboutPage";
import ManageAccountPage from "./pages/ManageAccount";
import VerifyAccountPage from "./pages/VerifyAccount";
import ExchangeRatesPage from "./pages/ExchangeRates";
import ExternalTransfer from "./pages/ExternalTransfer";
import CustomerSupport from "./pages/CustomerSupport";
import ForgotPassword from "./pages/ForgotPassword";
import TransactionHistory from "./pages/TransactionHistory";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Toaster />
    <Router>
      <Routes>
        <Route index element={<WelcomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/" element={<App />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="transfer-funds" element={<TransferPage />} />
          <Route path="account-top-up" element={<AccountsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/local-transfer" element={<LocalTransfer />} />
          <Route path="/external-transfer" element={<ExternalTransfer />} />
          <Route path="/manage-account" element={<ManageAccountPage />} />
          <Route path="/verify-account" element={<VerifyAccountPage />} />
          <Route path="/exchange-rates" element={<ExchangeRatesPage />} />
          <Route path="/customer-support" element={<CustomerSupport />} />
          <Route path="/transaction-history" element={<TransactionHistory />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);
