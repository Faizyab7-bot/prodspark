import { ViteReactSSG } from 'vite-react-ssg';
import { routes } from './routes.tsx';
import './index.css';

export const createApp = ViteReactSSG({
  routes
});
