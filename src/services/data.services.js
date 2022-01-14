import api from './api';

export const getQuotes = () => {
  return api.get('/quotes/');
}

export const getQuotesConfig = () => {
  return api.get('/quotesConfig/');
}

export const saveQuotesConfig = (payload) => {
  return api.post('/quotesConfig/', payload)
}

export const patchQuotesConfig = (qcid, payload) => {
  return api.patch(`/quotesConfig/${qcid}/`, payload);
}

export const getQuotesTags = () => {
  return api.get('/quotesTags/');
}

export const saveQuotesTags = (payload) => {
  return api.post('/quotesTags/', payload)
}

export const patchQuotesTags = (qcid, payload) => {
  return api.patch(`/quotesTags/${qcid}/`, payload);
}

export const getSingleQuote = (qid) => {
  return api.get(`/quotes/${qid}/`)
}

export const deleteSingleQuote = (qid) => {
  return api.delete(`/quotes/${qid}/`)
}

export const saveSingleQuote = (qid, payload) => {
  return api.put(`/quotes/${qid}/`, payload)
}