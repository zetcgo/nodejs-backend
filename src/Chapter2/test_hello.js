import http from 'k6/http';

export const options = { vus: 100, durations: '10s' };

export default () => http.get('http://localhost:3000');
