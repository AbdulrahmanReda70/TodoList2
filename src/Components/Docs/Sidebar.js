import { useEffect, useRef, useState } from "react";
import { FiChevronsRight } from "react-icons/fi";

const Sidebar = ({ activeLink }) => {
    const [marginLeft, setMarginLeft] = useState(-270);
    const sidebar_titles = useRef(null);
    const open_sidebar = useRef(null);

    useEffect(() => {
        function handleClickOutside(e) { // this is better to understand than make it with && operator
            if (marginLeft === -270) { // if it was closed 
                if (e.target === open_sidebar.current) {
                    setMarginLeft(10);
                }
            } else { // if it was oped
                if (!sidebar_titles.current.contains(e.target)) {
                    setMarginLeft(-270);
                }
            }
        }
        window.addEventListener('click', handleClickOutside);
        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, [marginLeft]);
    return (
        <nav>
            <div className="open-sidebar" ref={open_sidebar}><FiChevronsRight className="FiChevronsRight-icon" /></div>
            <div className='sidebar-titles' ref={sidebar_titles} style={{ marginLeft: `${marginLeft}px` }}>
                <a className={activeLink === 'why_us' ? 'active-doc-link' : ''} href='#article-header1'>Why us</a>
                <a className={activeLink === 'how_to_use' ? 'active-doc-link' : ''} href='#article-header2'>How to use</a>
                <a className={activeLink === 'common_questions' ? 'active-doc-link' : ''} href='#article-header3'>Common questions</a>
                <a className={activeLink === 'have_question' ? 'active-doc-link' : ''} href='#article-header4'>Have a question?</a>
            </div>
        </nav>
    );
};

export default Sidebar;