import { Link } from "react-router-dom";
import useScrollToTop from "../../../hooks/useScrollToTop";

const MindMap = () => {
    useScrollToTop();
    return (
        <div className='container' style={{ marginBottom: '300px', textAlign: 'center', marginTop: '300px' }} >
            <h2 style={{ marginBottom: '50px' }}>Coming soon (⊙ˍ⊙)</h2>
            <div style={{ display: 'flex', flexDirection: 'column', rowGap: '25px' }}>
                <Link to={'..'} relative='path'>{'<<'} go back</Link>
                <Link to={'..'}>{'<<'} Home page</Link>
            </div>
        </div>
    );
};

export default MindMap;