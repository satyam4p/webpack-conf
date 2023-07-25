import { configureStore } from '@reduxjs/toolkit';
import taskReducer from '../features/task/taskSlice';
import drawerReducer from '../features/Drawer/drawerSlice';
import BoardReducer from '../features/Board/BoardSlice';
import userProfileReducer from '../features/profile/profileSlice';

export const store = configureStore({
    reducer:{
        task: taskReducer,
        drawer: drawerReducer,
        board: BoardReducer,
        userProfile: userProfileReducer,
        comments:{},
        user:{}
    }
})



