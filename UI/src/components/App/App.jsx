import { useState } from 'react'
import ReactCompareImage from 'react-compare-image'
import {
  Alert,
  Backdrop,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  Snackbar,
  Typography
} from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import CloudDownloadIcon from '@mui/icons-material/CloudDownload'
import QuestionMarkIcon from '@mui/icons-material/QuestionMark'
import VisuallyHiddenInput from '../VisuallyHiddenInput/VisuallyHiddenInput'
import beforeAsset from '../../assets/before.jpg'
import afterAsset from '../../assets/after.jpg'

const App = () => {

  const [fileName, setFileName] = useState("")

  const [beforeSrc, setBeforeSrc] = useState(beforeAsset)

  const [afterSrc, setAfterSrc] = useState(afterAsset)

  const [isVertical, setVerticalCompare] = useState(false)

  const [method, setMethod] = useState("x")

  const [inProgress, setInProgress] = useState(false)

  const [isAlertOpen, setAlertOpen] = useState(false)

  const [alertMsg, setAlertMsg] = useState("Метод находится в разработке")

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

  const picWish = (imgBefore) => {
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

  const runOpenCV = (imgBefore) => {
    
    const leftImage = document.querySelector('[data-testid="left-image"]')
    const tmpImg = new Image()
    const tmpCanvas = document.createElement('canvas')
    const cvsAfter = document.createElement('canvas')
    const ocv = window.cv
    
    leftImage.parentNode.appendChild(tmpImg)
    tmpImg.width = leftImage.width
    tmpImg.height = leftImage.height      
    tmpImg.src = imgBefore
    tmpImg.id = 'tmpImg'

    leftImage.parentNode.appendChild(tmpCanvas)
    tmpCanvas.id = 'tmpCanvas'
    tmpCanvas.width = leftImage.width
    tmpCanvas.height = leftImage.height    
    const tmpCtx = tmpCanvas.getContext('2d')
    tmpCtx.drawImage(tmpImg, 0, 0)

    let src = ocv.imread('tmpCanvas')
    // let dst = new ocv.Mat()
    // ocv.medianBlur(src, dst, 5)
    // ocv.imshow(cvsAfter, dst)
    // dst.delete()
    // src.delete()

    setAfterSrc(cvsAfter.toDataURL())
    setBeforeSrc(tmpCanvas.toDataURL())

    console.log(leftImage.width + ' ' + leftImage.height)
    leftImage.parentNode.removeChild(tmpImg)
    leftImage.parentNode.removeChild(tmpCanvas)
   
    setInProgress(false)
  }

  const handleUpload = (e) => {
    const files = e.target.files
    if (files.length === 1) {

      setInProgress(true)

      const imgBefore = URL.createObjectURL(files[0])
      setFileName(files[0].name)

      switch (method) {
        case "x":
          openAlert("Для работы с методом необходимо запустить локальный Web-сервер. Обратитесь к разработчику")          
          break
        case "p":
          picWish(imgBefore)
          break
        case "o":
          openAlert("Метод находится в разработке")
          //runOpenCV(imgBefore)
          break
      }
    }
    e.target.value = ""
  }

  const handleDownload = () => {
    if (fileName !== "") {
      let lnk = document.createElement('a')
      lnk.download = fileName
      lnk.href = afterSrc
      lnk.click()
    }
  }

  const handleCompareDirChange = (e) => {
    setVerticalCompare(e.target.value === "v")
  }

  const handleMethodChange = (e) => {
    setMethod(e.target.value)
  }

  const handleCloseAlert = () => {
    setAlertOpen(false)
  };

  const openAlert = (msg) => {
    setAlertMsg(msg)
    setAlertOpen(true)
    setInProgress(false)
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
              <hr />
              <FormControl>
                <FormLabel>
                  <Typography variant="h5">
                    Метод обработки
                  </Typography>
                </FormLabel>
                <RadioGroup defaultValue="x" onChange={handleMethodChange}>
                  <FormControlLabel value="x" control={<Radio />} label="X-MAS HACK 2023" />
                  <FormControlLabel value="p" control={<Radio />} label="PicWish.com" />
                  <FormControlLabel value="o" control={<Radio />} label="OpenCV.js" />
                </RadioGroup>
              </FormControl>
              <hr />
              <FormControl>
                <FormLabel>
                  <Typography variant="h5">
                    Сравнение
                  </Typography>
                </FormLabel>
                <RadioGroup row defaultValue="h" onChange={handleCompareDirChange}>
                  <FormControlLabel value="v" control={<Radio />} label="вертикальное" />
                  <FormControlLabel value="h" control={<Radio />} label="горизонтальное" />
                </RadioGroup>
              </FormControl>
              <hr />
            </CardContent>
            <CardActions>
              <Button component="label" variant="outlined" sx={{ width: '100%', mx: 2, mb: 2 }} startIcon={<CloudUploadIcon />}>
                Загрузить файл для обработки
                <VisuallyHiddenInput type="file" accept="image/*" onChange={handleUpload} />
              </Button>
            </CardActions>
            <CardActions>
              <Button component="label" variant="outlined" sx={{ width: '100%', mx: 2, mb: 2 }} startIcon={<CloudDownloadIcon />} onClick={handleDownload}>
                Скачать обработанный файл
              </Button>
            </CardActions>
            <CardActions>
              <IconButton color="primary" size="small" sx={{ ml: 'auto', mr: 2 }}>
                <QuestionMarkIcon />
              </IconButton>
            </CardActions>
          </Grid>
        </Grid>
      </Card>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={inProgress}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar open={isAlertOpen} autoHideDuration={5000} onClose={handleCloseAlert} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="error" variant="filled" onClose={handleCloseAlert}>
          {alertMsg}
        </Alert>
      </Snackbar>
    </>
  )
}

export default App
