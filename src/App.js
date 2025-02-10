import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

// Lazy Load Components
const Layout = lazy(() => import("./components/AppLayout"));
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Contact = lazy(() => import("./pages/Contact"));
const HelpPage = lazy(() => import("./pages/Help"));
const CostDashboard = lazy(() => import("./pages/Dashboard"));
const CostPage = lazy(() => import("./pages/Cost"));
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions"));
const SignIn = lazy(() => import("./pages/Signin"));
const SignUp = lazy(() => import("./pages/Signup"));
const OTPVerification = lazy(() => import("./pages/OTPVerification"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

const Loading = () => (
  <div className="flex justify-center items-center h-screen">Loading...</div>
);

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/cost" element={<CostPage />} />
              <Route path="/dashboard" element={<CostDashboard />} />
              <Route path="/about" element={<About />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/help" element={<HelpPage />} />
              <Route
                path="/terms-and-conditions"
                element={<TermsAndConditions />}
              />
            </Route>
            <Route path="/login" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/otp-verification" element={<OTPVerification />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </Router>
    </Provider>
  );
};

export default App;
