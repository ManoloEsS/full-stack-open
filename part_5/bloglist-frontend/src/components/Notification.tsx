import type { NotificationProps } from "../types"

export const Notification = ({ notification }: NotificationProps) => {
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

