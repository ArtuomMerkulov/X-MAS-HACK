import { Grid, Typography } from '@mui/material'
import logoAsset from '../../assets/logo.png'

const Logo = () => {
    return (
        <>
            <Grid container>
                <Grid>
                    <img src={logoAsset} />
                </Grid>
                <Grid>
                    <Typography variant='h4' color='#6BCB48' sx={{mx: 2, mt: 0.5}}>
                        Chroma Vision
                    </Typography>
                </Grid>
            </Grid>
        </>
    )
}

export default Logo