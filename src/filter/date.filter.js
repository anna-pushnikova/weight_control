export default function dateFilter(value) {
  const options = {}
  options.day = 'numeric'
  options.month = 'long'
  options.year = 'numeric'

  return new Intl.DateTimeFormat('en-US', options).format(value)
}
