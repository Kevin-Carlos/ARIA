import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ShellHeader from './ShellHeader/ShellHeader';
import ShellFooter from './ShellFooter/ShellFooter';

const styles = () => ({
    main: {
        flex: 1,
    },

    layout: {
        display: 'flex',
        minHeight: '100vh',
        flexDirection: 'column',
    },
});

const Shell = (props) => (
    <div className={props.classes.layout}>
        <ShellHeader />
        <main className={props.classes.main}>
            {props.children}
        </main>
        <ShellFooter />
    </div>
);

export default withStyles(styles)(Shell);