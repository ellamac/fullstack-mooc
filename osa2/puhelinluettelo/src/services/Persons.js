import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
  const request = axios.get(baseUrl);
  console.log('getAll');
  return request.then(response => response.data);
};

const create = newObject => {
  const request = axios.post(baseUrl, newObject);
  console.log('create');
  return request.then(response => response.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  console.log('update');
  return request.then(response => response.data);
};

const remove = id => {
  const request = axios.delete(`${baseUrl}/${id}`);
  console.log('delete');
  console.log(request.then(response => response.data));
  return request.then(response => response.data);
};

export default { getAll, create, update, remove };
