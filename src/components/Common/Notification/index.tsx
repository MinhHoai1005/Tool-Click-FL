import React from "react"
import { ToastContainer, toast } from "react-toastify"

type typeNoti = "info" | "error" | "warning" | "success"

const NotificationComponent = (props) => (
    <div className="notification-body">
        <div className={`notification-type notification-type-${props.type}`}></div>
        <div className="notification-content">{props.value}</div>
    </div>
)

const notify = (value: React.ReactNode, type: typeNoti = "info") =>
    toast(<NotificationComponent value={<span>{value}</span>} type={type} />)

const NotificationContainer = () => (
    <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick={false}
        rtl={false}
        draggable
        pauseOnHover
        closeButton={false}
    />
)

export { notify, NotificationContainer }
