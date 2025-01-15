import { createRoot } from 'react-dom/client';
import { Provider } from "@/components/ui/provider.tsx";
import App from './App.tsx';

import './index.css';

createRoot(document.getElementById('root')!).render(
  <Provider>
    <App/>
  </Provider>
);
