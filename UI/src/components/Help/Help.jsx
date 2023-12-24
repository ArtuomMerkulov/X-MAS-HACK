import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    IconButton,
    DialogActions
} from '@mui/material'
import Slide from '@mui/material/Slide'
import QuestionMarkIcon from '@mui/icons-material/QuestionMark'
import CloseIcon from '@mui/icons-material/Close'
import { forwardRef, useState } from 'react'

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
})

const Help = () => {
    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <>
            <IconButton color="primary" size="small" sx={{ ml: 'auto', mr: 2 }} onClick={handleClickOpen}>
                <QuestionMarkIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose} TransitionComponent={Transition}>
                <DialogTitle color='#6BCB48'>
                    {"Help"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <p>Сервис Chroma Vision предоставляет несколько методов обработки изображений:</p>
                        <ul>
                            <li>
                                X-MAS HACK 2023 - эксклюзивный алгоритм, разработанный на хакатоне X-MAS HACK 2023
                            </li>
                            <li>
                                PicWish.com - обработка изображений с помощью стороннего сервиса (Внимание! Количество обрабатываемых изображений ограничено)
                            </li>
                            <li>
                                OpenCV.js -  обработка встроенным движком OpenCV без использования бэкенда
                            </li>
                        </ul>
                        <p>
                            Для обработки изображения выберите метод, нажмите кнопку ЗАГРУЗИТЬ ФАЙЛ ДЛЯ ОБРАБОТКИ. После завершения сравните обработанное изображение с оригиналом. При необходимости используйте слайдер и меняйте направление сравнения изображений.
                        </p>
                        <p>
                            Если результат вас устраивает, скачайте обработанный файл.
                        </p>
                        <p>
                            Если вы хотите обработать файл несколькими методами, нужно загрузить его несколько раз.
                        </p>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button component="label" variant="outlined" endIcon={<CloseIcon />} onClick={handleClose}>
                        Закрыть
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Help