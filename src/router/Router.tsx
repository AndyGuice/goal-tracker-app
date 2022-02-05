import React from 'react'
import { Routes, Route } from 'react-router-dom'

import LoginUser from '../components/Auth/LoginUser'
import RegisterUser from '../components/Auth/RegisterUser'

import AddGoal from '../components/Goals/AddGoal'
import EditGoal from '../components/Goals/EditGoal'

import DashboardView from '../views/DashboardView/DashboardView'
import LandingView from '../views/LandingView/LandingView'
import GoalsView from '../views/GoalsView/GoalsView'

function NavRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingView />} />
      <Route path="/dashboard" element={<DashboardView />} />
      <Route path="/goals" element={<GoalsView />} />

      <Route path="/addGoal" element={<AddGoal />} />
      <Route path="/editGoal/:id" element={<EditGoal />} />

      <Route path="/loginUser" element={<LoginUser />} />
      <Route path="/register" element={<RegisterUser />} />
    </Routes>
  )
}

export default NavRoutes
