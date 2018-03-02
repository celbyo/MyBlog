import { fetchList, createModel, deleteModel } from '../services/tags';

export default {
    namespace: 'tags',
    state: {
        data: [],
    },
    reducers: {
        getList(state, action) {
            const { data } = action.payload;
            return { data };
        },
    },
    effects: {
        *readList({ }, { call, put }) {
            // yield put({ type: 'showLoading' });
            const { data } = yield call(fetchList);
            yield put({
                type: 'getList',
                payload: { data },
            });
        },
        *create({ payload }, { call, put }) {
            const { data } = yield call(createModel, payload);
            yield put({
                type: 'readList',
            });
        },
        *delete({ payload }, { call, put }) {
            const { id } = payload;
            yield call(deleteModel, id);
            yield put({ type: 'readList' });
        }
    }
};
