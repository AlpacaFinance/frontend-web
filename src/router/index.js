import Vue from 'vue'
import VueRouter from 'vue-router'
import SimulatorView from '../Simulator/pages/SimulatorView'
import HistoryView from "../History/pages/HistoryView"
import LoginView from "../User/pages/LoginView"
import SignupView from "../User/pages/SignupView"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/simulador/:id?',
    name: 'simulator',
    component: SimulatorView
  },
  {
    path: '/historial/:id?',
    name: 'history',
    component: HistoryView
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
