import { apiUrl } from '../config';
import { fetchWrapper } from '../helpers';

export const icoService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

const baseUrl = `${apiUrl}/icoes`; 
const findByUserUrl = `${baseUrl}/search/findByUser?theUser=`

function getAll(token, userId) {
    return fetchWrapper.get(`${findByUserUrl}${userId}`, token);
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
