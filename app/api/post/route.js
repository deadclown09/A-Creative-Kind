import { connectToDB } from '@utils/database'
import Post from '@models/post'

export const GET = async (request) => {
    try {
        await connectToDB();
        const posts = await Post.find({}).populate('creator');
        return new Response(JSON.stringify(posts), { status: 200 })
    } catch (error) {
        console.error(error);
        return new Response('Failed to fetch the posts', { status: 500 })
    }
}