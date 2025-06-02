
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};


export const getDateRangeDescription = (startDate, endDate) => {
  return `${formatDate(startDate)} - ${formatDate(endDate)}`;
};