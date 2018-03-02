import fetch from '../utils/request';

export const fetchList = () => {
    return fetch('/api/v1/tags');
};

export const createModel = (data) => {
    return fetch('/api/v1/tags', {
        method: 'POST',
        body: JSON.stringify(data),
    });
};

export const deleteModel = id => {
    return fetch(`/api/v1/tags/${id}`, {
        method: 'DELETE',
    });
}