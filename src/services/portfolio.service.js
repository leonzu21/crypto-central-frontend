import { apiUrl } from '../config';
import { fetchWrapper } from '../helpers';

export const portfolioService = {
    getAll,
    getSituation,
    getById,
    create,
    update,
    delete: _delete
};

const baseUrl = `${apiUrl}/portfolios`; 
const findByUserUrl = `${baseUrl}/search/findByUser?theUser=`

function getAll(token, userId) {
    return fetchWrapper.get(`${findByUserUrl}${userId}`, token);
}

function getSituation(token, portfolioId) {
    return fetchWrapper.get(`${baseUrl}/${portfolioId}/situation`, token);
}

function getById(id, token) {
    return fetchWrapper.get(`${baseUrl}/${id}`, token);
}

function create(params, token) {
    return fetchWrapper.post(baseUrl, params, token);
}

function update(id, params, token) {
    return fetchWrapper.put(`${baseUrl}/${id}`, params, token);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id, token) {
    return fetchWrapper.delete(`${baseUrl}/${id}`, token);
}
