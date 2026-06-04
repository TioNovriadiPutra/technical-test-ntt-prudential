import Login from "@/pages/auth/Login";
import { Navigate, Route, Routes } from "react-router";

const AuthRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AuthRouter;
