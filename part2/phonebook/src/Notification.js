import React from 'react';

const Notification = ({ message, notificationType }) => {
	return <div className={`notification-${notificationType}`}>{message}</div>;
};

export default Notification;
