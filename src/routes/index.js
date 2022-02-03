import Vue from 'vue';
import Router from 'vue-router';
import { auth } from '../firebase'

import Home from '../components/home/Home'
import Presentation from '../components/presentation/Presentation'
import Share from '../components/share/Share'
import Feed from '../components/feed/Feed'
import Settings from '../components/settings/Settings'
import Lab from '../components/Lab.vue'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
      {
        path: '/testes',
        name: 'Lab',
        component: Lab
      },
      { 
        path: '/',
        name: 'Presentation',
        component: Presentation,
      },
      { 
        path: '/@:accountId?',
        name: 'Home',
        props: true,
        component: Home,
      },
      { 
        path: '/enviar',
        name: 'Share',
        component: Share,
      },
      { 
        path: '/console',
        name: 'Feed',
        component: Feed,
        meta: {
          requiredAuth: true
        }
      },
      {
        path: '/configuracoes',
        name: 'Settings',
        component: Settings,
        meta: {
          requiredAuth: true
        }
      }
    ]
});

router.beforeEach((to, from, next) => {
  auth.onAuthStateChanged(user => {
    const requiredAuth = to.matched.some(record => record.meta.requiredAuth)

    if (!user && requiredAuth) {
      // router.replace('/login')
      next('/')
    } else {
      if (user) {
        to.query.uid = user.uid
        next({ query: to.query});
      }
      else next()
    }
  })
});
export default router