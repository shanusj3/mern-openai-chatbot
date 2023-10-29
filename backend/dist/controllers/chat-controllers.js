import User from "../models/User.js";
import { configureOpenAI } from "../config/openai-config.js";
import { OpenAIApi } from "openai/dist/api.js";
export const generateChatCompletion = async (req, res, next) => {
    const { message } = req.body;
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user)
            return res
                .status(401)
                .json({ message: "User not registerd or malfunctioned" });
        //grab chats of user
        const chats = user.chats.map(({ role, content }) => ({
            role,
            content,
        }));
        chats.push({ content: message, role: "user" });
        //send all chats with new one to openAi API
        const config = configureOpenAI();
        const openai = new OpenAIApi(config);
        //get response
        const chatResponse = await openai.createChatCompletion({
            model: "gpt-3.3-turbo",
            messages: chats,
        });
        user.chats.push(chatResponse.data.choices[0].message);
        await user.save();
        return res.status(200).json({ chats: user.chats });
    }
    catch (error) {
        return res.status(200).json({ message: "Somthing went wrong" });
    }
};
//# sourceMappingURL=chat-controllers.js.map