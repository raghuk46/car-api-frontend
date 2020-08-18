import React from 'react';

import notFound from '../page_not_found.svg';

function NotFound(props) {
    return (
        <div className="login">
            <img src={notFound} alt="404" /> 
        </div>
    );
}

export default NotFound;