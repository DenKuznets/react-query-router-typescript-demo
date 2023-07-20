import { Box, Button, List, ListItemButton, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

type Post = {
    id: number;
    title: string;
    author: string;
};


const Posts = () => {
    const getPosts = () => {
        return axios.get<Post[]>("http://localhost:3000/posts");
    };
    const { data } = useQuery({
        queryKey: ["posts"],
        queryFn: getPosts,
    });

    const listItems = data?.data.map((item) => {
        return (
            <ListItemButton
                to={`/posts/${item.id}`}
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

    return (
        <>
            <Box sx={{ display: "flex", alignItems: "baseline", gap: "2em" }}>
                <Typography variant="h1">Posts</Typography>
                <Button variant="contained" color="primary">
                    New post
                </Button>
            </Box>
            <List>{listItems}</List>
        </>
    );
};

export default Posts;
