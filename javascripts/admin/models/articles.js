import { fetchList } from '../services/articles';

export default {
    namespace: 'articles',
    state: {
        data: [],
        ipp: 10,
        page: 0,
        total: 0,
    },
    reducers: {
        getList(state, action) {
            const { ipp, page, total, data } = action.payload;
            const newData = page === 1 ? data : state.data.concat(data);
            return { ...state, data: newData, page, ipp, total };
        },
    },
    effects: {
        *readList({ payload }, { call, put }) {
            // yield put({ type: 'showLoading' });
            const { data } = yield call(fetchList, payload);
            yield put({
                type: 'getList',
                payload: data
            });
        }
    }
};
