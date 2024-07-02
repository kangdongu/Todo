const quotes = [
    {
        quote:"인생의 주연이 되어라"
    },
    {
        quote:"실컷놀고 시험날 기적을 바라지 말자"
    },
    {
        quote:"자신에게 당당한 사람이 되라"
    },
    {
        quote:"자신에게 당당한 사람이 되어야 비로소 남을 챙길 수 있다."
    },
    {
        quote:"인생의 조연이 되지 말자"
    },
    {
        quote:"일단 행동하라"
    },
    {
        quote:"행동하지 않으면 생각이 많아지고"
    },
    {
        quote:"생각이 많아지면 겁이 많아지고"
    },
    {
        quote:"겁이 많아지면 행동을 하지 못하게 된다"
    },
    {
        quote:"앞을 봐라 저사람 뛰어가고 있다."
    }
]

const quote = document.querySelector("#quote span:first-child")

const todaysQuote = (quotes[Math.floor(Math.random() * quotes.length)])

quote.innerText = todaysQuote.quote;