import { apiUrl } from '../config';
import { fetchWrapper } from '../helpers';

export const portfolioTransactionService = {
    getAllByPortfolio,
    getById,
    create,
    update,
    delete: _delete
};

const baseUrl = `${apiUrl}/portfolioTransactions`; 
const findByPortfolio = `${baseUrl}/search/findByPortfolio?thePortfolio=`

function getAllByPortfolio(token, portfolio) {
    return fetchWrapper.get(`${findByPortfolio}${portfolio}`, token);
}

function getById(id, token) {
    return fetchWrapper.get(`${baseUrl}/${id}`, token);
}

function create(params, token) {
    return fetchWrapper.post(`${baseUrl}/${params.portfolio_id}/transactions`, params, token);
}

function update(id, params, token) {
    return fetchWrapper.put(`${baseUrl}/${id}`, params, token);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id, token) {
    return fetchWrapper.delete(`${baseUrl}/${id}`, token);
}
