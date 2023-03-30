import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Staff from "./pages/Staff";
import Sales from "./pages/Sales";
import Customers from "./pages/Customers";
import Returns from "./pages/Returns";
import Invoice from "./pages/Invoice";
import Report from "./pages/Report";
import Inventory from "./pages/Inventory";
import Error from "./pages/Error";
import ProtectedRoute from "./ProtectedRoute";
import InvoiceList from "./pages/InvoiceList";
import SalesReceipt from "./pages/SalesReceipt";
import InventoryRecords from "./pages/InventoryRecords";
import ReturnDetails from "./pages/ReturnDetails";
import ProductsReport from "./pages/ProductsReport";

function App() {
  
  return (
    <div>
      <Router>
        <Routes>
          {/* UNPROTECTED ROUTES */}
          <Route path="/" element={<Login />} />
          {/* <Route path="/register" element={<Signup />} /> */}

          {/* PROTECTED ROUTE */}
          <Route element={<ProtectedRoute />}>
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/invoice" element={<Invoice />} />
            <Route exact path="/products" element={<Products />} />
            <Route exact path="/staff" element={<Staff />} />
            <Route exact path="/sales" element={<Sales />} />
            <Route exact path="/customers" element={<Customers />} />
            <Route exact path="/returns" element={<Returns />} />
            <Route
              exact
              path="/returns/return-details"
              element={<ReturnDetails />}
            />
            <Route exact path="/report" element={<Report />} />
            <Route exact path="/products-report" element={<ProductsReport />} />
            <Route exact path="/inventory" element={<Inventory />} />
            <Route exact path="/sales-details" element={<InvoiceList />} />
            <Route exact path="/sales-receipt" element={<SalesReceipt />} />
            <Route
              exact
              path="/inventory-records"
              element={<InventoryRecords />}
            />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
