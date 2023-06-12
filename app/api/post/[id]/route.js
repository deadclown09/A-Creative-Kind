import { connectToDB } from '@utils/database'
import Post from '@models/post';

//GET POST
export const GET = async (request, { params }) => {
    try {
        await connectToDB();
        const post = await Post.findById(params.id).populate('creator');

        if (!post) return new Response('Post not found', { status: 404 })

        return new Response(JSON.stringify(post), { status: 200 });
    }
    catch (error) {
        console.error(error);
        return new Response('Internal server error', { status: 500 })
    }
}

//EDIT POST
export const PATCH = async (request, { params }) => {
    const { quote, tag } = await request.json();

    try {
        await connectToDB();

        const existingPost = await Post.findById(params.id).populate('creator');
        if (!existingPost) return new Response('Post not found', { status: 404 })

        existingPost.quote = quote;
        existingPost.tag = tag;

        await existingPost.save();
        return new Response('Successfully updated the post', { status: 200 })
    }
    catch (error) {
        console.error(error);
        return new Response('Error updating the post', { status: 500 })
    }
}

//DELETE POST
export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();
        await Post.findByIdAndRemove(params.id);
        return new Response('Successfully deleted the post', { status: 200 })
    }
    catch (error) {
        console.error(error);
        return new Response('Error deleting the post', { status: 500 })
    }
}