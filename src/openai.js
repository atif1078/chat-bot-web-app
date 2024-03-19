const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: "Your actual API key here",
});
const openai = new OpenAIApi(configuration);

export async function sendMsgToOpenAi(input) {
  const res = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: input }],
    max_tokens: 512,
    top_p: 1,
    temperature: 0.5,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  return res.data.choices[0].text;
}
