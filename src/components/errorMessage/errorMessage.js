import ErrorPNG from './error.png'

const ErrorMessage = () => {
    return (
        <img style={{width:'100%', height:'100%', display:'block', objectFit:'contain'}} src={ErrorPNG} alt="error" />
    )
}

export default ErrorMessage;