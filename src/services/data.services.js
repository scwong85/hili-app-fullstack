import api from './api';

export const getQuotes = () => {
  return api.get('/modules/quotes/');
}

export const getQuotesConfig = () => {
  return api.get('/modules/quotesConfig/');
}

export const saveQuotesConfig = (payload) => {
  return api.post('/modules/quotesConfig/', payload)
}

export const patchQuotesConfig = (qcid, payload) => {
  return api.patch(`/modules/quotesConfig/${qcid}/`, payload);
}

export const getQuotesTags = () => {
  return api.get('/modules/quotesTags/');
}

export const saveQuotesTags = (payload) => {
  return api.post('/modules/quotesTags/', payload)
}

export const patchQuotesTags = (qcid, payload) => {
  return api.patch(`/modules/quotesTags/${qcid}/`, payload);
}

export const getSingleQuote = (qid) => {
  return api.get(`/modules/quotes/${qid}/`)
}

export const deleteSingleQuote = (qid) => {
  return api.delete(`/modules/quotes/${qid}/`)
}

export const saveSingleQuote = (qid, payload) => {
  return api.put(`/modules/quotes/${qid}/`, payload)
}