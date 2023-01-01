import axios from "axios";
import { useEffect } from "react";
import { Route, Routes as ReactRoutes } from "react-router-dom";
import Layout from "../components/shared/Layout";
import BeehiveAdd from "../pages/Beehive/BeehiveAdd";
import BeehiveEdit from "../pages/Beehive/BeehiveEdit";
import Beehives from "../pages/Beehive/Beehives";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NoMatch from "../pages/NoMatch";
import PrivateRoute from "../components/shared/PrivateRoute";

function Routes() {
  return (
    <ReactRoutes>
      <Route index={false} path="/" element={<Login />} />
      <Route element={<Layout />}>
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="/beehives" element={<Beehives />} />
        <Route path="/beehive/add" element={<BeehiveAdd />} />
        <Route path="/beehive/edit/:id" element={<BeehiveEdit />} />
      </Route>
      <Route path="*" element={<NoMatch />} />
    </ReactRoutes>
  );
}

export default Routes;
