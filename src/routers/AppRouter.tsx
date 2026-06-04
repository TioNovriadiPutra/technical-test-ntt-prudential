import { AppLayout } from "@/components/custom";
import { CreateProduct, EditProduct, Home, Product } from "@/pages/app";
import { Navigate, Route, Routes } from "react-router";

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Home />} />

        <Route path="products">
          <Route index element={<Product />} />
          <Route path="create" element={<CreateProduct />} />
          <Route path="edit/:id" element={<EditProduct />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;
