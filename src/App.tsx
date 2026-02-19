import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MyCarousel } from './components/MyCarousel';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
            Popular right now
          </h1>
          <MyCarousel />
        </div>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
