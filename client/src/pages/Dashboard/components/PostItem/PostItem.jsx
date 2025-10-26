import styles from './PostItem.module.css';

export default function PostItem({ post }) {
    if (!post) {
        return null;
    }

    return (
        <div className={styles.postItem}>
            <h3>{post.title}</h3>
            <small>{new Date(post.created_at).toLocaleString()}</small>
            <p>{post.description}</p>
            <small>By: {post.name}</small>
        </div>
    )
}