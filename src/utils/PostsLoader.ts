import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

export type PostType = {
    id?: number;
    title: string;
    author: string;
};

const getPosts = () => {
    return axios.get<PostType[]>("http://localhost:3000/posts");
};

export const postsQuery = {
    queryKey: ["posts"],
    queryFn: getPosts,
};

// PostsLoader moved into separate file from Posts.tsx due to FastReload restrictions

export const loader = (queryClient: QueryClient) => async () => {
    return (
        queryClient.getQueryData(postsQuery.queryKey) ??
        (await queryClient.fetchQuery(postsQuery))
    );
};
