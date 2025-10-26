import React, { useState } from 'react';
import styles from './PostInput.module.css'
import MainButton from '../../../../components/Button/MainButton';
import { motion, AnimatePresence } from 'framer-motion';
import IconButton from '../../../../components/IconButton/IconButton';

export default function PostInput( { onPostSubmit } ) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isClicked, setIsClicked] = useState(false);

    const inputAnimation = {
        i: { y: 10, opacity: 0 },
        a: { y: 0, opacity: 1 },
        e: { y: -10, opacity: 0 },
        t: { duration: 0.2 }
    };

    const handleSubmit = () => {
        if (onPostSubmit) {
            onPostSubmit(title, description);
        }

        setIsClicked(false)
        setTitle("");
        setDescription("");
    }

    return (
        <div className={styles.inputGroup}>

            {isClicked && (
                <motion.div
                    variants={inputAnimation}
                    initial="i"
                    animate="a"
                    exit="e"
                    transition="t"
                    layout
                >
                    {
                        <input
                            className={styles.postInput + " " + styles.postTitleInput}
                            type="text"
                            placeholder='Title goes here'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    }
                </motion.div>
            )}

            <textarea
                className={styles.postInput}
                placeholder="Whats on your mind?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onFocus={() => setIsClicked(true)}
                rows={isClicked ? 5 : 1}
            />

            <AnimatePresence>
                {isClicked && (
                    <motion.div
                        variants={inputAnimation}
                        initial="i"
                        animate="a"
                        exit="e"
                        transition="t"
                        layout
                    >
                        {
                            <div className={styles.buttonContainer} >

                                <IconButton
                                    icon={
                                        <i className="fa-solid fa-xmark"></i>
                                    }
                                    onClick={() => {
                                        setIsClicked(false);
                                        setTitle("");
                                        setDescription("");
                                    }}
                                    isTransparent={true}
                                />

                                <MainButton
                                    style={{ maxWidth: "30%" }}
                                    type='submit'
                                    onClick={() => {
                                        handleSubmit()
                                    }}
                                >
                                    Post
                                </MainButton>
                            </div>
                        }
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}