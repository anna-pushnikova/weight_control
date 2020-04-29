export default function datetimeFilter(value) {
  const datetime = value.split('-')

  const months = [ "January", "February", "March", "April", "May", "June", 
           "July", "August", "September", "October", "November", "December" ];

  const selectedMonthName = months[datetime[0]];
  const selectedYear = datetime[1]
  return `${selectedMonthName}, ${selectedYear}`
}
