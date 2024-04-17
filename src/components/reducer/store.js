import { createStore } from 'redux';
import MapReducer from './reducer';

// 创建Redux store
export const store = createStore(MapReducer);