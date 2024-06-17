import React, { useEffect, useRef, useState } from 'react';
import Sidebar from './Docs/Sidebar';
import img from '../images/todo.jpg';
import Toggle from './Docs/Toggle';
import useScrollToTop from '../hooks/useScrollToTop';

// start sub-article paragraphs  
const SUB_ARTICLE_1_TEXT = (
    <div>
        <p>
            Productivity tools can streamline your workflow, helping you to manage tasks efficiently. With intuitive interfaces and easy-to-use features, these tools are designed to enhance your productivity.
        </p>
        <p>
            Imagine having all your tasks organized in one place. No more scattered notes or forgotten deadlines. Productivity tools provide the structure you need to keep track of everything, from daily to-dos to long-term projects.
        </p>
        <div className='catImage'>
            <img src={img} alt='Productivity illustration' />
        </div>
    </div>
);

const SUB_ARTICLE_2_TEXT = (
    <div>
        <p className='line-height'>
            A sleek and user-friendly interface can make all the difference. Productivity tools with a cool UI and UX not only look good but also make it easy to navigate and manage your tasks. These tools are designed to minimize friction and maximize efficiency, so you can focus on what matters most.
        </p>
    </div>
);

const SUB_ARTICLE_3_TEXT = (
    <div>
        <p>
            Join our Discord community to connect with other productivity enthusiasts. Whether you need help, want to share your experiences, or just chat with like-minded individuals, our Discord server is the place to be. Engage in discussions, ask questions, and get support from our team and community members.
        </p>
    </div>
);

const SUB_ARTICLE_4_TEXT = (
    <div>
        <p>
            Have questions or need support? Reach out to us via email. Our team is here to assist you with any inquiries you may have. Whether it's troubleshooting an issue or providing feedback, we're just an email away.
        </p>
        <p>
            We value your input and strive to respond as quickly as possible. Your feedback helps us improve and offer better services.
        </p>
    </div>
);


const SUB_ARTICLE_5_TEXT = (
    <div>
        <div>
            <p>
                Adding a list is straightforward. Simply click the "Add List" button, give your list a name, and start organizing your tasks. Whether you're managing personal errands or team projects, lists help you keep everything in order.
            </p>
        </div>
    </div>
);

const SUB_ARTICLE_6_TEXT = (
    <div>
        <p>
            Adding tasks to your lists is just as easy. Click "Add Task," enter the details of your task, and assign it to the appropriate list. You can set due dates, priorities, and reminders to ensure you stay on top of your work.
        </p>
        <p>
            With these tools, you can break down large projects into manageable tasks, track progress, and achieve your goals more efficiently.
        </p>
    </div>
);



// end sub-article paragraphs

// start Toggles info
const toggle_1 = {
    title: 'Where is my data saved?',
    body: `Your data is securely saved in the cloud, ensuring that you can access it from any device. We prioritize your privacy and use state-of-the-art encryption to keep your information safe.`
};

const toggle_2 = {
    title: 'What is the difference between the paid and free plan?',
    body: `The free plan offers basic features to get you started, while the paid plan provides advanced functionalities such as project sharing, priority support, and enhanced security features. Choose the plan that best fits your needs.`
};

const toggle_3 = {
    title: 'Can I cancel my subscription?',
    body: `Yes, you can cancel your subscription at any time. Simply go to your account settings and follow the cancellation instructions. Your access to premium features will continue until the end of your billing cycle.`
};

const toggle_4 = {
    title: 'Having loading problems?',
    body: `If you're experiencing loading issues, try refreshing the page or clearing your browser cache. If the problem persists, contact our support team for assistance. We're here to help ensure you have a smooth experience.`
};

// end Toggles text
function Article({ children, id, Ref, value, index }) {
    return (
        <div className={`doc-article art-${index} container`} >
            <h1 className='article-header' id={id} ref={Ref}>{value}</h1>
            <div className='article-body'>
                {children}
            </div>
        </div>
    );
}

const Doc = () => {
    useScrollToTop();
    const [activeLink, setActiveLink] = useState(null);
    const sections = [
        { why_us_ref: useRef(null), id: 'article-header1', value: 'Why us' },
        { how_to_use_ref: useRef(null), id: 'article-header2', value: 'How to use' },
        { common_questions_ref: useRef(null), id: 'article-header3', value: 'Common questions' },
        { have_question_ref: useRef(null), id: 'article-header4', value: 'Have a question?' },
    ];


    useEffect(() => { // Intersection Observer way is better than this i will use it in another places this just for refresh my information  
        function scroll() {
            if (window.scrollY >= sections[0].why_us_ref.current.offsetTop - 4 && window.scrollY < sections[1].how_to_use_ref.current?.offsetTop) {
                setActiveLink('why_us');
            }
            if (window.scrollY >= sections[1].how_to_use_ref.current.offsetTop - 4 && window.scrollY < sections[2].common_questions_ref.current.offsetTop) {
                setActiveLink('how_to_use');
            }
            if (window.scrollY >= sections[2].common_questions_ref.current.offsetTop - 4 && window.scrollY < sections[3].have_question_ref.current.offsetTop) {
                setActiveLink('common_questions');
            }
            if (window.scrollY >= sections[3].have_question_ref.current.offsetTop - 4) {
                setActiveLink('have_question');
            }
        }
        window.addEventListener('scroll', scroll);
        return () => {
            window.removeEventListener('scroll', scroll);
        };
    },);
    return (
        <div>
            <Sidebar activeLink={activeLink} />
            <article>
                {/* Article-1 */}
                <Article Ref={sections[0].why_us_ref} id={sections[0].id} value={sections[0].value} index={0}>
                    <div className='sub-article a1'>
                        <p className='sub-article-header'>Easy to use</p>
                        {SUB_ARTICLE_1_TEXT}
                    </div>
                    <div className='sub-article a1'>
                        <p className='sub-article-header'>Cool UI and UX</p>
                        {SUB_ARTICLE_2_TEXT}
                    </div>
                </Article>
                {/* Article-2 */}
                <Article Ref={sections[1].how_to_use_ref} id={sections[1].id} value={sections[1].value} index={1}>
                    <div className='sub-article a2'>
                        <p className='sub-article-header'>Add List</p>
                        {SUB_ARTICLE_5_TEXT}
                    </div>
                    <div className='sub-article a2'>
                        <p className='sub-article-header'>Add Task</p>
                        {SUB_ARTICLE_6_TEXT}
                    </div>
                </Article>
                {/* Article-3 */}
                <Article Ref={sections[2].common_questions_ref} id={sections[2].id} value={sections[2].value} index={2}>
                    <div className='sub-article a3' >
                        <Toggle toggleObj={toggle_1} />
                        <Toggle toggleObj={toggle_2} />
                        <Toggle toggleObj={toggle_3} />
                        <Toggle toggleObj={toggle_4} />
                    </div>
                </Article>
                {/* Article-4 */}
                <Article Ref={sections[3].have_question_ref} id={sections[3].id} value={sections[3].value} index={3}>
                    <div className='sub-article a4'>
                        <p className='sub-article-header'>Discord</p>
                        {SUB_ARTICLE_3_TEXT}
                    </div>
                    <div className='sub-article a4'>
                        <p className='sub-article-header'>Email Us</p>
                        {SUB_ARTICLE_4_TEXT}
                    </div>
                </Article>
            </article>
        </div>
    );
};

export default Doc;
