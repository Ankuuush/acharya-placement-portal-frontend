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
        text: "Dashboard",
        code: "dashboard",
        icon: "compass"
    },{
        text: "Explore Drives",
        code: "explore-jobs",
        icon: "briefcase"
    },{
        text: "Applied Drives",
        code: "applied-jobs",
        icon: "user-check"
    },{
        text: "Saved Drives",
        code: "saved-jobs",
        icon: "bookmark"
    },{
        text: "Edit Resume",
        code: "resume",
        icon: "file-text"
    },{
        text: "Companies",
        code: "companies",
        icon: "globe"
    },{
        text: "Noticeboard",
        code: "noticeboard",
        icon: "speaker"
    },{
        text: "Feedback",
        code: "feedback",
        icon: "headphones"
    },{
        text: "Contact Us",
        code: "contact-us",
        icon: "phone-call"
    }
    ],

    TPO_MENU: [{
        text: "Dashboard",
        code: "dashboard",
        icon: "compass"
    },
    {
        text: "Drives List",
        code: "explore-jobs",
        icon: "briefcase"
    },{
        text: "Post A Drive",
        code: "post-jobs",
        icon: "user-check"
    },{
        text: "Student List",
        code: "student-list",
        icon: "file-text"
    },{
        text: "Noticeboard",
        code: "noticeboard",
        icon: "speaker"
    },
    {
        text: "Verifications",
        code: "verifications",
        icon: "check-circle"
    },
    {
        text: "Add A Student",
        code: "registration",
        icon: "user-plus"
    },{
        text: "My Profile",
        code: "tpo-profile",
        icon: "user"
    },{
        text: "Feedback",
        code: "feedback",
        icon: "headphones"
    }
    ],
    ADMIN_MENU: [{
        text: "users",
        code: "users",
        icon: "users"
    },{
        text: "addTPO",
        code: "add-tpo",
        icon: "user-plus"
    },{
        text: "addAdmin",
        code: "add-admin",
        icon: "user-plus"
    },{
        text: "Dashboard",
        code: "dashboard",
        icon: "compass"
    },
    {
        text: "Drives List",
        code: "explore-jobs",
        icon: "briefcase"
    },{
        text: "Student List",
        code: "student-list",
        icon: "file-text"
    },{
        text: "My Profile",
        code: "admin-profile",
        icon: "user"
    }
    ]
}

export default constants