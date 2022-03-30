const apiUrl = process.env.NODE_ENV === 'development' 
    ? 'https://dmc8ptcuv1dn8.cloudfront.net/api' // development api
    : 'https://dmc8ptcuv1dn8.cloudfront.net/api'; // production api

export {
    apiUrl
};