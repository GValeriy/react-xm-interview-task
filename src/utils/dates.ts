export const oldDateInMs = 1546448400;

export const formatDate = (d) => d.toISOString().split('T')[0];

export const getTime = (dateString) => new Date(dateString).getTime();
