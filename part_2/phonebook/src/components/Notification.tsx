// Use interfaces for notification shapes and props (changed from `type` to `interface`).
export interface NotificationObj {
    message: string | null;
    isError: boolean;
}

// Props shape for the Notification component: it receives an optional `notification` object.
export interface NotificationProps {
    notification?: NotificationObj | null;
}

// Destructure props so callers can keep using <Notification notification={notification} />
const Notification = ({ notification }: NotificationProps) => {
    // If there's no notification, render nothing
    if (!notification) {
        return null
    }

    // Render error style when indicated
    if (notification.isError) {
        return (
            <div className="errorNotif">
                {notification.message}
            </div>
        )
    }

    // Normal notification
    return (
        <div className="notification">
            {notification.message}
        </div>
    )
}

export default Notification
