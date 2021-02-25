import React from 'react';

import classes from './Layout.css';

import Aux from '../../hoc/Aux/Aux';

const layout = (props) => (
    <Aux>
        <div>Navigation, Sidebar, Backdrop</div>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Aux>
)

export default layout;