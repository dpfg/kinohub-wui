import Vue from 'vue'
import Router from 'vue-router'
import Blank from '@/components/Blank'
import Search from "@/components/Search";
import Feed from '@/components/Feed';
import Series from '@/components/Series'
import Season from '@/components/Season'
import Player from '@/components/Player';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Blank',
      component: Blank
    },
    {
      path: '/feed',
      name: 'Feed',
      component: Feed
    },
    {
      path: '/player',
      name: 'Player',
      component: Player
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/series/:id',
      name: 'Series',
      component: Series
    },
    {
      path: '/series/:id/seasons/:num',
      name: 'Season',
      component: Season
    }
  ]
})
