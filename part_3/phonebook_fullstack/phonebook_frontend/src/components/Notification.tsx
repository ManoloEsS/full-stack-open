export interface NotificationObj {
    message: string;
    isError?: boolean;
}

export interface NotificationProps {
    notification: NotificationObj | null;
}

const Notification = ({ notification }: NotificationProps) => {
    if (!notification) {
        return null
    }

    if (notification.isError) {
        return (
            <div className="errorNotif">
                {notification.message}
            </div>
        )
    }

    return (
        <div className="notification">
            {notification.message}
        </div>
    )
}

export default Notification
