import { useState } from 'react'
import ReactCompareImage from 'react-compare-image'
import {
  Backdrop,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography
} from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import VisuallyHiddenInput from '../VisuallyHiddenInput/VisuallyHiddenInput'
import beforeAsset from '../../assets/before.jpg'
import afterAsset from '../../assets/after.jpg'

const App = () => {

  const [beforeSrc, setBeforeSrc] = useState(beforeAsset)

  const [afterSrc, setAfterSrc] = useState(afterAsset)

  const [isVertical, setVerticalCompare] = useState(true)

  const [inProgress, setInProgress] = useState(false)

  const fetchImage = async url => {
    const response = await fetch(url)
    const blob = await response.blob()
    return blob
  }

  const setImages = async (l, b) => {
    const a = await fetchImage(l)
    setBeforeSrc(b)
    setAfterSrc(URL.createObjectURL(a))
    setInProgress(false)
  }

  const handleUpload = (e) => {
    const files = e.target.files
    if (files.length === 1) {

      setInProgress(true)

      const imgBefore = URL.createObjectURL(files[0])

      fetch(imgBefore)
        .then(response => response.blob())
        .then(blob => {
          const data = new FormData()
          data.append('image_file', blob)
          data.append('type', 'clean')
          data.append('sync', 1)
          const request = {
            method: 'POST',
            headers: {
              'X-API-KEY': 'wxu89ab6exjvx2w08',
              'Accept': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
            },
            body: data,
          }

          fetch('https://techhk.aoscdn.com/api/tasks/visual/scale', request)
            .then(response => response.json())
            .then(respData => setImages(respData.data.image, imgBefore))
        })
    }
  }

  const handleCompareDirChange = (e) => {
    setVerticalCompare(e.target.value === "v")
  }

  return (
    <>
      <Card elevation={5} sx={{ minHeight: 400 }}>
        <Grid container>
          <Grid item sx={{ minWidth: 400 }}>
            <ReactCompareImage leftImage={beforeSrc} rightImage={afterSrc} vertical={isVertical} />
          </Grid>
          <Grid item sx={{ maxWidth: 400 }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Цветники-ИИ
              </Typography>
              <Typography variant="body2" color="text.secondary" component="div" sx={{ pb: 2 }}>
                Web-сервис для цветовой коррекции изображений.
              </Typography>
              <FormControl>
                <FormLabel>
                  Сравнение
                </FormLabel>
                <RadioGroup row defaultValue="v" onChange={handleCompareDirChange}>
                  <FormControlLabel value="v" control={<Radio />} label="вертикальное" />
                  <FormControlLabel value="h" control={<Radio />} label="горизонтальное" />
                </RadioGroup>
              </FormControl>
            </CardContent>
            <CardActions sx={{ height: '100%' }}>
              <Button component="label" variant="contained" sx={{ width: '100%', mx: 2, mb: 2 }} startIcon={<CloudUploadIcon />}>
                Загрузите файл с изображением
                <VisuallyHiddenInput type="file" accept="image/*" onChange={handleUpload} />
              </Button>
            </CardActions>
          </Grid>
        </Grid>
      </Card>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={inProgress}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  )
}

export default App
