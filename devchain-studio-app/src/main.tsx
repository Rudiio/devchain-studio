import ReactDOM from 'react-dom/client'
import {NextUIProvider} from "@nextui-org/react";
import App from './App.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
    <NextUIProvider>
      <main className='devchain-studio text-foreground bg-background'>
        <App />
      </main>
    </NextUIProvider>
)
