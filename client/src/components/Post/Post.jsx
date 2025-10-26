import { useState } from "react";
import axios from 'axios'
import { useEffect } from "react";
import "./Post.module.css";

const api = import.meta.env.VITE_API_URL

export default function Posts() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        axios.get(`${api}/api/posts`)
            .then(res => setPosts(res.data))
            .catch(err => console.log(err))
    }, [])

    return (
        <div>

            <h2>Posts</h2>
            {posts.map(post => (
                <div key={post.id} style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
                    <h3>{post.title}</h3>
                    <p>{post.description}</p>
                </div>
            ))}


        </div>
    )

}