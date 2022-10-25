const constants = {
    QUOTES: [{
        text: 'The best way to predict the future is to invent it.',
        author: 'Alan Kay'
    }, {
        text: 'The way to get started is to quit talking and begin doing.',
        author: 'Walt Disney'
    }, {
        text: "If life were predictable it would cease to be life, and be without flavor.",
        author: 'Eleanor Roosevelt'
    }, {
        text: "Don't let what you cannot do interfere with what you can do.",
        author: 'John Woode'
    }],
    RANDOM_QUOTE: ()=> {
        return constants.QUOTES[Math.floor(Math.random() * constants.QUOTES.length)]
    },
    STUDENT_MENU: [{
        text: "Explore Jobs",
        code: "explore-jobs",
        icon: "briefcase"
    },{
        text: "Applied Jobs",
        code: "applied-jobs",
        icon: "user-check"
    },{
        text: "Build Resume",
        code: "resume",
        icon: "file-text"
    },{
        text: "Feedback",
        code: "feedback",
        icon: "headphones"
    },{
        text: "Contact Us",
        code: "contact-us",
        icon: "phone-call"
    }
    ]
}

export default constants