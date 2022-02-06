import axios from 'axios'

const API = axios.create({ baseURL: process.env.REACT_APP_API_URL })

API.interceptors.request.use((req: any) => {
  if (localStorage.getItem('profile')) {
    const profile = localStorage.getItem('profile') || ''
    req.headers.Authorization = `Bearer ${JSON.parse(profile).token}`
  }

  return req
})

API.interceptors.response.use((response) => response, (error) => {
  if (error.response.status === 401) {
    window.location.assign('/loginUser')
  } else if (error.response.status === 500) {
    console.log('Server error')
  }
  return error
})

// auth
export const signIn = (formData: any) => API.post('/user/signin', formData)
export const signUp = (formData: any) => API.post('/user/signup', formData)

// CRUD for goals - still to be built out
export const fetchAllGoals = () => API.get('/goals')
export const fetchUserGoals = (id: String) => API.get(`/goals/users/${id}`)
export const fetchGoal = (id: String) => API.get(`/goals/${id}`)
export const createGoal = (goal: any) => API.post('/goals', goal)
export const updateGoal = (id: String, updatedGoal: any) => API.patch(`/goals/${id}`, updatedGoal)
export const deleteGoal = (id: String) => API.delete(`/goals/${id}`)

// tasks
// export const fetchAllTasks = () => API.get('/tasks');
export const fetchGoalTasks = (id: String) => API.get(`/tasks/${id}`)
// export const fetchTask = (id: String) => API.get(`/tasks/${id}`);
export const createTask = (task: any) => API.post('/tasks', task)
export const updateTask = (id: String, updatedTask: any) => API.patch(`/tasks/${id}`, updatedTask)
export const deleteTask = (id: String) => API.delete(`/tasks/${id}`)
