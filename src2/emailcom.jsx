import { useRef } from "react"

export default function emailcom() {
    let email = useRef('')

    let validateEmail = (e) => {

        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let valid = emailRegex.test(email.current.value)
        if (valid) {
            alert('Отправлено!')
        } else {
            alert('Ошибка!')
        }
    };

    return (
        <>
            <form onSubmit={validateEmail}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" ref={email}  />

                <button type="submit">Отправить</button>
            </form>
        </>
    )
}