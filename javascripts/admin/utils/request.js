import fetch from 'dva/fetch';
import { Modal } from 'antd';
import { appendUrlParams, buildFiltersQuery, buildPageQuery } from './url';
import { PREFIX_API, AUTH_API, BASIC_AUTH_KEY, DEFAULT_MAX_IPP } from '../constants';
import { getCookie } from './helper';

function parseJSON(response) {
    return response.json();
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    if (response.status === 401) {
        window.location.href = '/login';
    }

    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
const defaultOptions = {
    mode: 'cors',
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json',
    },
    isHandleError: true,
};

const setUrlQuery = (_url, config = {}) => {
    let url = _url;

    if (config.filters) {
        url = appendUrlParams(url, buildFiltersQuery(config.filters));
    }

    if (config.maxIpp) {
        url = appendUrlParams(
            url,
            buildPageQuery(1, config.maxIpp === true ? DEFAULT_MAX_IPP : config.maxIpp),
        );
    } else if (config.pageNum) {
        url = appendUrlParams(url, buildPageQuery(config.pageNum, config.ipp));
    }

    return url;
};

const errorHandler = err =>
    Modal.error({
        content: err.message,
    });


export default function request(_url, options = {}) {
    const { headers } = defaultOptions;
    const url = setUrlQuery(_url, options);
    const accessToken = getCookie('access_token');
    if (url === AUTH_API && options.method === 'POST') {
        headers['Content-Type'] = 'application/x-www-form-urlencoded';
        headers.Authorization = BASIC_AUTH_KEY;
    } else if (accessToken && url !== AUTH_API) {
        headers.Authorization = `Bearer ${accessToken}`;
    }
    const foramttedOptions = {
        ...defaultOptions,
        ...options,
        headers: {
            ...headers,
            ...options.headers,
        },
    };
    return fetch(url, foramttedOptions)
        .then(checkStatus)
        .then(parseJSON)
        .then(({ data }) => ({ data }))
        .catch(foramttedOptions.isHandleError ? errorHandler : null);
}
