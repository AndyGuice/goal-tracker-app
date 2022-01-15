import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LoginUser from '../Auth/LoginUser';
import Unauthorized from '../Unauthorized/Unauthorized';
import RegisterUser from '../Auth/RegisterUser';
import AddGoal from '../Goals/AddGoal';
import EditGoal from '../Goals/EditGoal';
import DashboardView from '../../views/DashboardView/DashboardView';
import LandingPage from '../LandingPage/LandingPage'
import SetupView from '../../views/SetupView/SetupView'

const Router = () => {

  return (
    <Switch>
      <Route path="/" exact component={LandingPage} />
      <Route path="/dashboard" exact component={DashboardView} />
      <Route path="/setup" exact component={SetupView} />
      <Route path="/addGoal" exact component={AddGoal} />
      <Route path="/editGoal/:id" exact component={EditGoal} />
      <Route path="/loginUser" exact component={LoginUser} />
      <Route path="/register" exact component={RegisterUser} />
      <Route path="/unauthorized" exact component={Unauthorized} />
    </Switch>
  );
};

export default Router;
