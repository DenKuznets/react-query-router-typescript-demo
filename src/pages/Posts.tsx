import { Box, Button, List, ListItemButton, Typography } from "@mui/material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";

type Post = {
    id?: number;
    title: string;
    author: string;
};

const getPosts = () => {
    return axios.get<Post[]>("http://localhost:3000/posts");
};

const postsQuery = () => ({
    queryKey: ["posts"],
    queryFn: getPosts,
});

export const loader = (queryClient: QueryClient) => async () => {
    const query = postsQuery();
    return (
        queryClient.getQueryData(query.queryKey) ??
        (await queryClient.fetchQuery(query))
    );
};

const Posts = () => {
    const queryClient = useQueryClient();

    const { data } = useQuery({
        queryKey: ["posts"],
        queryFn: getPosts,
    });

    const listItems = data?.data.map((item) => {
        return (
            <ListItemButton
                to={`/posts/${item.id as number}`}
                component={Link}
                key={item.id}
            >
                <Box sx={{ mr: "2em" }}>
                    <Typography
                        variant="h1"
                        component="div"
                        color="primary.main"
                    >
                        {item.id}
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="h2">{item.title}</Typography>
                    <Typography variant="body1" color="text.secondary">
                        {item.author}
                    </Typography>
                </Box>
            </ListItemButton>
        );
    });

    const { mutate } = useMutation({
        mutationFn: (newPost: Post) => {
            return axios.post("http://localhost:3000/posts", newPost);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["posts"] });
        },
    });

    return (
        <>
            <Box sx={{ display: "flex", alignItems: "baseline", gap: "2em" }}>
                <Typography variant="h1">Posts</Typography>
                <Button
                    onClick={() => {
                        mutate({
                            title: "Random title",
                            author: "Random author",
                        });
                    }}
                    variant="contained"
                    color="primary"
                >
                    New post
                </Button>
            </Box>
            <List>{listItems}</List>
        </>
    );
};

export default Posts;
