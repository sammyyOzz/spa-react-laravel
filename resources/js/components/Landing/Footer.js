import Grid from '@material-ui/core/Grid'
import React from 'react'

function Footer() {

    return (
        <div className="footer">
            <Grid container>
                <Grid item xs={12} md={4}>
                    <span><strong>CONTACT DEVELOPER:</strong></span>
                </Grid>
                <Grid item xs={12} md={4}>
                    <span style={{marginLeft: '50px'}}>E:mail: sammyoziegbe@gmail.com</span>
                </Grid>
                <Grid item xs={12} md={4}>
                    <span style={{marginLeft: '50px'}}>Phone: +2349037420887</span>
                </Grid>
            </Grid>
        </div>
    )
}

export default Footer
