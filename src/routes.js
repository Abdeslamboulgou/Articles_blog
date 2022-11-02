import ListItems from './components/ListItems';
import ListUsers from './components/ListUsers';
import CreateUser from './components/CreateUser';
import EditUser from './components/EditUser';
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';
import VueRouter from 'vue-router';
import Vue from 'vue';

Vue.use(VueRouter)
const routes = [

    {
        name: 'users',
        path: '/',
        component:  ListUsers
    },
    {
        name: 'posts',
        path: '/post',
        component:  ListItems,
    },   
    {
        name: 'create_user',
        path: '/create_user',
        component:  CreateUser,
    },  
    {
        name: 'update_user',
        path: '/update_user/:id',
        component:  EditUser,
    }, 
    {
        name: 'create_post',
        path: '/create_post',
        component:  CreatePost,
    },  
    {
        name: 'update_post',
        path: '/update_post/:id',
        component:  EditPost,
    }, 
]


const router = new VueRouter({
      routes,
    })
    
export default router;
