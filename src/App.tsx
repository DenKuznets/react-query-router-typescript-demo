import "./App.css";
import Layout from "./components/Layout";
import {
    createBrowserRouter,
    RouterProvider,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Posts from "./pages/Posts";
import Post from "./pages/Post";
import {loader as postsLoader } from './pages/Posts'

const queryClient = new QueryClient();

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route loader={()=> postsLoader(queryClient)}  index element={<Posts />} />
            <Route path="posts/:id" element={<Post />} />
        </Route>
    )
);


function App() {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </>
    );
}

export default App;
