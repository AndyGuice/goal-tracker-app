import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LoginUser from '../Auth/LoginUser';

import RegisterUser from '../Auth/RegisterUser';
import AddGoal from '../Goals/AddGoal';
import EditGoal from '../Goals/EditGoal';

import DashboardView from '../../views/DashboardView/DashboardView';
import LandingView from '../../views/LandingView/LandingView';
import GoalsView from '../../views/GoalsView/GoalsView';

import Unauthorized from '../../views/Unauthorized/Unauthorized';

const Router = () => {

  return (
    <Switch>
      <Route path="/" exact component={LandingView} />
      <Route path="/dashboard" exact component={DashboardView} />
      <Route path="/goals" exact component={GoalsView} />

      <Route path="/addGoal" exact component={AddGoal} />
      <Route path="/editGoal/:id" exact component={EditGoal} />

      <Route path="/loginUser" exact component={LoginUser} />
      <Route path="/register" exact component={RegisterUser} />
      <Route path="/unauthorized" exact component={Unauthorized} />
    </Switch>
  );
};

export default Router;
