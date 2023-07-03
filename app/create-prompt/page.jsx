'use client';

import Form from "@components/Form";
import { useState } from "react";

const CreatePrompt = () => {
    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({
        prompt: "",
        tag: "",
    });
    const creatPrompt = async (e) => {

    }   
    return (
         <Form
             type="Create"
             post={post}
             setPost={setPost}
             submitting={submitting}
             handleSubmit={creatPrompt}

         />
    )
}

export default CreatePrompt