import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import LoginUser from '../Auth/LoginUser';
import Unauthorized from '../Unauthorized/Unauthorized';
import RegisterUser from '../Auth/RegisterUser';
import Forms from '../Forms/Forms';
import AddForm from '../Forms/AddForm/AddForm';
import EditForm from '../Forms/EditForm/EditForm';
import AnswerForm from '../Forms/AnswerForm/AnswerForm';
import ShowAnswers from '../Forms/ShowAnswers/ShowAnswers';

import AddGoal from '../Goals/AddGoal/AddGoal';
import EditGoal from '../Goals/EditGoal/EditGoal';
import Dashboard from '../Dashboard/Dashboard';
import Goals from '../Goals/Goals';

const Router = () => {
  return (
    <Switch>
      <Route path="/" exact component={() => <Redirect to="/goals" />} />
      <Route path="/dashboard" exact component={Dashboard} />
      <Route path="/addGoal" exact component={AddGoal} />
      <Route path="/editGoal/:id" exact component={EditGoal} />
      <Route path="/goals" exact component={Goals} />

      <Route path="/forms" exact component={Forms} />
      <Route path="/loginUser" exact component={LoginUser} />
      <Route path="/register" exact component={RegisterUser} />
      <Route path="/addForm" exact component={AddForm} />
      <Route path="/editForm/:id" exact component={EditForm} />
      <Route path="/answerForm/:id" exact component={AnswerForm} />
      <Route path="/showAnswers/:id" exact component={ShowAnswers} />
      <Route path="/unauthorized" exact component={Unauthorized} />
    </Switch>
  );
};

export default Router;
