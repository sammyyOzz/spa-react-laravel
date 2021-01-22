import React from 'react'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PetsIcon from '@material-ui/icons/Pets';
import { Link } from 'react-router-dom';

function LandingPage() {

    return (
        <div style={{paddingTop: '10%'}}>
            <div style={{textAlign: 'center'}}>
                <Typography variant="h2" style={{marginBottom: '15px'}}>
                    REACT & LARAVEL
                </Typography>
                <Typography variant="h4" style={{marginBottom: '15px'}}>
                    A Single Page REACT-APP embedded into LARAVEL
                </Typography>
                <Button variant="outlined" component={Link} to="/signup" style={{borderColor: 'black', color: 'black'}}>
                    <PetsIcon /><span style={{paddingLeft: '10px'}}>Get Started</span>
                </Button>
            </div>
        </div>
    )
}

export default LandingPage
