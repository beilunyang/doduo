import http from './http';
import { ANALYZE_ADDRESS } from '@/constants/endpoint';

const analyzeAddress = async address => {
  const data = await http.post({
    url: ANALYZE_ADDRESS,
    data: {
      address
    }
  });
  console.log('analyze_address:', data);
  return data;
};

export default {
  analyzeAddress
};
