import Box from '@material-ui/core/Box';
import React from 'react';
import ProgramPage from './ProgramPage';

export default function ProgramTab({ hidden }: { hidden?: boolean }) {
    
    var paragraphDesign = {
        backgroundColor: '#68c1a8',
        padding:    '.8rem',
        color: 'Black',

    };

    const content = React.useMemo(
        () => (
            <>
                {/* <h6 style={paragraphDesign}>INSPECTION PROGRAM</h6> */}
                {/* <Typography style={{color: "Black",backgroundColor: '#68c1a8',padding:'.8rem',font:"bold"}} variant="body1">INSPECTION PROGRAM</Typography> */}
                <p></p>
                <ProgramPage/>
            </>
        ),
        []
    );

    return <Box hidden={hidden}>{content}</Box>;
}
