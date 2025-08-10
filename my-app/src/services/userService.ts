


import api from '../utils/api';

export const userService = {
  async invite(payload: { name: string; email: string; role: 'Admin' | 'User' }) {
    const { data } = await api.post('/invite', payload);
    return data;
  },
  async listAll() {
    const { data } = await api.get('/my-users');
    return (data && (data.users || data)) as any[];
  },
};
