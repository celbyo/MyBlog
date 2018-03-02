/**
 * Encode object to urlParams
 *
 * @param {Object} data The object to be encode
 * @param {Object} predicate function that check filter this k-v
 * @return {String} Params string
 */
export const encodeParams = (data, predicate = v => v != null) =>
    Object.keys(data)
        .filter(key => {
            if (typeof data[key] === 'object' && data[key] !== null) {
                throw new Error('Unsupport object(include array) in params');
            }
            return predicate(data[key]);
        })
        .map(key => [key, data[key]].map(encodeURIComponent).join('='))
        .join('&') || '';

/**
* Encode filter to urlParams ( -1 case )
*
* @param {Object} filters The filters object to be encode
* @return {String} Params string
*/
export const buildFiltersQuery = filters =>
    encodeParams(filters, v => v !== '-1' && v !== -1 && v != null);

/**
* Encode page to urlParams ( also add ipp )
*
* @param {Object} page The filters object to be encode
* @return {String} Params string
*/
export const buildPageQuery = (page, ipp) =>
    encodeParams({
        page,
        ipp,
    });

/**
* Append params string to url
*
* @param {String} paramsString Params string
* @return {String} Url
*/
export const appendUrlParams = (url, paramsString) =>
    url + (url.indexOf('?') === -1 ? '?' : '&') + paramsString;
