import fetch from '../utils/request';

export const fetchList = ({ ipp, page }) => {
    return fetch('/api/v1/articles', {
        filters: { ipp, page }
    });
}