import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Typography, Container, Button } from "@mui/material";
import { useMutation } from "@tanstack/react-query";

type Post = {
    id: number;
    title: string;
    author: string;
};

const Post = () => {
  const params = useParams();
  const navigate = useNavigate();
    const { mutate: deletePost } = useMutation({
        mutationFn: () =>
        axios.delete(`http://localhost:3000/posts/${params.id as string}`),
      onSuccess: () => navigate(-1),
    });
    const getPost = () =>
        axios.get<Post>(`http://localhost:3000/posts/${params.id as string}`);

    const { data } = useQuery({
        queryKey: ["post", params.id],
        queryFn: getPost,
    });

    const handleDeletePost = () => {
        deletePost();
    };

    return (
        <Container maxWidth="lg">
            <Typography variant="h1" component="div" color="primary.main">
                {data?.data.id}
            </Typography>
            <Typography variant="h2">{data?.data.title}</Typography>
            <Typography
                sx={{ mb: "2em" }}
                variant="body1"
                color="text.secondary"
            >
                {data?.data.author}
            </Typography>
            <Button variant="outlined" color="error" onClick={handleDeletePost}>
                Delete
            </Button>
        </Container>
    );
};

export default Post;
