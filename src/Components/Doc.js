import React, { useEffect, useRef, useState } from 'react';
import Sidebar from './Docs/Sidebar';
import img from '../images/todo.jpg';
import Toggle from './Docs/Toggle';
import useScrollToTop from '../hooks/useScrollToTop';

// start sub-article paragraphs  
const SUB_ARTICLE_1_TEXT = (
    <div>
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Cum ex esse quisquam sequi magnam nesciunt mollitia voluptas fa
            cere velit quaerat, iusto suscipit ea fuga
            accusamus in est laboriosam aspersors dolores.
        </p>
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Cum ex esse quisquam sequi magnam nesciunt mollitia voluptas fa
            cere velit quaerat, iusto suscipit ea fuga
            accusamus in est laboriosam aspersors dolores.
        </p>
        <div className='catImage'>
            <img src={img} alt='' />
        </div>
    </div>
);

const SUB_ARTICLE_2_TEXT = (
    <div>
        <p className='line-height'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum ex esse quisquam sequi magnam nesciunt mollitia voluptas facere
            velit quaerat, iusto suscipit ea fuga accusamus in
            est laboriosam asperiores dolores lor sit amet consectetur adipisicing elit. Cum ex esse quisquam sequi magnam nesciunt mollitia voluptas facere
            velit quaerat, iusto
        </p>
    </div>
);

const SUB_ARTICLE_3_TEXT = (
    <div>
        <p>
            lor sit amet consectetur adipisicing elit. Cum ex esse quisquam sequi magnam nesciunt mollitia voluptas facere
            velit quaerat, iusto
        </p>
    </div>
);

const SUB_ARTICLE_4_TEXT = (
    <div>
        <p>
            lor sit amet consectetur adipisicing elit. Cum ex esse quisquam sequi magnam nesciunt mollitia voluptas facere
            velit quaerat, iusto
        </p>
        <p>
            lor sit amet consectetur adipisicing elit. Cum ex esse quisquam sequi magnam nesciunt mollitia voluptas facere
            velit quaerat, iusto
        </p>
        <p>
            lor sit amet consectetur adipisicing elit. Cum ex esse quisquam sequi magnam nesciunt mollitia voluptas facere
            velit quaerat, iusto
        </p>
    </div>
);
// end sub-article paragraphs

// start Toggles info
const toggle_1 = {
    title: 'Where is my data saved?',
    body: `lor sit amet consectetur adipisicing elit. Cum ex esse quisquam sequi magnam nesciunt mollitia voluptas facerevelit quaerat, iusto`
};

const toggle_2 = {
    title: 'What is the different between the paid and free plan?',
    body: `lor sit amet consectetur adipisicing elit. Cum ex esse quisquam sequi magnam nesciunt mollitia voluptas facerevelit quaerat, iusto lor sit amet consectetur adipisicing elit. Cum ex esse quisquam sequi magnam nesciunt mollitia voluptas facerevelit quaerat, i`
};

const toggle_3 = {
    title: 'Can I cancel my subscribe?',
    body: `lor sit amet consectetur adipisicing elit. Cum ex esse quisquam sequi magnam nesciunt mollitia voluptas facerevelit quaerat, iusto`
};

const toggle_4 = {
    title: 'loading problems',
    body: `lor sit amet consectetur adipisicing elit. Cum ex esse quisquam sequi magnam nesciunt mollitia voluptas facerevelit quaerat, iusto`
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
                        {SUB_ARTICLE_3_TEXT}
                    </div>
                    <div className='sub-article a2'>
                        <p className='sub-article-header'>Add Task</p>
                        {SUB_ARTICLE_4_TEXT}
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
