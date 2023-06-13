import { connectToDB } from '@utils/database'
import Post from '@models/post'
import User from '@models/user';

export const GET = async (request, { params }) => {
    try {
        await connectToDB();
        const user = await User.findOne({ username: params.username });
        const posts = await Post.find({ creator: user?._id?.toString() }).populate('creator');
        return new Response(JSON.stringify(posts), { status: 200 })
    }
    catch (error) {
        console.error(error);
        return new Response("Failed to fetch user's posts", { status: 500 })
    }
}